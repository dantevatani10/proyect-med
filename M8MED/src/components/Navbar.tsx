import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'

export default function Navbar() {
  // Recuperamos cada valor por separado para no crear objetos nuevos en cada render
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        M8MED
      </Link>
      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">
            {user.email} (
            <span className="font-medium capitalize">{user.rol}</span>)
          </span>
          {user.rol === 'admin' && (
            <Link to="/pacientes" className="text-blue-600 hover:underline">
              Ver Pacientes
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 text-sm"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  )
}
