import { useEffect, useState } from "react";
import axios from "axios";
import UserList from "../components/users/UserList";
import TxnList from "../components/transactions/TxnList";
import RefreshButton from "../components/ui/RefreshButton";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getBalance(setBalance);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Balance Card */}
      <div className="mt-4 w-full max-w-sm rounded-lg bg-white p-4 text-center shadow-lg">
        <p className="flex items-center justify-center text-lg font-semibold text-gray-700">
          Your balance: <span className="ml-2 text-green-600">₹{balance}</span>
          <RefreshButton
            onClick={() => getBalance(setBalance)}
          >
            🔃
          </RefreshButton>
        </p>
      </div>

      {/* Main Content Section: User List & Transactions */}
      <div className="mt-6 flex w-full max-w-4xl gap-6 md:flex-row flex-col">
        {/* User List Component */}
        <div className="flex-1 min-w-[300px]">
          <UserList balance={balance} updateBalance={() => getBalance(setBalance)} />
        </div>

        {/* Transaction List Component */}
        <div className="flex-1 min-w-[300px]">
          <TxnList transactions={[]} /> {/* Pass actual transactions here */}
        </div>
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
