import { Link } from 'react-router-dom';
import { useM8Store } from '../store/useM8Store';
import { useState, useMemo } from 'react';
import type { Surgery } from '../store/useM8Store';
import { meses, ultimosAnios } from '../lib/date';

type Props = {
  doctorId: string;
};
export default function DoctorDetail({ doctorId }: Props) {
  // Obtenemos las referencias originales de doctores y cirugías
  const doctores = useM8Store((state) => state.doctores);
  const cirugias = useM8Store((state) => state.cirugias);
  const doctor = doctores.find((d) => d.id === doctorId);

  // Mapeamos IDs de doctores a nombres usando useMemo
  const doctorNames = useMemo(() => {
    const map: Record<string, string> = {};
    doctores.forEach((d) => {
      map[d.id] = `${d.nombre} ${d.apellido}`;
    });
    return map;
  }, [doctores]);

  // Estados para filtrar por mes y año
  const ahora = new Date();
  const [mesFiltro, setMesFiltro] = useState<number>(ahora.getMonth() + 1);
  const [anioFiltro, setAnioFiltro] = useState<number>(ahora.getFullYear());

  // Calcula el monto asignado a este médico para cada cirugía usando valorBase
  const obtenerMonto = (c: Surgery) => {
    const partes = 1 + c.ayudantes.length;
    return c.valorBase / partes;
  };

  const anios = useMemo(() => ultimosAnios(), []);

  if (!doctor) {
    return (
      <div className="p-6">
        <p>Médico no encontrado.</p>
      </div>
    );
  }

  // Filtramos las cirugías del médico según mes y año seleccionados
  const cirugiasDelMedico = cirugias.filter((c) => {
    if (c.doctorId !== doctor.id) return false;
    const fecha = new Date(`${c.fecha}T${c.hora}`);
    return (
      fecha.getMonth() + 1 === mesFiltro && fecha.getFullYear() === anioFiltro
    );
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">
        {doctor.nombre} {doctor.apellido}
      </h1>
      <p className="mb-2 text-sm text-slate-600">Email: {doctor.email}</p>
      <p className="mb-2 text-sm text-slate-600">
        Especialidad: {doctor.especialidad}
      </p>
      <p className="mb-4 text-sm text-slate-600">
        Sueldo actual: ${doctor.sueldo.toFixed(2)}
      </p>

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

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Hora</th>
              <th className="px-4 py-2">Paciente</th>
              <th className="px-4 py-2">Diagnóstico</th>
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">Complejidad</th>
              <th className="px-4 py-2">Ayudantes</th>
              <th className="px-4 py-2">Monto</th>
              <th className="px-4 py-2">Imagen</th>
            </tr>
          </thead>
          <tbody>
            {cirugiasDelMedico.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-8 text-center text-slate-500"
                >
                  No hay cirugías registradas en este periodo
                </td>
              </tr>
            ) : (
              cirugiasDelMedico.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{c.fecha}</td>
                  <td className="px-4 py-2">{c.hora}</td>
                  <td className="px-4 py-2">
                    {c.paciente.nombre} ({c.paciente.dni})
                  </td>
                  <td className="px-4 py-2">{c.diagnostico}</td>
                  <td className="px-4 py-2">{c.tipo}</td>
                  <td className="px-4 py-2 text-center">{c.complejidad}</td>
                  <td className="px-4 py-2">
                    {c.ayudantes
                      .map((aid) => doctorNames[aid] ?? aid)
                      .join(', ')}
                  </td>
                  <td className="px-4 py-2">${obtenerMonto(c).toFixed(2)}</td>
                  <td className="px-4 py-2">
                    {c.imagen ? (
                      <img
                        src={c.imagen}
                        alt="Parte quirúrgico"
                        className="h-8"
                      />
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Link
        to={`/cirugias/nueva?doctor=${doctor.id}`}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4 inline-block"
      >
        Cargar nueva cirugía
      </Link>
    </div>
  );
}
