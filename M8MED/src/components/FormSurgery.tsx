import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useM8Store, type Surgery } from '../store/useM8Store'
import { usePacienteStore } from '../store/usePacienteStore'
import type { Paciente } from '../types/paciente'

type Props = {
  onFinish: () => void
  surgery?: Surgery
}

export default function FormSurgery({ onFinish, surgery }: Props) {
  const agregarCirugia = useM8Store((s) => s.agregarCirugia)
  const editarCirugia = useM8Store((s) => s.editarCirugia)
  const doctores = useM8Store((s) => s.doctores)

  const pacientes = usePacienteStore((s) => s.pacientes)
  const agregarPaciente = usePacienteStore((s) => s.agregarPaciente)

  const [usarExistente, setUsarExistente] = useState(true)
  const [pacienteId, setPacienteId] = useState('')
  const [pacienteNuevo, setPacienteNuevo] = useState({ nombre: '', dni: '' })

  const [form, setForm] = useState({
    fecha: surgery?.fecha ?? '',
    hora: surgery?.hora ?? '',
    diagnostico: surgery?.diagnostico ?? '',
    tipo: surgery?.tipo ?? '',
    complejidad: surgery?.complejidad ?? 1,
    doctorId: surgery?.doctorId ?? '',
    ayudantes: surgery?.ayudantes ?? ([] as string[]),
    imagen: surgery?.imagen ?? '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let paciente: { nombre: string; dni: string }
    if (surgery) {
      paciente = surgery.paciente
    } else {
      paciente = usarExistente
        ? pacientes.find((p) => p.id === pacienteId) ?? {
            nombre: '',
            dni: '',
          }
        : pacienteNuevo

      if (!paciente.nombre || !paciente.dni) {
        alert('Faltan datos del paciente')
        return
      }

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
    }

    if (surgery) {
      editarCirugia(surgery.id, { ...form, paciente })
      alert('Cirugía modificada')
    } else {
      agregarCirugia({ ...form, paciente })
      alert('Cirugía guardada')
    }

    onFinish()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!surgery && (
        <div>
          <label className="block font-medium">Paciente</label>
          <div className="flex gap-4 items-center mb-2">
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
              {pacientes.map((p) => (
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
      )}

      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          value={form.fecha}
          onChange={(e) => setForm({ ...form, fecha: e.target.value })}
          className="input"
          required
        />
        <input
          type="time"
          value={form.hora}
          onChange={(e) => setForm({ ...form, hora: e.target.value })}
          className="input"
          required
        />
      </div>
      <input
        placeholder="Diagnóstico"
        value={form.diagnostico}
        onChange={(e) => setForm({ ...form, diagnostico: e.target.value })}
        className="input"
        required
      />
      <input
        placeholder="Tipo de cirugía"
        value={form.tipo}
        onChange={(e) => setForm({ ...form, tipo: e.target.value })}
        className="input"
        required
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
        required
      />
      <select
        value={form.doctorId}
        onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
        className="input"
        required
      >
        <option value="">-- Cirujano principal --</option>
        {doctores.map((d) => (
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
            ayudantes: Array.from(e.target.selectedOptions, (o) => o.value),
          })
        }
        className="input h-32"
      >
        {doctores
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

      <button type="submit" className="btn w-full">
        {surgery ? 'Guardar cambios' : 'Guardar cirugía'}
      </button>
    </form>
  )
}

