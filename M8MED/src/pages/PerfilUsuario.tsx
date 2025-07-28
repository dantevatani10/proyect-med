import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useUserStore } from '../store/useUserStore'
import { useM8Store } from '../store/useM8Store'

export default function PerfilUsuario() {
  const user = useUserStore((s) => s.user)
  const updateUser = useUserStore((s) => s.updateUser)
  const editarDoctor = useM8Store((s) => s.editarDoctor)
  const doctores = useM8Store((s) => s.doctores)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nombre: user?.nombre ?? '',
    apellido: user?.apellido ?? '',
    email: user?.email ?? '',
    password: user?.password ?? '',
    foto: user?.foto ?? '',
  })

  if (!user) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUser(form)
    if (user.rol === 'medico') {
      const doctor = doctores.find((d) => d.id === user.id)
      if (doctor) {
        editarDoctor(doctor.id, {
          ...doctor,
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          password: form.password,
          foto: form.foto,
        })
      }
    }
    navigate(user.rol === 'admin' ? '/dashboard-admin' : '/dashboard-medico')
  }

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto p-6 pt-20">
        <h1 className="text-2xl font-bold mb-4">Mi perfil</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="input"
            placeholder="Nombre"
            required
          />
          <input
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            className="input"
            placeholder="Apellido"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="input"
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="input"
            placeholder="Contraseña"
            required
          />
          <input
            name="foto"
            value={form.foto}
            onChange={handleChange}
            className="input"
            placeholder="URL de foto"
          />
          <button type="submit" className="btn w-full">
            Guardar
          </button>
        </form>
      </div>
    </>
  )
}
