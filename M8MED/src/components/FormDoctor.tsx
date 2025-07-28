import { useState } from 'react'
import { useM8Store } from '../store/useM8Store'
import { v4 as uuidv4 } from 'uuid'

export default function FormDoctor({ onDoctorAdded }: { onDoctorAdded: () => void }) {
  const agregarDoctor = useM8Store((s) => s.agregarDoctor)
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    matricula: '',
    especialidad: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    agregarDoctor({
      ...form,
      id: uuidv4(),
    })
    onDoctorAdded()
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
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="matricula"
          placeholder="Matrícula"
          value={form.matricula}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="especialidad"
          placeholder="Especialidad"
          value={form.especialidad}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <button type="submit" className="btn w-full">Guardar médico</button>
    </form>
  )
}
