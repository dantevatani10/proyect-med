import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'

export default function Navbar() {
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        M8MED
      </Link>
      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">
            {user.email} ({user.rol})
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  )
}