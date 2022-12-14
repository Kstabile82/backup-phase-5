import React, { useState } from "react"; 
import Questions from "./Questions";
import EmailForm from "./EmailForm";

function Infopage({ q, setQ, info, rescue, user, userRescue, setShowInfo }) {
   const [qs, setQs] = useState([])
   const [editInfo, setEditInfo] = useState(false)
   const [inf, setInf] = useState(null)
  const [showingQs, setShowingQs] = useState(false)
  const [takeTest, setTakeTest] = useState(null)
  const [infoAns, setInfoAns] = useState([])
  const [scoreArr, setScoreArr] = useState([])
  let infoObj = {}
  const [testArr, setTestArr] = useState([])
  const [answerObj, setAnswerObj] = useState({})
const [newTitle, setNewTitle] = useState(null)
const [newText, setNewText] = useState(null)
const [showContactForm, setShowContactForm] = useState(false)

  function handleDeleteInfo(e) {
    e.preventDefault();
    fetch(`/information/${inf.id}`, { 
      method: 'DELETE'
  })
  //setInformation here
  }
  function handleEditInfo(e, i) {
    setEditInfo(!editInfo)
    setInf(i)
  }
  function handleShowQuiz(e, i) {
    setInf(i)
    // setTakeTest(!takeTest)
    setTakeTest(i)
    setTestArr([])
  }
  function handleEditQuestions(e) {
    e.preventDefault();
    setQs(inf.questions)
    setShowingQs(!showingQs)
  }
function handleChangeInfo(e) {
  e.preventDefault();
  setNewTitle(inf.title)
  setNewText(inf.text)
  if (e.target.name === "title") {
    setNewTitle(e.target.value)
    
  }
  if (e.target.name === "text") {
    setNewText(e.target.value)
  }
}
function handleSubmitForm(e) {
  e.preventDefault();
  fetch(`/information/${inf.id}`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    title: newTitle,
    text: newText
    }),
})
.then((r) => r.json())
.then((updatedpet) => {
  setInf(updatedpet)
//   setUserRescues slice etc
})
}
function handleAlreadyPassed(e, i) {
  e.preventDefault();
  setShowContactForm(!showContactForm)
}
  return (
        <div>
             {info.map(i => <div key={i.id}><h3>{i.title}</h3>
             {userRescue.status === "Admin" ? <div><button onClick={(e) => handleDeleteInfo(e, i)}>Delete</button> 
             <button onClick={(e) => handleEditInfo(e, i)}>Edit Information</button> </div> : 
             <div><button onClick={(e) => handleShowQuiz(e, i)}>Test Your Knowledge</button>
             <button onClick={(e) => handleAlreadyPassed(e, i)}>You already passed this test, open contact form</button></div> }
             </div>) } 
             {editInfo ? <div><form onSubmit={handleSubmitForm}>
             Title: {inf.title} <input onChange={handleChangeInfo}
                type="text"
                name="title"
                placeholder="Enter New Title"
                ></input><br></br>
             Text: {inf.text} <input onChange={handleChangeInfo}
                type="text"
                name="text"
                placeholder="Enter New Text"
                ></input><br></br><button>Submit Form</button>
                     </form>  <button onClick={handleDeleteInfo}>Delete Information</button>
                     </div>: null}
             {inf && userRescue.status === "Admin" ? <button onClick={handleEditQuestions}>Edit Questions</button> : null } 
             {inf && showingQs ? <Questions setShowingQs={setShowingQs} showingQs={showingQs} qs={inf.questions} setQs={setQs} i={inf} setI={setInf} q={q} setQ={setQ} userRescue={userRescue} /> : null}
             {inf && takeTest ? <Questions showContactForm={showContactForm} setShowContactForm={setShowContactForm} answerObj={answerObj} setAnswerObj={setAnswerObj} testArr={testArr} setTestArr={setTestArr} infoAns={infoAns} setInfoAns={setInfoAns} setTakeTest={setTakeTest} takeTest={takeTest} qs={inf.questions} q={q} setQ={setQ} i={takeTest} setI={setInf} userRescue={userRescue}/> : null}
             {showContactForm ? <EmailForm/> : null}       

             <br></br>
             <br></br>
        </div>
    )
}
export default Infopage; 