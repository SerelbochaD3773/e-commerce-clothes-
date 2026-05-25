import LoginVelvora from "../pages/LoginVelvora"
import RegistroVelvora from "../pages/RegistroVelvora"
import DashboardPage from "../pages/DashboardPage"
import InventoryPage from "../pages/InventoryPage"
import CustomerProducts from "../pages/CustomerProducts"
import CartPage from "../pages/CartPage"
import MainPage from "../pages/MainPage"
import ContactPage from "../pages/ContactPage"
import ProtectedRoute from "../pages/ProtectedRoute"
import AdminLayout from "../layouts/AdminLayout"
import StoreLayout from "../layouts/StoreLayout"

let routerApp = [
  {
    element: <StoreLayout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/productos", element: <CustomerProducts /> },
      { path: "/contacto", element: <ContactPage /> },
      { path: "/carrito", element: <CartPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginVelvora />,
  },
  {
    path: "/registro",
    element: <RegistroVelvora />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "/admin", element: <DashboardPage /> },
          { path: "/admin/productos", element: <InventoryPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <LoginVelvora />,
  },
]

export default routerApp
