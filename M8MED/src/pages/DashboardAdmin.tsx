import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useM8Store } from '../store/useM8Store'

export default function DashboardAdmin() {
  // Obtenemos las referencias originales de doctores y cirugías
  const doctores = useM8Store((state) => state.doctores)
  const cirugias = useM8Store((state) => state.cirugias)

  // Filtramos médicos activos fuera del selector para evitar ciclos
  const doctoresActivos = doctores.filter((d) => d.activo)

  // Contamos las cirugías del mes para cada médico
  const contarCirugiasDelMes = (doctorId: string) => {
    const ahora = new Date()
    const mesActual = ahora.getMonth()
    const anioActual = ahora.getFullYear()
    return cirugias.filter((c) => {
      const fecha = new Date(`${c.fecha}T${c.hora}`)
      return (
        c.doctorId === doctorId &&
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
        </ul>

        {/* Sección de médicos activos */}
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
                Cirugías del mes: {contarCirugiasDelMes(doc.id)}
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
    </>
  )
}
