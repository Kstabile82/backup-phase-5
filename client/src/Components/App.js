import './App.css';
import { useState, useEffect } from "react";
import { Route, Switch, HashRouter } from 'react-router-dom'
// import { BrowserRouter as Routes, Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Welcome from "./Welcome";
import AllRescues from "./AllRescues";
import MyRescues from "./MyRescues";
import NewRescue from "./NewRescue";
import UserContext from "./UserContext"

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
const [showingErrors, setShowingErrors] = useState(false)

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
  
    function postNewRescue(newRescue) {
      fetch ("/newrescue", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(newRescue, user)
          })
      .then((r) => { 
          if (r.ok) { 
              r.json()
      .then(rescue => {
          setRescues([...rescues, rescue])
          setDisplayedRescs([...displayedRescs, rescue])

          fetch ("/myrescues", {
              method: "POST",
              headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify({ rescue_id: rescue.id, user_id: user.id, status: "Admin" })
              })
          .then((r) => r.json())
          .then((r) => {
              setUserRescues([...userRescues, r]) 
              // setAdded(true)
          })
      })
  }
  else {
      r.json().then((errorInfo) => {
        setErrors(errorInfo.errors)
        setShowingErrors(!showingErrors)
         })
  }   
  })
  }
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
        setUserRescues(s.userrescues) 
        setRescue({})
     }
  function handleLogout() {
    setUser(null);
    setLoggedOut(true)
    setUserRescues([])
    setRescue({})
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
      setUserRescues([...userRescues, ur])
    })
  }
  function handleCloseErrors(e) {
    e.preventDefault();
    setErrors(null)
    setShowingErrors(!showingErrors)
}
// function handleDelResc(resc) {
//   fetch(`/rescues/${resc.id}`, { 
//     method: 'DELETE'
// })
// setRescues(rescues.filter(r => r.id !== resc.id))
// setUserRescues(userRescues.filter(uR => uR.rescue_id !== resc.id))
// setRescue(null)
// }
  return (
  <HashRouter>
    <div className="App">         <h1 className="Hello">Pawsitive Pets</h1>

      {/* <h1 className="Hello">Pawsitive Pets</h1> */}
    <NavBar user={user} onLogout={handleLogout} loggedOut={loggedOut} setLoggedOut={setLoggedOut} />
    <Switch>
      <Route path="/login">
        <LogIn setUserRescues={setUserRescues} showingErrors={showingErrors} setShowingErrors={setShowingErrors} handleCloseErrors={handleCloseErrors} errors={errors} setErrors={setErrors} handleLogIn={handleLogIn} handleLogout={handleLogout} onLogout={handleLogout} user={user} setUser={setUser} loggedOut={loggedOut} setLoggedOut={setLoggedOut} />
      </Route>
      <Route path="/signup">
        <SignUp showingErrors={showingErrors} setShowingErrors={setShowingErrors} handleCloseErrors={handleCloseErrors}  errors={errors} setErrors={setErrors} handleLogIn={handleLogIn} handleLogout={handleLogout} onLogout={handleLogout} user={user} setUser={setUser} loggedOut={loggedOut} setLoggedOut={setLoggedOut} />
      </Route>
       {user && !loggedOut ? 
       <UserContext.Provider value={user}>
         <Route path="/welcome">
         <Welcome handleLogout={handleLogout} />
         </Route> 
          <Route path="/allrescues">
         <AllRescues errors={errors} setErrors={setErrors} displayedRescs={displayedRescs} setDisplayedRescs={setDisplayedRescs} animalArray={animalArray} locationArray={locationArray} updateUserRescues={updateUserRescues} isAdmin={isAdmin} setIsAdmin={setIsAdmin} handleLogout={handleLogout} rescues={rescues} setRescues={setRescues} rescue={rescue} setRescue={setRescue} />
         </Route> 
          <Route path="/myrescues">
          <MyRescues displayedRescs={displayedRescs} setDisplayedRescs={setDisplayedRescs} setUserRescues={setUserRescues} userRescues={userRescues} rescues={rescues} setRescues={setRescues} errors={errors} setErrors={setErrors} userRescue={userRescue} setUserRescue={setUserRescue} onDeleteUserRescue={onDeleteUserRescue} setRescue={setRescue} rescue={rescue} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
          </Route>  
          <Route path="/newrescue">
          <NewRescue postNewRescue={postNewRescue} handleCloseErrors={handleCloseErrors} showingErrors={showingErrors} setShowingErrors={setShowingErrors} errors={errors} setErrors={setErrors} setRescues={setRescues} rescues={rescues} userRescues={userRescues} setUserRescues={setUserRescues} />
          </Route> 
          <Route path="/">
      </Route>
        </UserContext.Provider> : null} 
    </Switch> 
  </div>
  </HashRouter>
  );
}

export default App;
