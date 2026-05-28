import { Link, useLocation } from "react-router-dom"
import { removeLocalStorage } from "../helpers/local-storage"
import { redirectAlert } from "../helpers/alerts"

const links = [
  { to: "/admin", icon: "dashboard", label: "DASHBOARD" },
  { to: "/admin/productos", icon: "inventory_2", label: "INVENTARIO" },
  { to: "/admin/reportes", icon: "summarize", label: "REPORTES" },
]

const storeLinks = [
  { to: "/", icon: "store", label: "TIENDA" },
  { to: "/productos", icon: "shopping_bag", label: "CATÁLOGO" },
]

function AdminSidebar() {
  const { pathname } = useLocation()

  function handleLogout() {
    removeLocalStorage("session")
    redirectAlert("Sesión cerrada", "Serás redirigido al login", "/login", "info")
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-64 hidden lg:flex flex-col bg-surface-container-low border-r border-outline-variant py-stack-lg z-50">
      <div className="px-6 mb-12">
        <div className="mb-6">
          <span className="text-3xl font-bold text-primary-container">V</span>
        </div>
        <div>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface leading-tight">Velvora Admin</h2>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest opacity-60">Elite Performance</p>
        </div>
      </div>

      <nav className="flex-1 px-2 space-y-2 overflow-y-auto custom-scrollbar">
        {links.map((link) => {
          const isActive = pathname === link.to
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-4 p-4 transition-all group ${
                isActive
                  ? "border-l-4 border-primary-container bg-surface-container-highest text-on-surface font-bold"
                  : "text-secondary hover:bg-surface-container-high hover:text-primary-container border-l-4 border-transparent"
              }`}
            >
              <span
                className={`material-symbols-outlined ${isActive ? "text-primary-container" : "group-hover:scale-110 transition-transform"}`}
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {link.icon}
              </span>
              <span className="font-label-caps text-label-caps">{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-4 mt-auto space-y-4">
        <div className="border-t border-outline-variant pt-4 flex flex-col gap-2">
          <p className="font-label-caps text-label-caps text-on-surface-variant px-2 mb-1 uppercase tracking-widest text-[10px] opacity-60">Navegar Tienda</p>
          {storeLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-secondary flex items-center gap-4 px-2 py-2 hover:text-primary-container transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
              <span className="font-label-caps text-label-caps">{link.label}</span>
            </Link>
          ))}
        </div>
        <button className="w-full bg-primary-container text-on-primary-container py-3 px-4 font-label-caps text-label-caps font-bold active:scale-[0.98] transition-transform electric-glow uppercase">
          Crear Oferta
        </button>
        <div className="border-t border-outline-variant pt-4 flex flex-col gap-2">
          <button
            onClick={handleLogout}
            className="text-secondary flex items-center gap-4 px-2 py-2 hover:text-error transition-colors cursor-pointer w-full text-left"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span className="font-label-caps text-label-caps">LOGOUT</span>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default AdminSidebar
