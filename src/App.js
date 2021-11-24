import React, {useEffect, useState } from "react";
import {Routes, Route} from "react-router-dom";
import "bootswatch/dist/morph/bootstrap.min.css"
import './App.css';
import Login from "./Components/Login/Login"
import Register from "./Components/Register/Register"
import Seller from "./Components/Seller/Seller"
import Customer from "./Components/Customer/Customer"

function App() {
    const [backendURL] = useState("https://localhost:44394/api/");
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("ElectronifyJWT"))

    function toggleAuth() {
        setAuthenticated(!authenticated)
    }

  return (
    <div className="App">
      <header className="App-header">
          <div className="container">
              <Routes>
                  <Route path="/" exact element={<Login backendURL={backendURL} authenticated={authenticated} />}/>
                  <Route path="/register" exact element={<Register backendURL={backendURL} authenticated={authenticated} />}/>
                  <Route path="/seller" exact element={<Seller backendURL={backendURL}  authenticated={authenticated}/>}/>
                  <Route path="/customer" exact element={<Customer backendURL={backendURL} authenticated={authenticated} />}/>
              </Routes>
          </div>
      </header>
    </div>
  );
}

export default App;
