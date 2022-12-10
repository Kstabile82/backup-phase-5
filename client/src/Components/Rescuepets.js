import React, { useState} from "react";

function Rescuepets({ rescue, userRescue, rescuePets, setRescuePets, showPets, setShowPets }) {
    const [showDetails, setShowDetails] = useState(null)
    const [showingAddForm, setShowingAddForm] = useState(false)

    function handleClosePets(e) {
        e.preventDefault(); 
        setShowPets(!showPets)
        setRescuePets([])
    }
    
  function addPet(e) {

  }
  function updatePet(e) {

  }
  function handleShowDetails(e, rP) {
    e.preventDefault();
    setShowDetails(rP)
  }
function handleDeletePet(e) {
    e.preventDefault();
    //delete request using showDetails.id
}
function onAddPetClick(e){
    e.preventDefault();
    setShowingAddForm(!showingAddForm)
}
// function handleChange(e) {
//     e.preventDefault();
//     console.log(e.target.value)
// }
function handleSubmitNewPet(e) {
    e.preventDefault(); 

}
return (
    <div>
        <form>Filter by animal
        <select name="animal" id="animal">
                <option key="" value="" hidden>Animal</option>
                {rescuePets.map(rPs => 
                                <option key={rPs.name} value={rPs.animal}>{rPs.animal}</option>
                    )}
                <option key="all" value="All" >All</option>
                </select>
        </form>
    {rescuePets.map(rP => <p onClick={(e) => handleShowDetails(e, rP)}>{rP.name}, {rP.animal}, {rP.age}, {rP.breed}</p> ) }
    {showDetails ? <div><p>{showDetails.name}</p>
    {userRescue.status === "Admin" ? <button onClick={handleDeletePet}>-</button> : null} </div> : null }
    {userRescue.status === "Admin" ? <button onClick={onAddPetClick}>Add New Pet</button> : null}
    {showingAddForm ? <div><form>form here</form> <button>Submit New Pet</button></div>: null }
    <button onClick={handleClosePets}>Close</button>
    </div>
    
)
}
export default Rescuepets;