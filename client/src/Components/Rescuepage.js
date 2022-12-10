import React, { useState}  from "react";
import Infopage from "./Infopage";
import Allusers from "./Allusers";
import Rescuepets from "./Rescuepets";

function Rescuepage({ onDeleteUserRescue, user, rescue, userRescue, handleRemoveAdmin, handleAddAdmin }) {
    const [showInfo, setShowInfo] = useState(false)
    const [info, setInfo] = useState(rescue.information)
    const [addInfo, setAddInfo] = useState(false)
    const [q, setQ] = useState(null)
    const [rescuePets, setRescuePets] = useState([])
    const [showPets, setShowPets] = useState(false)
    const [showingUsers, setShowingUsers] = useState(false)
    // fetch(`/information/${rescue.id}`)
    // .then((r) => r.json())
    // .then((inform) => {
    //     if (inform.length > 0){
    //         setInfo(inform)
    //     }
    //     else {
    //         setInfo(null)
    //     }
    // });
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
  function handleShowPets(e) {
    e.preventDefault();
    setShowPets(!showPets)
    setRescuePets(rescue.rescuepets)
  }

  function handleShowUsers(e) {
    e.preventDefault();
    setShowingUsers(!showingUsers)

  }
return (
    <div>
    <h3>{rescue.name}</h3> 
    <div><button onClick={handleShowUserInfo}>Information</button> <button onClick={handleShowPets}>Pets</button> <button style={{display: userRescue.status === "Admin" ? 'visible' : 'none' }} onClick={handleShowUsers}>Users</button> <button onClick={handleDeleteUserRescue}>Remove from my list</button></div>
    {showInfo && info !== null && info !== undefined ? <Infopage q={q} setQ={setQ} rescue={rescue} userRescue={userRescue} user={user} setShowInfo={setShowInfo} info={info} /> : null}
   {showInfo && info === null ? <p>No Info Yet</p> : null}
   {userRescue.status === "Admin" && showInfo ? <button onClick={handleAddInfo}>Add Info</button> : null }
             {addInfo ? <form onSubmit={handleSubmitNewInfo}>
              Fields to add info here
             </form> : null}
             {showInfo ? <button onClick={handleClose}>Close Info</button> : null} 
    {rescuePets !== [] && showPets ? <Rescuepets rescue={rescue} userRescue={userRescue} rescuePets={rescuePets} setRescuePets={setRescuePets} showPets={showPets} setShowPets={setShowPets} /> : null}
    {showingUsers ? <Allusers rescue={rescue} userRescue={userRescue}/> : null}
    </div>
    
)
}
export default Rescuepage;