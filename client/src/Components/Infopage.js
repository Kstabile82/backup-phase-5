import React, { useState } from "react"; 
import Questions from "./Questions";

function Infopage({ q, setQ, info, rescue, user, userRescue, setShowInfo }) {
   const [qs, setQs] = useState([])
  //  const [addInfo, setAddInfo] = useState(false)
   const [editInfo, setEditInfo] = useState(false)
   const [i, setI] = useState(null)
  //  const [q, setQ] = useState(null)
  const [showingQs, setShowingQs] = useState(false)

  // function handleClose(e) {
  //   e.preventDefault();
  //   setShowInfo(false)
  //   setQ(null)
  // }

  // function handleAddInfo(e) {
  //   e.preventDefault();
  //   setAddInfo(!addInfo)
  // }
  // function handleNewInfoInput(e) {
  //   e.preventDefault();
  // }
  // function handleSubmitNewInfo(e) {
  //   e.preventDefault();
  // }
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
  function handleEditQuestions(e, i) {
    setQs(i.questions)
    setShowingQs(!showingQs)
  }
  return (
        <div>
             {info.map(i => <div key={i.id}><h3>{i.title}</h3>
             {userRescue.status === "Admin" ? <div><button onClick={(e) => handleDeleteInfo(e, i)}>Delete</button> 
             <button onClick={(e) => handleEditInfo(e, i)}>Edit Information</button><button onClick={(e) => handleEditQuestions(e, i)}>Edit Questions</button> </div> :  
             <button onClick={(e) => handleShowQuiz(e, i)}>Test Your Knowledge</button> }
             {editInfo ? <form onClick={(e) => handleClickForm(e, i)}>Editing form here</form> : null}
             {i && showingQs ? <Questions setShowingQs={setShowingQs} showingQs={showingQs} qs={i.questions} setQs={setQs} i={i} setI={setI} q={q} setQ={setQ} userRescue={userRescue} /> : null}
             </div>) } 
             <br></br>
             <br></br>
             {/* {userRescue.status === "Admin" ? <button onClick={handleAddInfo}>Add Info</button> : null }
             {addInfo ? <form onSubmit={handleSubmitNewInfo}>
              Fields to add info here
             </form> : null}
             <button onClick={handleClose}>Close</button> */}


        </div>
    )
}
export default Infopage; 