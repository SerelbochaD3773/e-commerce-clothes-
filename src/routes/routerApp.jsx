import LoginPage from "../pages/LoginPage"
import ProductsPage from "../pages/ProductsPage"
import ProtectedRoute from "../pages/ProtectedRoute"
import AdminLayout from "../layouts/AdminLayout"
import App from "../App"

let routerApp = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "login",
                element: <LoginPage />
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        element: <AdminLayout />,
                        children: [
                            {
                                path: "productos",
                                element: <ProductsPage />
                            }
                        ]
                    }
                ]
            },
            {
                path: "*",
                element: <LoginPage />
            }
        ]
    }
]

export default routerApp
