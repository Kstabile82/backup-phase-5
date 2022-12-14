import React, { useState } from "react"; 

function AllRescues({ animalArray, displayedRescs, setDisplayedRescs, updateUserRescues, user, rescues, setRescue, rescue, isAdmin, setIsAdmin }) {
    let displayedRescueIDs = []
    let displayedRescues = []
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
    if (user && user.userrescues && user.userrescues.length > 0) {
        user.userrescues.map(ur => {
        displayedRescueIDs.push(ur.rescue.id)
        return displayedRescueIDs
        })
    }
    displayedRescues = rescues.filter(r => !displayedRescueIDs.includes(r.id))

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
      rescues.filter(dR => dR.rescuepets.filter(rPs => console.log(rPs.animal === animalChoice)))
    }
    function handleSubmitFilter(e){
        e.preventDefault();
        setDisplayedRescs(displayedRescs.filter(dR => dR.rescuepets.map(rPs => rPs.animal === animalChoice)))

    }
    return (
        <div className="container">
           <div className="filter">Filter:
            <form onSubmit={handleSubmitFilter}>
                <select name="location" id="location" onChange={handleFilterChange}>
                <option key="" value="" hidden>Location</option>
                <option key="all" value="All" >All</option>
                <option key="NY" value="NY" >NY</option>
                <option key="NJ" value="NJ" >NJ</option>
                <option key="CA" value="CA" >CA</option>
                </select>
                <select name="animals" id="animals" onChange={handleFilterChange}>
                <option key="" value="" hidden>Animals</option>
                {animalArray.map(aa => 
                <option key={aa} value={aa}>{aa}</option>
                )}
                <option key="all" value="All">All</option>
                </select>
                <b> </b> 
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