import { useM8Store } from '../store/useM8Store'
import { useState, useMemo } from 'react'

export default function Summary() {
  // Obtenemos doctores y cirugías desde la store
  const doctores = useM8Store((state) => state.doctores)
  const cirugias = useM8Store((state) => state.cirugias)

  // Estado para filtrar por mes y año
  const ahora = new Date()
  const [mesFiltro, setMesFiltro] = useState<number>(ahora.getMonth() + 1)
  const [anioFiltro, setAnioFiltro] = useState<number>(ahora.getFullYear())

  const meses = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' },
  ]

  const anios = useMemo(() => {
    const actual = new Date().getFullYear()
    return [actual, actual - 1, actual - 2, actual - 3, actual - 4]
  }, [])

  // Filtramos todas las cirugías según mes y año seleccionados
  const cirugiasFiltradas = useMemo(() => {
    return cirugias.filter((c) => {
      const fecha = new Date(`${c.fecha}T${c.hora}`)
      return (
        fecha.getMonth() + 1 === mesFiltro &&
        fecha.getFullYear() === anioFiltro
      )
    })
  }, [cirugias, mesFiltro, anioFiltro])

  // Contador global de cirugías en el mes seleccionado
  const totalCirugias = cirugiasFiltradas.length

  // Calculamos el resumen por médico (participa como cirujano principal o ayudante)
  const resumen = useMemo(() => {
    return doctores.map((doc) => {
      const cirugiasDoc = cirugiasFiltradas.filter(
        (c) => c.doctorId === doc.id || c.ayudantes.includes(doc.id)
      )
      const total = cirugiasDoc.reduce((sum, c) => {
        const partes = 1 + c.ayudantes.length
        return sum + c.valorBase / partes
      }, 0)
      return {
        doctor: doc,
        count: cirugiasDoc.length,
        total,
      }
    })
  }, [doctores, cirugiasFiltradas])

  // Exportar a CSV
  const exportCSV = () => {
    let csv = 'Nombre,Email,Especialidad,Cirugías,Total\n'
    resumen.forEach((fila) => {
      csv += `"${fila.doctor.nombre}","${fila.doctor.email}","${fila.doctor.especialidad}",${fila.count},${fila.total}\n`
    })
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute(
      'download',
      `resumen_${mesFiltro}_${anioFiltro}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Resumen mensual de cirugías
      </h1>

      {/* Selectores de mes y año */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="mr-2 font-medium">Mes:</label>
          <select
            value={mesFiltro}
            onChange={(e) => setMesFiltro(parseInt(e.target.value))}
            className="input"
          >
            {meses.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-medium">Año:</label>
          <select
            value={anioFiltro}
            onChange={(e) => setAnioFiltro(parseInt(e.target.value))}
            className="input"
          >
            {anios.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Total de cirugías del mes */}
      <p className="mb-4 font-medium">
        Total de cirugías en el mes: {totalCirugias}
      </p>

      {/* Tabla resumen */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="px-4 py-2">Médico</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Especialidad</th>
              <th className="px-4 py-2">Participaciones</th>
              <th className="px-4 py-2">Total a pagar</th>
            </tr>
          </thead>
          <tbody>
            {resumen.map((fila) => (
              <tr key={fila.doctor.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{fila.doctor.nombre}</td>
                <td className="px-4 py-2">{fila.doctor.email}</td>
                <td className="px-4 py-2">{fila.doctor.especialidad}</td>
                <td className="px-4 py-2 text-center">{fila.count}</td>
                <td className="px-4 py-2">
                  ${fila.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={exportCSV}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
      >
        Exportar CSV
      </button>
    </div>
  )
}
