import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Package, LogOut } from "lucide-react"
import { removeLocalStorage } from "../helpers/local-storage"
import { redirectAlert } from "../helpers/alerts"

const links = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/productos", icon: Package, label: "Inventario" },
]

function AdminSidebar() {
  const { pathname } = useLocation()

  function handleLogout() {
    removeLocalStorage("session")
    redirectAlert("Sesión cerrada", "Serás redirigido al login", "/login", "info")
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-5">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600">
          <span className="text-sm font-bold text-white">A</span>
        </div>
        <span className="text-sm font-bold tracking-tight text-slate-900">Admin Panel</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.to
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-slate-200 px-3 py-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
