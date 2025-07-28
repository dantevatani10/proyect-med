export type Paciente = {
  id: string
  nombre: string
  apellido: string
  dni: string
  telefono: string
  genero: 'masculino' | 'femenino' | 'otro'
  email: string
  diagnostico: string
  antecedentes?: string
  fechaNacimiento: string // formato ISO
  tratamiento: string
  doctorId: string
}