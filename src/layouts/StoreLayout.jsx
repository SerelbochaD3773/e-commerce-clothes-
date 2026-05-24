import { Outlet } from "react-router-dom"
import StoreNavbar from "../components/StoreNavbar"
import StoreFooter from "../components/StoreFooter"
import { useCart } from "../context/CartContext"

function StoreLayout() {
  const { totalItems } = useCart()

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <StoreNavbar cartCount={totalItems} />
      <main className="flex-1">
        <Outlet />
      </main>
      <StoreFooter />
    </div>
  )
}

export default StoreLayout
