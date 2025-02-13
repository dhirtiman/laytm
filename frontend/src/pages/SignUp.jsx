import { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const setUsernameInput = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const signUp = async () => {
    if (username == "" || firstName == "" || lastName == "" || password == "") {
      console.log('incomplete inputs');
      
      return
    }

    const API_URL = import.meta.env.VITE_API_URL || "bombobclit"; //'http://localhost:3000/api/v1'
    const user = {
      username,
      firstName,
      lastName,
      password,
    };
    console.log(API_URL, user);

    axios
      .post(`${API_URL}/user/signup`, { ...user })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className=" ">
      <h1>Sign up</h1>
      <p>Enter your information to create an account</p>
      <input
        placeholder="firstName"
        value={firstName}
        onChange={(e) => {
          setFirstname(e.target.value);
        }}
      ></input>
      <br></br>
      <input
        placeholder="lastName"
        value={lastName}
        onChange={(e) => {
          setLastname(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key == "enter") signUp;
        }}
      ></input>
      <br></br>

      <input
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key == "enter") signUp;
        }}
      ></input>
      <br></br>

      <input
        placeholder="username"
        value={username}
        onChange={setUsernameInput}
      ></input>
      <br></br>
      <button type="button" onClick={signUp}>
        Sign up
      </button>

      <p>Already have an account?</p>
      <Link to="/signin">click here</Link>
    </div>
  );
}
