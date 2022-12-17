import React, { useState } from "react"; 
import Questions from "./Questions";
import EmailForm from "./EmailForm";

function Infopage({ q, setQ, info, setInfo, rescue, user, setRescue, userRescue, setUserRescue }) {
   const [editInfo, setEditInfo] = useState(false)
   const [inf, setInf] = useState(null)
  const [showingQs, setShowingQs] = useState(false)
  const [takeTest, setTakeTest] = useState(null)
  const [infoAns, setInfoAns] = useState([])
  const [testArr, setTestArr] = useState([])
  const [answerObj, setAnswerObj] = useState({})
const [newTitle, setNewTitle] = useState(null)
const [newText, setNewText] = useState(null)
const [showContactForm, setShowContactForm] = useState(false)

  function handleDeleteInfo(e, i) {
    e.preventDefault();
    fetch(`/information/${i.id}`, { 
      method: 'DELETE'
  })
  const s = {...rescue};
        s.information = rescue.information.filter(r => r.id !== i.id)
        setRescue(s)  
  }

  function handleEditInfo(e, i) {
    setEditInfo(!editInfo)
    setInf(i)
  }
  function handleShowQuiz(e, i) {
    setInf(i)
    setTakeTest(i)
    setTestArr([])
  }
  function handleEditQuestions(e, i) {
    e.preventDefault();
    if (i) {
      setInf(i)
    }
    setShowingQs(!showingQs)
  }
function handleChangeInfo(e) {
  e.preventDefault();
  if (e.target.name === "title") {
    setNewTitle(e.target.value)
  }
  if (e.target.name === "text") {
    setNewText(e.target.value)
  }
}

function handleSubmitForm(e) {
  e.preventDefault();
  if (newTitle === null) {
    setNewTitle(inf.title)
  }
  if (newText === null) {
    setNewText(inf.text)
  }
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
.then((updatedinf) => {
  setInf(updatedinf)
  let index = rescue.information.findIndex((i) => i.id === inf.id)
  const s = {...rescue};
  s.information = rescue.information.splice(index,1,updatedinf)
  setRescue(rescue) 

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
             <button onClick={(e) => handleEditInfo(e, i)}>Edit Information</button> 
             <button onClick={(e) => handleEditQuestions(e, i)}>Edit Questions</button></div>
              : 
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
             {/* {inf && userRescue.status === "Admin" ? <button onClick={handleEditQuestions}>Edit Questions</button> : null }  */}
             {inf && showingQs ? <Questions setInfo={setInfo} info={info} setShowingQs={setShowingQs} showingQs={showingQs} i={inf} setI={setInf} q={q} setQ={setQ} userRescue={userRescue} /> : null}
             {inf && takeTest ? <Questions setUserRescue={setUserRescue} showContactForm={showContactForm} setShowContactForm={setShowContactForm} answerObj={answerObj} setAnswerObj={setAnswerObj} testArr={testArr} setTestArr={setTestArr} infoAns={infoAns} setInfoAns={setInfoAns} setTakeTest={setTakeTest} takeTest={takeTest} qs={inf.questions} q={q} setQ={setQ} i={takeTest} setI={setInf} userRescue={userRescue}/> : null}
             {showContactForm ? <EmailForm/> : null}       

             <br></br>
             <br></br>
        </div>
    )
}
export default Infopage; 