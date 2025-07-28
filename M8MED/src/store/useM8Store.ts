import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

export type Doctor = {
  id: string
  nombre: string
  email: string
  especialidad: string
  sueldo: number
  activo: boolean
}

export type Surgery = {
  id: string
  doctorId: string
  fecha: string
  hora: string
  paciente: { nombre: string; dni: string }
  diagnostico: string
  tipo: string
  complejidad: number
  ayudantes: string[]    // IDs de los médicos ayudantes
  imagen?: string
}

export type ComplejidadValores = { [nivel: number]: number } // niveles 1–10

type M8Store = {
  doctores: Doctor[]
  cirugias: Surgery[]
  complejidadValores: ComplejidadValores
  agregarCirugia: (data: Omit<Surgery, 'id'>) => void
  editarComplejidad: (nivel: number, valor: number) => void
}

export const useM8Store = create<M8Store>((set, get) => ({
  // Lista inicial de médicos activos
  doctores: [
    {
      id: 'doc1',
      nombre: 'Dr. Juan Pérez',
      email: 'juan.perez@hospital.com',
      especialidad: 'Cardiología',
      sueldo: 0,
      activo: true,
    },
    {
      id: 'doc2',
      nombre: 'Dra. Ana Gómez',
      email: 'ana.gomez@hospital.com',
      especialidad: 'Traumatología',
      sueldo: 0,
      activo: true,
    },
  ],
  cirugias: [],
  // Valores base por nivel de complejidad
  complejidadValores: {
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
    6: 600,
    7: 700,
    8: 800,
    9: 900,
    10: 1000,
  },
  agregarCirugia: (nueva) => {
    set((state) => {
      const id = uuidv4()
      const cirugia = { ...nueva, id }
      // Calculamos el pago por complejidad, dividido entre cirujano principal y ayudantes
      const valorBase = state.complejidadValores[nueva.complejidad] ?? 0
      const partes = 1 + nueva.ayudantes.length
      const pagoPorMedico = valorBase / partes

      return {
        cirugias: [...state.cirugias, cirugia],
        doctores: state.doctores.map((doc) =>
          doc.id === nueva.doctorId || nueva.ayudantes.includes(doc.id)
            ? { ...doc, sueldo: doc.sueldo + pagoPorMedico }
            : doc
        ),
      }
    })
  },
  editarComplejidad: (nivel, valor) => {
    set((state) => ({
      complejidadValores: { ...state.complejidadValores, [nivel]: valor },
    }))
  },
}))
