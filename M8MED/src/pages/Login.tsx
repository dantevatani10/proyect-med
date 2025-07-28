import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
import { useM8Store } from '../store/useM8Store'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setUser = useUserStore((state) => state.setUser)
  const doctores = useM8Store((s) => s.doctores)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Admin fijo
    if (email === 'admin@test.com' && password === '1234') {
      setUser({
        id: 'admin',
        email,
        rol: 'admin',
        nombre: 'Admin',
        apellido: 'Principal',
        password,
        foto: 'https://placehold.co/64',
      })
      navigate('/dashboard-admin')
      return
    }

    // Buscar médico con esas credenciales
    const doctor = doctores.find(
      (d) => d.email === email && d.password === password
    )
    if (doctor) {
      setUser({
        id: doctor.id,
        email: doctor.email,
        rol: 'medico',
        nombre: doctor.nombre,
        apellido: doctor.apellido,
        password: doctor.password,
        foto: doctor.foto,
      })
      navigate('/dashboard-medico')
    } else {
      alert('Credenciales incorrectas')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="input w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              className="input w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn w-full">
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
