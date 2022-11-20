import React from "react"; 

function Options({ options, setOptions }){

    console.log(options)

    return (
        <div>
            {options.map(opt => {
                <input 
                    type="text" 
                    id="question" 
                    defaultValue={opt.text}>
                    </input>
            })}
      
        </div>
    )
}
export default Options; 