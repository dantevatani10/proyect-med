import { useUserStore } from '../store/useUserStore'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <h1 className="text-2xl font-bold text-blue-700">MedM8</h1>

      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-sm text-gray-600 hidden sm:inline">
              Sesión: {user.nombre} ({user.rol})
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 text-sm"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
