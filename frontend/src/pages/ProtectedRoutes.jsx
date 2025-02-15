import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {
  const logged = JSON.parse(localStorage.getItem("logged"));
  return logged ? <Outlet /> : <Navigate to="/signin" replace />;
}
