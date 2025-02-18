import { useEffect, useState } from "react";
import axios from "axios";
import UserList from "../components/UserList";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getBalance(setBalance);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <div className="mt-4 p-4 bg-white shadow-lg rounded-lg w-full max-w-sm text-center">
        <p className="  text-lg font-semibold text-gray-700 flex items-center justify-center">
          Your balance: <span className="ml-2 text-green-600">₹{balance}</span>
          <button
            className="ml-5 cursor-pointer transition-transform duration-200 hover:scale-125 active:scale-75 "
            onClick={() => {
              getBalance(setBalance);
            }}
          >
            🔃
          </button>
        </p>
      </div>

      <div className="mt-6 w-full max-w-md">
        <UserList
          balance={balance}
          updateBalance={() => getBalance(setBalance)}
        />
      </div>
    </div>
  );
}

const getBalance = async (setBalance) => {
  
  const token = JSON.parse(localStorage.getItem("token"));
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    const response = await axios.get(`${API_URL}/account/balance`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setBalance(response.data.balance);
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
};
