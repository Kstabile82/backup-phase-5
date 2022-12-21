import React, { useState, useContext } from "react";
import UserContext from "./UserContext"

function NewRescue({ handleCloseErrors, showingErrors, setShowingErrors, errors, setErrors, rescues, setRescues, userRescues, setUserRescues }) { 
    const msg = useContext(UserContext);
    const [added, setAdded] = useState(false)
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    
    function handleAdd(e) {
        e.preventDefault();
        if (e.target.name === "name") {
           setName(e.target.value);
        }
        else if (e.target.name === "location") {
            setLocation(e.target.value);
        }
    }
    let newRescue = {
        name,
        location
    }
    function handleSubmit(e) {
        e.preventDefault();
        postNewRescue(newRescue)
}
function postNewRescue(newRescue) {
    fetch ("/newrescue", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(newRescue, msg)
        })
    .then((r) => { 
        if (r.ok) { 
            r.json()
    .then(rescue => {
        setRescues([...rescues, rescue])
        fetch ("/myrescues", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ rescue_id: rescue.id, user_id: msg.id, status: "Admin" })
            })
        .then((r) => r.json())
        .then((r) => {
            setUserRescues([...userRescues, r]) 
            setAdded(true)
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
    return (
        <div className="add-rescue-form">
             <form onSubmit={handleSubmit}>
               <input onChange={handleAdd}
                type="text"
                name="name"
                placeholder="Name"
                ></input>
                <input onChange={handleAdd}
                type="text"
                name="location"
                placeholder="City, State"
                ></input>
                <button className="formbutton">Submit</button>
            </form> 
                {errors && showingErrors ? <div> {errors.map(e => <div><p>{e}</p></div>) }
                <button onClick={handleCloseErrors}>Close error messages</button> </div>  : null }
         
        </div>
    );
}
export default NewRescue; 