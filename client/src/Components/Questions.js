import React, { useState } from "react"; 

function Questions({ setShowingQs, showingQs, qs, setQs, i, setI, q, setQ, userRescue }) {
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
            </div>
            : null }
    </div>
    )
}


export default Questions; 