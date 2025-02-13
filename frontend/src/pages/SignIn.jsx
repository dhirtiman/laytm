import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h1>Sign in</h1>
      <p>Enter your credentials to access your account</p>

      <input
        placeholder="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      ></input>
      <br></br>

      <input
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <br></br>

      <button
        onClick={async () => {
          const user = {
            username,
            password,
          };
          const API_URL = import.meta.env.VITE_API_URL || "bombobclit2"; // "http://localhost:3000/api/v1"
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
              window.location.href = "/dashboard";
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        Sign in
      </button>

      <p>If you dont have an account </p>
      <Link to="/signup">create one</Link>
    </div>
  );
}
