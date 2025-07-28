import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import DashboardAdmin from './pages/DashboardAdmin'
import DashboardMedico from './pages/DashboardMedico'
import Pacientes from './pages/Pacientes'
import AgregarPaciente from './pages/AgregarPaciente'
import DoctorDetail from './pages/DoctorDetail'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas para admin */}
        <Route
          path="/dashboard-admin"
          element={
            <ProtectedRoute rolPermitido="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pacientes"
          element={
            <ProtectedRoute rolPermitido="admin">
              <Pacientes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agregar-paciente"
          element={
            <ProtectedRoute rolPermitido="admin">
              <AgregarPaciente />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medicos/:id"
          element={
            <ProtectedRoute rolPermitido="admin">
              <DoctorDetail />
            </ProtectedRoute>
          }
        />

        {/* Ruta protegida para médicos */}
        <Route
          path="/dashboard-medico"
          element={
            <ProtectedRoute rolPermitido="medico">
              <DashboardMedico />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
