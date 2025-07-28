import { useState, useMemo } from 'react'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import Calendar from '../components/Calendar'
import { useM8Store } from '../store/useM8Store'
import { useUserStore } from '../store/useUserStore'
import { usePacienteStore } from '../store/usePacienteStore'
import { useTurnoStore } from '../store/useTurnoStore'
import FormPaciente from '../components/FormPaciente'
import FormTurno from '../components/FormTurno'
import PatientDetail from './PatientDetail'

export default function DashboardMedico() {
  const user = useUserStore((s) => s.user)
  const doctores = useM8Store((s) => s.doctores)
  const cirugias = useM8Store((s) => s.cirugias)
  const pacientesAll = usePacienteStore((s) => s.pacientes)
  const turnosAll = useTurnoStore((s) => s.turnos)
  const eliminarTurno = useTurnoStore((s) => s.eliminarTurno)

  // Buscar el médico según el id del usuario. Si no existe, usar el primero.
  const doctor = useMemo(() => {
    if (!user) return doctores[0]
    return doctores.find((d) => d.id === user.id) ?? doctores[0]
  }, [user, doctores])

  // Cirugías donde participa el médico
  const cirugiasDoctor = useMemo(
    () =>
      cirugias.filter(
        (c) => c.doctorId === doctor.id || c.ayudantes.includes(doctor.id)
      ),
    [cirugias, doctor.id]
  )

  // Pacientes asociados al médico
  const pacientes = useMemo(
    () => pacientesAll.filter((p) => p.doctorId === doctor.id),
    [pacientesAll, doctor.id]
  )

  const pacienteMap = useMemo(() => {
    const map: Record<string, string> = {}
    pacientes.forEach((p) => {
      map[p.id] = `${p.nombre} ${p.apellido}`
    })
    return map
  }, [pacientes])

  const turnosDoctor = useMemo(
    () => turnosAll.filter((t) => t.doctorId === doctor.id),
    [turnosAll, doctor.id]
  )

  const [showPopup, setShowPopup] = useState(false)
  const [addPatient, setAddPatient] = useState(false)
  const [detailPatientId, setDetailPatientId] = useState<string | null>(null)
  const [addTurno, setAddTurno] = useState(false)
  const [editTurnoId, setEditTurnoId] = useState<string | null>(null)

  const eventos = useMemo(
    () => [
      ...cirugiasDoctor.map((c) => ({ date: c.fecha })),
      ...turnosDoctor.map((t) => ({ date: t.fecha })),
    ],
    [cirugiasDoctor, turnosDoctor]
  )

  const obtenerMonto = (c: (typeof cirugiasDoctor)[number]) => {
    const partes = 1 + c.ayudantes.length
    return c.valorBase / partes
  }

  return (
    <>
      <Navbar />
      <div className="pt-20 max-w-4xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-semibold">
          Bienvenido, {doctor.nombre}
        </h1>

        <div>
          <div
            className="card cursor-pointer"
            onClick={() => setShowPopup(true)}
          >
            <h2 className="text-lg font-medium mb-1">Ingresos actuales</h2>
            <p className="text-2xl font-bold">
              ${doctor.sueldo.toFixed(2)}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Calendario</h2>
          <Calendar events={eventos} />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Mis turnos</h2>
            <button className="btn" onClick={() => setAddTurno(true)}>+ Agendar turno</button>
          </div>
          {turnosDoctor.length === 0 ? (
            <p className="text-slate-600">No hay turnos registrados.</p>
          ) : (
            <ul className="space-y-2">
              {turnosDoctor.map((t) => (
                <li
                  key={t.id}
                  className="bg-white rounded shadow p-2 flex justify-between items-center"
                >
                  <span>
                    {t.fecha} {t.hora} - {pacienteMap[t.pacienteId]} ({t.tipo})
                    {t.descripcion ? ` - ${t.descripcion}` : ''}
                  </span>
                  <div className="space-x-4">
                    <button
                      onClick={() => setEditTurnoId(t.id)}
                      className="text-sky-600 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarTurno(t.id)}
                      className="text-red-600 hover:underline"
                    >
                      Cancelar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Mis pacientes</h2>
            <button className="btn" onClick={() => setAddPatient(true)}>+ Agregar</button>
          </div>
          {pacientes.length === 0 ? (
            <p className="text-slate-600">Aún no tiene pacientes.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pacientes.map((p) => (
                <div key={p.id} className="card hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {p.nombre} {p.apellido}
                  </h3>
                  <p className="text-sm text-slate-600">{p.telefono}</p>
                  <p className="text-sm text-slate-600 mb-2">{p.email}</p>
                  <button onClick={() => setDetailPatientId(p.id)} className="text-sky-600 hover:underline">
                    Ver historial
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={showPopup} onClose={() => setShowPopup(false)}>
        <h2 className="text-xl font-bold mb-4">Ingresos por cirugía</h2>
        {cirugiasDoctor.length === 0 ? (
          <p>No hay cirugías registradas.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 text-left">
                <tr>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Paciente</th>
                  <th className="px-4 py-2">Monto</th>
                </tr>
              </thead>
              <tbody>
                {cirugiasDoctor.map((c) => (
                  <tr key={c.id} className="border-b">
                    <td className="px-4 py-2">{c.fecha}</td>
                    <td className="px-4 py-2">
                      {c.paciente.nombre} ({c.paciente.dni})
                    </td>
                    <td className="px-4 py-2">
                      ${obtenerMonto(c).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>

      <Modal isOpen={addPatient} onClose={() => setAddPatient(false)}>
        <FormPaciente doctorIdFixed={doctor.id} onFinish={() => setAddPatient(false)} />
      </Modal>

      <Modal isOpen={detailPatientId !== null} onClose={() => setDetailPatientId(null)}>
        {detailPatientId && <PatientDetail pacienteId={detailPatientId} />}
      </Modal>

      <Modal isOpen={addTurno} onClose={() => setAddTurno(false)}>
        <FormTurno
          doctorIdFixed={doctor.id}
          onFinish={() => setAddTurno(false)}
        />
      </Modal>

      <Modal isOpen={editTurnoId !== null} onClose={() => setEditTurnoId(null)}>
        {editTurnoId && (
          <FormTurno
            turno={turnosDoctor.find((t) => t.id === editTurnoId)}
            doctorIdFixed={doctor.id}
            onFinish={() => setEditTurnoId(null)}
          />
        )}
      </Modal>
    </>
  )
}
