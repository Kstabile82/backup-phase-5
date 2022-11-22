import './App.css';
import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import ReactToPrint from 'react-to-print';
// import { Document, Page } from 'react-pdf'
import NavBar from "./NavBar";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Welcome from "./Welcome";
import AllRescues from "./AllRescues";
import MyRescues from "./MyRescues";
import NewRescue from "./NewRescue";
// import { Viewer } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// import { Worker } from '@react-pdf-viewer/core';

function App(){
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [user, setUser] = useState(null);
  const [loggedOut, setLoggedOut] = useState(true);
  const [rescues, setRescues] = useState([])
  const [userRescues, setUserRescues] = useState([])
  const [userRescue, setUserRescue] = useState({}) 
  const [isAdmin, setIsAdmin] = useState(false)
  const [resc, setResc] = useState({})
  const [input, setInput] = useState()
  // const [uploadFile, setUploadFile] = useState()
  const [pdfFile, setPdfFile] = useState()
  const [viewPdf, setViewPdf]=useState(null);
  const [rescue, setRescue] = useState({})
  // const [pdfFileErr, setPdfFileErr]=useState('')

    useEffect(() => {
    fetch("/me")
    .then((response) => {
      if (response.ok) {
        response.json().then((u) => {
          setLoggedOut(false)
          setUser(user);
          setLoggedOut(false)
          setUserRescues(user.userrescues)
        })
      }
    })
  }, []);
  useEffect(() => {
    fetch("/rescues")
    .then((r) => r.json())
    .then((currentRescues) => setRescues(currentRescues));
    },[]);

function handlePdfChange(e){
  e.preventDefault();
  let file = e.target.files[0]
  // console.log(uploadFile[0].type === "application/pdf" || uploadFile[0].type === "pdf")
  if (file.type === "application/pdf") { 
    let reader = new FileReader();
      reader.readAsDataURL(file);
        reader.onloadend = (e) => {
          setPdfFile(file)
        }
    }
    else {
      setPdfFile(null)
    }
}
function submitForm(e){
  e.preventDefault();
  if(pdfFile!==null){
    setViewPdf(pdfFile);
  }
  else{
    setViewPdf(null);
  }
}

  function handleLogIn(user) {
    setUser(user);
    setLoggedOut(false)
    setUserRescues(user.userrescues)
  }
  function onDeleteUserRescue(rescue, user) {
    let id = user.userrescues.find(uR => uR.rescue_id === rescue.id)
      fetch(`/userrescue/${id}`, { 
            method: 'DELETE'
        })
        setUserRescues(userRescues.filter(uRs => uRs.id !== id))  
      }

  function handleLogout() {
    setUser(null);
    setLoggedOut(true)
    setUserRescues([])
    setResc({})
  }
  function updateUserRescues(rescue, e) {
    e.preventDefault();
    fetch("/myrescues", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        rescue_id: rescue.id,
        user_id: user.id,
        status: "Guest"
        }),
    })
    .then((r) => r.json())
    .then((ur) => {
      setUserRescues([...userRescues, ur])
    })
  }
  function handleRemoveAdmin(e, v){
   fetch(`/userrescues/${v.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "Guest" }),
        })
        .then((r) => r.json())
        .then((updatedUR) => console.log(updatedUR))
}
function handleAddAdmin(e, v){
  fetch(`/userrescues/${v.id}`, {
           method: "PATCH",
           headers: {
               "Content-Type": "application/json",
           },
           body: JSON.stringify({ status: "Admin" }),
       })
       .then((r) => r.json())
       .then((updatedUR) => console.log(updatedUR))
}
  return (
    <div className="App">
      <h1 className="Hello">Pawsitive Pets</h1>
    <NavBar user={user} onLogout={handleLogout} loggedOut={loggedOut} setLoggedOut={setLoggedOut} />
    <Switch>
      <Route exact path="/login">
        <LogIn handleLogIn={handleLogIn} handleLogout={handleLogout} onLogout={handleLogout} user={user} setUser={setUser} loggedOut={loggedOut} setLoggedOut={setLoggedOut} />
      </Route>
      <Route exact path="/signup">
        <SignUp handleLogIn={handleLogIn} handleLogout={handleLogout} onLogout={handleLogout} user={user} setUser={setUser} loggedOut={loggedOut} setLoggedOut={setLoggedOut} />
      </Route>
      {user && !loggedOut ? 
      <Route exact path="/welcome">
       <Welcome user={user} handleLogout={handleLogout} />
       </Route> : null} 
       {user && !loggedOut ? 
       <Route exact path="/myrescues">
        <MyRescues rescues={rescues} userRescue={userRescue} setUserRescue={setUserRescue} onDeleteUserRescue={onDeleteUserRescue} handleRemoveAdmin={handleRemoveAdmin} handleAddAdmin={handleAddAdmin} setResc={setResc} resc={resc} isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} userRescues={userRescues} setUserRescues={setUserRescues} />
        </Route>  : null} 
        {user && !loggedOut ? 
          <Route exact path="/allrescues">
         <AllRescues updateUserRescues={updateUserRescues} setResc={setResc} resc={resc} isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} handleLogout={handleLogout} rescues={rescues} setRescues={setRescues} rescue={rescue} setRescue={setRescue} />
         </Route> : null} 
         {user && !loggedOut ? 
          <Route exact path="/newrescue">
          <NewRescue user={user} setRescues={setRescues} rescues={rescues} userRescues={userRescues} setUserRescues={setUserRescues} />
          </Route> 
       : null} 
    </Switch> 
    {/* <Document file={pdfFile} >
      <Page></Page>
    </Document> */}
    <h4>Upload PDF</h4>
      <form onSubmit={submitForm}>
        <input
        type="text"
        onChange={(e) => 
          setInput(e.target.value)
           }
        placeholder="pdf"/>
        {/* <input type="file" onChange={(e) => setUploadFile(e.target.files)}/> */}
        <input type="file" onChange={handlePdfChange}/>
        <input type="submit" />
      </form>
      <h4>View PDF</h4>
      <div className='pdf-container'>
      {/* { viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
      <Viewer fileUrl={viewPdf}/> */}
      {/* plugins={[defaultLayoutPluginInstance]} /> */}
{/* 
            </Worker> </>}
      {!viewPdf&&<>No pdf file selected</>}  */}
      </div>
  </div>
  );
}

export default App;