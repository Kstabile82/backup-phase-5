import React from "react"; 

function Welcomepage({ user, handleLogout }) {

    function handleDelete(e){
      e.preventDefault();
      fetch(`/user/${user.id}`, { method: "DELETE" }).then((r) => {
        console.log(r)
        // if (r.ok) {
        //   handleLogout();
        // }
    })
    }
return (
    <div>
        Welcome, {user.name}!
        <br></br><br></br>
        <button onClick={handleDelete}>Delete My Account</button>
       <p>My Rescues</p>
       <p>All Rescues</p>
       <p>Create New Rescue</p>

    </div>
)
}
 export default Welcomepage; 