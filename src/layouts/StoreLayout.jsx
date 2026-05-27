import { Link, Outlet, useLocation } from "react-router-dom"
import StoreNavbar from "../components/StoreNavbar"
import StoreFooter from "../components/StoreFooter"

function StoreLayout() {
  const { pathname } = useLocation()
  const isMain = pathname === "/"

  return (
    <div className={`min-h-screen text-on-surface font-body-md antialiased ${isMain ? "" : "bg-background"}`}>
      <StoreNavbar />
      <main className="flex-1 pt-24">
        <Outlet />
      </main>
      <StoreFooter />
      {/* Bottom Nav Mobile */}
      <nav className="fixed bottom-0 w-full lg:hidden z-50 glass-nav border-t border-white/10 rounded-t-xl overflow-hidden">
        <div className="flex justify-around items-center h-16 px-margin-mobile">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center ${pathname === "/" ? "text-primary-container drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] scale-110" : "text-secondary"} airy-interaction`}
          >
            <span className="material-symbols-outlined" style={pathname === "/" ? { fontVariationSettings: "'FILL' 1" } : undefined}>home</span>
            <span className="font-label-caps text-[10px] uppercase mt-1">Home</span>
          </Link>
          <Link
            to="/productos"
            className={`flex flex-col items-center justify-center ${pathname === "/productos" ? "text-primary-container drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] scale-110" : "text-secondary"} airy-interaction`}
          >
            <span className="material-symbols-outlined" style={pathname === "/productos" ? { fontVariationSettings: "'FILL' 1" } : undefined}>grid_view</span>
            <span className="font-label-caps text-[10px] uppercase mt-1">Catalog</span>
          </Link>
          <Link
            to="/carrito"
            className={`flex flex-col items-center justify-center ${pathname === "/carrito" ? "text-primary-container drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] scale-110" : "text-secondary"} relative airy-interaction`}
          >
            <span className="material-symbols-outlined" style={pathname === "/carrito" ? { fontVariationSettings: "'FILL' 1" } : undefined}>shopping_cart</span>
            <span className="font-label-caps text-[10px] uppercase mt-1">Cart</span>
          </Link>
          <Link
            to="/login"
            className={`flex flex-col items-center justify-center ${pathname === "/login" ? "text-primary-container drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] scale-110" : "text-secondary"} airy-interaction`}
          >
            <span className="material-symbols-outlined" style={pathname === "/login" ? { fontVariationSettings: "'FILL' 1" } : undefined}>account_circle</span>
            <span className="font-label-caps text-[10px] uppercase mt-1">Account</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default StoreLayout
