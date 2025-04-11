import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import Heading from "../components/ui/Heading.jsx";
import Button from "../components/ui/Button.jsx";
import InputBox from "../components/ui/InputBox.jsx";
import Loading from "../components/ui/Loading.jsx";
import Warning from "../components/ui/Warning.jsx";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadingYes = () => {
    setLoading(true);
  };
  const loadingNo = () => {
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {loading ? <Loading /> : null}

      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Heading */}
        <Heading className="text-center text-2xl font-bold text-gray-800 mb-4">
          Sign in
        </Heading>
        <p className="text-gray-600 text-center mb-6">
          Enter your credentials to access your account
        </p>

        {/* Form */}
        <div className="space-y-4">
          <InputBox
            type="email"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <InputBox
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <Button
            onClick={async () => {
              if (username === "" || password === "") {
                setError("Please fill all the fields");
                return;
              }
              loadingYes();
              const user = { username, password };
              const API_URL = import.meta.env.VITE_API_URL || "bombobclit2";

              axios
                .post(`${API_URL}/user/signin`, user)
                .then((response) => {
                  localStorage.setItem(
                    "token",
                    JSON.stringify(response.data.token)
                  );
                  localStorage.setItem(
                    "user",
                    JSON.stringify({
                      firstName: response.data.firstName,
                      lastName: response.data.lastName,
                    })
                  );
                  localStorage.setItem("logged", JSON.stringify(true));
                  loadingNo();
                  window.location.href = "/dashboard";
                })
                .catch((err) => {
                  setError(err.response.data.message);
                  loadingNo();
                });
            }}
            className="w-full"
          >
            Sign in
          </Button>
        </div>

        {/* Footer */}
        <div>
          <p className="text-gray-600 text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Create one
            </Link>
          </p>
          {error ? <Warning message={error} removeWarning={setError} /> : null}
        </div>
      </div>
    </div>
  );
}
