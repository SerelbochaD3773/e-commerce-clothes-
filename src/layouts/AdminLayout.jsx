import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar"

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
