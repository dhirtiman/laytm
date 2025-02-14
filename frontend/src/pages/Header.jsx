export default function Header() {
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
    <header className="w-full bg-slate-700 text-white flex justify-between items-center py-4 px-6 shadow-md">
      {/* Branding */}
      <h1 className="text-2xl font-bold">layTM</h1>

      {/* Logged-in User Section */}
      {logged && (
        <div className="flex items-center gap-4">
          <p className="text-lg">Welcome, <span className="font-semibold">{firstName}</span></p>
          <button
            onClick={logOut}
            className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg shadow"
          >
            Log out
          </button>
        </div>
      )}
    </header>
  );
}
