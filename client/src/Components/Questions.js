import React, { useState } from "react"; 
// import Options from "./Options";

function Questions({ options, setOptions, i, questions, setQuestions, addOpt, setAddOpt, opts, setOpts, question, setQuestion }) {
    const [addQs, setAddQs] = useState(false);
    // const [opts, setOpts] = useState([])
    // const [addOpt, setAddOpt] = useState(false)
    // const [question, setQuestion] = useState({})
    const [qn, setQn] = useState({})
    let newOptionInput; 
    let qText; 
    let correctAnswer; 
    // let option;
    let qArray = []
    questions.map(q => {
        let qOpts = []
        q.optionmethod.map(qO => qOpts.push({text: qO.text, correct: qO.correct}))
        qArray.push({text: q.questiontext, options: [qOpts]})
    })
        // let question = q.question; 
        // let answer = q.correct; 
        // let incorrect = q.incorrect;    
        // if (e.target.defaultValue === "question") {
        //     question = e.target.value
        // }
        // if (e.target.defaultValue === "correct") {
        //     answer = e.target.value
        // }
        // if (e.target.defaultValue === "incorrect") {
        //     incorrect = e.target.value
        // }
        // setQ(question, answer, incorrect)
    
    // function handleUpdate(e){
    //     e.preventDefault();
    //     // fetch(`/questions/${q.id}`, {
    //     //     method: "PATCH",
    //     //     headers: {
    //     //         "Content-Type": "application/json",
    //     //     },
    //     //     body: JSON.stringify({ q }),
    //     // })
    //     // .then((r) => r.json())
    //     // .then((updatedQ) => setQ([...questions.filter(quest => quest.id !== updatedQ.id), updatedQ]))
    // }
    // function handleDelete(e){
    //     e.preventDefault();
    //     // fetch(`/questions/${q.id}`, { 
    //     //     method: 'DELETE'
    //     // })
    //     // setQ(questions.filter(quest => quest.id !== q.id))
    // }
    function handlePostQ(e) {
        e.preventDefault();
        let questiontext = qText
        let information_id = i.id
        fetch(`/newquestion`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ information_id, questiontext }),
        })
        .then((r) => r.json())
        .then((newQ) => {
            if (questions.length > 0) {
                setQuestions([...questions, newQ])
                //make sure this renders right away == may need a callback fn from Adminpage
            }
            else {
                setQuestions(newQ)
            }
            setAddQs(false)
        })
    }
    function handleNewQInput(e) {
        e.preventDefault();
        if (e.target.defaultValue === "text") {
            qText= e.target.value
        }
        if (e.target.defaultValue === "correct") {
            correctAnswer= e.target.value
        }
        if (e.target.defaultValue === "incorrect") {
            // option= e.target.value
        }
    }
    function handleAddMoreQs(e) {
        e.preventDefault();
        setAddQs(true);
    }
    function handleAddOption(e, qn) {
        e.preventDefault();
        setAddOpt(true)
        setQn(qn)
        setOptions(qn.optionmethod)
    }
    console.log(options)
        function handleChange(e, qn) {
        if (e.target.id === "option"){
            newOptionInput = e.target.value
        }
        if (e.target.id === "Optioncorrect") {
            correctAnswer = e.target.value
        }
    }
    function handleChangeNewOption(e) {
        e.preventDefault();
        if (e.target.defaultValue === "Y/N") {
          if (e.target.value === "N"){
            correctAnswer = false;
          }
          else {
            correctAnswer = true;
          }
        }
        if (e.target.defaultValue === "Enter option") {
            newOptionInput = e.target.value
        }
    }
    function handleEditOptions(e, qn){
        setQuestion(qn)
        setOptions(qn.optionmethod)
    }
    function handleSaveNewOption(e) {
        e.preventDefault();
        setAddOpt(false)
        fetch("/options", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            question_id: qn.id,
            text: newOptionInput,
            correct: correctAnswer
            }),
        })
        .then((r) => r.json())
        .then((newO) => {
          setOptions([...options, newO])
          setAddOpt(false)
        })
    }
    function handleDeleteOption(e, o) {
        e.preventDefault();
        //delete request for o
        //option and question state updates all happen from Adminpage
    }
    return (
        <div>
            {questions !== [] ? questions.map(qn => <div>
                <form onChange={(e) => handleChange(e, qn)}>
                    Question:  
                    <input 
                    type="text" 
                    id="question" 
                    defaultValue={qn.questiontext}>
                    </input>  
                    {qn.optionmethod.map(o => <div><p>{o.text}</p><button onClick={(e) => handleDeleteOption(e, o)}>-</button></div>)}

                    {/* {qn.optionmethod.map(o => {
                    <input type="text" id="o.id" defaultValue="Option">{o.text}, {o.status}</input>
                    })}  */}
                    {/* {qn.optionmethod.map(o => 
                    <input 
                    type="text" 
                    id="correct" 
                    defaultValue="correct">{o.text}, {o.correct}</input>  
                    )} */}
                <button>Delete Question</button>
                <button>Update Question</button> 
                <button onClick={(e) => handleEditOptions (e, qn)}>Edit Options</button>
                <button onClick={(e) => handleAddOption (e, qn)}>Add Option</button>
               {/* {options ? options.map(o => {
               <input 
                    type="text" 
                    id="question" 
                    defaultValue={o}>
                    </input>  }) : null } */}
                    {/* {options ? < Options options={options} setOptions={setOptions} />: null } */}
            </form>
                </div> ) : null } <br></br><br></br>
            {addOpt ? <div> 
                <form onChange={handleChangeNewOption}>
                    Option: <input 
                    type="text" 
                    id="option" 
                    defaultValue="Enter option"></input>  
                    <br></br>  
                    Correct? <input 
                    type="text" 
                    id="Optioncorrect" 
                    defaultValue="Y/N"></input>  
                <br></br> <button onClick={handleSaveNewOption}>Save Option</button>
            </form> </div> : null}
          <br></br>
        <button onClick={handleAddMoreQs}>Add Question</button>
        {addQs ? <div><form onChange={handleNewQInput}>
            Question:<input 
            type="text" 
            id="rescuename" 
            defaultValue="text"></input>  
            <br></br>  
            Correct Answer:
            <input 
            type="text" 
            id="rescuename" 
            defaultValue="correct"></input>  
            <br></br>  
            Incorrect Option:  
            <input 
            type="text" 
            id="rescuename" 
            defaultValue="incorrect"></input>   
            <br></br>  </form> <button onClick={handlePostQ}>Save</button> </div>: null }
    </div>
    )
}


export default Questions; 