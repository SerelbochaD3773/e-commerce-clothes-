import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { saveLocalStorage } from '../helpers/local-storage';

function LoginVelvora() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        title: 'Error de Validación',
        text: 'Por favor complete todos los campos.',
        icon: 'warning',
        background: '#201f1f',
        color: '#e5e2e1',
        confirmButtonColor: '#00f0ff',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    setLoading(true);
    const username = email.split('@')[0];
    saveLocalStorage('session', { username, email });
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        title: '¡Acceso Concedido!',
        text: `Bienvenido de vuelta, ${username}`,
        icon: 'success',
        background: '#201f1f',
        color: '#e5e2e1',
        confirmButtonColor: '#00f0ff',
        confirmButtonText: 'Ir al Dashboard'
      }).then(() => {
        navigate('/admin');
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
        {/* Left Side: Login Form */}
        <section className="flex-1 flex flex-col justify-center px-margin-mobile md:px-20 lg:px-32 py-stack-lg border-b md:border-b-0 md:border-r border-outline-variant/30">
          <div className="max-w-md w-full mx-auto space-y-stack-lg">
            <div className="space-y-2">
              <h1 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface">Inicia Sesión</h1>
              <p className="text-on-surface-variant font-body-md">Accede a tu panel de rendimiento exclusivo.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-stack-md">
              <div className="space-y-1">
                <label className="font-label-caps text-label-caps text-on-surface-variant block">EMAIL</label>
                <div className="volt-border-focus flex items-center bg-surface-container border border-outline-variant rounded transition-all">
                  <span className="material-symbols-outlined px-3 text-on-surface-variant">mail</span>
                  <input
                    className="bg-transparent border-none text-on-surface w-full py-3 px-1 focus:outline-none focus:ring-0 placeholder:text-outline-variant/50"
                    placeholder="nombre@velvora.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="font-label-caps text-label-caps text-on-surface-variant block">CONTRASEÑA</label>
                  <a className="text-[10px] font-label-caps text-primary-container hover:underline" href="#forgot">¿OLVIDASTE TU CONTRASEÑA?</a>
                </div>
                <div className="volt-border-focus flex items-center bg-surface-container border border-outline-variant rounded transition-all">
                  <span className="material-symbols-outlined px-3 text-on-surface-variant">lock</span>
                  <input
                    className="bg-transparent border-none text-on-surface w-full py-3 px-1 focus:outline-none focus:ring-0 placeholder:text-outline-variant/50"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 py-2">
                <input
                  className="rounded border-outline-variant bg-surface-container text-primary-container focus:ring-primary-container/20 w-4 h-4"
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label className="text-label-caps font-label-caps text-on-surface-variant cursor-pointer select-none" htmlFor="remember">
                  Mantenerme conectado
                </label>
              </div>

              <button
                className="w-full bg-primary-container text-on-primary py-4 font-label-caps text-label-caps font-bold rounded glow-hover active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? 'INGRESANDO...' : 'INGRESAR'}
              </button>
            </form>

            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-outline-variant/30"></div>
              <span className="flex-shrink mx-4 text-on-surface-variant font-label-caps text-[10px]">O CONTINUAR CON</span>
              <div className="flex-grow border-t border-outline-variant/30"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-outline-variant py-3 rounded hover:bg-surface-container transition-colors active:scale-95 cursor-pointer"
                onClick={() => {
                  Swal.fire({ title: 'Google Login', text: 'Funcionalidad de demostración.', icon: 'info', background: '#201f1f', color: '#e5e2e1', confirmButtonColor: '#00f0ff' });
                }}
              >
                <img
                  alt="Google"
                  className="w-4 h-4 grayscale"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkQyEFp1vXNSm7eBTl8AdnSSKG_RAcDu8uIjacyuHLrIbFn3Muv4UOLyqxb9aemSFRDInm5n0J_DYPfXcq0OAp586OWxyCDVH7rhu2zC4qUrU3DQ5fyfqOCUX8ENGePIZ8zquIAWCLpvCurm1sY-wB96JEQmdHnmT5Rb82i7hrZra-CxGhe-uI7LfpmQzZEOLfTdnL7yY1VvWnf_W1Fhc48ZRNxSiPQ7WWc7gkbsknxgcSqQgmRPNJ-zOdvrTEZNQErK9k8I955ks"
                />
                <span className="font-label-caps text-[11px]">GOOGLE</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-outline-variant py-3 rounded hover:bg-surface-container transition-colors active:scale-95 cursor-pointer"
                onClick={() => {
                  Swal.fire({ title: 'Apple Login', text: 'Funcionalidad de demostración.', icon: 'info', background: '#201f1f', color: '#e5e2e1', confirmButtonColor: '#00f0ff' });
                }}
              >
                <span className="material-symbols-outlined text-[18px]">ios</span>
                <span className="font-label-caps text-[11px]">APPLE ID</span>
              </button>
            </div>
          </div>
        </section>

        {/* Right Side: Welcome Promo Panel (Acts as redirect to Registration) */}
        <section className="flex-1 relative bg-surface-container-low overflow-hidden flex flex-col justify-center px-margin-mobile md:px-20 lg:px-32 py-stack-lg">
          {/* Atmospheric background elements */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary-container rounded-full blur-[120px]"></div>
            <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-primary-container/30 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative z-10 max-w-md w-full mx-auto space-y-stack-lg text-center md:text-left">
            <div className="space-y-2">
              <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-on-surface">¿Nuevo por aquí?</h2>
              <p className="text-on-surface-variant font-body-md">
                Regístrate hoy mismo y descubre una experiencia de compra diseñada para el rendimiento y la sofisticación.
              </p>
            </div>

            <div className="pt-4">
              <Link
                to="/registro"
                className="inline-block w-full text-center border border-primary-container text-primary-container py-4 font-label-caps text-label-caps font-bold rounded hover:bg-primary-container/10 active:scale-[0.98] transition-all duration-200"
              >
                CREAR UNA CUENTA NUEVA
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
      </main>

      {/* Footer */}
      <footer className="h-16 flex items-center justify-center border-t border-outline-variant/20 bg-background text-[10px] font-label-caps text-on-surface-variant tracking-widest px-margin-mobile text-center">
        © 2024 VELVORA SYSTEMS. TODOS LOS DERECHOS RESERVADOS. PRECISIÓN. ENERGÍA. SOFISTICACIÓN.
      </footer>
    </div>
  );
}

export default LoginVelvora;
