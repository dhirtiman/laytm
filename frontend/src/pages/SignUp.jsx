import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Heading from "../components/Heading.jsx";
import Button from "../components/Button.jsx";
import InputBox from "../components/InputBox.jsx";
import Loading from "../components/Loading.jsx";
import Warning from "../components/Warning.jsx";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  const loadingYes = () => {
    setLoading(true);
  };
  const loadingNo = () => {
    setLoading(false);
  };

  const signUp = async () => {
    if (!username || !firstName || !lastName || !password) {
      setError("Incomplete inputs");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!emailRegex.test(username)) {
      setError("Invalid email");
      return;
    }
    loadingYes();
    const API_URL = import.meta.env.VITE_API_URL || "bombobclit";
    const user = { username, firstName, lastName, password };


    axios
      .post(`${API_URL}/user/signup`, user)
      .then(() => {
        loadingNo();
        window.location.href = "/signin";
      })
      .catch((error) => {
        setError(error.response.data.message);
        loadingNo();
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {loading ? <Loading /> : null}
      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Heading */}
        <Heading>Sign up</Heading>
        <p className="text-gray-600 text-center mb-6">
          Enter your information to create an account
        </p>

        {/* Form */}
        <div className="space-y-4">
          <InputBox
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
          />

          <InputBox
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
          />

          <InputBox
            type="email"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <InputBox
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") signUp();
            }}
          />

          <Button onClick={signUp} className="w-full">
            Sign up
          </Button>
        </div>

        {/* Footer */}
        <div className="">
          <p className="text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Click here
            </Link>
          </p>
          {error ? <Warning message={error} removeWarning={setError} /> : null}
        </div>
      </div>
    </div>
  );
}
