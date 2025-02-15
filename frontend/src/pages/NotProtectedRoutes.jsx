import { Outlet, Navigate } from "react-router-dom";

export default function NotProtectedRoutes() {
  const logged = JSON.parse(localStorage.getItem("logged"));
  return logged ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
