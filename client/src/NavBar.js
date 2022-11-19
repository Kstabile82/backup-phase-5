import { Link } from "react-router-dom";

function NavBar({ onLogout, loggedOut, setLoggedOut }) {
    function handleLogout() {
      fetch("/logout", {
        method: "DELETE",
      }).then(() => onLogout());
      setLoggedOut(true)
    }
    return (
      <header>
        <h1>
          {loggedOut ? <Link to="/">Home          </Link> : null}
          {!loggedOut ? <Link to="/welcome">Welcome</Link> : null}
          {loggedOut ? <Link to="/login">Log In</Link> : null } 
          {loggedOut ? <Link to="/signup">Sign Up </Link> : null }
          {!loggedOut ? <Link to="/" onClick={handleLogout}>Log Out</Link> : null }
          {!loggedOut ? <Link to="/allrescues">All Rescues</Link> : null }
          {!loggedOut ? <Link to="/myrescues">My Rescues</Link> : null }
          {!loggedOut ? <Link to="/newrescue">Create New Rescue</Link> : null }
        </h1>
             </header>
    );
  }
      export default NavBar;