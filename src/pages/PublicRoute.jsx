import { getLocalStorage } from "../helpers/local-storage"
import { Navigate, Outlet } from "react-router-dom"

function PublicRoute() {
  let session = getLocalStorage("session")
  return session ? <Navigate to="/" /> : <Outlet />
}

export default PublicRoute
