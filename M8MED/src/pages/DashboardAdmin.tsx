import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useM8Store } from '../store/useM8Store'
import EditComplexity from './EditComplexity'
import Summary from './Summary'
import GeneralSummary from './GeneralSummary'

export default function DashboardAdmin() {
  const doctores = useM8Store((state) => state.doctores)
  const cirugias = useM8Store((state) => state.cirugias)
  const doctoresActivos = doctores.filter((d) => d.activo)

  // Estados para abrir/cerrar modales
  const [showComplexity, setShowComplexity] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [showGeneral, setShowGeneral] = useState(false)

  const contarParticipacionesDelMes = (doctorId: string) => {
    const ahora = new Date()
    const mesActual = ahora.getMonth()
    const anioActual = ahora.getFullYear()
    return cirugias.filter((c) => {
      const fecha = new Date(`${c.fecha}T${c.hora}`)
      return (
        (c.doctorId === doctorId || c.ayudantes.includes(doctorId)) &&
        fecha.getFullYear() === anioActual &&
        fecha.getMonth() === mesActual
      )
    }).length
  }

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Panel de Admin</h1>
        <ul className="space-y-2 mb-6">
          <li>
            <Link to="/pacientes" className="text-blue-600 underline">
              Ver pacientes
            </Link>
          </li>
          <li>
            <button
              onClick={() => setShowComplexity(true)}
              className="text-blue-600 underline"
            >
              Gestionar complejidad
            </button>
          </li>
          <li>
            <button
              onClick={() => setShowSummary(true)}
              className="text-blue-600 underline"
            >
              Resumen mensual
            </button>
          </li>
          <li>
            <button
              onClick={() => setShowGeneral(true)}
              className="text-blue-600 underline"
            >
              Resumen general
            </button>
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">Médicos activos</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {doctoresActivos.map((doc) => (
            <div key={doc.id} className="bg-white shadow rounded p-4">
              <h3 className="text-lg font-semibold">{doc.nombre}</h3>
              <p className="text-sm text-gray-700">{doc.email}</p>
              <p className="text-sm text-gray-700">
                Especialidad: {doc.especialidad}
              </p>
              <p className="text-sm text-gray-700">
                Participaciones del mes:{' '}
                {contarParticipacionesDelMes(doc.id)}
              </p>
              <p className="text-sm text-gray-700">
                Sueldo actual: ${doc.sueldo.toFixed(2)}
              </p>
              <Link
                to={`/medicos/${doc.id}`}
                className="text-blue-600 underline mt-2 inline-block"
              >
                Ver detalle
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Modales */}
      <Modal isOpen={showComplexity} onClose={() => setShowComplexity(false)}>
        <EditComplexity />
      </Modal>

      <Modal isOpen={showSummary} onClose={() => setShowSummary(false)}>
        <Summary />
      </Modal>

      <Modal isOpen={showGeneral} onClose={() => setShowGeneral(false)}>
        <GeneralSummary />
      </Modal>
    </>
  )
}

/**
 * Componente Modal reutilizable.
 * Muestra el contenido en una superposición centrada con un fondo oscuro.
 */
function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  if (!isOpen) return null
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 max-w-full max-h-screen overflow-y-auto rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-red-600 hover:underline mb-2"
          >
            Cerrar
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
