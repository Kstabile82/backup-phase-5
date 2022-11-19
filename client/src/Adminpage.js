import React, { useEffect, useState } from "react";
import Questions from "./Questions";

function Adminpage({ user, rescue, handleRemoveAdmin, handleAddAdmin }) {
    const [viewedUsers, setViewedUsers] = useState([])
    const [clicked, setClicked] = useState("")
    const [editQs, setEditQs] = useState(false)
    const [questions, setQuestions] = useState([])
    const [question, setQuestion] = useState({})
    const [allInfo, setAllInfo] = useState([])
    const [addInfo, setAddInfo] = useState(false)
    const [addMoreInfo, setAddMoreInfo] = useState(false)
    const [inf, setInf] = useState({})
    const [opts, setOpts] = useState([])
    const [addOpt, setAddOpt] = useState(false)
    const [options, setOptions] = useState([])


    let title; 
    let text;
    useEffect(() => {
        fetch(`/information/${rescue.id}`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            // body: JSON.stringify({ rescue_id: parseInt(rescue.id) }),
            body: JSON.stringify({ rescue_id: parseInt(rescue.id) }),

        })
        .then((r) => r.json())
        .then((allinf) => { 
            setAllInfo(allinf)
            }
            ) 
        },[]);
    
    function handleUsers(e) {
        e.preventDefault();
        fetch(`/allusers`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ rescue_id: parseInt(rescue.id) }),
        })
        .then((r) => r.json())
        .then((ur) => { 
            setViewedUsers(ur)
            setClicked("users")
            }
            ) 
       }
//   function handleShowAdminInfo(e) {
//     e.preventDefault();
//   }
//   function handleAddMoreQs(e) {
//     e.preventDefault();
//   }
  function handleAddInfo(e) {
    e.preventDefault();
    setAddInfo(true)
  }
  function handleSubmitInfo(e){
    e.preventDefault();
    setAddInfo(false)
    setEditQs(false)
  }
  function handleAddMoreInfo(e){
    e.preventDefault();
    setAddMoreInfo(true)
  }
  function handleChangeInfo(e){
    e.preventDefault();
    if (e.target.placeholder === "Title") {
        title = e.target.value;
    }
    if (e.target.placeholder === "Enter text") {
        text = e.target.value
    }
  }
  function handleSaveInfo(e){
    e.preventDefault();
    setAddMoreInfo(false)
    fetch(`/newinformation`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ rescue_id: rescue.id, title, text }),
    })
    .then((r) => r.json())
    .then((newInfo) => {
        setAllInfo([...allInfo, newInfo])
    })
   }
   function handleDeleteInfo(e, i) {
    let id = i.id
    fetch(`/information/${id}`, { 
        method: 'DELETE'
    })
    setAllInfo(allInfo.filter(inf => inf.id !== id))  
 }
    function handleEditQs(e, i) {
        if (i !== {}) {
            setInf(i)
            setQuestions(i.questions)
            setEditQs(true)
        }
    }
    function handleSaveInfoChanges(e, i) {
        fetch(`/information/${i.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ i }),
        })
        .then((r) => r.json())
        .then((updatedI) => setAllInfo([...allInfo.filter(infor => infor.id !== updatedI.id), updatedI]))
    }
    function handleInfoChange(e, i) {
        if (e.target.id === "title") {
            i.title = e.target.value;
        }
        if (e.target.id === "text") {
            i.text = e.target.value
        }    
    }
return (
    <div>
    {!addInfo ? <button onClick={handleAddInfo}>Edit Info</button> : null }
    {/* <button style={{display: !addInfo ? 'visible' : 'none' }} onClick={handleAddInfo}>Edit Info</button> */}
    {addInfo ? <div>
       <form>
        Details:  
        <input 
        type="text" 
        id="rescuename" 
        key={rescue.name}
        defaultValue={rescue.name}></input>  
        <input 
        type="text" 
        id="rescuelocation" 
        key={rescue.location}
        defaultValue={rescue.location}></input>
        <br></br>  
    </form>
    <button>Save Updated Details</button>
    <br></br>
    <br></br>
    {addInfo && allInfo.length > 0 ? allInfo.map(i => <div>
            <form onChange={(e) => handleInfoChange(e, i)}>
            Title: <input 
                type="text" 
                id="title" 
                key={i.title[0]}
                placeholder={i.title}
                defaultValue={i.title}>
            </input><br></br>
            Text: <input 
                type="text" 
                id="text" 
                key={i.text[0]}
                placeholder={i.text}
                defaultValue={i.text}>
            </input> 
            </form>
            <button onClick={(e) => handleDeleteInfo(e, i)}>Delete Information</button>
            <button onClick={(e) => handleSaveInfoChanges(e, i)}>Save Updated Information</button>
            <button onClick={(e) => handleEditQs(e, i)}>Edit Questions</button><br></br>
            {editQs && inf !== {} ? <Questions options={options} setOptions={setOptions} i={inf} questions={questions} setQuestions={setQuestions} question={question} setQuestion={setQuestion} opts={opts} setOpts={setOpts} addOpt={addOpt} setAddOpt={setAddOpt}/> : null } <br></br><br></br>
        </div> ): null} 
    <button onClick={handleAddMoreInfo}>Add Information</button>
    {addMoreInfo ? <div>
        <form onChange={handleChangeInfo}>
            <input 
            type="text" 
            id="title" 
            key="ttl"
            placeholder="Title"></input>
            <input 
            type="text" 
            id="text" 
            key="txt"
            placeholder="Enter text"></input>
        </form> 
        <button onClick={handleSaveInfo}>Save</button>
    </div> : null}
    <br></br>
    <button onClick={handleSubmitInfo}>Close</button> 
    </div>
    : null}
    <br></br>
    <button>Edit Pets</button>
    <br></br>
    <button onClick={handleUsers}>Edit Users</button>
    {clicked === "users" && viewedUsers.length > 0 ? viewedUsers.map(v => <div key={v.id}><p key={v.user.name}>{v.user.name}, {v.status}</p> 
    {v.status === "Admin" ? 
    <button onClick={(e) => handleRemoveAdmin(e, v)}>Remove Admin</button> :
    <button onClick={(e) => handleAddAdmin(e, v)}>Make Admin</button>  
    } </div>) 
   : null }
    </div>
)
}
export default Adminpage;