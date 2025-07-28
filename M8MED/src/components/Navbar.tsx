import { useState } from 'react'
import { usePacienteStore } from '../store/usePacienteStore'
import type { Paciente } from '../types/paciente'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function FormPaciente() {
  const agregarPaciente = usePacienteStore((state) => state.agregarPaciente)
  const [form, setForm] = useState<Omit<Paciente, 'id'>>({
    nombre: '',
    dni: '',
    telefono: '',
    genero: 'masculino',
    email: '',
    diagnostico: '',
    antecedentes: '',
    fechaNacimiento: '',
    tratamiento: ''
  })

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nuevoPaciente: Paciente = {
      ...form,
      id: uuidv4()
    }
    agregarPaciente(nuevoPaciente)
    navigate('/pacientes')
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
        <h1 className="text-2xl font-bold mb-4">Agregar Paciente</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="input" required />
            <input name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} className="input" required />
            <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} className="input" required />
            <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} className="input" required />
            <input name="fechaNacimiento" placeholder="Fecha de nacimiento" type="date" value={form.fechaNacimiento} onChange={handleChange} className="input" required />
            <select name="genero" value={form.genero} onChange={handleChange} className="input">
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
            <input name="diagnostico" placeholder="Diagnóstico" value={form.diagnostico} onChange={handleChange} className="input" required />
            <input name="tratamiento" placeholder="Tratamiento" value={form.tratamiento} onChange={handleChange} className="input" required />
          </div>

          <textarea name="antecedentes" placeholder="Antecedentes (opcional)" value={form.antecedentes} onChange={handleChange} className="input w-full h-24" />

          <div className="flex justify-between items-center">
            <button type="button" onClick={() => navigate('/pacientes')} className="text-blue-600 hover:underline">
              ← Volver
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Guardar paciente
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
