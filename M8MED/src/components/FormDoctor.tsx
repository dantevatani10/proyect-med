import { useState } from 'react'
import { useM8Store, type Doctor } from '../store/useM8Store'
import { v4 as uuidv4 } from 'uuid'

type Props = {
  onFinish: () => void
  doctor?: Doctor
}

export default function FormDoctor({ onFinish, doctor }: Props) {
  const agregarDoctor = useM8Store((s) => s.agregarDoctor)
  const editarDoctor = useM8Store((s) => s.editarDoctor)
  const [form, setForm] = useState({
    nombre: doctor?.nombre ?? '',
    apellido: doctor?.apellido ?? '',
    email: doctor?.email ?? '',
    telefono: doctor?.telefono ?? '',
    matricula: doctor?.matricula ?? '',
    especialidad: doctor?.especialidad ?? '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (doctor) {
      editarDoctor(doctor.id, form)
    } else {
      agregarDoctor({
        ...form,
        id: uuidv4(),
      })
    }
    onFinish()
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
      <button type="submit" className="btn w-full">
        {doctor ? 'Guardar cambios' : 'Guardar médico'}
      </button>
    </form>
  )
}
