import { lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));

import Header from "./pages/Header.jsx";

import ProtectedRoutes from "./pages/ProtectedRoutes.jsx";
import NotProtectedRoutes from "./pages/NotProtectedRoutes.jsx";

function App() {
  return (
    <div>
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route element={<NotProtectedRoutes />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
