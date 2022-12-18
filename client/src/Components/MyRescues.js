import React from "react"; 
import Rescuepage from "./Rescuepage";
// import ReactModal from 'react-modal';

function MyRescues({ rescues, setRescues, errors, setErrors, isOpen, setIsOpen, rescue, setRescue, userRescue, setUserRescue, onDeleteUserRescue, user, isAdmin, setIsAdmin }) { 

  function handleClick(e, uR) {
    setUserRescue(uR)
    if (uR.status === "Admin"){
        setIsAdmin(true)
    }
    setRescue(rescues.find(r => r.id === uR.rescue.id))
   }
return (
    <div>
      <p>{user.name}'s Rescues:</p>
      {user.userrescues.map(uR => <div key={uR.id} onClick={(e) => handleClick(e, uR)}>{uR.rescue.name} • Status: {uR.status}
  </div> )}
      {rescue.name !== undefined ? 
       <div key={rescue.id}>
      <Rescuepage rescues={rescues} setRescues={setRescues} onDeleteUserRescue={onDeleteUserRescue} isAdmin={isAdmin} user={user} rescue={rescue} setRescue={setRescue} userRescue={userRescue} setUserRescue={setUserRescue}/> 
      </div> : null }  
      {/* {errors ? <ReactModal
                    isOpen={isOpen}
                    contentLabel="Error Modal"
                    ariaHideApp={false}                    
                    onRequestClose={() => setIsOpen(false)}>
                 {errors.map(e => <p>{e}</p>)}    
                 <button onClick={() => setIsOpen(false)}>Close</button>
                </ReactModal> : null } */}
    </div>
)
}
export default MyRescues; 