import { Navigate } from "react-router-dom"
import LoginVelvora from "../pages/LoginVelvora"
import RegistroVelvora from "../pages/RegistroVelvora"
import DashboardPage from "../pages/DashboardPage"
import InventoryPage from "../pages/InventoryPage"
import CatalogPage from "../pages/CatalogPage"
import CustomerProducts from "../pages/CustomerProducts"
import CartPage from "../pages/CartPage"
import MainPage from "../pages/MainPage"
import ContactPage from "../pages/ContactPage"
import DetailedReportPage from "../pages/DetailedReportPage"
import ProtectedRoute from "../pages/ProtectedRoute"
import PublicRoute from "../pages/PublicRoute"
import AdminLayout from "../layouts/AdminLayout"
import StoreLayout from "../layouts/StoreLayout"

let routerApp = [
  { path: "/productos", element: <CatalogPage /> },
  {
    element: <StoreLayout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/contacto", element: <ContactPage /> },
      { path: "/carrito", element: <CartPage /> },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <LoginVelvora /> },
      { path: "/registro", element: <RegistroVelvora /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "/admin", element: <DashboardPage /> },
          { path: "/admin/productos", element: <InventoryPage /> },
          { path: "/admin/reportes", element: <DetailedReportPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]

export default routerApp
