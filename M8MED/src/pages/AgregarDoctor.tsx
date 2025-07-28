import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import FormDoctor from '../components/FormDoctor'

export default function AgregarDoctor() {
  const navigate = useNavigate()

  const handleFinish = () => {
    navigate('/dashboard-admin')
  }

  return (
    <>
      <Navbar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Agregar Médico</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-end mb-4">
            <button onClick={() => navigate('/dashboard-admin')} className="text-blue-600 hover:underline">
              ← Volver
            </button>
          </div>
          <FormDoctor onFinish={handleFinish} />
        </div>
      </main>
    </>
  )
}

