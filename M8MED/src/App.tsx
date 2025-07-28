import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import DashboardAdmin from './pages/DashboardAdmin'
import DashboardMedico from './pages/DashboardMedico'
import ProtectedRoute from './routes/ProtectedRoute'
import Pacientes from './pages/Pacientes'
import AgregarPaciente from './pages/AgregarPaciente'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute rolPermitido="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medico"
          element={
            <ProtectedRoute rolPermitido="medico">
              <DashboardMedico />
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
  path="/pacientes/nuevo"
  element={
    <ProtectedRoute rolPermitido="admin">
      <AgregarPaciente />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
