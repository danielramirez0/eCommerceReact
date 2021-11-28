import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootswatch/dist/morph/bootstrap.min.css";
import "./App.css";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Seller from "./Components/Seller/Seller";
import Customer from "./Components/Customer/Customer";
import { UserContext } from "./user-context";
import { BaseURLContext } from "./baseURL-context";

function App() {
    const [baseURL, setBaseURL] = useState("https://localhost:44394/api/");
    const [jwt, setJWT] = useState(localStorage.getItem("JWT"));
    let userValue = { jwt, setJWT };
    const baseURLValue = { baseURL, setBaseURL };

    useEffect(() => {
        userValue = { jwt, setJWT };
    }, [jwt]);

    return (
        <UserContext.Provider value={userValue}>
            <BaseURLContext.Provider value={baseURLValue}>
                <div className="App">
                    <header className="App-header">
                        <div className="container">
                            <Routes>
                                <Route path="/" exact element={<Login />} />
                                <Route path="/register" exact element={<Register />} />
                                <Route path="/seller" exact element={<Seller />} />
                                <Route path="/customer" exact element={<Customer />} />
                            </Routes>
                        </div>
                    </header>
                </div>
            </BaseURLContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
