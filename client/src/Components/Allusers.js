import React, { useState } from "react";

function Allusers({ rescue, userRescue }) {
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
            console.log(updatedUser)
            //setstate
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
            console.log(updatedUser)
            //setstate
        })
    }
    function handleScores(e, uR) {
        e.preventDefault();
        setResults(null)
        setShowingScores(!showingScores)
        let r = {title: null, score: null, id: null}
        let rArray = []
      uR.userresults.map(res => rescue.information.find(i => {
        if(i.id === res.information_id) {
            r.title = i.title
            r.score = res.score
            r.id = res.id
        }
        rArray.push(r)
      }))
        setResults(rArray)
    }
    function handleDeleteResults(e, r) {
        e.preventDefault();
        //delete score by id#
    }   
return (
    <div>
        {rescue.userrescues.map(uR => <div><p>{uR.user.name}, {uR.status}</p>
        {uR.status === "Admin" && uR.id !== userRescue.id ? <button onClick={(e) => handleRemoveAdmin(e, uR)}>Remove Admin</button> : null } 
        {uR.status === "Guest" && uR.id !== userRescue.id ? <div><button onClick={(e) => handleMakeAdmin(e, uR)}>Make Admin</button>
        <button onClick={(e) => handleScores(e, uR)}>See Scores</button> 
        {showingScores && uR.userresults.length > 0 && results !== null ? results.map(r => <div><p>{r.title}: {r.score}</p><button onClick={(e) => handleDeleteResults(e, r)}>Delete Score</button></div> ) : null } 
        {showingScores && uR.userresults.length === 0 && results !== null ? <p>No results yet</p> : null }
        </div>
        :null } 
        </div>)}

    </div>
)
}
export default Allusers; 