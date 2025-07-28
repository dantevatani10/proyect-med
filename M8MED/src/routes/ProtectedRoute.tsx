import { Navigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'

type Props = {
  children: React.ReactNode
  rolPermitido: ('admin' | 'medico') | Array<'admin' | 'medico'>
}

export default function ProtectedRoute({ children, rolPermitido }: Props) {
  const user = useUserStore((state) => state.user)

  if (!user) return <Navigate to="/" />
  const roles = Array.isArray(rolPermitido) ? rolPermitido : [rolPermitido]
  if (!roles.includes(user.rol)) return <Navigate to="/" />

  return children
}
