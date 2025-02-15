/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import axios from "axios";
import Send from "../components/Send.jsx";
import Loading from "../components/Loading.jsx";
import Warning from "./Warning.jsx";

export default function UserList({ balance, updateBalance }) {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [receiverUser, setReceiverUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadingYes = () => {
    setLoading(true);
  };
  const loadingNo = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (filter == "") {
      getUsers("", setUsers, loadingYes, loadingNo);
    }
    return;
  }, [filter]);

  const modalOpen = (user) => {
    setReceiverUser(user);
    setShowModal(true);
  };
  const modalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full">
      {loading ? <Loading /> : null}
      {showModal && (
        <Send
          modalClose={modalClose}
          user={receiverUser}
          balance={balance}
          updateBalance={updateBalance}
        />
      )}

      <div className=" flex justify-between pr-40">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Users </h2>
        {error ? <Warning message={error} removeWarning={setError} /> : null}
      </div>

      {/* Search Bar */}
      <div className="flex space-x-2 mb-4">
        <input
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Search users"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button
          onClick={() => {
            if (filter == "") {
              setError("Enter a filter");
              return;
            }
            getUsers(filter, setUsers, loadingYes, loadingNo);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {/* User List */}
      <ul className="space-y-3">
        {users.map((user) => (
          <li
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow"
            key={user._id}
          >
            <h3 className="text-gray-700">
              {user.firstName} {user.lastName}
            </h3>
            <button
              onClick={() => modalOpen(user)}
              className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Send Money
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const getUsers = async (filter, setUsers, loadingYes, loadingNo) => {
  loadingYes();
  const API_URL = import.meta.env.VITE_API_URL;
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const response = await axios.get(`${API_URL}/user/bulk`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: { filter },
    });
    loadingNo();
    setUsers(response.data.users);
  } catch (error) {
    console.error("Error fetching users:", error);
    loadingNo();
  }
};
