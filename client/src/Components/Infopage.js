import React, { useState } from "react"; 
import Questions from "./Questions";

function Infopage({ q, setQ, info, rescue, user, userRescue, setShowInfo }) {
   const [qs, setQs] = useState([])
   const [editInfo, setEditInfo] = useState(false)
   const [inf, setInf] = useState(null)
  const [showingQs, setShowingQs] = useState(false)
  const [takeTest, setTakeTest] = useState(false)
  const [infoAns, setInfoAns] = useState([])

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
    setInf(i)
    setTakeTest(!takeTest)
  }
  function handleEditQuestions(e, i) {
    setQs(i.questions)
    setShowingQs(!showingQs)
  }

  function handleSub(e) {
    e.preventDefault();
    console.log(infoAns)
  }
  return (
        <div>
             {info.map(i => <div key={i.id}><h3>{i.title}</h3>
             {userRescue.status === "Admin" ? <div><button onClick={(e) => handleDeleteInfo(e, i)}>Delete</button> 
             <button onClick={(e) => handleEditInfo(e, i)}>Edit Information</button><button onClick={(e) => handleEditQuestions(e, i)}>Edit Questions</button> </div> :  
             <button onClick={(e) => handleShowQuiz(e, i)}>Test Your Knowledge</button> }
             {editInfo ? <form onClick={(e) => handleClickForm(e, i)}>Editing form here</form> : null}
             {i && showingQs ? <Questions setShowingQs={setShowingQs} showingQs={showingQs} qs={i.questions} setQs={setQs} i={inf} setI={setInf} q={q} setQ={setQ} userRescue={userRescue} /> : null}
             {i && takeTest ? <Questions infoAns={infoAns} setInfoAns={setInfoAns} setTakeTest={setTakeTest} takeTest={takeTest} qs={i.questions} q={q} setQ={setQ} i={inf} setI={setInf} userRescue={userRescue}/> : null}
             <br></br>{i && takeTest && i.questions ? <button onClick={handleSub}>Submit "{i.title}"</button> : null }
             </div>) } 
             <br></br>
             <br></br>
        </div>
    )
}
export default Infopage; 