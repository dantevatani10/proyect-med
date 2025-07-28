import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import DashboardAdmin from './pages/DashboardAdmin'
import DashboardMedico from './pages/DashboardMedico'
import Pacientes from './pages/Pacientes'
import AgregarPaciente from './pages/AgregarPaciente'
import ProtectedRoute from './routes/ProtectedRoute' // <-- IMPORTADO

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Pública */}
        <Route path="/" element={<Login />} />

        {/* Rutas de Admin */}
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

        {/* Rutas de Médico */}
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