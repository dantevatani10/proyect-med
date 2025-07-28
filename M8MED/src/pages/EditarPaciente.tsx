import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FormPaciente from '../components/FormPaciente';
import { usePacienteStore } from '../store/usePacienteStore';

export default function EditarPaciente() {
  const navigate = useNavigate();
  const { id } = useParams();
  const paciente = usePacienteStore((s) =>
    s.pacientes.find((p) => p.id === id),
  );
  const eliminarPaciente = usePacienteStore((s) => s.eliminarPaciente);

  const handleFinish = () => {
    navigate('/pacientes');
  };

  if (!paciente) {
    return (
      <>
        <Navbar />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Editar Paciente
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8">
            <p>Paciente no encontrado.</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Editar Paciente
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
          <FormPaciente paciente={paciente} onFinish={handleFinish} />
          <button
            onClick={() => {
              eliminarPaciente(paciente.id);
              navigate('/pacientes');
            }}
            className="text-red-600 hover:underline mt-4"
          >
            Eliminar paciente
          </button>
        </div>
      </main>
    </>
  );
}
