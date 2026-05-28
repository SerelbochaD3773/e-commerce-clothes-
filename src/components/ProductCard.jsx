import { useState } from "react"
import { Pencil, Trash2, ShoppingCart, Package } from "lucide-react"

const imageMap = {
  camisa: "/imagenes/card-camisa.png",
  jean: "/imagenes/card-jean.png",
  buso: "/imagenes/card-buso.png",
  chaqueta: "/imagenes/card-chaqueta.png",
  gorra: "/imagenes/card-gorra.png",
  zapatillas: "/imagenes/card-zapatillas.png",
}

function fixImageUrl(url) {
  if (!url) return url
  return url.replace(
    "https://github.com/",
    "https://raw.githubusercontent.com/"
  ).replace("/blob/", "/")
}

function getImageSrc(product) {
  if (!product) return null
  const key = (product.image || product.nombre || "").toLowerCase()
  for (const [keyword, path] of Object.entries(imageMap)) {
    if (key.includes(keyword)) return path
  }
  return fixImageUrl(product.imagen) || null
}

const stockConfig = {
  out: { color: "text-red-600", bg: "bg-red-50", dot: "bg-red-500", label: "Agotado" },
  low: { color: "text-yellow-600", bg: "bg-yellow-50", dot: "bg-yellow-400", label: "Stock bajo" },
  ok: { color: "text-green-600", bg: "bg-green-50", dot: "bg-green-500", label: "En stock" },
}

function getStockLevel(stock) {
  if (stock === 0 || stock === undefined || stock === null) return stockConfig.out
  if (stock <= 10) return stockConfig.low
  return stockConfig.ok
}

function ProductCard({ product, variant = "store", onAddToCart, onEdit, onDelete }) {
  const [imgError, setImgError] = useState(false)
  const stock = getStockLevel(product?.stock)
  const imgSrc = getImageSrc(product)

  return (
    <article
      role="article"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        {imgSrc && !imgError ? (
          <img
            src={imgSrc}
            alt={product?.nombre || "Producto"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <Package className="h-12 w-12 text-slate-300" />
          </div>
        )}

        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${stock.bg} ${stock.color}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${stock.dot}`} />
          {stock.label}{product?.stock > 0 ? ` (${product.stock})` : ""}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {product?.categoria && (
          <span className="text-xs font-medium uppercase tracking-wider text-blue-600">
            {product.categoria}
          </span>
        )}

        <h3 className="text-sm font-semibold leading-snug text-slate-900 line-clamp-2">
          {product?.nombre || "Producto sin nombre"}
        </h3>

        <p className="mt-auto text-2xl font-bold tracking-tight text-slate-900">
          ${product?.precio?.toFixed(2) ?? "0.00"}
        </p>

        {variant === "store" ? (
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-95"
            aria-label={`Añadir ${product?.nombre || "producto"} al carrito`}
          >
            <ShoppingCart className="h-4 w-4" />
            Añadir al carrito
          </button>
        ) : (
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onEdit?.(product)}
              className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-95"
              aria-label={`Editar ${product?.nombre || "producto"}`}
            >
              <Pencil className="h-3.5 w-3.5" />
              Editar
            </button>
            <button
              type="button"
              onClick={() => onDelete?.(product)}
              className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 active:scale-95"
              aria-label={`Eliminar ${product?.nombre || "producto"}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Eliminar
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

export default ProductCard
