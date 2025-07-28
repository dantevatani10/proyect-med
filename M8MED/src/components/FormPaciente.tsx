import { useState } from 'react'
import { usePacienteStore } from '../store/usePacienteStore'
import type { Paciente } from '../types/paciente'
import { v4 as uuidv4 } from 'uuid'

type FormPacienteProps = {
  onPacienteAgregado: () => void;
}

export default function FormPaciente({ onPacienteAgregado }: FormPacienteProps) {
  const agregarPaciente = usePacienteStore((state) => state.agregarPaciente)

  const [form, setForm] = useState<Omit<Paciente, 'id'>>({
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    genero: 'masculino',
    email: '',
    diagnostico: '',
    antecedentes: '',
    fechaNacimiento: '',
    tratamiento: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    onPacienteAgregado(); // <-- USA EL CALLBACK
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow mt-6">
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            className="input"
            required
          />
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

        <textarea name="antecedentes" placeholder="Antecedentes (opcional)" value={form.antecedentes} onChange={e => handleChange(e)} className="input w-full h-24" />

        <button type="submit" className="btn w-full">Guardar paciente</button>
    </form>
  )
}