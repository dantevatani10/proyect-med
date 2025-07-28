import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

export type Turno = {
  id: string
  doctorId: string
  pacienteId: string
  fecha: string
  hora: string
}

interface TurnoState {
  turnos: Turno[]
  agregarTurno: (t: Omit<Turno, 'id'>) => void
  eliminarTurno: (id: string) => void
}

export const useTurnoStore = create<TurnoState>((set) => ({
  turnos: [
    {
      id: 't1',
      doctorId: 'doc1',
      pacienteId: 'pac1',
      fecha: '2025-08-01',
      hora: '10:00',
    },
  ],
  agregarTurno: (t) =>
    set((state) => ({ turnos: [...state.turnos, { ...t, id: uuidv4() }] })),
  eliminarTurno: (id) =>
    set((state) => ({ turnos: state.turnos.filter((tu) => tu.id !== id) })),
}))
