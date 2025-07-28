export type Paciente = {
  id: string
  nombre: string
  dni: string
  telefono: string
  genero: 'masculino' | 'femenino' | 'otro'
  email: string
  diagnostico: string
  antecedentes?: string
  fechaNacimiento: string // formato ISO
  tratamiento: string
}

// ✅ SOLUCIÓN: agregá una exportación explícita (requerido por Vite/ESM)
export default {} 
