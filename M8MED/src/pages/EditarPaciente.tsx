import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import FormPaciente from '../components/FormPaciente'
import { usePacienteStore } from '../store/usePacienteStore'

export default function EditarPaciente() {
  const navigate = useNavigate()
  const { id } = useParams()
  const paciente = usePacienteStore((s) => s.pacientes.find((p) => p.id === id))
  const eliminarPaciente = usePacienteStore((s) => s.eliminarPaciente)

  const handleFinish = () => {
    navigate('/pacientes')
  }

  if (!paciente) {
    return (
      <>
        <Navbar />
        <div className="p-6 pt-20">
          <p>Paciente no encontrado.</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 pt-20">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Editar Paciente</h1>
          <button
            onClick={() => navigate('/pacientes')}
            className="text-blue-600 hover:underline"
          >
            ← Volver
          </button>
        </div>
        <FormPaciente paciente={paciente} onFinish={handleFinish} />
        <button
          onClick={() => {
            eliminarPaciente(paciente.id)
            navigate('/pacientes')
          }}
          className="text-red-600 hover:underline mt-4"
        >
          Eliminar paciente
        </button>
      </div>
    </>
  )
}

