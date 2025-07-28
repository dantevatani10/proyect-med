import { usePacienteStore } from '../store/usePacienteStore'
import { useState } from 'react'

type Props = {
  pacienteId: string
}

export default function PatientDetail({ pacienteId }: Props) {
  const paciente = usePacienteStore((s) =>
    s.pacientes.find((p) => p.id === pacienteId)
  )
  const [receta, setReceta] = useState('')
  const [recordatorio, setRecordatorio] = useState('')

  if (!paciente) {
    return (
      <div className="p-6">
        <p>Paciente no encontrado.</p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {paciente.nombre} {paciente.apellido}
      </h2>
      <p className="text-sm text-slate-600 mb-1">DNI: {paciente.dni}</p>
      <p className="text-sm text-slate-600 mb-1">
        Teléfono: {paciente.telefono}
      </p>
      <p className="text-sm text-slate-600 mb-4">Email: {paciente.email}</p>
      <p className="text-sm text-slate-600 mb-2">
        Diagnóstico: {paciente.diagnostico}
      </p>
      <p className="text-sm text-slate-600 mb-4">
        Tratamiento: {paciente.tratamiento}
      </p>
      {paciente.antecedentes && (
        <p className="text-sm text-slate-600 mb-4">
          Antecedentes: {paciente.antecedentes}
        </p>
      )}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Receta</label>
          <textarea
            value={receta}
            onChange={(e) => setReceta(e.target.value)}
            className="input h-24"
          />
          <button
            onClick={() => {
              alert('Receta enviada')
              setReceta('')
            }}
            className="btn mt-2"
          >
            Enviar receta
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Recordatorio</label>
          <textarea
            value={recordatorio}
            onChange={(e) => setRecordatorio(e.target.value)}
            className="input h-24"
          />
          <button
            onClick={() => {
              alert('Recordatorio enviado')
              setRecordatorio('')
            }}
            className="btn mt-2"
          >
            Enviar recordatorio
          </button>
        </div>
      </div>
    </div>
  )
}
