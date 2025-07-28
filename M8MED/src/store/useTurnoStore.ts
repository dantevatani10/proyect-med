import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

export type Turno = {
  id: string
  doctorId: string
  pacienteId: string
  fecha: string
  hora: string
  tipo: 'quirurgico' | 'consultorio'
  descripcion: string
}

interface TurnoState {
  turnos: Turno[]
  agregarTurno: (t: Omit<Turno, 'id'>) => void
  editarTurno: (id: string, data: Omit<Turno, 'id'>) => void
  eliminarTurno: (id: string) => void
}

export const useTurnoStore = create<TurnoState>()(
  persist(
    (set) => ({
      turnos: [
        {
          id: 't1',
          doctorId: 'doc1',
          pacienteId: 'pac1',
          fecha: '2025-08-01',
          hora: '10:00',
          tipo: 'consultorio',
          descripcion: 'Control de rutina',
        },
      ],
      agregarTurno: (t) =>
        set((state) => ({ turnos: [...state.turnos, { ...t, id: uuidv4() }] })),
      editarTurno: (id, data) =>
        set((state) => ({
          turnos: state.turnos.map((tu) =>
            tu.id === id ? { ...tu, ...data } : tu
          ),
        })),
      eliminarTurno: (id) =>
        set((state) => ({ turnos: state.turnos.filter((tu) => tu.id !== id) })),
    }),
    { name: 'turno-store' }
  )
)
