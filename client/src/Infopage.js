import React, { useState } from "react"; 

function Infopage({ rescue, user, setShowInfo }){
   const [showQuiz, setShowQuiz] = useState()
   const [info, setInfo] = useState()
   const [qs, setQs] = useState([])
   const [q, setQ] = useState({})
   const [ots, setOts] = useState([])

  function handleClose(e) {
    e.preventDefault();
    setShowInfo(false)
  }
  function handleClickInfo(rIm, e) {
    setQs(rIm.questions)
    //fetch questions rIm.id and set questions & options
  }
  console.log(rescue)
return (
        <div>
             {rescue.informations.map(rIm => <div key={rIm.id}><h3 onClick={(e) => handleClickInfo(rIm, e)}>{rIm.title}</h3></div>) } 
             {qs ? <div>{qs.map(q => {
                <div>
             <p>{q.questiontext}</p>
             {/* {q.optionmethod.map(o => <p>{o.text}</p>)} */}
             </div>
             }) 
             }
             </div> : null}
             <button onClick={handleClose}>Close</button>

        </div>
    )
}
export default Infopage; 