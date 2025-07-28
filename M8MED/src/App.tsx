import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import DashboardAdmin from './pages/DashboardAdmin'
import DashboardMedico from './pages/DashboardMedico'
import Pacientes from './pages/Pacientes'
import AgregarPaciente from './pages/AgregarPaciente'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/dashboard-medico" element={<DashboardMedico />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/agregar-paciente" element={<AgregarPaciente />} />
      </Routes>
    </BrowserRouter>
  )
}
