import React, { useState, useContext } from "react"; 
import UserContext from "./UserContext"

function AllRescues({ animalArray, locationArray, displayedRescs, setDisplayedRescs, updateUserRescues, user, rescues, setRescue, rescue, isAdmin, setIsAdmin }) {
    const [animalChoice, setAnimalChoice] = useState(null)
    const [locationChoice, setLocationChoice] = useState(null)
    let alreadyAdded = undefined
    const msg = useContext(UserContext);

    rescues.map(r => {
        r.rescuepets.map(rP => {
          if (!animalArray.includes(rP.animal)) {
            animalArray.push(rP.animal)
          }
        })
      })
      rescues.map(r => {
          if (!locationArray.includes(r.location)) {
            locationArray.push(r.location)
          }
        })

    function handleClick(e, r) {
        e.preventDefault();
        setRescue(r)
    }
    function handleSaveToMyRescues(e, r) {
       alreadyAdded = msg.userrescues.find(u => u.rescue.id === r.id) 
       if (alreadyAdded === undefined || alreadyAdded === null) {
        updateUserRescues(r, e)
       }
    }

    function handleFilterChange(e) {
        e.preventDefault();
        if (e.target.name === "animals") {
            setAnimalChoice(e.target.value)
        }
        if(e.target.name === "location") {
            setLocationChoice(e.target.value)
        }
    }
    function handleSubmitFilter(e){
        e.preventDefault();
        let animalFilterArr = []
        let locationFilter = []
        if (animalChoice === undefined || animalChoice === "All" || animalChoice === null) {
            animalFilterArr = rescues
        }
        else {
            rescues.map(dR => {
                dR.rescuepets.filter(rPs => {
                    if (rPs.animal === animalChoice) {
                        animalFilterArr.push(dR)
                    } })
            })
            animalFilterArr = [...new Set(animalFilterArr)]
        }
        if (locationChoice === undefined || locationChoice === "All" || locationChoice === null) {
            locationFilter = animalFilterArr
        }
        else {
            animalFilterArr.filter(aF => {
               if(aF.location === locationChoice) {
                locationFilter.push(aF)
               } 
            })
        }
        setDisplayedRescs(locationFilter)
    }
    return (
        <div className="container">
            
           <div className="filter">Filter:
            <form onSubmit={handleSubmitFilter}>
                <select name="location" id="location" onChange={handleFilterChange}>
                <option key="" value="" hidden>Location</option>
                {locationArray.map(la => 
                <option key={la} value={la}>{la}</option>)}
                <option key="all" value="All" >All</option>
                </select>
                <select name="animals" id="animals" onChange={handleFilterChange}>
                <option key="" value="" hidden>Animals</option>
                {animalArray.map(aa => 
                <option key={aa} value={aa}>{aa}</option>)}
                <option key="all" value="All">All</option>
                </select>
                <b> </b> 
                <button onClick={handleSubmitFilter}>Submit</button>
             </form> 
            </div>
            {displayedRescs.map(r => <div>
                <p className={r.id} onClick={(e) => handleClick(e,r)}>{r.name}, {r.location}</p>             
            <button onClick={(e) => handleSaveToMyRescues(e, r)}>Save to My Rescues</button> 
            </div>)}
        </div>
    );
}

export default AllRescues;