import React, { useContext } from "react"; 
import Rescuepage from "./Rescuepage";
import UserContext from "./UserContext"
import ReactModal from 'react-modal';

function MyRescues({ rescues, setRescues, errors, setErrors, isOpen, setIsOpen, rescue, setRescue, userRescue, setUserRescue, onDeleteUserRescue, isAdmin, setIsAdmin }) { 
const msg = useContext(UserContext);
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
      {msg.userrescues.map(uR => <div key={uR.id} onClick={(e) => handleClick(e, uR)}>{uR.rescue.name} • Status: {uR.status}
  </div> )}
      {rescue.name !== undefined ? 
       <div key={rescue.id}>
      <Rescuepage rescues={rescues} setRescues={setRescues} onDeleteUserRescue={onDeleteUserRescue} isAdmin={isAdmin} rescue={rescue} setRescue={setRescue} userRescue={userRescue} setUserRescue={setUserRescue}/> 
      </div> : null }  
      {errors ? <ReactModal
                    isOpen={isOpen}
                    contentLabel="Error Modal"
                    ariaHideApp={false}                    
                    onRequestClose={() => setIsOpen(false)}>
                 {errors.map(e => <p>{e}</p>)}    
                 <button onClick={() => setIsOpen(false)}>Close</button>
                </ReactModal> : null }
    </div>
)
}
export default MyRescues; 