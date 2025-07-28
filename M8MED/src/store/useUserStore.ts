import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Rol = 'admin' | 'medico';

type User = {
  id?: string;
  email: string;
  rol: Rol;
  nombre: string;
  apellido: string;
  password: string;
  foto?: string;
};

type Store = {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
};

export const useUserStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateUser: (data) =>
        set((state) =>
          state.user ? { user: { ...state.user, ...data } } : { user: null },
        ),
      logout: () => set({ user: null }),
    }),
    { name: 'user-store' },
  ),
);
