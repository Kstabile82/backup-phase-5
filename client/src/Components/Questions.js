import React, { useState } from "react"; 
import AllRescues from "./AllRescues";
import Form from "./Form";
import Rescuepage from "./Rescuepage";

function Questions({ showContactForm, rescue, setShowContactForm, setShowingQs, showingQs, i, setI, q, setQ, userRescue, setUserRescue }) {
    const [addQs, setAddQs] = useState(false);
    const [addO, setAddO] = useState(false)
    const [text, setText] = useState(null)
    const [correct, setCorrect] = useState(false) 
    const [showEditQ, setShowEditQ] = useState(false)
    const [editedQ, setEditedQ] = useState(null)
    const [newQ, setNewQ] = useState(null)
    const [newO, setNewO] = useState(null)
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(null)
const [arr, setArr] = useState(null)

    function handleClickedQuestion(e, quest) {
        setQ(quest)
    }
    function handleAddQuestions(e) {
        e.preventDefault();
        setAddQs(!addQs)
    }
    function handleAddOption(e) {
        setAddO(!addO)
    }
    function handleQClose(e) {
        e.preventDefault();
        setShowingQs(!showingQs)
    }
    function handleInputOption(e) {
        e.preventDefault();
        if (e.target.name === "text") {
            setText(e.target.value)
        }
        if (e.target.name === "correct") {
            setCorrect(e.target.value)
        }
    }
    function handleSubmitOption(e, quest) {
        e.preventDefault();
        fetch("/options", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                text, 
                correct, 
                question_id: quest.id
             }),
        })
     .then((r) => {
         if (r.ok) {
           r.json()
           .then((opt) => {
            const inform = {...i}
            const specQ = inform.questions.find(qu => qu.id === quest.id)
            specQ.options.push(opt)
            setI(inform)
           })
         }
       });
    }
    function deleteOption(e, o) {
        e.preventDefault();
        fetch(`/options/${o.id}`, { 
            method: 'DELETE'
        })
        const inform = {...i}
        const specQ = inform.questions.find(qu => qu.id === o.question_id)
        specQ.options.filter(op => op.id !== o.id)
        setI(inform)
    }
    function handleDeleteQuestion(e, quest) {
        e.preventDefault();
        fetch(`/questions/${quest.id}`, { 
            method: 'DELETE'
        })
        const inform = {...i}
        inform.questions = inform.questions.filter(infQ => infQ.id !== quest.id)
        setI(inform)
    }
    function handleSubmitTest(e, i) {
        e.preventDefault();
        let corr = 0
        i.questions.map(qu => {
            qu.options.map(qo => {
                if(qo.correct){
                    corr++
                }
            })
            })
    let exists = userRescue.userresults.find(urs => urs.information_id === i.id)
    if (exists) {
        fetch(`/userresults/${exists.id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userrescue_id: userRescue.id, arr, corr }),
        })
     .then((r) => {
         if (r.ok) {
           r.json()
           .then((ur) => {
             if (ur.score === arr.length) {
                setShowContactForm(!showContactForm)
                let index = userRescue.userresults.findIndex(exists)
                userRescue.userresults.splice(index,1,ur)
                setUserRescue(userRescue)
                setShowScore(!showScore)
                setScore(ur.score + "out of" + "corr")
             }
           })
         }
       });
    }
    else {
        fetch("/userresults", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userrescue_id: userRescue.id, arr, corr }),
        })
     .then((r) => {
         if (r.ok) {
           r.json()
           .then((ur) => {
             if (ur.score === arr.length) {
                setShowContactForm(!showContactForm)
                userRescue.userresults = [...userRescue.userresults, ur]
                setUserRescue(userRescue)
                setScore(ur.score + " out of " + corr)
                setShowScore(!showScore)
             }
           })
         }
       });
    }
    }
    function editQuestion(e) {
        e.preventDefault();
        setShowEditQ(!showEditQ)
    }
    function handleEditQuestionInput(e) {
        e.preventDefault();
        setEditedQ(e.target.value)
    }
    function submitEditedQ(e, quest) {
        e.preventDefault();
        fetch(`/questions/${quest.id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            text: editedQ
            }),
        })
        .then((r) => r.json())
        .then((updatedq) => {
            let index = i.questions.findIndex((qu) => qu.id === quest.id)
            i.questions.splice(index,1,updatedq)
            setI(i)
        })
    }
    function handleNewQInput(e) {
        e.preventDefault();
        if (e.target.name === "question") {
            setNewQ(e.target.value)
        }
        if (e.target.name === "answer") {
            setNewO(e.target.value)
        }
    }
    function handleSubmitNewQ(e) {
        e.preventDefault();
       fetch("/questions", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ information_id: i.id, text: newQ }),
        })
     .then((r) => {
         if (r.ok) {
           r.json()
           .then((q) => {
            fetch("/options", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question_id: q.id, text: newO, correct: true }),
                })
                .then((r) => {
                    if (r.ok) {
                    r.json()
                    .then((o) => {
                             q.options = [o]
                    })
                    }
                })
            const inform = {...i}
            inform.questions = [...i.questions, q]
            setI(inform)
            });
          }
        });
    }
    function handleTestInput(e, q) {
        e.preventDefault();
        let inputQ; 
        let inputVal;
        let correctAns;
        let questionId; 
        let infoId = i.id
        inputQ = e.target.name
        inputVal = e.target.value
        correctAns = q.options.find(o => o.correct)  
        questionId = q.id 
        let ob = {"question_id": questionId, "info_id": infoId, "question": inputQ, "input": inputVal, "correct_answer": correctAns.text}
        if (arr !== null) {
            let foundit = arr.find(a => a.question_id === ob.question_id)
            if (foundit) {
                let idx = arr.indexOf(foundit)
                arr.splice(idx,1,ob)
            setArr(arr)           
            }
            else {
                setArr([...arr, ob])
            }
        }
        else {
            setArr([ob])
        }      
    }

    return (
        <div> <p className="line"></p>
           
            {userRescue.status === "Admin" ? <div><h3>Editing {i.title} Questions:</h3>
            {i.questions.map(quest => <div><ul onClick={(e) => handleClickedQuestion(e, quest)}>{quest.text}
            {quest.options ? quest.options.map(o => <div><li>{o.text}</li><button onClick={(e) => deleteOption(e, o)}>-</button></div>) : null}
            <button onClick={editQuestion}>Edit Question</button>
            {showEditQ ? <form onSubmit={(e) => submitEditedQ(e, quest)}>
                <input 
                type="text" 
                name="editquestion" 
                placeholder="New Question Text"
                onChange={handleEditQuestionInput}></input>  
                <button>Submit Question Edits</button>
                </form> : null }
            <button onClick={(e) => handleDeleteQuestion(e, quest)}>Delete Question</button>
            <button onClick={(e) => handleAddOption(e, quest)}>Add Option</button></ul><br></br>
            {addO ? <form onSubmit={(e) => handleSubmitOption(e, quest)}>
                <input 
                type="text" 
                name="text" 
                placeholder="New Option"
                onChange={handleInputOption}></input>  
                 <input 
                type="text" 
                name="correct" 
                placeholder="Correct?"
                onChange={handleInputOption}></input>  
                <button>Submit</button>
            </form> : null } </div>)} 
            <p className="line"></p>
            <button onClick={handleAddQuestions}>Add Question</button>
            {addQs ? <form onSubmit={handleSubmitNewQ}>
                <input 
                type="text" 
                name="question" 
                placeholder="New Question"
                onChange={handleNewQInput}
                ></input>  
                 <input 
                type="text" 
                name="answer" 
                placeholder="Correct Answer"
                onChange={handleNewQInput}
                ></input>  
                <button>Submit</button>
            </form>: null}
            <button onClick={handleQClose}>Close {i.title}</button>
            </div> : null }
            {userRescue.status !== "Admin" ? <div>
                <h2>{i.title} Test:</h2>
                {i.questions.map(q => 
                <div><form>{q.text}
                <br></br>
                {q.options.map(o => 
                    <label>{o.text}
                    <input
                    type="radio"
                    name={q.text}
                    value={o.text}
                    // checked={selected === o.text}
                    onChange={(e) => handleTestInput(e, q)}
                    >
                    </input></label>)}
                    {/* <button>Enter</button><br></br> */}


                </form> 
                
                <br></br>
                 </div>
            )}
            {/* <Form qs={i.questions} i={i} testArr={testArr} setTestArr={setTestArr}/>  */}
         { score && showScore ? <p onClick={(e) => setShowScore(!showScore)}>You scored {score}</p> : null}
         <button onClick={(e) => handleSubmitTest(e, i)}>Submit {i.title} Test</button> 

            </div>
            : null}  
    </div>
    )
}


export default Questions; 