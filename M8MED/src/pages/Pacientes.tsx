import { usePacienteStore } from '../store/usePacienteStore'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import { Paciente } from '../types/paciente'
import { v4 as uuidv4 } from 'uuid'
import FormPaciente from '../components/FormPaciente'

export default function Pacientes() {
  const pacientes = usePacienteStore((state) => state.pacientes)
  const setPacientes = usePacienteStore((state) => state.setPacientes)
  const agregarPaciente = usePacienteStore((state) => state.agregarPaciente)

  // Precarga de pacientes de prueba (solo si está vacío)
  useEffect(() => {
    if (pacientes.length === 0) {
      setPacientes([
        {
          id: uuidv4(),
          nombre: 'Juan Pérez',
          dni: '12345678',
          telefono: '11-1234-5678',
          genero: 'masculino',
          email: 'juan@example.com',
          diagnostico: 'Hernia',
          antecedentes: 'Diabetes',
          fechaNacimiento: '1985-04-15',
          tratamiento: 'Cirugía laparoscópica'
        }
      ])
    }
  }, [])

  const handleAgregar = () => {
    const nuevo: Paciente = {
      id: uuidv4(),
      nombre: 'Paciente Nuevo',
      dni: '87654321',
      telefono: '11-9999-0000',
      genero: 'femenino',
      email: 'nueva@example.com',
      diagnostico: 'Apendicitis',
      antecedentes: '',
      fechaNacimiento: '1990-07-10',
      tratamiento: 'Cirugía'
    }
    agregarPaciente(nuevo)
  }

  return (
    <>
      <Navbar />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Lista de Pacientes</h1>
          <button
            onClick={handleAgregar}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Agregar Paciente
          </button>
        </div>
<FormPaciente />

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">DNI</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Género</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{paciente.nombre}</td>
                  <td className="px-4 py-2">{paciente.dni}</td>
                  <td className="px-4 py-2">{paciente.telefono}</td>
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
