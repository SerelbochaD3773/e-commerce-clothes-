import { Link } from "react-router-dom"
import { ShoppingCart, LayoutDashboard } from "lucide-react"

function StoreNavbar({ cartCount = 0 }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600">
            <span className="text-sm font-bold text-white">U</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Urban Threads
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
            Inicio
          </Link>
          <Link to="/productos" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
            Productos
          </Link>
          <Link to="/contacto" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
            Contacto
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/carrito"
            className="relative inline-flex items-center rounded-xl p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label="Carrito de compras"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <LayoutDashboard className="h-4 w-4" />
            Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default StoreNavbar
