import React, { useState } from "react"; 
import Questions from "./Questions";

function Infopage({ info, rescue, user, userRescue, setShowInfo }) {
   const [showQuiz, setShowQuiz] = useState()
   const [qs, setQs] = useState([])
   const [ots, setOts] = useState([])
   const [addInfo, setAddInfo] = useState(false)
   const [editInfo, setEditInfo] = useState(false)
   const [i, setI] = useState(null)
   const [q, setQ] = useState(null)

  function handleClose(e) {
    e.preventDefault();
    setShowInfo(false)
    setQ(null)
  }
  function handleClickInfo(rIm, e) {
    setQs(rIm.questions)
    //fetch questions rIm.id and set questions & options
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
  function handleDeleteInfo(e, i) {
    console.log(i)
    //delete goes here
  }
  function handleEditInfo(e, i) {
    setEditInfo(!editInfo)

  }
  function handleClickForm(e, i) {
  }
  function handleShowQuiz(e, i) {
    setI(i)

  }
  return (
        <div>
             {info.map(i => <div key={i.id}><h3 onClick={(e) => handleClickInfo(i, e)}>{i.title}</h3>
             {userRescue.status === "Admin" ? <button onClick={(e) => handleDeleteInfo(e, i)}>Delete</button> : null}
             {userRescue.status === "Admin" ? <button onClick={(e) => handleEditInfo(e, i)}>Edit</button> : null} 
             {editInfo ? <form onClick={(e) => handleClickForm(e, i)}>Editing form here</form> : null}
             <button onClick={(e) => handleShowQuiz(e, i)}>Test Your Knowledge</button>
             {i ? <Questions i={i} setI={setI} q={q} setQ={setQ} userRescue={userRescue} /> : null}
             </div>) } 
             <br></br>
             <br></br>
             {userRescue.status === "Admin" ? <button onClick={handleAddInfo}>Add Info</button> : null }
             {addInfo ? <form onSubmit={handleSubmitNewInfo}>
              Fields to add info here
             </form> : null}
             <button onClick={handleClose}>Close</button>


        </div>
    )
}
export default Infopage; 