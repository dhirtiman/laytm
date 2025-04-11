/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";

import {usersAtom} from "../../store/atoms/usersAtom.js";

import Send from "../transactions/Send.jsx";
import Loading from "../ui/Loading.jsx";
import Warning from "../ui/Warning.jsx";

export default function UserList({ balance, updateBalance }) {
  const [users, setUsers] = useRecoilState(usersAtom);

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
  }, [filter, setUsers]);

  const modalOpen = (user) => {
    setReceiverUser(user);
    setShowModal(true);
  };
  const modalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md ">
      {loading ? <Loading /> : null}
      {showModal && (
        <Send
          modalClose={modalClose}
          user={receiverUser}
          balance={balance}
          updateBalance={updateBalance}
        />
      )}

      <div className="flex justify-between pr-40">
        <h2 className="mb-4 text-xl font-bold text-gray-800">Users </h2>
        {error ? <Warning message={error} removeWarning={setError} /> : null}
      </div>

      {/* Search Bar */}
      <div className="mb-4 flex space-x-2">
        <input
          className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
          className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* User List */}
      <ul className="space-y-3">
        {users.map((user) => (
          <li
            className="flex items-center justify-between rounded-lg bg-gray-50 p-3 shadow"
            key={user._id}
          >
            <h3 className="text-gray-700">
              {user.firstName} {user.lastName}
            </h3>
            <button
              onClick={() => modalOpen(user)}
              className="rounded-lg bg-green-500 px-3 py-2 text-white transition hover:bg-green-600"
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