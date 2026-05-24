import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"
import ProductCardSkeleton from "../components/ProductCardSkeleton"
import { end_points } from "../services/api"
import { questionAlert, successAlert, errorAlert } from "../helpers/alerts"

function InventoryPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(end_points.products)
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => errorAlert("Error", "No se pudieron cargar los productos"))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(product) {
    const confirmed = await questionAlert(
      "Eliminar producto",
      `¿Eliminar "${product.nombre}" del catálogo?`
    )
    if (!confirmed) return

    try {
      const res = await fetch(`${end_points.products}/${product.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      successAlert("Eliminado", "Producto eliminado correctamente")
      setLoading(true)
      fetch(end_points.products)
        .then((r) => r.json())
        .then((data) => setProducts(Array.isArray(data) ? data : []))
        .catch(() => errorAlert("Error", "No se pudieron cargar los productos"))
        .finally(() => setLoading(false))
    } catch {
      errorAlert("Error", "No se pudo eliminar el producto")
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Inventario
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {products.length} {products.length === 1 ? "producto" : "productos"} registrados
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-16">
          <p className="text-sm text-slate-500">No hay productos en el inventario</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="admin"
              onEdit={(p) => console.log("Editar:", p)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default InventoryPage
