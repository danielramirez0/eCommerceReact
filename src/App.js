import React, {useEffect, useState } from "react";
import {Routes, Route} from "react-router-dom";
// import "bootswatch/dist/SELECT STYLE HERE"
import './App.css';
import Login from "./Components/Login"
import Register from "./Components/Register"
import Seller from "./Components/Seller"
import Customer from "./Components/Customer"

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
                  <Route path="/" exact element={<Login />}/>
                  <Route path="/register" exact element={<Register />}/>
                  <Route path="/seller" exact element={<Seller />}/>
                  <Route path="/customer" exact element={<Customer />}/>
              </Routes>
          </div>
      </header>
    </div>
  );
}

export default App;
