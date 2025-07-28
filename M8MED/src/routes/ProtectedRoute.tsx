import { Navigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'

type Props = {
  children: React.ReactNode
  rolPermitido: 'admin' | 'medico'
}

export default function ProtectedRoute({ children, rolPermitido }: Props) {
  const user = useUserStore((state) => state.user)

  if (!user) return <Navigate to="/" />
  if (user.rol !== rolPermitido) return <Navigate to="/" />

  return children
}
