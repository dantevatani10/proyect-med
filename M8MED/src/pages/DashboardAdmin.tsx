import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function DashboardAdmin() {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Panel de Admin</h1>
        <ul className="space-y-2">
          <li>
            <Link to="/pacientes" className="text-blue-600 underline">
              Ver pacientes
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
