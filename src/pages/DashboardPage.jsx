import { useState, useEffect } from "react"
import { getLocalStorage } from "../helpers/local-storage"
import { end_points } from "../services/api"
import { Package, AlertTriangle, DollarSign, TrendingUp } from "lucide-react"

function DashboardPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const session = getLocalStorage("session")

  useEffect(() => {
    fetch(end_points.products)
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const totalProducts = products.length
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10).length
  const outOfStock = products.filter((p) => p.stock === 0).length
  const totalValue = products.reduce((s, p) => s + (p.precio || 0) * (p.stock || 0), 0)

  const cards = [
    { label: "Productos", value: totalProducts, icon: Package, color: "blue" },
    { label: "Stock bajo", value: lowStock, icon: AlertTriangle, color: "yellow" },
    { label: "Agotados", value: outOfStock, icon: TrendingUp, color: "red" },
    { label: "Valor inventario", value: `$${totalValue.toFixed(0)}`, icon: DollarSign, color: "green" },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Bienvenido, {session?.username || "admin"}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon
          const colorMap = {
            blue: "bg-blue-50 text-blue-600",
            yellow: "bg-yellow-50 text-yellow-600",
            red: "bg-red-50 text-red-600",
            green: "bg-green-50 text-green-600",
          }
          return (
            <div
              key={card.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-500">{card.label}</p>
                <div className={`grid h-8 w-8 place-items-center rounded-xl ${colorMap[card.color]}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {loading ? (
                  <span className="inline-block h-6 w-16 animate-pulse rounded bg-slate-200" />
                ) : (
                  card.value
                )}
              </p>
            </div>
          )
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Últimos productos</h2>
        {loading ? (
          <div className="mt-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 animate-pulse rounded-xl bg-slate-100" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="mt-4 text-sm text-slate-400">No hay productos registrados</p>
        ) : (
          <div className="mt-4 divide-y divide-slate-100">
            {products.slice(-5).reverse().map((p) => (
              <div key={p.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-slate-900">{p.nombre}</p>
                  <p className="text-xs text-slate-400">{p.categoria}</p>
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  ${p.precio?.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
