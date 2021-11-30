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
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart"
import Account from "./Components/Account/Account"

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
                                <Route path="/register" element={<Register />} />
                                <Route path="/seller" element={<Seller />} />
                                <Route path="/customer" element={<Customer />} />
                                <Route path="/customer/shoppingcart" element={<ShoppingCart />} />
                                <Route path="/customer/Account" element={<Account />} />
                                <Route path="/logoff" element={<Logoff />} />
                            </Routes>
                        </div>
                    </header>
                </div>
            </BaseURLContext.Provider>
        </AuthProvider>
    );
}

export default App;
