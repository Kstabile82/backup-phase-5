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
//     function handleChangeStatus(e, h) {
//        e.preventDefault();
//        setNewStatus(e.target.value)
//     }

//   function handleSubmitStatus(h, e) {
//     e.preventDefault();
//     fetch(`/hikerhikes/${h.id}`, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status: newStatus }),
//     })
//     .then((r) => r.json())
//     .then((updatedHikerHike) => {
//       let del = userHikes.find(uH => uH.id === updatedHikerHike.id)
//       let idx = userHikes.indexOf(del)
//       userHikes.splice(idx, 1, updatedHikerHike)
//       setUserHikes(userHikes)
//     })   
//  }
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