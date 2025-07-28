import { useState } from 'react'
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

  const [addTurno, setAddTurno] = useState(false)
  const [editTurnoId, setEditTurnoId] = useState<string | null>(null)

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 pt-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Turnos</h1>
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
                {turnos.map((t) => {
                  const pac = pacientes.find((p) => p.id === t.pacienteId)
                  const doc = doctores.find((d) => d.id === t.doctorId)
                  return (
                    <tr key={t.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{t.fecha}</td>
                      <td className="px-4 py-2">{t.hora}</td>
                      <td className="px-4 py-2 capitalize">{t.tipo}</td>
                      <td className="px-4 py-2">
                        {pac?.nombre} {pac?.apellido}
                      </td>
                      <td className="px-4 py-2">
                        {doc?.nombre} {doc?.apellido}
                      </td>
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
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

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
