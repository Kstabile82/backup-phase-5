import React, { useState } from "react"; 
import Form from "./Form";


function Questions({ showContactForm, setShowContactForm, answerObj, setAnswerObj, testArr, setTestArr, infoAns, setInfoAns, takeTest, setTakeTest, setShowingQs, showingQs, qs, setQs, i, setI, q, setQ, userRescue }) {
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
    function handleAddOption(e, quest) {
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
             console.log(opt)
            //  setShowingAddForm(!showingAddForm)
           })
         }
       });
    }
    function deleteOption(e, o) {
        e.preventDefault();
        fetch(`/option/${o.id}`, { 
            method: 'DELETE'
        })
        //set options
    }
    function handleDeleteQuestion(e, quest) {
        e.preventDefault();
        //delete q by quest.id
        fetch(`/questions/${quest.id}`, { 
            method: 'DELETE'
        })
        //set questions
    }

    function handleSubmitTest(e) {
        e.preventDefault();
        fetch("/userresults", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userrescue_id: userRescue.id, testArr }),

            // body: JSON.stringify({ userrescue_id: userRescue.id, information_id: i.id, input: testArr.input }),
        })
     .then((r) => {
         if (r.ok) {
           r.json()
           .then((ur) => {
             console.log(ur)
             if (ur.score === testArr.length) {
                setShowContactForm(!showContactForm)
             }
           })
         }
       });
        //post request to userresults, send testArr
        //send testArr to back end
        //on back end, map thru testArr
        //if answer === input, add a point
        //return number of points out of total (info.id.questions.length)
        //if testArr.length !== info_id.questions.length, return error message didnt answer all the qs
        //userresults belongs to userrescue & information
        //if userresults.score === userresults.topscore show application 
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
        console.log(quest, editedQ)
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
            console.log(updatedq)
        //   setInf(updatedpet)
        //   setUserRescues slice etc
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
        //post request for q and for o
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
            // fetch("/options", {
            //     method: "POST", 
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({ question_id: q.id, text: newQ, correct: true }),
            //     })
            //     .then((r) => {
            //         if (r.ok) {
            //         r.json()
            //         .then((o) => {
            //                 console.log(o)
            //         })
            //         }
            //     })
                console.log(q)
                FirstOption(q)
            });
           }
        });
    }
    function FirstOption(q) {
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
                        console.log(o)
                })
                }
            })
    }

    return (
        <div>
            {userRescue.status === "Admin" ? <div>
            {qs.map(quest => <div><ul onClick={(e) => handleClickedQuestion(e, quest)}>{quest.text}
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
            <Form answerObj={answerObj} setAnswerObj={setAnswerObj} qs={qs} i={i} infoAns={infoAns} setInfoAns={setInfoAns} testArr={testArr} setTestArr={setTestArr}/> 
            <button onClick={handleSubmitTest}>Submit {i.title}</button> </div>
            : null}  
    </div>
    )
}


export default Questions; 