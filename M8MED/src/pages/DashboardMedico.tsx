import Navbar from '../components/Navbar'

export default function DashboardMedico() {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Panel Médico</h1>
        <p>Mis pacientes, turnos y recetas</p>
      </div>
    </>
  )
}
