import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar"

function AdminLayout() {
  return (
    <div className="bg-background text-on-surface antialiased min-h-screen">
      <AdminSidebar />
      <main className="lg:ml-64 pt-20 lg:pt-0 p-margin-mobile lg:p-margin-desktop min-h-screen">
        <div className="max-w-container-max mx-auto space-y-stack-lg">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
