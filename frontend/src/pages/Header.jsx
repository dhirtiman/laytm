
import Dialog from "../components/Dialog";
import {  useState } from "react";

export default function Header() {
  const [showDialog, setShowDialog] = useState(false);

  const showDialogYes = () => {
    setShowDialog(true);
  };

  const showDialogNo = () => {
    setShowDialog(false);
  };

  const logged = JSON.parse(localStorage.getItem("logged"));
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const firstName = user.firstName;

  const logOut = () => {
    localStorage.removeItem("logged");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/signin";
  };

  

  return (
    <>
      {showDialog ? (
        <Dialog
          title="Log out"
          description="Are you sure you want to log out?"
          dialogClose={() => showDialogNo()}
          yes={() => {
            logOut();
            showDialogNo();
          }}
          no={() => showDialogNo()}
        />
      ) : null}
      <header className="w-full bg-slate-700 text-white flex justify-between items-center py-4 px-6 shadow-md">
        {/* Branding */}
        <h1 className="text-2xl font-bold">LayTM</h1>

        {/* Logged-in User Section */}
        {logged && (
          <div className="flex items-center gap-4">
            <p className="text-lg">
              Welcome, <span className="font-semibold">{firstName}</span>
            </p>
            <button
              onClick={showDialogYes}
              className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg shadow"
            >
              Log out
            </button>
          </div>
        )}
      </header>
    </>
  );
}
