import React, { useState } from "react"; 

function Form({ answerObj, setAnswerObj, qs, i, infoAns, setInfoAns, testArr, setTestArr }){
//   const[inputQ, setInputQ] = useState(null)
//   const [inputVal, setInputVal] = useState(null)
//   const [correctAns, setCorrectAns] = useState(null)
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
        console.log(obj)
        let alreadyExists = testArr.find(tA => tA.question_id === obj.question_id)
        if (alreadyExists) {
            let idx = testArr.indexOf(alreadyExists)
            testArr.splice(idx,1,obj)
            setTestArr(testArr)
        }
        else {
            setTestArr([...testArr, obj])
        }
        //testArr.find obj w/ question, if exists, splice to swap out with new obj
        //if dont find above, spread operator to add obj to TestArr

        // let alreadyexists = infoAns.find(iA => iA.question === answerObj.question)
        //if alreadyexists, splice the infoAns array and replace iA w/ answerObj
        //else setInfoAns([...infoAns, answerObj])
       //ans is the correct option 
        // setInfoAns([...infoAns.filter(iA => iA.question !== answerObj.question), answerObj])
        //array of Q&A, filters so the new Q isnt included, then adds the new Q&A
            // let testObj = { infoId: i.id, questionId: q.id, answer: ans.text, inputName: inputVal };
            // setTestArr([...testArr.filter(tA => tA.questionId !== testObj.questionId), testObj])
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
                    checked="false"
                    onChange={(e) => handleTestInput(e, q)}
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