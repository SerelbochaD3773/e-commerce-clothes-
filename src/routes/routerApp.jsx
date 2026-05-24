
import MainPage from "../pages/MainPage"
import Contact from "../pages/Contact"
import Products from "../pages/Products"


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
    }
]
  export default routerApp