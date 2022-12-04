import React, { useState } from "react"; 
import Form from "./Form";

function Questions({ answerObj, setAnswerObj, testArr, setTestArr, infoAns, setInfoAns, takeTest, setTakeTest, setShowingQs, showingQs, qs, setQs, i, setI, q, setQ, userRescue }) {
    const [addQs, setAddQs] = useState(false);
    const [addO, setAddO] = useState(false)
    const [inputOpt, setInputOpt] = useState(null)

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
        setInputOpt(e.target.value)
    }
    function handleSubmitOption(e, quest) {
        e.preventDefault();
        //post inputOpt text & quest.id for question_id
    }
    function deleteOption(e, o) {
        e.preventDefault();
        //delete option by o.id
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
           .then((u) => {
             console.log(u)
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
        //if 
    }

    return (
        <div>
            {userRescue.status === "Admin" ? <div>
            {qs.map(quest => <div><ul onClick={(e) => handleClickedQuestion(e, quest)}>{quest.text}
            {quest.options ? quest.options.map(o => <div><li>{o.text}</li><button onClick={(e) => deleteOption(e, o)}>-</button></div>) : null}
            <button onClick={(e) => handleAddOption(e, quest)}>Add Option</button></ul> 
            {addO ? <form>
                <input 
                type="text" 
                id="inputopt" 
                placeholder="New Option"
                onChange={handleInputOption}></input>  
                <button onClick={(e) => handleSubmitOption(e, quest)}>Submit</button>
            </form> : null } </div>)} 
            <button onClick={handleAddQuestions}>Add Question</button>
            {addQs ? <p>Add Question Form here</p>: null}
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