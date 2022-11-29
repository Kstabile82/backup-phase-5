import React, { useState } from "react"; 
import Questions from "./Questions";

function Form({ qs, i, infoAns, setInfoAns }){
    const [isChecked, setIsChecked] = useState("") 
    const [answerObj, setAnswerObj] = useState({})

    let obJ = {}
   

    function handleTestInput(e) {
        e.preventDefault();
        // setIsChecked(e.target.value)
        e.target.checked = true
        let thisValue = e.target.value
        let thisName = e.target.name
        obJ = {question: thisName, answer: thisValue}
        setAnswerObj(obJ)
    }

    function handleSubmitClicked(e) {
        e.preventDefault();
        // setInfoAns([...answerObj, obJ])
        setInfoAns([...infoAns.filter(iA => iA.question !== answerObj.question), answerObj])
        // setInfoAns([...infoAns, answerObj])
        console.log(infoAns)
    }

    return (
        <div>
            {qs.map(q => 
                <div><form onSubmit={handleSubmitClicked}>{q.text}
                {q.options.map(o => 
                    <label>{o.text}
                    <input
                    type="radio"
                    name={q.text}
                    value={o.text}
                    // checked={false}
                    onChange={handleTestInput}
                    >
                    </input></label>)}
                    <button>Enter</button>

                </form> 
                 </div>
            )}
   </div>
    )
}

export default Form;