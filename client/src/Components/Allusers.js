import React from "react";

function Allusers({ rescue, userRescue }) {

    function handleMakeAdmin(e, uR) {
        e.preventDefault(); 
        fetch(`/userrescues/${uR.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "Admin" }),
        })
        .then((r) => r.json())
        .then((updatedUser) => {
            console.log(updatedUser)
        })
    }
    function handleRemoveAdmin(e, uR) {
        e.preventDefault();
        fetch(`/userrescues/${uR.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "Guest" }),
        })
        .then((r) => r.json())
        .then((updatedUser) => {
            console.log(updatedUser)
     
        })
    }
return (
    <div>
        {rescue.userrescues.map(uR => <div><p>{uR.user.name}, {uR.status}</p>
        {uR.status === "Admin" && uR.id !== userRescue.id ? <button onClick={(e) => handleRemoveAdmin(e, uR)}>Remove Admin</button> : null } 
        {uR.status === "Guest" && uR.id !== userRescue.id ? <button onClick={(e) => handleMakeAdmin(e, uR)}>Make Admin</button> :null } 
        </div>)}

    </div>
)
}
export default Allusers; 