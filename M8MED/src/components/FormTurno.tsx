import { useState } from 'react';
import { useTurnoStore, type Turno } from '../store/useTurnoStore';
import { useM8Store } from '../store/useM8Store';
import { usePacienteStore } from '../store/usePacienteStore';

type Props = {
  onFinish: () => void;
  turno?: Turno;
  doctorIdFixed?: string;
};

export default function FormTurno({ onFinish, turno, doctorIdFixed }: Props) {
  const agregarTurno = useTurnoStore((s) => s.agregarTurno);
  const editarTurno = useTurnoStore((s) => s.editarTurno);
  const doctores = useM8Store((s) => s.doctores);
  const pacientesAll = usePacienteStore((s) => s.pacientes);

  const [form, setForm] = useState<Omit<Turno, 'id'>>({
    doctorId: doctorIdFixed ?? turno?.doctorId ?? doctores[0]?.id ?? '',
    pacienteId: turno?.pacienteId ?? '',
    fecha: turno?.fecha ?? '',
    hora: turno?.hora ?? '',
    tipo: turno?.tipo ?? 'consultorio',
    descripcion: turno?.descripcion ?? '',
  });

  const pacientes = doctorIdFixed
    ? pacientesAll.filter(
        (p) => p.doctorId === (doctorIdFixed ?? turno?.doctorId),
      )
    : pacientesAll;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (turno) {
      editarTurno(turno.id, form);
    } else {
      agregarTurno(form);
    }
    onFinish();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {doctorIdFixed ? null : (
        <select
          name="doctorId"
          value={form.doctorId}
          onChange={handleChange}
          className="input w-full"
        >
          {doctores.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nombre} {d.apellido}
            </option>
          ))}
        </select>
      )}
      <select
        name="pacienteId"
        value={form.pacienteId}
        onChange={handleChange}
        className="input w-full"
        required
      >
        <option value="" disabled>
          Seleccione paciente
        </option>
        {pacientes.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nombre} {p.apellido}
          </option>
        ))}
      </select>
      <input
        type="date"
        name="fecha"
        value={form.fecha}
        onChange={handleChange}
        className="input w-full"
        required
      />
      <input
        type="time"
        name="hora"
        value={form.hora}
        onChange={handleChange}
        className="input w-full"
        required
      />
      <select
        name="tipo"
        value={form.tipo}
        onChange={handleChange}
        className="input w-full"
        required
      >
        <option value="consultorio">Consultorio</option>
        <option value="quirurgico">Quirúrgico</option>
      </select>
      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        className="input w-full"
        placeholder="Descripción breve"
      />
      <button type="submit" className="btn w-full">
        Guardar turno
      </button>
    </form>
  );
}
