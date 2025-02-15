import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Heading from "../components/Heading.jsx";
import Button from "../components/Button.jsx";
import InputBox from "../components/InputBox.jsx";
import Loading from "../components/Loading.jsx";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loadingYes = () => {
    setLoading(true);
  };
  const loadingNo = () => {
    setLoading(false);
  };

  const signUp = async () => {
    if (!username || !firstName || !lastName || !password) {
      console.log("Incomplete inputs");
      return;
    }
    loadingYes();
    const API_URL = import.meta.env.VITE_API_URL || "bombobclit";
    const user = { username, firstName, lastName, password };

    console.log(API_URL, user);

    axios
      .post(`${API_URL}/user/signup`, user)
      .then((response) => {
        console.log(response);
        loadingNo();
        window.location.href = "/signin";
      })
      .catch((error) => {
        console.log(error);
        loadingNo();
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    {loading ? <Loading/> : null}
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
            type="text"
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
        <p className="text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
}
