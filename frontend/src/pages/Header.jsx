
export default function Header() {
  const logged = JSON.parse(localStorage.getItem("logged"));
  const user = JSON.parse(localStorage.getItem('user')) || {}

  const firstName = user.firstName


  const logOut = () => {
    localStorage.removeItem("logged");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/signin";
  };

  
  // use effect to retrive user data
  

  return (
    <header className=" w-full bg-slate-600 flex justify-between px-5">
      {" "}
      <h1>layTM</h1>{" "}
      {logged ? (
        <div>
          {" "}
          <p>welcome {firstName}</p>
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        ""
      )}{" "}
    </header>
  );
}
