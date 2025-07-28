import { create } from 'zustand'
import { persist } from 'zustand/middleware'
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
  ayudantes: string[]
  imagen?: string
  valorBase: number
}

export type ComplejidadValores = { [nivel: number]: number }

type M8Store = {
  doctores: Doctor[]
  cirugias: Surgery[]
  complejidadValores: ComplejidadValores
  agregarCirugia: (data: Omit<Surgery, 'id' | 'valorBase'>) => void
  editarComplejidad: (nivel: number, valor: number) => void
}

export const useM8Store = create<M8Store>()(
  persist(
    (set) => ({
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
          const valorBase = state.complejidadValores[nueva.complejidad] ?? 0
          const partes = 1 + nueva.ayudantes.length
          const pagoPorMedico = valorBase / partes

          const cirugia: Surgery = {
            ...nueva,
            id,
            valorBase,
          }

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
    }),
    {
      name: 'm8med-store', // clave de almacenamiento en localStorage
      // Sólo se guardan doctores, cirugías y complejidadValores; las funciones se mantienen.
      // Zustand se encarga de la hidratación automática al arrancar la app.
    }
  )
)
