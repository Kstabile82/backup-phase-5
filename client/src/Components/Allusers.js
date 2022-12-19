import React, { useState } from "react";

function Allusers({ rescues, setRescues, rescue, setRescue, userRescue, setUserRescue }) {
 const [results, setResults] = useState(null)
const [showingScores, setShowingScores] = useState(false)
    function handleMakeAdmin(e, uR) {
        e.preventDefault(); 
        fetch(`/userrescues/${uR.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "Admin" }),
        })
        .then((r) => r.json())
        .then((updatedUser) => {
            let index = rescue.userrescues.findIndex((u) => u.id === uR.id)
            rescue.userrescues.splice(index,1,updatedUser)
            setRescue(rescue)
        })
    }
    function handleRemoveAdmin(e, uR) {
        e.preventDefault();
        fetch(`/userrescues/${uR.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "Guest" }),
        })
        .then((r) => r.json())
        .then((updatedUser) => {
            let index = rescue.userrescues.findIndex((u) => u.id === uR.id)
            rescue.userrescues.splice(index,1,updatedUser)
            setRescue(rescue)
        })
    }
    function handleScores(e, uR) {
        e.preventDefault();
        // setResults(null)
        setShowingScores(!showingScores)
        let r = {title: null, score: null, id: null}
        let rArray = []
       uR.userresults.map(resul => {
        r.score = resul.score
        r.id = resul.id
        r.maxscore = resul.maxscore
        r.title = rescue.information.find(rI => rI.id === resul.information_id).title
        rArray.push(r)
       }
     )
      setResults(rArray)
    }
    function handleDeleteResults(e, r, uR) {
        e.preventDefault();
        fetch(`/userresults/${r.id}`, {
            method: "Delete", 
        })
            let res = rescues
            let resc = res.find(re => re.id === rescue.id)
            let uresc = resc.userrescues.find(uresc => uresc.id === uR.id)
            uresc.userresults.filter(u => u.id !== r.id)
            setRescues(res)
    }   
  
return (
    <div>
        {rescue.userrescues.map(uR => <div><p>{uR.user.name}, {uR.status}</p>
        {uR.status === "Admin" && uR.id !== userRescue.id ? <button onClick={(e) => handleRemoveAdmin(e, uR)}>Remove Admin</button> : null } 
        {uR.status === "Guest" && uR.id !== userRescue.id ? <div><button onClick={(e) => handleMakeAdmin(e, uR)}>Make Admin</button>
        <button onClick={(e) => handleScores(e, uR)}>See Scores</button> 
        {showingScores && uR.userresults.length > 0 && results !== null ? results.map(r => <div><p>{r.title}: {r.score} out of {r.maxscore}</p><button onClick={(e) => handleDeleteResults(e, r, uR)}>Delete Score</button></div> ) : null } 
        {showingScores && uR.userresults.length === 0 && results !== null ? <p>No results yet</p> : null }
        </div>
        :null } 
        </div>)}

    </div>
)
}
export default Allusers; 