import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useM8Store } from '../store/useM8Store'
import { usePacienteStore } from '../store/usePacienteStore'
import type { Paciente } from '../types/paciente'
import Navbar from '../components/Navbar'
import { v4 as uuidv4 } from 'uuid'

export default function NewSurgery() {
  const navigate = useNavigate()
  const agregarCirugia = useM8Store((s) => s.agregarCirugia)
  const doctores = useM8Store((s) => s.doctores || [])
  const pacientes = usePacienteStore((s) => s.pacientes)

  const [usarExistente, setUsarExistente] = useState(true)
  const [pacienteId, setPacienteId] = useState('')
  const [pacienteNuevo, setPacienteNuevo] = useState({ nombre: '', dni: '' })

  const [form, setForm] = useState({
    fecha: '',
    hora: '',
    diagnostico: '',
    tipo: '',
    complejidad: 1,
    doctorId: '',
    ayudantes: [] as string[],
    imagen: '',
  })

  const agregarPaciente = usePacienteStore((s) => s.agregarPaciente)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const paciente = usarExistente
      ? pacientes.find((p) => p.id === pacienteId)
      : pacienteNuevo

    if (!paciente || !paciente.nombre || !paciente.dni) {
      alert('Faltan datos del paciente')
      return
    }

    // Si se ingresó un paciente nuevo y no existe en el store, guardarlo
    if (!usarExistente) {
      const existe = pacientes.some((p) => p.dni === paciente.dni)
      if (!existe) {
        const [nombre, ...apRest] = paciente.nombre.trim().split(' ')
        const nuevoPaciente: Paciente = {
          id: uuidv4(),
          nombre,
          apellido: apRest.join(' '),
          dni: paciente.dni,
          telefono: '',
          genero: 'otro',
          email: '',
          diagnostico: '',
          antecedentes: '',
          fechaNacimiento: '',
          tratamiento: '',
        }
        agregarPaciente(nuevoPaciente)
      }
    }

    agregarCirugia({
      ...form,
      paciente,
    })
    alert('Cirugía guardada correctamente')
    navigate('/dashboard-admin')
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Registrar nueva cirugía</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Paciente</label>
            <div className="flex gap-4 items-center">
              <label>
                <input
                  type="radio"
                  name="pacienteModo"
                  checked={usarExistente}
                  onChange={() => setUsarExistente(true)}
                />{' '}
                Seleccionar existente
              </label>
              <label>
                <input
                  type="radio"
                  name="pacienteModo"
                  checked={!usarExistente}
                  onChange={() => setUsarExistente(false)}
                />{' '}
                Ingresar nuevo
              </label>
            </div>
            {usarExistente ? (
              <select
                value={pacienteId}
                onChange={(e) => setPacienteId(e.target.value)}
                className="input w-full"
              >
                <option value="">-- Seleccioná un paciente --</option>
                {Array.isArray(pacientes) &&
                  pacientes.map((p: Paciente) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre} {p.apellido} - DNI: {p.dni}
                    </option>
                  ))}
              </select>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                <input
                  placeholder="Nombre completo"
                  value={pacienteNuevo.nombre}
                  onChange={(e) =>
                    setPacienteNuevo((prev) => ({
                      ...prev,
                      nombre: e.target.value,
                    }))
                  }
                  className="input"
                />
                <input
                  placeholder="DNI"
                  value={pacienteNuevo.dni}
                  onChange={(e) =>
                    setPacienteNuevo((prev) => ({
                      ...prev,
                      dni: e.target.value,
                    }))
                  }
                  className="input"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              className="input"
            />
            <input
              type="time"
              value={form.hora}
              onChange={(e) => setForm({ ...form, hora: e.target.value })}
              className="input"
            />
          </div>
          <input
            placeholder="Diagnóstico"
            value={form.diagnostico}
            onChange={(e) => setForm({ ...form, diagnostico: e.target.value })}
            className="input"
          />
          <input
            placeholder="Tipo de cirugía"
            value={form.tipo}
            onChange={(e) => setForm({ ...form, tipo: e.target.value })}
            className="input"
          />
          <input
            type="number"
            min={1}
            max={10}
            value={form.complejidad}
            onChange={(e) =>
              setForm({ ...form, complejidad: parseInt(e.target.value) })
            }
            className="input"
          />
          <select
            value={form.doctorId}
            onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
            className="input"
          >
            <option value="">-- Cirujano principal --</option>
            {Array.isArray(doctores) &&
              doctores.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nombre} {d.apellido}
                </option>
              ))}
          </select>
          <label className="block font-medium">Ayudantes:</label>
          <select
            multiple
            value={form.ayudantes}
            onChange={(e) =>
              setForm({
                ...form,
                ayudantes: Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                ),
              })
            }
            className="input h-32"
          >
            {Array.isArray(doctores) &&
              doctores
                .filter((d) => d.id !== form.doctorId)
                .map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nombre} {d.apellido}
                  </option>
                ))}
          </select>

          <label className="block font-medium">Imagen del parte (base64)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (!file) return
              const reader = new FileReader()
              reader.onloadend = () => {
                setForm({ ...form, imagen: reader.result as string })
              }
              reader.readAsDataURL(file)
            }}
            className="input"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar cirugía
          </button>
        </form>
      </div>
    </>
  )
}

