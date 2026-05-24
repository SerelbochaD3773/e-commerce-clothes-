import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { saveLocalStorage } from "../helpers/local-storage"
import { errorAlert } from "../helpers/alerts"
import { LogIn } from "lucide-react"

function LoginPage() {
  const [username, setUsername] = useState("")
  const [pin, setPin] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!username.trim() || !pin.trim()) {
      errorAlert("Campos requeridos", "Completa todos los campos")
      return
    }
    setLoading(true)
    saveLocalStorage("session", { username: username.trim(), pin: pin.trim(), loggedAt: new Date().toISOString() })
    setTimeout(() => {
      navigate("/admin")
    }, 300)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-blue-600">
            <LogIn className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Acceso Administrativo
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Ingresa tus credenciales para gestionar el inventario
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <label className="text-xs font-medium text-slate-600">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none ring-blue-700/20 transition-all focus:ring-2"
              />
            </div>
            <div className="grid gap-1.5">
              <label className="text-xs font-medium text-slate-600">PIN</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none ring-blue-700/20 transition-all focus:ring-2"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Demo: cualquier usuario y PIN funcionan
        </p>
      </div>
    </div>
  )
}

export default LoginPage
