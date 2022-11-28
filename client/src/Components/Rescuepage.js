import React, { useState}  from "react";
// import Adminpage from "./Adminpage";
import Infopage from "./Infopage";

function Rescuepage({ onDeleteUserRescue, user, rescue, userRescue, handleRemoveAdmin, handleAddAdmin }) {
    const [showInfo, setShowInfo] = useState(false)
    const [info, setInfo] = useState(null)
    const [addInfo, setAddInfo] = useState(false)
    const [q, setQ] = useState(null)

    fetch(`/information/${rescue.id}`)
    .then((r) => r.json())
    .then((inform) => {
        if (inform.length > 0){
            setInfo(inform)
        }
        else {
            setInfo(null)
        }
    });

    function handleShowUserInfo(e) {
        e.preventDefault();
        setShowInfo(true)
    }

    function handleDeleteUserRescue(e) {
        e.preventDefault();
        onDeleteUserRescue(rescue, user)
    }
    function handleAddInfo(e) {
        e.preventDefault();
        setAddInfo(!addInfo)
      }
      function handleNewInfoInput(e) {
        e.preventDefault();
      }
      function handleSubmitNewInfo(e) {
        e.preventDefault();
      }

  function handleClose(e) {
    e.preventDefault();
    setShowInfo(false)
    setQ(null)
  }
return (
    <div>
    <h3>{rescue.name}</h3> 
    {/* {userRescue && userRescue.status === "Admin" ? <Adminpage user={user} rescue={rescue} handleAddAdmin={handleAddAdmin} handleRemoveAdmin={handleRemoveAdmin} />
    :  */}
    <div><button onClick={handleShowUserInfo}>Rescue Information</button> <button>Pets</button>  <button onClick={handleDeleteUserRescue}>Delete</button></div>
     {/* } */}
    {showInfo && info !== null && info !== undefined ? <Infopage q={q} setQ={setQ} rescue={rescue} userRescue={userRescue} user={user} setShowInfo={setShowInfo} info={info} /> : null}
   {showInfo && info === null ? <p>No Info Yet</p> : null}
   {userRescue.status === "Admin" && showInfo ? <button onClick={handleAddInfo}>Add Info</button> : null }
             {addInfo ? <form onSubmit={handleSubmitNewInfo}>
              Fields to add info here
             </form> : null}
             {showInfo ? <button onClick={handleClose}>Close</button> : null} 

    </div>
)
}
export default Rescuepage;