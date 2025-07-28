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
    <nav className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md fixed top-0 inset-x-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-xl font-bold">
          M8MED
        </Link>
        {user && (
          <div className="flex items-center gap-6">
            <span className="hidden sm:block">
              {user.email} (
              <span className="font-medium capitalize">{user.rol}</span>)
            </span>
            {user.rol === 'admin' && (
              <Link to="/pacientes" className="hover:underline">
                Pacientes
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-white text-sky-700 font-medium px-4 py-2 rounded-md shadow hover:bg-gray-100 text-sm"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
