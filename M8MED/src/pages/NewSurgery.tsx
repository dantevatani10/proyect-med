import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import FormSurgery from '../components/FormSurgery'

export default function NewSurgery() {
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Registrar nueva cirugía</h1>
        <FormSurgery onFinish={() => navigate('/dashboard-admin')} />
      </div>
    </>
  )
}
