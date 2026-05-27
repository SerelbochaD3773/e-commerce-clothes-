import { Outlet } from "react-router-dom"
import StoreNavbar from "../components/StoreNavbar"
import StoreFooter from "../components/StoreFooter"
import AmbientParticles from "../components/AmbientParticles"

function StoreLayout() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md antialiased">
      <AmbientParticles count={15} />
      <div className="gradient-mesh" />
      <StoreNavbar />
      <main className="flex-1 pt-24">
        <Outlet />
      </main>
      <StoreFooter />
    </div>
  )
}

export default StoreLayout
