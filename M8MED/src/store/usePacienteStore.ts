import { create } from 'zustand'
import type { Paciente } from '../types/paciente'

type State = {
  pacientes: Paciente[]
  setPacientes: (data: Paciente[]) => void
  agregarPaciente: (nuevo: Paciente) => void
}

export const usePacienteStore = create<State>((set) => ({
  pacientes: [],
  setPacientes: (data) => set({ pacientes: data }),
  agregarPaciente: (nuevo) =>
    set((state) => ({ pacientes: [...state.pacientes, nuevo] })),
}))
