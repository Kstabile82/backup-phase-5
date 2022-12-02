import React, { useState } from "react"; 
import Questions from "./Questions";

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

//for each piece of info, have an array that contains: 
//obj{
  //question_id: x, correct_answer: x, input_answer: x
//}
//obj.questions.map, take question id, for the question, map options & find correct, then include the input with that question id
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
    // setTakeTest(!takeTest)
    setTakeTest(i)
    setTestArr([])

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
             {/* {editInfo ? <form onClick={(e) => handleClickForm(e, i)}>Editing form here</form> : null}
             {i && showingQs ? <Questions setShowingQs={setShowingQs} showingQs={showingQs} qs={i.questions} setQs={setQs} i={inf} setI={setInf} q={q} setQ={setQ} userRescue={userRescue} /> : null} */}
             {/* {inf && takeTest ? <Questions answerObj={answerObj} setAnswerObj={setAnswerObj} testArr={testArr} setTestArr={setTestArr} infoAns={infoAns} setInfoAns={setInfoAns} setTakeTest={setTakeTest} takeTest={takeTest} qs={inf.questions} q={q} setQ={setQ} i={takeTest} setI={setInf} userRescue={userRescue}/> : null} */}
             {/* <br></br>{i && takeTest && i.questions ? <button onClick={handleSub}>Submit "{i.title}"</button> : null } */}
             </div>) } 
             {editInfo ? <form onClick={(e) => handleClickForm(e, inf)}>Editing form here</form> : null}
             {inf && showingQs ? <Questions setShowingQs={setShowingQs} showingQs={showingQs} qs={inf.questions} setQs={setQs} i={inf} setI={setInf} q={q} setQ={setQ} userRescue={userRescue} /> : null}
             {inf && takeTest ? <Questions answerObj={answerObj} setAnswerObj={setAnswerObj} testArr={testArr} setTestArr={setTestArr} infoAns={infoAns} setInfoAns={setInfoAns} setTakeTest={setTakeTest} takeTest={takeTest} qs={inf.questions} q={q} setQ={setQ} i={takeTest} setI={setInf} userRescue={userRescue}/> : null}

             <br></br>
             <br></br>
        </div>
    )
}
export default Infopage; 