import React from "react"; 
import Rescuepage from "./Rescuepage";

function AllRescues({ updateUserRescues, user, rescues, setRescue, rescue, isAdmin, setIsAdmin }) {
    let displayedRescueIDs = []
    let displayedRescues = []
    // setIsAdmin(false)
    if (user && user.userrescues.length > 0) {
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

    function handleFilterChange() {

    }
    function handleSubmitFilter(){

    }
    return (
        <div className="container">
           <div className="filter">Filter:
            <form onSubmit={handleSubmitFilter}>
                <select name="location" id="location" onChange={handleFilterChange}>
                <option key="" value="" hidden>Location</option>
                <option key="NY" value="NY" >NY</option>
                <option key="NJ" value="NJ" >NJ</option>
                <option key="CA" value="CA" >CA</option>
                <option key="all" value="All" >All</option>
                </select>
                <select name="animals" id="animals" onChange={handleFilterChange}>
                <option key="" value="" hidden>Animals</option>
                <option key="NY" value="NY" >NY</option>
                <option key="NJ" value="NJ" >NJ</option>
                <option key="CA" value="CA" >CA</option>
                <option key="all" value="All" >All</option>
                </select>
                <b> </b> 
             </form> 
            </div>
            {rescues.map(r => <div>
                <p className={r.id} onClick={(e) => handleClick(e,r)}>{r.name}, {r.location}</p>             
            <button onClick={(e) => handleSaveToMyRescues(e, r)}>Save to My Rescues</button> 
            </div>)}
           {/* {rescue.name !== undefined ? <div>
            <Rescuepage isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} rescue={rescue}/>  
            </div> : null }  */}
           
        </div>
    );
}

export default AllRescues;