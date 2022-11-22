import React, { useState } from "react"; 

function Options({ q, setQ }){
const [opts, setOpts] = useState(q.options)

return (
        <div>
            {opts ? opts.map(opt => {
                <li>opt</li>
                // <input 
                //     type="text" 
                //     id="question" 
                //     defaultValue={opt.text}>
                //     </input>
            }) : null }
      
        </div>
    )
}
export default Options; 