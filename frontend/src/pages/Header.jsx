export default function Header() {
  const logged = JSON.parse(localStorage.getItem("logged"));

  const logOut = () => {
    localStorage.removeItem("logged");
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  return (
    <header className=" w-full bg-slate-600 flex justify-between px-5">
      {" "}
      <h1>layTM</h1>{" "}
      {logged ? (
        <div>
          {" "}
          <p>welcome user</p>
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        ""
      )}{" "}
    </header>
  );
}
