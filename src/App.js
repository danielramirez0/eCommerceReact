import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootswatch/dist/morph/bootstrap.min.css";
import "./App.css";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Seller from "./Components/Seller/Seller";
import Customer from "./Components/Customer/Customer";
import { BaseURLContext } from "./baseURL-context";
import AuthProvider from "./Components/AuthProvider/AuthProvider";
import Staging from "./Components/Staging/Staging";
import Logoff from "./Components/Logoff/Logoff";

function App() {
    const [baseURL, setBaseURL] = useState("https://localhost:44394/api/");
    const baseURLValue = { baseURL, setBaseURL };

    return (
        <AuthProvider>
            <BaseURLContext.Provider value={baseURLValue}>
                <div className="App">
                    <header className="App-header">
                        <div className="container">
                            <Routes>
                                <Route path="/" exact element={<Login />} />
                                <Route path="/staging" element={<Staging />} />
                                <Route path="/register" exact element={<Register />} />
                                <Route path="/seller" exact element={<Seller />} />
                                <Route path="/customer" exact element={<Customer />} />
                                <Route path="/logoff" exact element={<Logoff />} />
                            </Routes>
                        </div>
                    </header>
                </div>
            </BaseURLContext.Provider>
        </AuthProvider>
    );
}

export default App;
