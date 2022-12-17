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
import ReactModal from 'react-modal';


function App(){
  const [user, setUser] = useState(null);
  const [loggedOut, setLoggedOut] = useState(true);
  const [rescues, setRescues] = useState([])
  const [userRescues, setUserRescues] = useState([])
  const [userRescue, setUserRescue] = useState({}) 
  const [isAdmin, setIsAdmin] = useState(false)
  const [rescue, setRescue] = useState({})
  const [displayedRescs, setDisplayedRescs] = useState(rescues)
  const [errors, setErrors] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

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
  }
  function onDeleteUserRescue(rescue, user) {
   let id = user.userrescues.find(uR => uR.rescue.id === rescue.id)
      fetch(`/userrescues/${id.id}`, { 
            method: 'DELETE'
        })
     const s = {...user};
        s.userrescues = user.userrescues.filter(u => u.id !== id.id)
        setUser(s)   
     }
  function handleLogout() {
    setUser(null);
    setLoggedOut(true)
    setUserRescues([])
    setRescue({})
    setIsOpen(true)
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
      const s = {...user};
      s.userrescues = [...user.userrescues, ur]
      setUser(s)
    })
  }

  return (
    <div className="App">
      <h1 className="Hello">Pawsitive Pets</h1>
      {user ? <ReactModal
        isOpen={isOpen}
        contentLabel="Example Modal"
        ariaHideApp={false}                    
        onRequestClose={() => setIsOpen(false)}>
        Welcome, {user.name}!
        <button onClick={() => setIsOpen(false)}>Close</button>
      </ReactModal> : null } 
    <NavBar user={user} onLogout={handleLogout} loggedOut={loggedOut} setLoggedOut={setLoggedOut} />
    <Switch>
      <Route exact path="/login">
        <LogIn isOpen={isOpen} setIsOpen={setIsOpen} errors={errors} setErrors={setErrors} handleLogIn={handleLogIn} handleLogout={handleLogout} onLogout={handleLogout} user={user} setUser={setUser} loggedOut={loggedOut} setLoggedOut={setLoggedOut} />
      </Route>
      <Route exact path="/signup">
        <SignUp isOpen={isOpen} setIsOpen={setIsOpen} errors={errors} setErrors={setErrors} handleLogIn={handleLogIn} handleLogout={handleLogout} onLogout={handleLogout} user={user} setUser={setUser} loggedOut={loggedOut} setLoggedOut={setLoggedOut} />
      </Route>
      {user && !loggedOut ? 
      <Route exact path="/welcome">
       <Welcome user={user} handleLogout={handleLogout} />
       </Route> : null} 
       {user && !loggedOut ? 
       <Route exact path="/myrescues">
        <MyRescues isOpen={isOpen} setIsOpen={setIsOpen} errors={errors} setErrors={setErrors} rescues={rescues} userRescue={userRescue} setUserRescue={setUserRescue} onDeleteUserRescue={onDeleteUserRescue} setRescue={setRescue} rescue={rescue} isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} userRescues={userRescues} setUserRescues={setUserRescues} />
        </Route>  : null} 
        {user && !loggedOut ? 
          <Route exact path="/allrescues">
         <AllRescues isOpen={isOpen} setIsOpen={setIsOpen} errors={errors} setErrors={setErrors} displayedRescs={displayedRescs} setDisplayedRescs={setDisplayedRescs} animalArray={animalArray} locationArray={locationArray} updateUserRescues={updateUserRescues} setRescue={setRescue} rescue={rescue} isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} handleLogout={handleLogout} rescues={rescues} setRescues={setRescues} rescue={rescue} setRescue={setRescue} />
         </Route> : null} 
         {user && !loggedOut ? 
          <Route exact path="/newrescue">
          <NewRescue isOpen={isOpen} setIsOpen={setIsOpen} errors={errors} setErrors={setErrors} user={user} setRescues={setRescues} rescues={rescues} userRescues={userRescues} setUserRescues={setUserRescues} />
          </Route> 
       : null} 
    </Switch> 
  </div>
  );
}

export default App;