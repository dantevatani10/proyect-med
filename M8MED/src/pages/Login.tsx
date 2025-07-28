import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'

export default function Login() {
  const setUser = useUserStore((state) => state.setUser)
  const navigate = useNavigate()

  const loginAs = (rol: 'admin' | 'medico') => {
    setUser({ nombre: 'Demo', rol })
    navigate(rol === 'admin' ? '/admin' : '/medico')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="space-y-4 bg-white p-6 rounded shadow w-80 text-center">
        <h1 className="text-xl font-bold">Bienvenido a M8MED</h1>
        <button onClick={() => loginAs('admin')} className="btn">Entrar como Admin</button>
        <button onClick={() => loginAs('medico')} className="btn">Entrar como Médico</button>
      </div>
    </div>
  )
}
