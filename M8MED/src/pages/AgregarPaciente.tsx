import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import FormPaciente from '../components/FormPaciente' // <-- REUTILIZA EL COMPONENTE

export default function AgregarPaciente() {
  const navigate = useNavigate()

  const handlePacienteGuardado = () => {
    navigate('/pacientes') // Navega a la lista de pacientes
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Agregar Paciente</h1>
            <button onClick={() => navigate('/pacientes')} className="text-blue-600 hover:underline">
                ← Volver
            </button>
        </div>
        <FormPaciente onFinish={handlePacienteGuardado} />
      </div>
    </>
  )
}
