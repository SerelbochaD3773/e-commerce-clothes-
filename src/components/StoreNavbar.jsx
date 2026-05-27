import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { getLocalStorage } from "../helpers/local-storage"

function StoreNavbar() {
  const { totalItems } = useCart()
  const session = getLocalStorage("session")

  return (
    <header className="fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-xl border-b border-outline-variant shadow-[0_0_15px_rgba(0,240,255,0.1)]">
      <nav className="flex justify-between items-center w-full px-margin-desktop py-4 max-w-container-max mx-auto">
        <div className="flex items-center gap-stack-lg">
          <Link to="/" className="flex items-center gap-3">
            <img
              alt="Velvora Logo"
              className="h-10 w-10 object-contain"
              src="/Velvora_logo.png"
            />
            <span className="font-headline-md text-headline-md font-bold tracking-tighter text-primary">
              Velvora
            </span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-gutter">
          <Link
            to="/"
            className="text-on-surface-variant font-body-md text-body-md hover:text-primary transition-colors duration-300"
          >
            Inicio
          </Link>
        </div>
        <div className="flex items-center gap-stack-md">
          {session ? (
            <div className="flex items-center gap-stack-sm pr-stack-md border-r border-outline-variant">
              <span className="material-symbols-outlined text-primary-fixed-dim">account_circle</span>
              <span className="font-label-caps text-label-caps text-on-surface">{session.username || "Usuario"}</span>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-stack-sm pr-stack-md border-r border-outline-variant">
              <Link
                to="/login"
                className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/registro"
                className="font-label-caps text-label-caps text-primary hover:text-primary-fixed-dim transition-colors"
              >
                Registrarse
              </Link>
            </div>
          )}
          <Link
            to="/carrito"
            className="relative p-2 hover:text-primary transition-colors duration-300"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full shadow-[0_0_5px_rgba(0,240,255,1)]" />
            )}
          </Link>
          {session && (
            <Link
              to="/admin"
              className="btn-volt px-4 py-2 rounded-full font-label-caps text-label-caps uppercase tracking-widest text-[10px]"
            >
              Admin
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default StoreNavbar
