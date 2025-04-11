import { useEffect, useMemo, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { usersAtom } from "../../store/atoms/usersAtom";
import axios from "axios";
import RefreshButton from "../ui/RefreshButton.jsx";

export default function TxnList() {
  const [txns, setTxns] = useState([]);
  const users = useRecoilValueLoadable(usersAtom); // come from db

  useEffect(() => {
    getTxns(setTxns);
  }, []);

  const transactions = useMemo(() => {
    return txns.map((txn) => {
      const toUser = users.contents.find((user) => user._id === txn.to);
      const fromUser = users.contents.find((user) => user._id === txn.from);

      return {
        _id: txn._id,
        amount: txn.amount,
        to: toUser ? `${toUser.firstName} ${toUser.lastName}` : "You",
        from: fromUser ? `${fromUser.firstName} ${fromUser.lastName}` : "You",
        date: formatDate(new Date(txn.date)),
      };
    });
  }, [txns, users]);

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-800">Transactions <RefreshButton onClick={() => getTxns(setTxns)}>🔃</RefreshButton></h2>
        
      {transactions.length > 0 ? (
        <ul className="space-y-3">
          {transactions.map((txn) => (
            <li
              key={txn._id}
              className="flex items-center justify-between rounded-lg bg-gray-50 p-4 shadow-sm"
            >
              <p className="text-gray-700">
                <span className="font-semibold">{txn.from}</span> sent
                <span className="mx-1 font-semibold">{txn.to}</span>
                <span className="ml-2 text-green-600">
                  ₹{txn.amount}
                </span> on <span className="text-gray-600">{txn.date}</span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No transactions available</p>
      )}
    </div>
  );
}

const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const getTxns = async (setTxns) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    const response = await axios.get(`${API_URL}/account/txns`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setTxns(response.data.txns);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}; 