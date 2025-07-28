import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FormPaciente from '../components/FormPaciente'; // <-- REUTILIZA EL COMPONENTE

export default function AgregarPaciente() {
  const navigate = useNavigate();

  const handlePacienteGuardado = () => {
    navigate('/pacientes'); // Navega a la lista de pacientes
  };

  return (
    <>
      <Navbar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Agregar Paciente
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => navigate('/pacientes')}
              className="text-blue-600 hover:underline"
            >
              ← Volver
            </button>
          </div>
          <FormPaciente onFinish={handlePacienteGuardado} />
        </div>
      </main>
    </>
  );
}
