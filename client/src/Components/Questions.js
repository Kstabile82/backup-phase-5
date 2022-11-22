import React, { useState } from "react"; 
import Options from "./Options";

function Questions({ i, setI, q, setQ, userRescue }) {
    const [addQs, setAddQs] = useState(false);
    const [qs, setQs] = useState(i.questions);
  
    function handleClickedQuestion(e, iq) {
        setQ(iq)
    }
    return (
        <div>
            {userRescue.status === "Admin" ? <div>
            {i.questions.map(iq => <ul onClick={(e) => handleClickedQuestion(e, iq)}>{iq.text}
            {iq.options ? iq.options.map(qo => <div><li>{qo.text}</li><button>-</button></div>) : null}
            <button>Add Option</button></ul> )} 
            <button>Add Question</button>
            <button>Close</button>
            </div>
            : null }
    </div>
    )
}


export default Questions; 