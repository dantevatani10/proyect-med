import { create } from 'zustand'
import type { Paciente } from '../types/paciente'

type State = {
  pacientes: Paciente[]
  setPacientes: (data: Paciente[]) => void
  agregarPaciente: (nuevo: Paciente) => void
}

export const usePacienteStore = create<State>((set) => ({
  pacientes: [
    {
      id: 'pac1',
      nombre: 'Carlos',
      apellido: 'López',
      dni: '12345678',
      telefono: '555111222',
      genero: 'masculino',
      email: 'carlos.lopez@example.com',
      diagnostico: 'Hipertensión',
      antecedentes: '',
      fechaNacimiento: '1980-05-10',
      tratamiento: 'Control mensual',
    },
    {
      id: 'pac2',
      nombre: 'María',
      apellido: 'Fernández',
      dni: '23456789',
      telefono: '555333444',
      genero: 'femenino',
      email: 'maria.fernandez@example.com',
      diagnostico: 'Diabetes',
      antecedentes: 'Familiar diabético',
      fechaNacimiento: '1975-10-20',
      tratamiento: 'Insulina',
    },
  ],
  setPacientes: (data) => set({ pacientes: data }),
  agregarPaciente: (nuevo) =>
    set((state) => ({ pacientes: [...state.pacientes, nuevo] })),
}))