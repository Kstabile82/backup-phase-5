import React, { useState, useContext }  from "react";
import Infopage from "./Infopage";
import Allusers from "./Allusers";
import Rescuepets from "./Rescuepets";
import UserContext from "./UserContext"

function Rescuepage({ rescues, setRescues, onDeleteUserRescue, rescue, setRescue, userRescue, setUserRescue }) {
    const user = useContext(UserContext);
    const [showInfo, setShowInfo] = useState(false)
    const [info, setInfo] = useState(null)
    const [addInfo, setAddInfo] = useState(false)
    const [q, setQ] = useState(null)
    const [rescuePets, setRescuePets] = useState([])
    const [showPets, setShowPets] = useState(false)
    const [showingUsers, setShowingUsers] = useState(false)
    const [showingEditRescueForm, setShowingEditRescueForm] = useState(false)
    const [newRescueName, setNewRescueName] = useState(null)
    const [newRescueLocation, setNewRescueLocation] = useState(null)
    const [newInfoTitle, setNewInfoTitle] = useState(null)
    const [newInfoText, setNewInfoText] = useState(null)

    fetch(`/information/${rescue.id}`)
    .then((r) => r.json())
    .then((inform) => {
        if (inform.length > 0){
            setInfo(inform)
        }
        else {
            setInfo(null)
        }
    }, []);
    
    function handleShowUserInfo(e) {
        e.preventDefault();
        setShowInfo(true)
    }

    function handleDeleteUserRescue(e) {
        e.preventDefault();
        onDeleteUserRescue(rescue, user)
        //setmodal if unsuccessful
    }
    function handleAddInfo(e) {
        e.preventDefault();
        setAddInfo(!addInfo)
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
  function handleDeleteRescue(e) {
    e.preventDefault();
    fetch(`/rescues/${rescue.id}`, { 
      method: 'DELETE'
  })
  setRescues(rescues.filter(r => r.id !== rescue.id))
  }

  function editRescueForm(e) {
    e.preventDefault();
    setShowingEditRescueForm(!showingEditRescueForm)
  }
  function handleChangeRescueInfo(e) {
    e.preventDefault();
    if (e.target.name === "name") {
      setNewRescueName(e.target.value)
    }
    else {
      setNewRescueLocation(e.target.value)
    }
  }
  function submitRescueUpdates(e) {
    e.preventDefault();
    fetch(`/rescues/${rescue.id}`, {
      method: "PATCH", 
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
          name: newRescueName,
          location: newRescueLocation
       }),
  })
.then((r) => {
   if (r.ok) {
     r.json()
     .then((updatedRescue) => {
       let index = rescues.indexOf(rescue)
       rescues.splice(index,1,updatedRescue)
       setRescues(rescues)
     })
   }
 });   
  }

  function handleChangeNewInfo(e) {
    e.preventDefault();
    if (e.target.name === "title") {
      setNewInfoTitle(e.target.value)
    }
    else {
      setNewInfoText(e.target.value)
    }
  }
  function handleSubmitNewInfo(e){
    e.preventDefault();
    fetch(`/information`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ rescue_id: rescue.id, title: newInfoTitle, text: newInfoText }),
})
.then((r) => {
 if (r.ok) {
   r.json()
   .then((newInfo) => {
     const r = {...rescue};
     r.information = [...rescue.information, newInfo]
     setRescue(r)
   })
 }
});
  }

return (
    <div>
    <h3>{rescue.name}</h3> 
    <div><button onClick={handleShowUserInfo}>Information</button> <button onClick={handleShowPets}>Pets</button> <button style={{display: userRescue.status === "Admin" ? 'visible' : 'none' }} onClick={handleShowUsers}>Users</button> <button onClick={handleDeleteUserRescue}>Remove from my list</button></div>
    {showInfo && info !== null && info !== undefined ? <Infopage setRescue={setRescue} q={q} setQ={setQ} rescue={rescue} userRescue={userRescue} setUserRescue={setUserRescue} setShowInfo={setShowInfo} info={info} setInfo={setInfo} /> : null}
   {showInfo && info === null ? <p>No Info Yet</p> : null}
   {userRescue.status === "Admin" && showInfo ? <button onClick={handleAddInfo}>Add Info</button> : null }
             {addInfo ? <form onSubmit={handleSubmitNewInfo}>
             <input onChange={handleChangeNewInfo}
                type="text"
                name="title"
                placeholder="Title"
                ></input><br></br>
                  <input onChange={handleChangeNewInfo}
                type="text"
                name="text"
                placeholder="Text"
                ></input><button>Submit New Information</button></form> : null}
             {showInfo ? <button onClick={handleClose}>Close Information</button> : null} 
    {rescuePets !== [] && showPets ? <Rescuepets rescue={rescue} setRescue={setRescue} userRescue={userRescue} rescuePets={rescuePets} setRescuePets={setRescuePets} showPets={showPets} setShowPets={setShowPets} /> : null}
    {showingUsers ? <Allusers rescue={rescue} setRescue={setRescue} userRescue={userRescue} setUserRescue={setUserRescue} /> : null}
    {userRescue.status === "Admin" ? <div><button onClick={editRescueForm}>Update Rescue</button><button onClick={handleDeleteRescue}>Delete Rescue</button></div> : null}
    {showingEditRescueForm ? <form onSubmit={submitRescueUpdates}>
      <input onChange={handleChangeRescueInfo}
                type="text"
                name="name"
                placeholder="Rescue name"
                ></input><br></br>
                  <input onChange={handleChangeRescueInfo}
                type="text"
                name="location"
                placeholder="Rescue location"
                ></input>
      <button>Submit Rescue Edits</button>
    </form> : null }
    </div>
    
)
}
export default Rescuepage;