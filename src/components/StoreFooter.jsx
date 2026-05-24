import { Link } from "react-router-dom"

function StoreFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-bold tracking-tight text-slate-900">
              URBAN THREADS
            </h3>
            <p className="text-sm text-slate-500">
              Redefiniendo el estilo urbano con diseños minimalistas y calidad premium.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900">ENLACES</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/" className="hover:text-slate-900">Inicio</Link></li>
              <li><Link to="/productos" className="hover:text-slate-900">Productos</Link></li>
              <li><Link to="/contacto" className="hover:text-slate-900">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900">AYUDA</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><span className="cursor-default">Guía de tallas</span></li>
              <li><span className="cursor-default">Envíos</span></li>
              <li><span className="cursor-default">Devoluciones</span></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900">SÍGUENOS</h4>
            <div className="flex gap-3 text-slate-400">
              <span className="cursor-default hover:text-slate-600">Twitter</span>
              <span className="cursor-default hover:text-slate-600">Instagram</span>
              <span className="cursor-default hover:text-slate-600">TikTok</span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
          © 2026 Urban Threads. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

export default StoreFooter
