import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="scroll-smooth">
      <header className="fixed inset-x-0 top-0 bg-white shadow z-10">
        <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <span className="text-2xl font-bold text-sky-600">MedM8</span>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#inicio" className="hover:text-sky-600">
              Inicio
            </a>
            <a href="#funcionalidades" className="hover:text-sky-600">
              Funcionalidades
            </a>
            <a href="#beneficios" className="hover:text-sky-600">
              Beneficios
            </a>
            <a href="#contacto" className="hover:text-sky-600">
              Contacto
            </a>
          </div>
          <div className="flex gap-4">
            <Link to="/login" className="btn text-sm">
              Iniciar sesión
            </Link>
            <a href="#contacto" className="btn text-sm hidden md:inline-block">
              Probar ahora
            </a>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        <section
          id="inicio"
          className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 py-16"
        >
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold">
              Simplifica tu gestión médica
            </h1>
            <p className="text-lg text-gray-700">
              MedM8 alivia la carga administrativa y agiliza la comunicación
              médico-paciente
            </p>
            <Link to="/login" className="btn inline-block">
              Empieza gratis
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1580281658629-3a2b9232cb29?auto=format&fit=crop&w=600&q=60"
            alt="App médica"
            className="md:w-1/2 rounded-xl shadow-lg"
          />
        </section>

        <section id="funcionalidades" className="bg-gray-50 py-16">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Funcionalidades
          </h2>
          <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-4 px-4">
            <div className="card text-center transition-transform hover:scale-105">
              <span className="text-4xl">📋</span>
              <h3 className="font-medium mt-2">
                Gestión de pacientes y turnos
              </h3>
            </div>
            <div className="card text-center transition-transform hover:scale-105">
              <span className="text-4xl">⏰</span>
              <h3 className="font-medium mt-2">Recordatorios automáticos</h3>
            </div>
            <div className="card text-center transition-transform hover:scale-105">
              <span className="text-4xl">💵</span>
              <h3 className="font-medium mt-2">
                Generación de sueldos médicos
              </h3>
            </div>
            <div className="card text-center transition-transform hover:scale-105">
              <span className="text-4xl">💊</span>
              <h3 className="font-medium mt-2">Envío digital de recetas</h3>
            </div>
          </div>
        </section>

        <section id="beneficios" className="py-16">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Beneficios
          </h2>
          <p className="max-w-3xl mx-auto text-center text-lg text-gray-700">
            Aumenta la productividad de tu equipo, ahorra tiempo en tareas
            administrativas y mejora la comunicación con tus pacientes mediante
            recordatorios y recetas digitales.
          </p>
        </section>

        <section id="testimonios" className="bg-gray-50 py-16">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Testimonios
          </h2>
          <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 px-4">
            <div className="card p-6 text-center">
              <p className="italic">
                "MedM8 redujo a la mitad mi tiempo de gestión de turnos"
              </p>
              <span className="mt-4 font-medium block">Dr. Juan Pérez</span>
            </div>
            <div className="card p-6 text-center">
              <p className="italic">
                "Ahora me comunico con mis pacientes de forma instantánea"
              </p>
              <span className="mt-4 font-medium block">Dra. Ana Gómez</span>
            </div>
            <div className="card p-6 text-center">
              <p className="italic">
                "La generación automática de sueldos es una maravilla"
              </p>
              <span className="mt-4 font-medium block">Dr. Carlos López</span>
            </div>
          </div>
        </section>

        <section id="contacto" className="py-16">
          <h2 className="text-3xl font-semibold text-center mb-10">Contacto</h2>
          <form className="max-w-md mx-auto space-y-4 px-4">
            <input type="text" placeholder="Nombre" className="input" />
            <input type="email" placeholder="Email" className="input" />
            <textarea placeholder="Mensaje" rows={4} className="input" />
            <button type="submit" className="btn w-full">
              Enviar
            </button>
          </form>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-200 py-6 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
          <span>&copy; {new Date().getFullYear()} MedM8</span>
          <div className="space-x-4">
            <a href="#" className="hover:underline">
              Términos
            </a>
            <a href="#" className="hover:underline">
              Privacidad
            </a>
            <a href="#" className="hover:underline">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
