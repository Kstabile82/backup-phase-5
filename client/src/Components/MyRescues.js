import React from "react"; 
import Rescuepage from "./Rescuepage";

function MyRescues({ resc, setResc, rescues, userRescue, setUserRescue, onDeleteUserRescue, handleRemoveAdmin, handleAddAdmin, user, userRescues, setUserRescues, isAdmin, setIsAdmin, isGuest, setIsGuest }) { 

  function handleClick(e, uR) {
    setUserRescue(uR)
    if (uR.status === "Admin"){
        setIsAdmin(true)
    }
    setResc(rescues.find(r => r.id === uR.rescue.id))
   }

return (
    <div>
      <p>{user.name}'s Rescues:</p>
      {userRescues.map(uR => <div key={uR.id} onClick={(e) => handleClick(e, uR)}>{uR.rescue.name} • Status: {uR.status}
  </div> )}
      {resc.name !== undefined ? 
       <div key={resc.id}>
      <Rescuepage onDeleteUserRescue={onDeleteUserRescue} handleAddAdmin={handleAddAdmin} handleRemoveAdmin={handleRemoveAdmin} isAdmin={isAdmin} user={user} rescue={resc} setRescue={setResc} userRescue={userRescue}/> 
      </div> : null }  
    </div>
)
}
export default MyRescues; 