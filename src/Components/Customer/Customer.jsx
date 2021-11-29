import React from "react";
import { Link } from "react-router-dom";
import FlexNav from "../FlexNav/FlexNav";
import logo from "../../img/Elogo.png"

const Customer = () => {
    let shoppingCart = [];
    let sum = 0;
    let links = [];

    return (
        <React.Fragment>
            <div className="row top-nav">
                <div className="col-8"></div>
                <div className="col-2">
                    <Link to="/customer/account">Account</Link>
                </div>
                <div className="col-2">
                    My Cart -- Items: {shoppingCart.length} Total: ${sum}
                </div>
            </div>
            <div className="row">
                <div className="col-4 "><img src={logo} alt="Electronify Logo" /></div>
                <div className="col-4">Slogan</div>
                <div className="col-4">Return Policy</div>
            </div>

            <FlexNav data={links}></FlexNav>

            <div className="">
                Search Bar goes here
            </div>
            <div className="">Products Go here</div>
        </React.Fragment>
    );
};

export default Customer;
