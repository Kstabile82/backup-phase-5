import React, { useState} from "react";

function Rescuepets({ rescue, setRescue, userRescue, rescuePets, setRescuePets, showPets, setShowPets }) {
    const [pet, setPet] = useState(null)
    const [showingAddForm, setShowingAddForm] = useState(false)
    const [showingUpdateForm, setShowingUpdateForm] = useState(false)
    const [name, setName] = useState(null)
    const [breed, setBreed] = useState(null)
    const [animal, setAnimal] = useState(null)
    const [age, setAge] = useState(null)
    let updatedPet = pet

    let animalArr = []; 
    rescuePets.map(rP => {
        if(!animalArr.includes(rP.animal)) {
            animalArr.push(rP.animal)
        }
    })

    function handleSetPet(e, rP) {
        setPet(rP)
    }
    function handleClosePets(e) {
        e.preventDefault(); 
        setShowPets(!showPets)
        setRescuePets([])
    }
  function handleUpdatePet(e) {
    e.preventDefault();
    setShowingUpdateForm(!showingUpdateForm)
  }

function handleDeletePet(e) {
    e.preventDefault();
    fetch(`/rescuepets/${pet.id}`, { 
        method: 'DELETE'
    })
    setRescuePets(rescuePets.filter(rP => rP.id !== pet.id))
}
function onAddPetClick(e){
    e.preventDefault();
    setShowingAddForm(!showingAddForm)
}
function handleChange(e) {
    e.preventDefault();
    if(e.target.parentElement.className === "Update Form"){
        if (e.target.name === "breed") {
            updatedPet.breed = e.target.value
        }
        if (e.target.name === "animal") {
            updatedPet.animal = e.target.value
        }
        if (e.target.name === "age") {
            updatedPet.age = e.target.value
        }
        if (e.target.name === "name") {
            updatedPet.name = e.target.value
        }
    }
    if(e.target.parentElement.className === "Add Form"){
        if (e.target.name === "name") {
            setName(e.target.value) 
        }
        if (e.target.name === "age") {
            setAge(e.target.value)
        }
        if (e.target.name === "breed") {
            setBreed(e.target.value)
        }
        if (e.target.name === "animal") {
            setAnimal(e.target.value)
        }
    }
}
function handleSubmitNewPet(e) {
    e.preventDefault(); 
    fetch("/rescuepets", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            name,
            age,
            animal,
            breed,
            rescue_id: rescue.id
         }),
    })
 .then((r) => {
     if (r.ok) {
       r.json()
       .then((pet) => {
         setShowingAddForm(!showingAddForm)
         setRescuePets([...rescuePets, pet])
       })
     }
   });
}

function handleSubmitUpdates(e) {
    e.preventDefault();
    fetch(`/rescuepets/${updatedPet.id}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        name: updatedPet.name,
        breed: updatedPet.breed,
        animal: updatedPet.animal,
        age: updatedPet.age,
        rescue_id: updatedPet.rescue_id
        
        }),
    })
    .then((r) => r.json())
    .then((updatedpet) => {        
        let index = rescue.rescuepets.findIndex((p) => p.id === updatedpet.id)
        rescuePets.splice(index,1,updatedpet)
        setRescuePets(rescuePets)
    })
}
function handleFilter(e) {
    e.preventDefault();
    if(e.target.value === "All") {
        setRescuePets(rescue.rescuepets)
    }
    else {
        setRescuePets(rescuePets.filter(r => r.animal === e.target.value))
    }
}
return (
    <div>
        <form onChange={handleFilter}>Filter    
        <select name="animal" id="animal">
                <option key="" value="" hidden>Animal</option>
                {animalArr.map(a => 
                                <option key={a} value={a}>{a}</option>
                    )}
                <option key="all" value="All" >All</option>
                </select>
        </form>
    {rescuePets.map(rP => <p onClick={(e) => handleSetPet(e, rP)}>{rP.name}, {rP.animal}, {rP.age}, {rP.breed}</p> ) }
    {pet ? <div><p>{pet.name}</p>
    {userRescue.status === "Admin" ? <div><button onClick={handleDeletePet}>Delete</button><button onClick={handleUpdatePet}>Update</button></div> : null} </div> 
    : null }
    {showingUpdateForm ? <div><form className="Update Form" onSubmit={handleSubmitUpdates}>
    <input onChange={handleChange}
                type="text"
                name="name"
                placeholder={pet.name}
                ></input>
                <input onChange={handleChange}
                type="text"
                name="animal"
                placeholder={pet.animal}
                ></input>
                  <input onChange={handleChange}
                type="text"
                name="breed"
                placeholder={pet.breed}
                ></input>
                  <input onChange={handleChange}
                type="text"
                name="age"
                placeholder={pet.age}
                ></input><button className="formbutton">Submit Updates</button>
    </form> 
</div> : null }
    {userRescue.status === "Admin" ? <button onClick={onAddPetClick}>Add New Pet</button> : null}
    {showingAddForm ? <div><form className="Add Form" onSubmit={handleSubmitNewPet}>
    <input onChange={handleChange}
                type="text"
                name="name"
                placeholder="Name"
                ></input>
                <input onChange={handleChange}
                type="text"
                name="animal"
                placeholder="Animal"
                ></input>
                  <input onChange={handleChange}
                type="text"
                name="breed"
                placeholder="Breed"
                ></input>
                  <input onChange={handleChange}
                type="text"
                name="age"
                placeholder="Age"
                ></input>
                <button className="formbutton">Submit New Pet</button>
                </form>
                </div>: null }
    <button onClick={handleClosePets}>Close</button>
    </div>
    
)
}
export default Rescuepets;