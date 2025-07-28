import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useM8Store } from '../store/useM8Store'
import DoctorDetail from './DoctorDetail'
import PatientDetail from './PatientDetail'
import FormDoctor from '../components/FormDoctor'
import { usePacienteStore } from '../store/usePacienteStore'
import Modal from '../components/Modal'

export default function DashboardAdmin() {
  const doctores = useM8Store((state) => state.doctores)
  const cirugias = useM8Store((state) => state.cirugias)
  const pacientes = usePacienteStore((s) => s.pacientes)
  const cambiarEstadoDoctor = useM8Store((s) => s.cambiarEstadoDoctor)
  const doctoresActivos = doctores.filter((d) => d.activo)
  const doctoresSuspendidos = doctores.filter((d) => !d.activo)

  // Estados para abrir/cerrar modales
  const [detailDoctorId, setDetailDoctorId] = useState<string | null>(null)
  const [editDoctorId, setEditDoctorId] = useState<string | null>(null)
  const [detailPatientId, setDetailPatientId] = useState<string | null>(null)

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
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Panel de Admin</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-50 to-indigo-100 min-h-screen">

          <h2 className="text-2xl font-semibold mb-4">Médicos activos</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctoresActivos.map((doc) => (
              <div key={doc.id} className="card hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-slate-800">
                  {doc.nombre} {doc.apellido}
                </h3>
                <p className="text-sm text-slate-600">{doc.email}</p>
                <p className="text-sm text-slate-600">
                  Especialidad: {doc.especialidad}
                </p>
                <p className="text-sm text-slate-600">
                  Participaciones del mes: {contarParticipacionesDelMes(doc.id)}
                </p>
                <p className="text-sm text-slate-600">
                  Sueldo actual: ${doc.sueldo.toFixed(2)}
                </p>
                <button
                  onClick={() => setDetailDoctorId(doc.id)}
                  className="text-sky-600 hover:underline mt-2 inline-block"
                >
                  Ver detalle
                </button>
                <button
                  onClick={() => setEditDoctorId(doc.id)}
                  className="text-sky-600 hover:underline mt-2 ml-4 inline-block"
                >
                  Editar
                </button>
                <button
                  onClick={() => cambiarEstadoDoctor(doc.id, false)}
                  className="text-red-600 hover:underline mt-2 ml-4 inline-block"
                >
                  Suspender
                </button>
              </div>
            ))}
          </div>

          {doctoresSuspendidos.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mt-10 mb-4">Médicos suspendidos</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {doctoresSuspendidos.map((doc) => (
                  <div key={doc.id} className="card hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-slate-800">
                      {doc.nombre} {doc.apellido}
                    </h3>
                    <p className="text-sm text-slate-600">{doc.email}</p>
                    <p className="text-sm text-slate-600">
                      Especialidad: {doc.especialidad}
                    </p>
                    <button
                      onClick={() => cambiarEstadoDoctor(doc.id, true)}
                      className="text-sky-600 hover:underline mt-2 inline-block"
                    >
                      Reactivar
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

        {pacientes.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mt-10 mb-4">Pacientes</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pacientes.map((p) => (
                  <div
                    key={p.id}
                    className="card hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-slate-800">
                      {p.nombre} {p.apellido}
                    </h3>
                    <p className="text-sm text-slate-600">{p.telefono}</p>
                    <p className="text-sm text-slate-600 mb-2">{p.email}</p>
                    <button
                      onClick={() => setDetailPatientId(p.id)}
                      className="text-sky-600 hover:underline"
                    >
                      Ver historial
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Modales */}
      <Modal isOpen={detailDoctorId !== null} onClose={() => setDetailDoctorId(null)}>
        {detailDoctorId && <DoctorDetail doctorId={detailDoctorId} />}
      </Modal>

      <Modal isOpen={editDoctorId !== null} onClose={() => setEditDoctorId(null)}>
        {editDoctorId && (
          <FormDoctor
            doctor={doctores.find((d) => d.id === editDoctorId)}
            onFinish={() => setEditDoctorId(null)}
          />
        )}
      </Modal>

      <Modal isOpen={detailPatientId !== null} onClose={() => setDetailPatientId(null)}>
        {detailPatientId && <PatientDetail pacienteId={detailPatientId} />}
      </Modal>
    </>
  )
}

/**
 * Componente Modal reutilizable.
 * Muestra el contenido en una superposición centrada con un fondo oscuro.
 */
