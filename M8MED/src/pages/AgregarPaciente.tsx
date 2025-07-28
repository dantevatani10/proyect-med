import { usePacienteStore } from '../store/usePacienteStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { v4 as uuidv4 } from 'uuid'
import type { Paciente } from '../types/paciente'


export default function AgregarPaciente() {
  const agregarPaciente = usePacienteStore((state) => state.agregarPaciente)
  const navigate = useNavigate()

  const [form, setForm] = useState<Omit<Paciente, 'id'>>({
    nombre: '',
    dni: '',
    telefono: '',
    genero: 'masculino',
    email: '',
    diagnostico: '',
    antecedentes: '',
    fechaNacimiento: '',
    tratamiento: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nuevoPaciente: Paciente = {
      ...form,
      id: uuidv4(),
    }
    agregarPaciente(nuevoPaciente)
    navigate('/pacientes')
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Agregar Paciente</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="input" required />
            <input name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} className="input" required />
            <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} className="input" required />
            <select name="genero" value={form.genero} onChange={handleChange} className="input">
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="input" required />
            <input name="fechaNacimiento" type="date" value={form.fechaNacimiento} onChange={handleChange} className="input" required />
            <input name="diagnostico" placeholder="Diagnóstico" value={form.diagnostico} onChange={handleChange} className="input" required />
            <input name="tratamiento" placeholder="Tratamiento" value={form.tratamiento} onChange={handleChange} className="input" required />
          </div>
          <input name="antecedentes" placeholder="Antecedentes (opcional)" value={form.antecedentes} onChange={handleChange} className="input w-full" />
          <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">
            Guardar Paciente
          </button>
        </form>
      </div>
    </>
  )
}
