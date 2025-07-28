import { useM8Store, type Surgery } from '../store/useM8Store';
import { useState, useMemo } from 'react';
import FormSurgery from '../components/FormSurgery';
import Modal from '../components/Modal';
import { meses, ultimosAnios } from '../lib/date';

export default function GeneralSummary() {
  // Datos de la store
  const doctores = useM8Store((state) => state.doctores);
  const cirugias = useM8Store((state) => state.cirugias);
  const eliminarCirugia = useM8Store((s) => s.eliminarCirugia);

  const [showForm, setShowForm] = useState(false);
  const [editSurgery, setEditSurgery] = useState<Surgery | null>(null);

  // Filtros de mes, año y médico
  const ahora = new Date();
  const [mesFiltro, setMesFiltro] = useState<number>(ahora.getMonth() + 1);
  const [anioFiltro, setAnioFiltro] = useState<number>(ahora.getFullYear());
  const [medicoFiltro, setMedicoFiltro] = useState<string>(''); // '' significa todos

  // Mapeo de IDs a nombres de médicos
  const doctorNames = useMemo(() => {
    const map: Record<string, string> = {};
    doctores.forEach((d) => {
      map[d.id] = `${d.nombre} ${d.apellido}`;
    });
    return map;
  }, [doctores]);

  // Filtrar cirugías por mes, año y (opcional) médico participante
  const cirugiasFiltradas = useMemo(() => {
    return cirugias.filter((c) => {
      const fecha = new Date(`${c.fecha}T${c.hora}`);
      const coincideFecha =
        fecha.getMonth() + 1 === mesFiltro &&
        fecha.getFullYear() === anioFiltro;
      const coincideMedico =
        !medicoFiltro ||
        c.doctorId === medicoFiltro ||
        c.ayudantes.includes(medicoFiltro);
      return coincideFecha && coincideMedico;
    });
  }, [cirugias, mesFiltro, anioFiltro, medicoFiltro]);

  const anios = useMemo(() => ultimosAnios(), []);

  // Exportar a CSV detallado
  const exportCSV = () => {
    let csv =
      'Fecha,Hora,Paciente,Diagnóstico,Tratamiento,Complejidad,Nivel valor,Valor base,Participantes,Monto por participante\n';
    cirugiasFiltradas.forEach((c) => {
      const participantes = [c.doctorId, ...c.ayudantes]
        .map((id) => doctorNames[id] ?? id)
        .join(' / ');
      const partes = 1 + c.ayudantes.length;
      const pago = c.valorBase / partes;
      csv += `"${c.fecha}","${c.hora}","${c.paciente.nombre} (${c.paciente.dni})","${c.diagnostico}","${c.tipo}",${c.complejidad},${c.valorBase},"${participantes}",${pago}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `resumen_detalle_${mesFiltro}_${anioFiltro}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resumen general de cirugías</h1>

      {/* Filtros de mes, año y médico */}
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
        <div>
          <label className="mr-2 font-medium">Médico:</label>
          <select
            value={medicoFiltro}
            onChange={(e) => setMedicoFiltro(e.target.value)}
            className="input"
          >
            <option value="">Todos</option>
            {doctores.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.nombre} {doc.apellido}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={() => {
            setEditSurgery(null);
            setShowForm(true);
          }}
          className="btn"
        >
          Nueva cirugía
        </button>
      </div>

      {/* Tabla detallada */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Hora</th>
              <th className="px-4 py-2">Paciente</th>
              <th className="px-4 py-2">Diagnóstico</th>
              <th className="px-4 py-2">Tratamiento</th>
              <th className="px-4 py-2">Nivel</th>
              <th className="px-4 py-2">Valor base</th>
              <th className="px-4 py-2">Participantes</th>
              <th className="px-4 py-2">Pago por participante</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cirugiasFiltradas.map((c) => {
              const participantes = [c.doctorId, ...c.ayudantes]
                .map((id) => doctorNames[id] ?? id)
                .join(' / ');
              const partes = 1 + c.ayudantes.length;
              const pago = c.valorBase / partes;
              return (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{c.fecha}</td>
                  <td className="px-4 py-2">{c.hora}</td>
                  <td className="px-4 py-2">
                    {c.paciente.nombre} ({c.paciente.dni})
                  </td>
                  <td className="px-4 py-2">{c.diagnostico}</td>
                  <td className="px-4 py-2">{c.tipo}</td>
                  <td className="px-4 py-2 text-center">{c.complejidad}</td>
                  <td className="px-4 py-2">${c.valorBase.toFixed(2)}</td>
                  <td className="px-4 py-2">{participantes}</td>
                  <td className="px-4 py-2">${pago.toFixed(2)}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => {
                        setEditSurgery(c);
                        setShowForm(true);
                      }}
                      className="text-sky-600 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarCirugia(c.id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        onClick={exportCSV}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
      >
        Exportar CSV
      </button>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <FormSurgery
          surgery={editSurgery ?? undefined}
          onFinish={() => {
            setShowForm(false);
            setEditSurgery(null);
          }}
        />
      </Modal>
    </div>
  );
}
