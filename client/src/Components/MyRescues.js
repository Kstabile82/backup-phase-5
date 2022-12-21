import React, { useContext } from "react"; 
import Rescuepage from "./Rescuepage";
import UserContext from "./UserContext"

function MyRescues({ rescues, setRescues, userRescues, errors, setErrors, rescue, setRescue, userRescue, setUserRescue, onDeleteUserRescue, isAdmin, setIsAdmin }) { 
const msg = useContext(UserContext);
console.log(userRescues)
  function handleClick(e, uR) {
    setUserRescue(uR)
    if (uR.status === "Admin"){
        setIsAdmin(true)
    }
    setRescue(rescues.find(r => r.id === uR.rescue.id))
   }
return (
    <div>
      <p>{msg.name}'s Rescues:</p>
      {userRescues.map(uR => <div key={uR.id} onClick={(e) => handleClick(e, uR)}>{uR.rescue.name} • Status: {uR.status}
  </div> )}
      {rescue.name !== undefined ? 
       <div key={rescue.id}>
      <Rescuepage rescues={rescues} setRescues={setRescues} onDeleteUserRescue={onDeleteUserRescue} isAdmin={isAdmin} rescue={rescue} setRescue={setRescue} userRescue={userRescue} setUserRescue={setUserRescue}/> 
      </div> : null }  
      
    </div>
)
}
export default MyRescues; 