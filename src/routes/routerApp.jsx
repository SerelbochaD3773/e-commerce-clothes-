import MainPage from "../pages/MainPage"
import Contact from "../pages/Contact"
import Products from "../pages/Products"
import LoginVelvora from "../pages/LoginVelvora"
import RegistroVelvora from "../pages/RegistroVelvora"

let routerApp = [
    {
        path: "/",
        element: <MainPage />
    },
    {
        path: "/contact",
        element: <Contact />
    },
    {
        path: "/productos",
        element: <Products />
    },
    {
        path: "/login",
        element: <LoginVelvora />
    },
    {
        path: "/registro",
        element: <RegistroVelvora />
    }
]
export default routerApp