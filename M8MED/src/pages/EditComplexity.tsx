import { useM8Store } from '../store/useM8Store';
import { useState } from 'react';

export default function EditComplexity() {
  // Obtenemos los valores de complejidad actuales
  const complejidadValores = useM8Store((state) => state.complejidadValores);
  const editarComplejidad = useM8Store((state) => state.editarComplejidad);

  // Convertimos a array para renderizar y mantener valores locales hasta guardar
  const [valoresLocales, setValoresLocales] = useState(() => {
    const obj: { [nivel: number]: number } = {};
    for (let i = 1; i <= 10; i++) {
      obj[i] = complejidadValores[i] ?? 0;
    }
    return obj;
  });

  const handleChange = (nivel: number, valor: number) => {
    setValoresLocales((prev) => ({ ...prev, [nivel]: valor }));
  };

  const handleSave = () => {
    Object.entries(valoresLocales).forEach(([nivelStr, valor]) => {
      const nivel = parseInt(nivelStr);
      editarComplejidad(nivel, Number(valor));
    });
    alert('Valores de complejidad actualizados');
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Gestión de niveles de complejidad
      </h1>
      <table className="min-w-full text-sm bg-white rounded shadow">
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th className="px-4 py-2">Nivel</th>
            <th className="px-4 py-2">Valor ($)</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((nivel) => (
            <tr key={nivel} className="border-b">
              <td className="px-4 py-2 font-medium">{nivel}</td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={valoresLocales[nivel]}
                  onChange={(e) => handleChange(nivel, Number(e.target.value))}
                  className="input w-full"
                  min={0}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4 w-full"
      >
        Guardar cambios
      </button>
    </div>
  );
}
