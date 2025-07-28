import { useState, useMemo } from 'react'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import FormTurno from '../components/FormTurno'
import { useTurnoStore } from '../store/useTurnoStore'
import { usePacienteStore } from '../store/usePacienteStore'
import { useM8Store } from '../store/useM8Store'

export default function Turnos() {
  const turnos = useTurnoStore((s) => s.turnos)
  const eliminarTurno = useTurnoStore((s) => s.eliminarTurno)
  const pacientes = usePacienteStore((s) => s.pacientes)
  const doctores = useM8Store((s) => s.doctores)

  const pacienteMap = useMemo(() => {
    const map: Record<string, string> = {}
    pacientes.forEach((p) => {
      map[p.id] = `${p.nombre} ${p.apellido}`
    })
    return map
  }, [pacientes])

  const doctorMap = useMemo(() => {
    const map: Record<string, string> = {}
    doctores.forEach((d) => {
      map[d.id] = `${d.nombre} ${d.apellido}`
    })
    return map
  }, [doctores])

  const [addTurno, setAddTurno] = useState(false)
  const [editTurnoId, setEditTurnoId] = useState<string | null>(null)

  return (
    <>
      <Navbar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Turnos</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-end mb-4">
            <button className="btn" onClick={() => setAddTurno(true)}>
              + Agregar turno
            </button>
          </div>
        {turnos.length === 0 ? (
          <p>No hay turnos registrados.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 text-left">
                <tr>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Hora</th>
                  <th className="px-4 py-2">Tipo</th>
                  <th className="px-4 py-2">Paciente</th>
                  <th className="px-4 py-2">Médico</th>
                  <th className="px-4 py-2">Descripción</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
              {turnos.map((t) => (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{t.fecha}</td>
                  <td className="px-4 py-2">{t.hora}</td>
                  <td className="px-4 py-2 capitalize">{t.tipo}</td>
                  <td className="px-4 py-2">{pacienteMap[t.pacienteId]}</td>
                  <td className="px-4 py-2">{doctorMap[t.doctorId]}</td>
                  <td className="px-4 py-2">{t.descripcion}</td>
                  <td className="px-4 py-2 space-x-2">
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
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
        </div>
      </main>

      <Modal isOpen={addTurno} onClose={() => setAddTurno(false)}>
        <FormTurno onFinish={() => setAddTurno(false)} />
      </Modal>

      <Modal isOpen={editTurnoId !== null} onClose={() => setEditTurnoId(null)}>
        {editTurnoId && (
          <FormTurno
            turno={turnos.find((t) => t.id === editTurnoId)}
            onFinish={() => setEditTurnoId(null)}
          />
        )}
      </Modal>
    </>
  )
}
