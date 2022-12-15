import './App.css';
import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Welcome from "./Welcome";
import AllRescues from "./AllRescues";
import MyRescues from "./MyRescues";
import NewRescue from "./NewRescue";

function App(){
  const [user, setUser] = useState(null);
  const [loggedOut, setLoggedOut] = useState(true);
  const [rescues, setRescues] = useState([])
  const [userRescues, setUserRescues] = useState([])
  const [userRescue, setUserRescue] = useState({}) 
  const [isAdmin, setIsAdmin] = useState(false)
  const [resc, setResc] = useState({})
  const [rescue, setRescue] = useState({})
  const [displayedRescs, setDisplayedRescs] = useState(rescues)

  const animalArray = []; 
  const locationArray = [];
    useEffect(() => {
    fetch("/me")
    .then((response) => {
      if (response.ok) {
        response.json().then((u) => {
          setLoggedOut(false)
          setUser(u);
          setLoggedOut(false)
          setUserRescues(u.userrescues)
        })
      }
    })
  }, []);
  useEffect(() => {
    fetch("/rescues")
    .then((r) => r.json())
    .then((currentRescues) => {
      setRescues(currentRescues)
      setDisplayedRescs(currentRescues)
      
    });
    },[]);
  function handleLogIn(user) {
    setUser(user);
    setLoggedOut(false)
    setUserRescues(user.userrescues)
  }
  
  function onDeleteUserRescue(rescue, user) {
   let id = user.userrescues.find(uR => uR.rescue.id === rescue.id)
      fetch(`/userrescue/${id.id}`, { 
            method: 'DELETE'
        })
        setUserRescues(userRescues.filter(uRs => uRs.id !== id))  
      }

  function handleLogout() {
    setUser(null);
    setLoggedOut(true)
    setUserRescues([])
    setResc({})
  }
  function updateUserRescues(rescue, e) {
    e.preventDefault();
    fetch("/myrescues", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        rescue_id: rescue.id,
        user_id: user.id,
        status: "Guest"
        }),
    })
    .then((r) => r.json())
    .then((ur) => {
      setUserRescues([...userRescues, ur])
    })
  }
  function handleRemoveAdmin(e, v){
   fetch(`/userrescues/${v.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "Guest" }),
        })
        .then((r) => r.json())
        .then((updatedUR) => console.log(updatedUR))
}
function handleAddAdmin(e, v){
  fetch(`/userrescues/${v.id}`, {
           method: "PATCH",
           headers: {
               "Content-Type": "application/json",
           },
           body: JSON.stringify({ status: "Admin" }),
       })
       .then((r) => r.json())
       .then((updatedUR) => console.log(updatedUR))
}
  return (
    <div className="App">
      <h1 className="Hello">Pawsitive Pets</h1>
    <NavBar user={user} onLogout={handleLogout} loggedOut={loggedOut} setLoggedOut={setLoggedOut} />
    <Switch>
      <Route exact path="/login">
        <LogIn handleLogIn={handleLogIn} handleLogout={handleLogout} onLogout={handleLogout} user={user} setUser={setUser} loggedOut={loggedOut} setLoggedOut={setLoggedOut} />
      </Route>
      <Route exact path="/signup">
        <SignUp handleLogIn={handleLogIn} handleLogout={handleLogout} onLogout={handleLogout} user={user} setUser={setUser} loggedOut={loggedOut} setLoggedOut={setLoggedOut} />
      </Route>
      {user && !loggedOut ? 
      <Route exact path="/welcome">
       <Welcome user={user} handleLogout={handleLogout} />
       </Route> : null} 
       {user && !loggedOut ? 
       <Route exact path="/myrescues">
        <MyRescues rescues={rescues} userRescue={userRescue} setUserRescue={setUserRescue} onDeleteUserRescue={onDeleteUserRescue} handleRemoveAdmin={handleRemoveAdmin} handleAddAdmin={handleAddAdmin} setResc={setResc} resc={resc} isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} userRescues={userRescues} setUserRescues={setUserRescues} />
        </Route>  : null} 
        {user && !loggedOut ? 
          <Route exact path="/allrescues">
         <AllRescues displayedRescs={displayedRescs} setDisplayedRescs={setDisplayedRescs} animalArray={animalArray} locationArray={locationArray} updateUserRescues={updateUserRescues} setResc={setResc} resc={resc} isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} handleLogout={handleLogout} rescues={rescues} setRescues={setRescues} rescue={rescue} setRescue={setRescue} />
         </Route> : null} 
         {user && !loggedOut ? 
          <Route exact path="/newrescue">
          <NewRescue user={user} setRescues={setRescues} rescues={rescues} userRescues={userRescues} setUserRescues={setUserRescues} />
          </Route> 
       : null} 
    </Switch> 
  </div>
  );
}

export default App;