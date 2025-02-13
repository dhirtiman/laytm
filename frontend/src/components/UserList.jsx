import { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get(`${API_URL}/user/bulk`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          filter: filter,
        },
      })
      .then((response) => {
        setUsers(response.data.users);
      });
  }, [filter]);

  return (
    <div>
      <h1>Users</h1>
      <input
        className="border-1 border-black"
        type="text"
        placeholder="search users"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      ></input>
      <ul>
        {users.map((user) => (
          <li className="flex justify-between" key={user._id}>
            <h2>{user.firstName}</h2> <button>Send money</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
