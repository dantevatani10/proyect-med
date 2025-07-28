import { useMemo } from 'react'
import { usePacienteStore } from '../store/usePacienteStore'
import { useM8Store } from '../store/useM8Store'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

export default function Pacientes() {
  const pacientes = usePacienteStore((state) => state.pacientes)
  const eliminarPaciente = usePacienteStore((s) => s.eliminarPaciente)
  const doctores = useM8Store((s) => s.doctores)

  const doctorMap = useMemo(() => {
    const map: Record<string, string> = {}
    doctores.forEach((d) => {
      map[d.id] = `${d.nombre} ${d.apellido}`
    })
    return map
  }, [doctores])

  return (
    <>
      <Navbar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Pacientes</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-end mb-4">
            <Link to="/agregar-paciente" className="btn">+ Agregar Paciente</Link>
          </div>

        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Apellido</th>
                <th className="px-4 py-2">DNI</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Género</th>
                <th className="px-4 py-2">Médico</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{paciente.nombre}</td>
                  <td className="px-4 py-2">{paciente.apellido}</td>
                  <td className="px-4 py-2">{paciente.dni}</td>
                  <td className="px-4 py-2">{paciente.telefono}</td>
                  <td className="px-4 py-2">{paciente.email}</td>
                  <td className="px-4 py-2 capitalize">{paciente.genero}</td>
                  <td className="px-4 py-2">{doctorMap[paciente.doctorId]}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link
                      to={`/pacientes/editar/${paciente.id}`}
                      className="text-sky-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => eliminarPaciente(paciente.id)}
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
        </div>
      </main>
    </>
  )
}

