import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./Components/App";

ReactDOM.render(
  // <BrowserRouter>
  <React.StrictMode>
    <App />
  {/* // </BrowserRouter>, */}
  </React.StrictMode>,
  document.getElementById("root")
  
);