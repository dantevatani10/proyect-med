import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useUserStore } from '../store/useUserStore'

export default function Navbar() {
  // Recuperamos cada valor por separado para no crear objetos nuevos en cada render
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md fixed top-0 inset-x-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-xl font-bold">
          MEDM8
        </Link>
        {user && (
          <div className="flex items-center gap-6 relative">
            {user.rol === 'admin' && (
              <Link to="/pacientes" className="hover:underline">
                Pacientes
              </Link>
            )}
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <img
                src={user.foto || 'https://placehold.co/32'}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="hidden sm:block font-medium">
                {user.nombre} {user.apellido}
              </span>
            </button>
            {open && (
              <div className="absolute right-0 top-12 bg-white text-gray-800 rounded shadow-lg w-40">
                <Link
                  to="/perfil"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Mi perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
