import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"

const colorHexMap = {
  gris: "#6B7280",
  blanco: "#FFFFFF",
  negro: "#1F2937",
  azul: "#2563EB",
  rojo: "#DC2626",
  cafe: "#8B4513",
  verde: "#16A34A",
}

function ProductTable({ products = [], loading, onEdit, onDelete, onCreate }) {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 3

  const filtered = products.filter((p) => {
    if (!query) return true
    const q = query.toLowerCase()
    return (p.nombre || "").toLowerCase().includes(q) || (p.sku || "").toLowerCase().includes(q)
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <section className="bg-surface-container-low border border-outline-variant overflow-hidden">
      <div className="p-6 border-b border-outline-variant flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h4 className="font-headline-md text-headline-md text-on-surface">Gestión de Productos</h4>
        <div className="flex gap-stack-sm w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
            <input
              className="w-full bg-surface-container-highest border-none text-on-surface pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary-container"
              placeholder="Buscar producto..."
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1) }}
            />
          </div>
          <button onClick={onCreate} className="bg-primary-container text-on-primary-container px-4 py-2 font-bold font-label-caps text-label-caps flex items-center gap-2 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-[18px]">add</span>
            CREAR
          </button>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-highest text-on-surface-variant font-label-caps text-label-caps uppercase">
            <tr>
              <th className="px-6 py-4 font-bold">Producto</th>
              <th className="px-6 py-4 font-bold">SKU</th>
              <th className="px-6 py-4 font-bold">Colores</th>
              <th className="px-6 py-4 font-bold">Stock</th>
              <th className="px-6 py-4 font-bold">Precio</th>
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
                  {query ? "No se encontraron productos" : "No hay productos registrados"}
                </td>
              </tr>
            ) : (
              paginated.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container transition-colors group">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="h-12 w-12 bg-surface-container-highest flex items-center justify-center border border-outline-variant overflow-hidden">
                      {p.imagen ? (
                        <img className="h-10 w-10 object-contain" src={p.imagen} alt={p.nombre} />
                      ) : (
                        <span className="material-symbols-outlined text-on-surface-variant">inventory_2</span>
                      )}
                    </div>
                    <span className="text-on-surface font-semibold">{p.nombre}</span>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant font-mono">{p.sku || "N/A"}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5">
                      {Array.isArray(p.color) && p.color.length > 0 ? (
                        p.color.map((c) => (
                          <span
                            key={c}
                            className="inline-block h-5 w-5 rounded-full border border-outline-variant"
                            style={{ backgroundColor: colorHexMap[c] || "#ccc" }}
                            title={c}
                          />
                        ))
                      ) : (
                        <span className="text-on-surface-variant text-xs">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface">{p.stock}</td>
                  <td className="px-6 py-4 text-on-surface">${(p.precio || 0).toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit?.(p)}
                        className="p-2 text-on-surface-variant hover:text-primary-container transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete?.(p)}
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
          MOSTRANDO {paginated.length > 0 ? `${(page - 1) * perPage + 1}-${(page - 1) * perPage + paginated.length}` : "0"} DE {filtered.length} PRODUCTOS
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

export default ProductTable
