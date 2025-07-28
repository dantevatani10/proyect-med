import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { usePacienteStore } from '../store/usePacienteStore'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function AgregarPaciente() {
  const agregarPaciente = usePacienteStore((state) => state.agregarPaciente)
  const navigate = useNavigate()

  const schema = Yup.object({
    nombre: Yup.string().required('Requerido'),
    dni: Yup.string().required('Requerido'),
    telefono: Yup.string().required('Requerido'),
    genero: Yup.string().required(),
    email: Yup.string().email('Email inválido').required('Requerido'),
    diagnostico: Yup.string().required('Requerido'),
    antecedentes: Yup.string(),
    fechaNacimiento: Yup.string().required('Requerido'),
    tratamiento: Yup.string().required('Requerido'),
  })

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Agregar Paciente</h1>

        <Formik
          initialValues={{
            nombre: '',
            dni: '',
            telefono: '',
            genero: 'masculino',
            email: '',
            diagnostico: '',
            antecedentes: '',
            fechaNacimiento: '',
            tratamiento: '',
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            agregarPaciente({ ...values, id: uuidv4() })
            navigate('/pacientes')
          }}
        >
          <Form className="space-y-4">
            <Campo label="Nombre" name="nombre" />
            <Campo label="DNI" name="dni" />
            <Campo label="Teléfono" name="telefono" />
            <Campo label="Email" name="email" type="email" />
            <Campo label="Diagnóstico" name="diagnostico" />
            <Campo label="Antecedentes (opcional)" name="antecedentes" as="textarea" />
            <Campo label="Fecha de nacimiento" name="fechaNacimiento" type="date" />
            <Campo label="Tratamiento" name="tratamiento" as="textarea" />

            <div>
              <label className="block text-sm font-medium">Género</label>
              <Field as="select" name="genero" className="input">
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </Field>
              <ErrorMessage name="genero" component="div" className="text-red-600 text-sm" />
            </div>

            <button type="submit" className="btn">
              Guardar paciente
            </button>
          </Form>
        </Formik>
      </div>
    </>
  )
}

const Campo = ({ label, name, type = 'text', as }: any) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <Field name={name} type={type} as={as} className="input" />
    <ErrorMessage name={name} component="div" className="text-red-600 text-sm" />
  </div>
)
