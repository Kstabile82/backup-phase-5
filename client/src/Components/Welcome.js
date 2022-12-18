import React, { useContext } from "react"; 
import UserContext from "./UserContext"

function Welcomepage({ handleLogout }) {
    const msg = useContext(UserContext);
    function handleDelete(e){
      e.preventDefault();
      fetch(`/user/${msg.id}`, { method: "DELETE" }).then((r) => {
        if (r.ok) {
          handleLogout();
        }
    })
    }
return (
    <div>
        Welcome, {msg.name}!
        <br></br><br></br>
        <button onClick={handleDelete}>Delete My Account</button>

    </div>
)
}
 export default Welcomepage; 