import React, { useState } from "react"; 
import Questions from "./Questions";

function Infopage({ info, rescue, user, userRescue, setShowInfo }) {
   const [showQuiz, setShowQuiz] = useState()
   const [qs, setQs] = useState([])
   const [q, setQ] = useState({})
   const [ots, setOts] = useState([])
   const [addInfo, setAddInfo] = useState(false)

  function handleClose(e) {
    e.preventDefault();
    setShowInfo(false)
  }
  function handleClickInfo(rIm, e) {
    setQs(rIm.questions)
    //fetch questions rIm.id and set questions & options
  }
  function handleAddInfo(e) {
    e.preventDefault();
    setAddInfo(true)
  }
  return (
        <div>
             {info.map(i => <div key={i.id}><h3 onClick={(e) => handleClickInfo(i, e)}>{i.title}</h3></div>) } 
             {/* {qs ? <div>{qs.map(q => {
                <div>
             <p>{q.questiontext}</p> */} 
             {/* {q.optionmethod.map(o => <p>{o.text}</p>)} */}
            {/* </div> */}
              {/* }) 
             }
              </div> : null} */}
             {/* <button onClick={handleClose}>Close</button> */}
             {userRescue.status === "Admin" ? <button onClick={handleAddInfo}>Edit Info</button> : null }
             {/* {info.questions ? <Questions info={info} setInfo={setInfo}/> : null} */}

        </div>
    )
}
export default Infopage; 