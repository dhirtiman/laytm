import { useEffect, useState } from "react";
import axios  from "axios";
import UserList from "../components/UserList";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    const API_URL = import.meta.env.VITE_API_URL;
    axios
      .get(`${API_URL}/account/balance`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setBalance(response.data.balance);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <br></br>
      <div className="">Your balance is {balance}</div>
      <UserList/>
    </div>
  );
}


