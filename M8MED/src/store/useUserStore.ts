import { create } from 'zustand'

export type Rol = 'admin' | 'medico'

type User = {
  email: string // <-- CORREGIDO: Se usa email en lugar de nombre para consistencia.
  rol: Rol
}

type Store = {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

export const useUserStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))