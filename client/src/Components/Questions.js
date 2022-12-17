import React, { useState } from "react"; 
import Form from "./Form";
import Rescuepage from "./Rescuepage";

function Questions({ info, setInfo, showContactForm, setShowContactForm, answerObj, setAnswerObj, testArr, setTestArr, infoAns, setInfoAns, takeTest, setTakeTest, setShowingQs, showingQs, i, setI, q, setQ, userRescue, setUserRescue }) {
    const [addQs, setAddQs] = useState(false);
    const [addO, setAddO] = useState(false)
    const [text, setText] = useState(null)
    const [correct, setCorrect] = useState(false) 
    const [showEditQ, setShowEditQ] = useState(false)
    const [editedQ, setEditedQ] = useState(null)
    const [newQ, setNewQ] = useState(null)
    const [newO, setNewO] = useState(null)
    
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
        //need to do something more here to set it and replace Q with specQ
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
    function handleSubmitTest(e) {
        e.preventDefault();
        fetch("/userresults", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userrescue_id: userRescue.id, testArr }),
        })
     .then((r) => {
         if (r.ok) {
           r.json()
           .then((ur) => {
             if (ur.score === testArr.length) {
                setShowContactForm(!showContactForm)
                userRescue.userresults = [...userRescue.userresults, ur]
                setUserRescue(userRescue)
             }
           })
         }
       });
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

    return (
        <div>
            {userRescue.status === "Admin" ? <div>
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
            <button onClick={(e) => handleAddOption(e, quest)}>Add Option</button></ul> 
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
            <button onClick={handleQClose}>Close</button>
            </div> : null }
            {userRescue.status !== "Admin" ? <div>
                <h2>{i.title} Test:</h2>
            <Form answerObj={answerObj} setAnswerObj={setAnswerObj} qs={i.questions} i={i} infoAns={infoAns} setInfoAns={setInfoAns} testArr={testArr} setTestArr={setTestArr}/> 
            <button onClick={handleSubmitTest}>Submit {i.title}</button> </div>
            : null}  
    </div>
    )
}


export default Questions; 