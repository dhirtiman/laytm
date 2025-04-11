import { useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";

import Button from "../ui/Button.jsx";
import Loading from "../ui/Loading.jsx";
import Warning from "../ui/Warning.jsx";

const toCent = (n) => {
  return (n * 100).toFixed(0);
};

export default function Send({ modalClose, user, balance, updateBalance }) {
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadingYes = () => {
    setLoading(true);
  };
  const loadingNo = () => {
    setLoading(false);
  };

  const transfer = async () => {
    if (amount == 0 || amount == null) {
      setError("Enter a valid amount");
      return;
    }
    loadingYes();
    const API_URL = import.meta.env.VITE_API_URL;
    const token = JSON.parse(localStorage.getItem("token"));
    const body = {
      to: user._id,
      amount: toCent(amount),
    };

    axios
      .post(`${API_URL}/account/transfer`, body, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        loadingNo();
        updateBalance();
        modalClose();
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
        
        loadingNo();
      });
  };

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      {loading ? <Loading /> : null}

      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-xl font-semibold text-gray-800">Send Money</h2>
            <button
              className="text-gray-500 hover:text-gray-700 text-lg font-bold"
              onClick={modalClose}
            >
              ✕
            </button>
          </div>

          <div className="mt-4 flex flex-col">
            <p className="text-lg font-semibold text-gray-700">
              Your balance: <span className="text-green-600">₹{balance}</span>
            </p>
            <h3 className="text-lg text-gray-700 font-medium">
              Send Money to:{" "}
              <span className="text-red-600">
                {user.firstName} {user.lastName}{" "}
              </span>
            </h3>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              placeholder="Enter Amount"
              className="w-full mt-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {error ? (
              <Warning message={error} removeWarning={setError} />
            ) : null}

            <Button onClick={transfer}>Send</Button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
} 