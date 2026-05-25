import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function RegistroVelvora() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    RegistroVelvora();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      Swal.fire({
        title: 'Campos Incompletos',
        text: 'Por favor complete todos los datos del formulario.',
        icon: 'warning',
        background: '#201f1f',
        color: '#e5e2e1',
        confirmButtonColor: '#00f0ff',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    if (password.length < 8) {
      Swal.fire({
        title: 'Contraseña Débil',
        text: 'La contraseña debe tener al menos 8 caracteres.',
        icon: 'warning',
        background: '#201f1f',
        color: '#e5e2e1',
        confirmButtonColor: '#00f0ff',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    setLoading(true);
    // Simular registro
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        title: 'Cuenta Creada',
        text: 'Tu cuenta ha sido creada con éxito. Ahora puedes iniciar sesión.',
        icon: 'success',
        background: '#201f1f',
        color: '#e5e2e1',
        confirmButtonColor: '#00f0ff',
        confirmButtonText: 'Iniciar Sesión'
      }).then(() => {
        navigate('/login');
      });
    }, 1200);
  };

  return (
    <div className="bg-background text-on-surface font-sans min-h-screen flex flex-col overflow-x-hidden">
      {/* Header / Navigation */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
          <img
            alt="Velvora Logo"
            className="h-8 md:h-10 transition-transform duration-300 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxBIH6fdiJ3r9dFUb91VJziagPVdxC6u-Iqp6kMxJESuYjQw0g0BQauqi3nLGJVIba4CNKBaXXbFrbK__30NMwpKc5Ae3DGj-idI02-H5nknu_SVMkXA9LGrQo66M0tN6Z7Z0iXh7slOzHu3EGTm50pavfioplJFkNgraFZFl-gyBx8EB5zToPoyXlDTrqKPYcjcgVGNhnxytuqn9fQYFt0WLI5aCfs-2vqN3J8acwqw4NCDxV8bznxu2WABmTQavYLbKj9jIMt3U"
          />
          <span className="font-headline-md text-headline-md font-bold tracking-tighter text-on-surface uppercase">VELVORA</span>
        </div>
        <Link
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary-container transition-colors font-label-caps text-label-caps"
          to="/"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          VOLVER A LA TIENDA
        </Link>
      </header>

      {/* Main Container */}
      <main className="min-h-screen pt-20 flex flex-col md:flex-row flex-grow">
        {/* Left Side: Welcome Panel (Acts as redirect to Login) */}
        <section className="flex-1 relative bg-surface-container-low overflow-hidden flex flex-col justify-center px-margin-mobile md:px-20 lg:px-32 py-stack-lg border-b md:border-b-0 md:border-r border-outline-variant/30">
          {/* Atmospheric background elements */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary-container rounded-full blur-[120px]"></div>
            <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-primary-container/30 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative z-10 max-w-md w-full mx-auto space-y-stack-lg text-center md:text-left">
            <div className="space-y-2">
              <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface">¿Ya tienes cuenta?</h2>
              <p className="text-on-surface-variant font-body-md">
                Inicia sesión en tu cuenta para acceder a tu panel exclusivo y ver tus pedidos recientes.
              </p>
            </div>

            <div className="pt-4">
              <Link
                to="/login"
                className="inline-block w-full text-center border border-primary-container text-primary-container py-4 font-label-caps text-label-caps font-bold rounded hover:bg-primary-container/10 active:scale-[0.98] transition-all duration-200"
              >
                INICIAR SESIÓN
              </Link>
            </div>

            {/* Benefit Card */}
            <div className="pt-10 hidden lg:block">
              <div className="bg-surface-container-high/40 border border-outline-variant/30 p-6 rounded-lg glass-effect text-left">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-container/10 rounded-full flex items-center justify-center border border-primary-container/20">
                    <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                      workspace_premium
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-caps text-[14px] text-on-surface">BENEFICIOS VELVORA</h4>
                    <p className="text-[12px] text-on-surface-variant">Acceso anticipado, envíos premium y soporte 24/7 de alta prioridad.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Register Form */}
        <section className="flex-1 flex flex-col justify-center px-margin-mobile md:px-20 lg:px-32 py-stack-lg">
          <div className="max-w-md w-full mx-auto space-y-stack-lg">
            <div className="space-y-2">
              <h1 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface">Crea tu cuenta</h1>
              <p className="text-on-surface-variant font-body-md">Únete al ecosistema de élite VELVORA.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-stack-md">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-caps text-label-caps text-on-surface-variant block">NOMBRE</label>
                  <input
                    className="bg-surface-container border border-outline-variant text-on-surface w-full py-3 px-4 rounded focus:outline-none focus:ring-1 focus:ring-primary-container focus:border-primary-container placeholder:text-outline-variant/50"
                    placeholder="Ej. Alex"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-caps text-label-caps text-on-surface-variant block">APELLIDO</label>
                  <input
                    className="bg-surface-container border border-outline-variant text-on-surface w-full py-3 px-4 rounded focus:outline-none focus:ring-1 focus:ring-primary-container focus:border-primary-container placeholder:text-outline-variant/50"
                    placeholder="Ej. Smith"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label-caps text-label-caps text-on-surface-variant block">EMAIL DE REGISTRO</label>
                <input
                  className="bg-surface-container border border-outline-variant text-on-surface w-full py-3 px-4 rounded focus:outline-none focus:ring-1 focus:ring-primary-container focus:border-primary-container placeholder:text-outline-variant/50"
                  placeholder="nombre@ejemplo.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-label-caps text-label-caps text-on-surface-variant block">NUEVA CONTRASEÑA</label>
                <input
                  className="bg-surface-container border border-outline-variant text-on-surface w-full py-3 px-4 rounded focus:outline-none focus:ring-1 focus:ring-primary-container focus:border-primary-container placeholder:text-outline-variant/50"
                  placeholder="Mín. 8 caracteres"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-4 pt-2">
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Al crear una cuenta, aceptas nuestros{' '}
                  <a className="text-primary-container underline" href="#terms">Términos de Servicio</a> y nuestra{' '}
                  <a className="text-primary-container underline" href="#privacy">Política de Privacidad</a>.
                </p>
                <button
                  className="w-full border border-primary-container text-primary-container py-4 font-label-caps text-label-caps font-bold rounded hover:bg-primary-container/10 active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'CREANDO CUENTA...' : 'CREAR CUENTA'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="h-16 flex items-center justify-center border-t border-outline-variant/20 bg-background text-[10px] font-label-caps text-on-surface-variant tracking-widest px-margin-mobile text-center font-bold">
        © 2024 VELVORA SYSTEMS. TODOS LOS DERECHOS RESERVADOS. PRECISIÓN. ENERGÍA. SOFISTICACIÓN.
      </footer>
    </div>
  );
}

export default RegistroVelvora;
