import { usePacienteStore } from '../store/usePacienteStore'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

export default function Pacientes() {
  const pacientes = usePacienteStore((state) => state.pacientes)

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Pacientes</h1>
          <Link to="/agregar-paciente" className="btn bg-blue-600 text-white hover:bg-blue-700">
            + Agregar Paciente
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">DNI</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Género</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{paciente.nombre}</td>
                  <td className="px-4 py-2">{paciente.dni}</td>
                  <td className="px-4 py-2">{paciente.telefono}</td>
                  <td className="px-4 py-2">{paciente.email}</td>
                  <td className="px-4 py-2 capitalize">{paciente.genero}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
