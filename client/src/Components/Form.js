import React, { useState } from "react"; 
import Questions from "./Questions";

function Form({ qs, i, infoAns, setInfoAns, testArr, setTestArr }){
    const [answerObj, setAnswerObj] = useState({})

    let obJ = {}
    let thisValue;

    function handleTestInput(e) {
        e.preventDefault();
        e.target.checked = true
        thisValue = e.target.value
        let thisName = e.target.name
        obJ = {question: thisName, answer: thisValue}
        setAnswerObj(obJ)
        
    }

    function handleSubmitClicked(e, q) {
        e.preventDefault();
        setInfoAns([...infoAns.filter(iA => iA.question !== answerObj.question), answerObj])
            let testObj = { questionId: q.id, answer: q.options.find(o => o.correct === true), input: answerObj.answer };
            setTestArr([...testArr.filter(tA => tA.questionId !== testObj.questionId), testObj])
    }

    return (
        <div>
            {qs.map(q => 
                <div><form onSubmit={(e) => handleSubmitClicked(e, q)}>{q.text}
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