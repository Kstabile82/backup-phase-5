import React, { useState } from "react"; 
import Form from "./Form";

function Questions({ answerObj, setAnswerObj, testArr, setTestArr, infoAns, setInfoAns, takeTest, setTakeTest, setShowingQs, showingQs, qs, setQs, i, setI, q, setQ, userRescue }) {
    const [addQs, setAddQs] = useState(false);
    const [addO, setAddO] = useState(false)
    const [inputOpt, setInputOpt] = useState(null)
    //     let testObj = { questionId: q.id, answer: q.options.find(o => o.correct === true), input: "x" };
    //     testArr.push(testObj)
    //the above may need to happen in the form component, create this in submitClicked fn
//testArr length should be equal to i.questions.length when we go to submit the final

   //upon submitting answers, map the testArr, if answer === input, add a point
   //total points = array length
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
    // function handleTestInput(e) {
    //     e.preventDefault();
    //     // setIsChecked(e.target.value)
     
    // }
    function handleSubmitTest(e) {
        e.preventDefault();
        console.log(testArr)
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