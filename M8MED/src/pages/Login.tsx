import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setUser = useUserStore((state) => state.setUser)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Comprobamos credenciales fijas
    if (email === 'admin@test.com' && password === '1234') {
      setUser({ email, rol: 'admin' })
      navigate('/dashboard-admin')
    } else if (email === 'medico@test.com' && password === '1234') {
      setUser({ email, rol: 'medico' })
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
