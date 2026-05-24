import { getLocalStorage } from "../helpers/local-storage"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute() {
  let session = getLocalStorage("session")
  return session ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
