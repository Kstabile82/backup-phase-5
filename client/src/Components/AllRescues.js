import React, { useState } from "react"; 

function AllRescues({ animalArray, locationArray, displayedRescs, setDisplayedRescs, updateUserRescues, user, rescues, setRescue, rescue, isAdmin, setIsAdmin }) {
    // let displayedRescueIDs = []
    // let displayedRescues = []
    const [animalChoice, setAnimalChoice] = useState(null)
    const [locationChoice, setLocationChoice] = useState(null)
    // const [displayedRescs, setDisplayedRescs] = useState(rescues)

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
      
    // if (user && user.userrescues && user.userrescues.length > 0) {
    //     user.userrescues.map(ur => {
    //     displayedRescueIDs.push(ur.rescue.id)
    //     return displayedRescueIDs
    //     })
    // }
    // displayedRescues = rescues.filter(r => !displayedRescueIDs.includes(r.id))

    function handleClick(e, r) {
        e.preventDefault();
        setRescue(r)
    //   let num = parseInt(e.target.className);
    //   setRescue(rescues.find(r => r.id === num))
    }
    function handleSaveToMyRescues(e, r) {
        updateUserRescues(r, e)
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
            // locationFilter = [...new Set(locationFilter)]
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