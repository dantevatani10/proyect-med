import { useState, useMemo } from 'react'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import Calendar from '../components/Calendar'
import { useM8Store } from '../store/useM8Store'
import { useUserStore } from '../store/useUserStore'
import { usePacienteStore } from '../store/usePacienteStore'

export default function DashboardMedico() {
  const user = useUserStore((s) => s.user)
  const doctores = useM8Store((s) => s.doctores)
  const cirugias = useM8Store((s) => s.cirugias)
  const pacientesAll = usePacienteStore((s) => s.pacientes)

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

  const [showPopup, setShowPopup] = useState(false)

  const eventos = useMemo(
    () =>
      cirugiasDoctor.map((c) => ({
        date: c.fecha,
      })),
    [cirugiasDoctor]
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
          <h2 className="text-xl font-semibold mb-2">Próximos turnos</h2>
          <Calendar events={eventos} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Mis pacientes</h2>
          {pacientes.length === 0 ? (
            <p className="text-slate-600">Aún no tiene pacientes.</p>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {pacientes.map((p, i) => (
                <li key={i}>
                  {p.nombre} {p.apellido}
                </li>
              ))}
            </ul>
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
    </>
  )
}
