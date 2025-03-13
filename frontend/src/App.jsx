import { lazy, useEffect } from "react";
import axios from "axios";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { RecoilRoot } from "recoil";

import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));

import Header from "./pages/Header.jsx";

import ProtectedRoutes from "./pages/ProtectedRoutes.jsx";
import NotProtectedRoutes from "./pages/NotProtectedRoutes.jsx";

function App() {
  useEffect(() => {
    const hasRun = sessionStorage.getItem("effectRun");

    if (!hasRun) {
      console.log("Effect running for the first time in this session!");
      // wake server
      const API_URL = import.meta.env.VITE_API_URL || "bombobclit2";
      axios
        .get(`${API_URL}/user/wake`, {})
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      sessionStorage.setItem("effectRun", "true");
    }
  }, []);
  return (
    <div>
      <Header></Header>
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route element={<NotProtectedRoutes />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route
              path="*"
              element={
                JSON.parse(localStorage.getItem("logged")) ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
