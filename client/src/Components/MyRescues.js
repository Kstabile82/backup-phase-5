import React, { useContext } from "react"; 
import Rescuepage from "./Rescuepage";
import UserContext from "./UserContext"

function MyRescues({ displayedRescs, setDisplayedRescs, handleDelResc, rescues, setRescues, userRescues, setUserRescues, errors, setErrors, rescue, setRescue, userRescue, setUserRescue, onDeleteUserRescue, isAdmin, setIsAdmin }) { 
const msg = useContext(UserContext);
function handleDelResc(resc) {
  fetch(`/rescues/${resc.id}`, { 
    method: 'DELETE'
})
setRescues(rescues.filter(r => r.id !== resc.id))
setUserRescues(userRescues.filter(uR => uR.rescue.id !== resc.id))
setDisplayedRescs(displayedRescs.filter(dr => dr.id !== resc.id))
setRescue({})
}
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
      {rescue !== undefined && rescue !== {} ? 
       <div key={rescue.id}>
      <Rescuepage handleDelResc={handleDelResc} setUserRescues={setUserRescues} userRescues={userRescues} rescues={rescues} setRescues={setRescues} onDeleteUserRescue={onDeleteUserRescue} isAdmin={isAdmin} rescue={rescue} setRescue={setRescue} userRescue={userRescue} setUserRescue={setUserRescue}/> 
      </div> : null }  
      
    </div>
)
}
export default MyRescues; 