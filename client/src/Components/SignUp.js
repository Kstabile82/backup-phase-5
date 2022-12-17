import React, { useState } from "react";
import ReactModal from 'react-modal';

function SignUp({ errors, setErrors, isOpen, setIsOpen, handleLogIn }) {
const [userName, setUserName] = useState("")
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")

    function handleNewUser(e) {
        e.preventDefault();
        fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userName,
            password,
            password_confirmation: confirmPassword
                  }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((user) => handleLogIn(user));
          } else {
            r.json().then((err) => {
              setErrors(err.errors)
              setIsOpen(true)
            });
          }
        });
    }
return (
    <div>
    <form className="signup" onSubmit={handleNewUser}>  
     <input 
        type="text" 
        id="username" 
        placeholder="Username"
        onChange={(e) => setUserName(e.target.value)}></input>  
         <input 
        type="text" 
        id="password" 
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}></input> 
         <input 
        type="text" 
        id="confirmpassword" 
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}></input>   
        <button>Enter</button>
    </form>
    {errors ? <ReactModal
                    isOpen={isOpen}
                    contentLabel="Error Modal"
                    ariaHideApp={false}                    
                    onRequestClose={() => setIsOpen(false)}>
                 {errors.length > 1 ? errors.map(e => <p>{e}</p>) : <p>{errors}</p>}    
                 <button onClick={() => setIsOpen(false)}>Close</button>
                </ReactModal> : null }
</div>
)
}
export default SignUp;