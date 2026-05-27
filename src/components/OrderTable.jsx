import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"

function OrderTable({ orders = [], products = [], loading, onCreate, onEdit, onDelete }) {
  const [page, setPage] = useState(1)
  const perPage = 5

  const totalPages = Math.ceil(orders.length / perPage)
  const paginated = orders.slice((page - 1) * perPage, page * perPage)

  function getProductNames(order) {
    if (!order.products || !Array.isArray(order.products)) return "—"
    return order.products
      .map((id) => {
        const p = products.find((prod) => prod.id === id)
        return p ? p.nombre : id
      })
      .join(", ")
  }

  return (
    <section className="bg-surface-container-low border border-outline-variant overflow-hidden">
      <div className="p-6 border-b border-outline-variant flex justify-between items-center">
        <h4 className="font-headline-md text-headline-md text-on-surface">Órdenes</h4>
        <button
          onClick={onCreate}
          className="bg-primary-container text-on-primary-container px-4 py-2 font-bold font-label-caps text-label-caps flex items-center gap-2 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          NUEVA ORDEN
        </button>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-highest text-on-surface-variant font-label-caps text-label-caps uppercase">
            <tr>
              <th className="px-6 py-4 font-bold">Usuario</th>
              <th className="px-6 py-4 font-bold">Fecha</th>
              <th className="px-6 py-4 font-bold">Productos</th>
              <th className="px-6 py-4 font-bold">Total</th>
              <th className="px-6 py-4 font-bold">Estado</th>
              <th className="px-6 py-4 font-bold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-body-md">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4" colSpan={6}>
                    <div className="h-12 animate-pulse bg-surface-container-highest" />
                  </td>
                </tr>
              ))
            ) : paginated.length === 0 ? (
              <tr>
                <td className="px-6 py-8 text-center text-on-surface-variant" colSpan={6}>
                  No hay órdenes registradas
                </td>
              </tr>
            ) : (
              paginated.map((o) => (
                <tr key={o.id} className="hover:bg-surface-container transition-colors group">
                  <td className="px-6 py-4 text-on-surface font-semibold">{o.username || "—"}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{o.saledate ? new Date(o.saledate).toLocaleDateString() : "—"}</td>
                  <td className="px-6 py-4 text-on-surface-variant max-w-[200px] truncate">{getProductNames(o)}</td>
                  <td className="px-6 py-4 text-on-surface font-mono">${((o.sale || 0) - (o.offer || 0)).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${
                      o.paid ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${o.paid ? "bg-green-400" : "bg-yellow-400"}`} />
                      {o.paid ? "Pagado" : "Pendiente"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit?.(o)}
                        className="p-2 text-on-surface-variant hover:text-primary-container transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete?.(o)}
                        className="p-2 text-on-surface-variant hover:text-error transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-outline-variant flex justify-between items-center bg-surface-container-low">
        <p className="text-on-surface-variant font-label-caps text-[11px]">
          MOSTRANDO {paginated.length > 0 ? `${(page - 1) * perPage + 1}-${(page - 1) * perPage + paginated.length}` : "0"} DE {orders.length} ÓRDENES
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="h-8 w-8 border border-outline flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`h-8 w-8 border text-xs font-bold ${
                page === p
                  ? "border-primary-container bg-primary-container text-on-primary-container"
                  : "border-outline text-on-surface hover:bg-surface-container-highest"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="h-8 w-8 border border-outline flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default OrderTable
