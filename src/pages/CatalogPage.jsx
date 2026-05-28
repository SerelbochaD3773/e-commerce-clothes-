import { useState, useEffect, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"
import { end_points } from "../services/api"
import { getLocalStorage } from "../helpers/local-storage"
import CatalogFilterSidebar from "../components/CatalogFilterSidebar"

function CatalogPage() {
  const navigate = useNavigate()
  const session = getLocalStorage("session")
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState({
    categories: [],
    size: null,
    color: null,
    fit: null,
    price: 500,
  })

  useEffect(() => {
    fetch(end_points.products)
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : [])
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    let result = products

    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (p) =>
          (p.nombre || "").toLowerCase().includes(q) ||
          (p.categoria || "").toLowerCase().includes(q)
      )
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) =>
        filters.categories.some(
          (c) => (p.categoria || "").toLowerCase() === c.toLowerCase()
        )
      )
    }

    if (filters.size) {
      result = result.filter((p) => {
        const sizes = p.talla || p.size || ""
        return sizes.toLowerCase().includes(filters.size.toLowerCase())
      })
    }

    if (filters.price < 500) {
      result = result.filter((p) => (p.precio || 0) <= filters.price)
    }

    return result
  }, [products, query, filters])

  function resetFilters() {
    setFilters({ categories: [], size: null, color: null, fit: null, price: 500 })
    setQuery("")
  }

  const [imgErrors, setImgErrors] = useState({})

  function handleImgError(id) {
    setImgErrors((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <div className="bg-background text-on-surface font-sans min-h-screen flex flex-col overflow-x-hidden">
      {/* TopAppBar Shell */}
      <header className="fixed top-0 w-full z-50 bg-background border-b border-outline-variant h-20">
        <div className="flex justify-between items-center h-full px-margin-desktop w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-12">
            <Link className="flex items-center gap-2" to="/">
              <img
                alt="Velvora Logo"
                className="h-8 w-auto"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxBIH6fdiJ3r9dFUb91VJziagPVdxC6u-Iqp6kMxJESuYjQw0g0BQauqi3nLGJVIba4CNKBaXXbFrbK__30NMwpKc5Ae3DGj-idI02-H5nknu_SVMkXA9LGrQo66M0tN6Z7Z0iXh7slOzHu3EGTm50pavfioplJFkNgraFZFl-gyBx8EB5zToPoyXlDTrqKPYcjcgVGNhnxytuqn9fQYFt0WLI5aCfs-2vqN3J8acwqw4NCDxV8bznxu2WABmTQavYLbKj9jIMt3U"
              />
              <span className="font-headline-lg text-headline-lg font-bold tracking-tighter text-on-surface uppercase leading-none hidden md:block">
                VELVORA
              </span>
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                to="/productos"
                className="text-primary-container font-bold border-b-2 border-primary-container pb-1 font-label-caps text-label-caps transition-all"
              >
                Catalog
              </Link>
              <a className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary-container transition-colors duration-200 cursor-pointer" href="#">
                Collections
              </a>
              <a className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary-container transition-colors duration-200 cursor-pointer" href="#">
                New Arrivals
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-surface-container-high px-4 py-2 rounded-full border border-outline-variant">
              <span className="material-symbols-outlined text-on-surface-variant mr-2">search</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar..."
                className="bg-transparent border-none outline-none text-on-surface text-sm focus:ring-0 w-32 xl:w-48 placeholder:text-on-secondary-container"
              />
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/carrito"
                className="text-on-surface hover:text-primary-container transition-all active:scale-95"
              >
                <span className="material-symbols-outlined">shopping_bag</span>
              </Link>
              {session ? (
                <Link
                  to="/admin"
                  className="text-on-surface hover:text-primary-container transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined">account_circle</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-on-surface hover:text-primary-container transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined">account_circle</span>
                </Link>
              )}
              <button className="lg:hidden text-on-surface">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20 min-h-screen flex flex-1">
        <CatalogFilterSidebar filters={filters} onChange={setFilters} onReset={resetFilters} />

        {/* Product Grid Area */}
        <section className="flex-1 lg:ml-72 p-margin-mobile md:p-margin-desktop bg-surface overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <nav className="flex items-center gap-2 text-on-secondary-container font-label-caps text-label-caps uppercase mb-2">
                  <Link to="/" className="hover:text-primary-container">Home</Link>
                  <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                  <span className="text-on-surface">Catálogo</span>
                </nav>
                <h1 className="font-headline-lg text-headline-lg text-on-surface">Elite Urban Wear</h1>
              </div>
              <div className="flex items-center gap-4 text-on-surface">
                <span className="font-label-caps text-label-caps uppercase text-on-secondary-container">
                  {filtered.length} Productos
                </span>
              </div>
            </header>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-gutter">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse flex flex-col bg-surface-container-low border border-outline-variant">
                    <div className="aspect-[3/4] bg-surface-container-highest" />
                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-surface-container-highest rounded w-1/3" />
                      <div className="h-4 bg-surface-container-highest rounded w-2/3" />
                      <div className="h-6 bg-surface-container-highest rounded w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">search_off</span>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Sin resultados</h2>
                <p className="text-on-surface-variant font-body-md">
                  No encontramos productos con esos filtros.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-8 py-3 border border-primary-container text-primary-container font-label-caps text-label-caps hover:bg-primary-container/10 transition-all"
                >
                  REINICIAR FILTROS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-gutter">
                {filtered.map((product) => (
                  <div
                    key={product.id}
                    className="product-card group flex flex-col bg-surface-container-low border border-outline-variant hover:border-primary-container transition-all duration-300"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-black">
                      {product.imagen && !imgErrors[product.id] ? (
                        <img
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                          src={product.imagen}
                          alt={product.nombre || "Producto"}
                          onError={() => handleImgError(product.id)}
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-surface-container-highest">
                          <span className="material-symbols-outlined text-4xl text-outline-variant">image</span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <button className="w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-md rounded-full text-on-surface hover:text-primary-container transition-colors shadow-lg">
                          <span className="material-symbols-outlined text-[20px]">favorite</span>
                        </button>
                      </div>
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <span className="font-label-caps text-[10px] text-primary-container bg-background/80 px-2 py-1 backdrop-blur-md">
                            AGOTADO
                          </span>
                        </div>
                      )}
                      {product.tag && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-error-container text-on-error-container font-label-caps text-[10px] uppercase">
                            {product.tag}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex flex-col gap-1">
                      <span className="font-label-caps text-label-caps text-on-secondary-container uppercase">
                        {product.categoria || "General"}
                      </span>
                      <h3 className="font-body-lg text-body-lg text-on-surface group-hover:text-primary-container transition-colors line-clamp-1">
                        {product.nombre || "Producto"}
                      </h3>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-headline-md text-headline-md text-primary-container">
                          ${(product.precio || 0).toFixed(2)}
                        </span>
                        <button className="flex items-center gap-2 font-label-caps text-label-caps uppercase px-6 py-2 bg-primary-container text-on-primary font-bold hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] active:scale-95 transition-all">
                          AÑADIR
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filtered.length > 0 && (
              <div className="mt-20 flex flex-col items-center gap-6">
                <button className="px-12 py-4 border border-outline-variant text-on-surface font-label-caps text-label-caps uppercase tracking-widest hover:border-primary-container hover:text-primary-container transition-all">
                  Cargar Más
                </button>
                <div className="flex items-center gap-4 text-on-secondary-container">
                  <span className="text-primary-container font-bold">1</span>
                  <a className="hover:text-on-surface transition-colors cursor-pointer" href="#">2</a>
                  <a className="hover:text-on-surface transition-colors cursor-pointer" href="#">3</a>
                  <span className="mx-2">...</span>
                  <a className="hover:text-on-surface transition-colors cursor-pointer" href="#">8</a>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* BottomNavBar (Mobile Shell) */}
      <nav className="fixed bottom-0 w-full lg:hidden z-50 bg-surface-container-lowest border-t border-outline-variant shadow-[0_-4px_12px_rgba(0,240,255,0.1)] h-16 flex justify-around items-center px-margin-mobile">
        <Link
          to="/"
          className="flex flex-col items-center justify-center text-secondary active:bg-surface-container-high transition-transform duration-200"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-caps text-[10px] uppercase">Home</span>
        </Link>
        <Link
          to="/productos"
          className="flex flex-col items-center justify-center text-primary-container drop-shadow-[0_0_8px_rgba(0,240,255,0.5)] active:bg-surface-container-high transition-transform duration-200 scale-110"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
          <span className="font-label-caps text-[10px] uppercase">Catalog</span>
        </Link>
        <Link
          to="/carrito"
          className="flex flex-col items-center justify-center text-secondary active:bg-surface-container-high transition-transform duration-200"
        >
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="font-label-caps text-[10px] uppercase">Cart</span>
        </Link>
        <Link
          to={session ? "/admin" : "/login"}
          className="flex flex-col items-center justify-center text-secondary active:bg-surface-container-high transition-transform duration-200"
        >
          <span className="material-symbols-outlined">account_circle</span>
          <span className="font-label-caps text-[10px] uppercase">Perfil</span>
        </Link>
      </nav>
    </div>
  )
}

export default CatalogPage
