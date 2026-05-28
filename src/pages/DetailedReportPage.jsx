import { useState, useEffect, useMemo } from "react"
import { end_points } from "../services/api"

function DetailedReportPage() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(end_points.products).then((r) => r.json()),
      fetch(end_points.orders).then((r) => r.json()),
    ])
      .then(([productsData, ordersData]) => {
        setProducts(Array.isArray(productsData) ? productsData : [])
        setOrders(Array.isArray(ordersData) ? ordersData : [])
      })
      .catch(() => {
        setProducts([])
        setOrders([])
      })
      .finally(() => setLoading(false))
  }, [])

  const metrics = useMemo(() => {
    const totalSales = orders.reduce((s, o) => s + ((o.sale || 0) - (o.offer || 0)), 0)
    const pendingOrders = orders.filter((o) => !o.paid).length
    const paidOrders = orders.filter((o) => o.paid).length
    const totalProducts = products.length
    const outOfStock = products.filter((p) => p.stock === 0).length
    const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10).length
    const avgOrderValue = orders.length > 0 ? totalSales / orders.length : 0
    return { totalSales, pendingOrders, paidOrders, totalProducts, outOfStock, lowStock, avgOrderValue }
  }, [products, orders])

  const categoryData = useMemo(() => {
    const map = {}
    products.forEach((p) => {
      const cat = p.categoria || "Sin categoría"
      map[cat] = (map[cat] || 0) + 1
    })
    return Object.entries(map)
      .map(([name, count]) => ({ name, count, percentage: Math.round((count / products.length) * 100) }))
      .sort((a, b) => b.count - a.count)
  }, [products])

  const monthlySales = useMemo(() => {
    const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"]
    const now = new Date()
    const monthly = Array.from({ length: 12 }, (_, i) => {
      const m = (now.getMonth() - 11 + i + 12) % 12
      return {
        label: months[m],
        value: 0,
        count: 0,
        month: m,
        year: now.getFullYear() - (m > now.getMonth() ? 1 : 0),
      }
    })
    orders.forEach((o) => {
      if (!o.saledate) return
      const d = new Date(o.saledate)
      const idx = monthly.findIndex((m) => m.month === d.getMonth() && m.year === d.getFullYear())
      if (idx !== -1) {
        monthly[idx].value += (o.sale || 0) - (o.offer || 0)
        monthly[idx].count += 1
      }
    })
    return monthly
  }, [orders])

  const maxMonthlyValue = Math.max(...monthlySales.map((m) => m.value), 1)

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.saledate || 0) - new Date(a.saledate || 0))
      .slice(0, 10)
  }, [orders])

  if (loading) {
    return (
      <div className="space-y-stack-lg">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-surface-container-highest rounded w-64" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-surface-container-highest rounded" />
            ))}
          </div>
          <div className="h-64 bg-surface-container-highest rounded" />
          <div className="h-64 bg-surface-container-highest rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-stack-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Reporte Detallado</h1>
          <p className="text-on-surface-variant font-body-md">Análisis completo de ventas, productos y órdenes</p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-3 border border-primary-container text-primary-container font-label-caps text-label-caps hover:bg-primary-container/10 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">print</span>
          IMPRIMIR REPORTE
        </button>
      </div>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="bg-surface-container-low border border-outline-variant p-6 space-y-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Ventas Totales</span>
          <p className="font-headline-lg text-headline-lg text-primary-container">
            ${metrics.totalSales.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
          </p>
          <span className="font-label-caps text-[10px] text-on-surface-variant">
            {metrics.paidOrders + metrics.pendingOrders} órdenes procesadas
          </span>
        </div>
        <div className="bg-surface-container-low border border-outline-variant p-6 space-y-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Ticket Promedio</span>
          <p className="font-headline-lg text-headline-lg text-primary-container">
            ${metrics.avgOrderValue.toFixed(2)}
          </p>
          <span className="font-label-caps text-[10px] text-on-surface-variant">
            Por orden de compra
          </span>
        </div>
        <div className="bg-surface-container-low border border-outline-variant p-6 space-y-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Órdenes</span>
          <p className="font-headline-lg text-headline-lg text-primary-container">
            {metrics.paidOrders + metrics.pendingOrders}
          </p>
          <div className="flex gap-4 font-label-caps text-[10px]">
            <span className="text-green-400">{metrics.paidOrders} pagadas</span>
            <span className="text-yellow-400">{metrics.pendingOrders} pendientes</span>
          </div>
        </div>
        <div className="bg-surface-container-low border border-outline-variant p-6 space-y-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Inventario</span>
          <p className="font-headline-lg text-headline-lg text-primary-container">
            {metrics.totalProducts}
          </p>
          <div className="flex gap-4 font-label-caps text-[10px]">
            <span className="text-red-400">{metrics.outOfStock} agotados</span>
            <span className="text-yellow-400">{metrics.lowStock} stock bajo</span>
          </div>
        </div>
      </section>

      {/* Monthly Sales Chart */}
      <section className="bg-surface-container-low border border-outline-variant p-6 space-y-4">
        <h2 className="font-headline-md text-headline-md text-on-surface">Ventas Mensuales</h2>
        <div className="flex items-end gap-2 h-48">
          {monthlySales.map((m) => (
            <div key={m.label} className="flex-1 flex flex-col items-center gap-1 group relative">
              <div
                className="w-full bg-primary-container/80 hover:bg-primary-container transition-all rounded-t"
                style={{ height: `${(m.value / maxMonthlyValue) * 100}%`, minHeight: m.value > 0 ? "4px" : "0" }}
              />
              <span className="font-label-caps text-[9px] text-on-surface-variant">{m.label}</span>
              {m.value > 0 && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-highest px-2 py-1 rounded text-[10px] font-label-caps text-on-surface whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  ${m.value.toFixed(0)} ({m.count} órdenes)
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        {/* Category Distribution */}
        <section className="bg-surface-container-low border border-outline-variant p-6 space-y-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Distribución por Categoría</h2>
          <div className="space-y-3">
            {categoryData.map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex justify-between font-label-caps text-label-caps">
                  <span className="text-on-surface">{cat.name}</span>
                  <span className="text-on-surface-variant">{cat.count} ({cat.percentage}%)</span>
                </div>
                <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-container rounded-full transition-all"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Orders */}
        <section className="bg-surface-container-low border border-outline-variant p-6 space-y-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Órdenes Recientes</h2>
          {recentOrders.length === 0 ? (
            <p className="text-on-surface-variant font-body-md">No hay órdenes registradas.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant">
                    <th className="pb-2 pr-4">ID</th>
                    <th className="pb-2 pr-4">Cliente</th>
                    <th className="pb-2 pr-4">Monto</th>
                    <th className="pb-2">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-b border-outline-variant/30 font-body-md text-on-surface">
                      <td className="py-3 pr-4 text-primary-container font-bold">#{o.id}</td>
                      <td className="py-3 pr-4">{o.username || "—"}</td>
                      <td className="py-3 pr-4">${(o.sale || 0).toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`font-label-caps text-[10px] px-2 py-1 rounded ${
                          o.paid ? "bg-green-900/30 text-green-400" : "bg-yellow-900/30 text-yellow-400"
                        }`}>
                          {o.paid ? "Pagada" : "Pendiente"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* Product Performance Table */}
      <section className="bg-surface-container-low border border-outline-variant p-6 space-y-4">
        <h2 className="font-headline-md text-headline-md text-on-surface">Rendimiento de Productos</h2>
        {products.length === 0 ? (
          <p className="text-on-surface-variant font-body-md">No hay productos registrados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant">
                  <th className="pb-2 pr-4">Producto</th>
                  <th className="pb-2 pr-4">Categoría</th>
                  <th className="pb-2 pr-4">Precio</th>
                  <th className="pb-2 pr-4">Stock</th>
                  <th className="pb-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-outline-variant/30 font-body-md text-on-surface">
                    <td className="py-3 pr-4 font-semibold">{p.nombre || "—"}</td>
                    <td className="py-3 pr-4 text-on-surface-variant">{p.categoria || "—"}</td>
                    <td className="py-3 pr-4">${(p.precio || 0).toFixed(2)}</td>
                    <td className="py-3 pr-4">{p.stock ?? "—"}</td>
                    <td className="py-3">
                      {p.stock === 0 ? (
                        <span className="font-label-caps text-[10px] px-2 py-1 rounded bg-red-900/30 text-red-400">Agotado</span>
                      ) : p.stock <= 10 ? (
                        <span className="font-label-caps text-[10px] px-2 py-1 rounded bg-yellow-900/30 text-yellow-400">Stock bajo</span>
                      ) : (
                        <span className="font-label-caps text-[10px] px-2 py-1 rounded bg-green-900/30 text-green-400">Disponible</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

export default DetailedReportPage
