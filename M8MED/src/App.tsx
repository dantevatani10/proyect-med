import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import DashboardAdmin from './pages/DashboardAdmin'
import DashboardMedico from './pages/DashboardMedico'
import Pacientes from './pages/Pacientes'
import AgregarPaciente from './pages/AgregarPaciente'
import EditarPaciente from './pages/EditarPaciente'
import NewSurgery from './pages/NewSurgery'
import EditComplexity from './pages/EditComplexity'
import Summary from './pages/Summary'
import GeneralSummary from './pages/GeneralSummary'
import AgregarDoctor from './pages/AgregarDoctor'
import PerfilUsuario from './pages/PerfilUsuario'
import ProtectedRoute from './routes/ProtectedRoute'
import Turnos from './pages/Turnos'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

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
          path="/agregar-medico"
          element={
            <ProtectedRoute rolPermitido="admin">
              <AgregarDoctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/turnos"
          element={
            <ProtectedRoute rolPermitido="admin">
              <Turnos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pacientes/editar/:id"
          element={
            <ProtectedRoute rolPermitido="admin">
              <EditarPaciente />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cirugias/nueva"
          element={
            <ProtectedRoute rolPermitido="admin">
              <NewSurgery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complejidad"
          element={
            <ProtectedRoute rolPermitido="admin">
              <EditComplexity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resumen"
          element={
            <ProtectedRoute rolPermitido="admin">
              <Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resumen/detalle"
          element={
            <ProtectedRoute rolPermitido="admin">
              <GeneralSummary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute rolPermitido={["admin", "medico"]}>
              <PerfilUsuario />
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
