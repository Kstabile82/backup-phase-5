import React, { useState } from "react";

function LogIn({ showingErrors, setShowingErrors, handleCloseErrors, errors, setErrors, isOpen, setIsOpen, handleLogIn, loggedOut }) {
const [name, setName] = useState("")
const [password, setPassword] = useState("")

  function handleUser(e) {
       e.preventDefault();
       fetch("/login", {
           method: "POST", 
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({ name, password }),
       })
    .then((r) => {
        if (r.ok) {
          r.json()
          .then((u) => {
            handleLogIn(u)
          })
        }
        else {
          r.json().then((err) => {
            setErrors(err.errors) 
            setShowingErrors(!showingErrors)
           setIsOpen(true)
          })
        }
      });
  }
    return (
        <div>
            {loggedOut ? 
            <form className="login" onSubmit={handleUser}>  
             <input 
                type="text" 
                id="inputname" 
                placeholder="Username"
                onChange={(e) => setName(e.target.value)}></input>  
                 <input 
                type="text" 
                id="password" 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}></input>  
                <button>Enter</button>
                {errors ? <div> {errors.map(e => <div><p>{e}</p></div>) }
                <button onClick={handleCloseErrors}>Close error messages</button>  </div>  : null }
         
            </form> : null }
        </div>
    )
}
export default LogIn; 