import React, { useState } from "react";
// import ReactModal from 'react-modal';

function LogIn({ errors, setErrors, isOpen, setIsOpen, handleLogIn, loggedOut }) {
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
                {/* {errors ? <ReactModal
                    isOpen={isOpen}
                    contentLabel="Error Modal"
                    ariaHideApp={false}                    
                    onRequestClose={() => setIsOpen(false)}>
                 {errors.map(e => <p>{e}</p>)}    
                 <button onClick={() => setIsOpen(false)}>Close</button>
                </ReactModal> : null } */}
            </form> : null }
        </div>
    )
}
export default LogIn; 