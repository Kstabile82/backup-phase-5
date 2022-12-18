import React, { useState } from "react"; 

function Form({ qs, i, testArr, setTestArr }){
    const [obj, setObj] = useState(null)
    
    let obJ = {}
    let thisValue;

    function handleTestInput(e, q) {
        e.preventDefault();
        let inputQ; 
        let inputVal;
        let correctAns;
        let questionId; 
        let infoId = i.id
        e.target.checked = !e.target.checked
        inputQ = e.target.name
        inputVal = e.target.value
        correctAns = q.options.find(o => o.correct)  
        questionId = q.id 
       setObj({"question_id": questionId, "info_id": infoId, "question": inputQ, "input": inputVal, "correct_answer": correctAns.text})
    }
    function handleSubmitClicked(e, q) {
        e.preventDefault();
        let alreadyExists = testArr.find(tA => tA.question_id === obj.question_id)
        if (alreadyExists) {
            let idx = testArr.indexOf(alreadyExists)
            testArr.splice(idx,1,obj)
            setTestArr(testArr)
        }
        else {
            setTestArr([...testArr, obj])
        }
    }

    return (
        <div>
            {qs.map(q => 
                <div><form onSubmit={(e) => handleSubmitClicked(e, q)}>{q.text}
                <br></br>
                {q.options.map(o => 
                    <label>{o.text}
                    <input
                    type="radio"
                    name={q.text}
                    value={o.text}
                    checked="false"
                    onChange={(e) => handleTestInput(e, q)}
                    >
                    </input></label>)}
                    <button>Enter</button><br></br>
                   

                </form> 
                <br></br>
                 </div>
            )}
   </div>
    )
}

export default Form;