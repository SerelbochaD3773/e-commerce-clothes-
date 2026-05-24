import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"
import ProductCardSkeleton from "../components/ProductCardSkeleton"
import { end_points } from "../services/api"
import { useCart } from "../context/CartContext"
import { Search } from "lucide-react"

function CustomerProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const { dispatch } = useCart()

  useEffect(() => {
    fetch(end_points.products)
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = products.filter((p) => {
    if (!query) return true
    const q = query.toLowerCase()
    return (
      (p.nombre || "").toLowerCase().includes(q) ||
      (p.categoria || "").toLowerCase().includes(q)
    )
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Nuestra Colección
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Estilo urbano para cada ocasión
        </p>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre o categoría..."
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none ring-blue-700/20 transition-all focus:ring-2"
        />
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-16">
          <p className="text-sm text-slate-500">
            {query ? "No se encontraron productos" : "No hay productos disponibles"}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="store"
              onAddToCart={(p) => dispatch({ type: "ADD_ITEM", product: p })}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomerProducts
