import { useNavigate, useSearchParams } from 'react-router-dom'
import { useM8Store } from '../store/useM8Store'
import { useState } from 'react'

export default function NewSurgery() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const defaultDoctor = searchParams.get('doctor') ?? ''

  const doctores = useM8Store((state) => state.doctores)
  const agregarCirugia = useM8Store((state) => state.agregarCirugia)

  const [pacienteNombre, setPacienteNombre] = useState('')
  const [pacienteDni, setPacienteDni] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [diagnostico, setDiagnostico] = useState('')
  const [tipo, setTipo] = useState('')
  const [complejidad, setComplejidad] = useState<number>(1)
  const [cirujanoId, setCirujanoId] = useState<string>(defaultDoctor)
  const [ayudantes, setAyudantes] = useState<string[]>([])
  const [imagen, setImagen] = useState<string | undefined>(undefined)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagen(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!cirujanoId) {
      alert('Selecciona un cirujano responsable')
      return
    }
    agregarCirugia({
      doctorId: cirujanoId,
      fecha,
      hora,
      paciente: { nombre: pacienteNombre, dni: pacienteDni },
      diagnostico,
      tipo,
      complejidad,
      ayudantes,
      imagen,
    })
    // redirigimos al detalle del médico
    navigate(`/medicos/${cirujanoId}`)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Registrar nueva cirugía</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Paciente (Nombre)</label>
            <input
              type="text"
              className="input w-full"
              value={pacienteNombre}
              onChange={(e) => setPacienteNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Paciente (DNI)</label>
            <input
              type="text"
              className="input w-full"
              value={pacienteDni}
              onChange={(e) => setPacienteDni(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Fecha</label>
            <input
              type="date"
              className="input w-full"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Hora</label>
            <input
              type="time"
              className="input w-full"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Diagnóstico</label>
            <input
              type="text"
              className="input w-full"
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tipo de cirugía</label>
            <input
              type="text"
              className="input w-full"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nivel de complejidad (1–10)</label>
            <select
              className="input w-full"
              value={complejidad}
              onChange={(e) => setComplejidad(parseInt(e.target.value))}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Cirujano responsable</label>
            <select
              className="input w-full"
              value={cirujanoId}
              onChange={(e) => setCirujanoId(e.target.value)}
              required
            >
              <option value="">Seleccionar cirujano</option>
              {doctores.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Ayudantes (multiselección)</label>
            <select
              multiple
              className="input w-full"
              value={ayudantes}
              onChange={(e) => {
                const options = Array.from(e.target.selectedOptions).map((o) => o.value)
                setAyudantes(options)
              }}
            >
              {doctores
                .filter((d) => d.id !== cirujanoId)
                .map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.nombre}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Imagen del parte quirúrgico (opcional)</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
          Guardar cirugía
        </button>
      </form>
    </div>
  )
}
