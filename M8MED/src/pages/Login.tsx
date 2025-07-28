import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'

export default function Login() {
  const [email, setEmail] = useState('')
  const [rol, setRol] = useState<'admin' | 'medico'>('admin')
  const setUser = useUserStore((state) => state.setUser)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUser({ email, rol }) // <-- CORREGIDO: Pasa el objeto { email, rol }
    if (rol === 'admin') {
      navigate('/dashboard-admin')
    } else {
      navigate('/dashboard-medico')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>
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
            <label className="block text-sm font-medium">Rol</label>
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value as 'admin' | 'medico')}
              className="input w-full"
            >
              <option value="admin">Admin</option>
              <option value="medico">Médico</option>
            </select>
          </div>

          <button type="submit" className="btn w-full">
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}