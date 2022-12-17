import React, { useState } from "react";

function NewRescue({ isOpen, setIsOpen, errors, setErrors, rescues, user, setRescues, userRescues, setUserRescues }) { 
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
        if (location === "" || name === "") {
            setAdded(false) 
        }
        else {
        postNewRescue(newRescue)
        setAdded(true)
    }
}
function postNewRescue(newRescue) {
    fetch ("/newrescue", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(newRescue, user)
        })
    .then((r) => r.json())
    .then(rescue => {
        setRescues([...rescues, rescue])
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
        //set modal 
        })
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
            {added ? <p>Thanks, your rescue was added!</p> : null}
        </div>
    );
}
export default NewRescue; 