MEDM8 es una aplicación web para gestionar cirugías, turnos y pacientes de una clínica u hospital. Está desarrollada con **React**, **TypeScript** y **Vite**, y almacena la información de forma local usando **Zustand**.

## Características

- Autenticación simulada para **administradores** y **médicos**.
- Panel de administrador con gestión de médicos, pacientes, complejidad de cirugías y reportes generales.
- Panel de médico con ingresos en tiempo real, calendario de turnos y lista de pacientes asociados.
- Formularios validados con **Formik** y **Yup** para registrar o editar cirugías, turnos y pacientes.
- Persistencia de datos en `localStorage` para mantener la información entre recargas.
- Interfaz construida con **Tailwind CSS** y componentes de **Headless UI**.

## Instalación

Requiere Node.js 18 o superior.

1. Clona el repositorio y entra en la carpeta principal:

   ```bash
   git clone <repo>
   cd M8MED
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Arranca el entorno de desarrollo:

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`.

4. Para crear una build de producción ejecuta:

   ```bash
   npm run build
   ```

   Y para previsualizar el resultado:

   ```bash
   npm run preview
   ```

## Scripts disponibles

- `npm run dev` inicia la aplicación en modo desarrollo.
- `npm run lint` ejecuta ESLint sobre todo el proyecto.
- `npm run build` compila la versión de producción.
- `npm run preview` sirve la aplicación ya compilada.

## Estructura del proyecto

```
M8MED/
├── public/            # Archivos estáticos
├── src/
│   ├── components/    # Componentes reutilizables (Navbar, Modal, etc.)
│   ├── pages/         # Vistas principales de la aplicación
│   ├── store/         # Stores de Zustand para manejar el estado
│   ├── types/         # Definiciones TypeScript compartidas
│   └── lib/           # Funciones auxiliares
├── index.html         # Punto de entrada
├── package.json       # Dependencias y scripts
└── tailwind.config.js # Configuración de estilos
```

## Usuarios de ejemplo

El proyecto incluye un usuario administrador y varios médicos de prueba:

- **Administrador**
  - Email: `admin@test.com`
  - Contraseña: `1234`
- **Médicos** (revisar `src/store/useM8Store.ts` para ver las credenciales)

## Contribución

Este repositorio se utiliza como base para futuras integraciones de backend. Los datos se almacenan en el navegador. Si deseas restablecer los montos o registros, limpia la entrada `m8med-store` desde las herramientas de desarrollo del navegador (pestaña "Aplicación" → Almacenamiento → Limpiar).

Para contribuir:

1. Crea una rama a partir de `main`.
2. Realiza tus cambios y asegúrate de que `npm run lint` y `npm run build` finalicen sin errores.
3. Abre un Pull Request describiendo las modificaciones.

## Licencia

MIT
