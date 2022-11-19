import React, { useState}  from "react";
import Adminpage from "./Adminpage";
import Infopage from "./Infopage";

function Rescuepage({ onDeleteUserRescue, user, rescue, isAdmin, setIsAdmin, userRescue, handleRemoveAdmin, handleAddAdmin }) {
    const [showInfo, setShowInfo] = useState(false)
    // user.userrescues.map(uR => {
    //     if(uR.rescue.id === rescue.id && uR.status === "Admin"){
    //         setIsAdmin(true)
    //     } })
    // function handleUsers(e) {
    //     e.preventDefault();
    //     fetch(`/allusers`, {
    //         method: "POST", 
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({ rescue_id: parseInt(rescue.id), user_id: parseInt(user.id) }),
    //     })
    //     .then((r) => r.json())
    //     .then((ur) => console.log(ur))
    //    }
    function handleShowUserInfo(e) {
        e.preventDefault();
        setShowInfo(true)
    }
    function handleDeleteUserRescue(e) {
        e.preventDefault();
        onDeleteUserRescue(rescue, user)
    }
return (
    <div>
    <h3>{rescue.name}</h3> 
    {userRescue && userRescue.status === "Admin" ? <Adminpage user={user} rescue={rescue} handleAddAdmin={handleAddAdmin} handleRemoveAdmin={handleRemoveAdmin} />
    : <div><button onClick={handleShowUserInfo}>Rescue Information</button> <button>Pets</button><button onClick={handleDeleteUserRescue}>Delete</button></div> }
    {showInfo ? <Infopage rescue={rescue} user={user} setShowInfo={setShowInfo}/> : null}
    </div>
)
}
export default Rescuepage;