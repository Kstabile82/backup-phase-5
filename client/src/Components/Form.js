import React, { useState } from "react"; 

function Form({ answerObj, setAnswerObj, qs, i, infoAns, setInfoAns, testArr, setTestArr }){

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
       let ans = q.options.find(o => o.correct === true)
        setInfoAns([...infoAns.filter(iA => iA.question !== answerObj.question), answerObj])
            let testObj = { infoId: i.id, questionId: q.id, answer: ans.text, input: answerObj.answer };
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