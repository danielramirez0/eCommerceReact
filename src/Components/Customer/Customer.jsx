import React, { useContext } from "react"
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import { BaseURLContext } from "../../baseURL-context";
import { defaultGetRequest } from "../../static/functions";

const Customer = (props) => {
    const { baseURL } = useContext(BaseURLContext);
    let products = [];

    const getAllProducts = async () => {
        const response = await defaultGetRequest(`${baseURL}porduct/all/`);
        products = response;
    }

    return (
        <React.Fragment>
            <div className="navbarContainer">
                <ul>
                    <li>Account</li>
                    <li>
                        My Cart -- Items: {props.count()} Total: ${props.price.sum()}
                    </li>
                </ul>
            </div>
            <div className="headerContainer">
                <div className="logo"></div>
                <div className="slogan"></div>
                <div className="policy"></div>
            </div>
            <div className="searchBarContainer">
                <input type="text" defaultValue="SEARCH by keyword or product number" />
                <button className="btn btn-primary">Search</button>
            </div>
            <ProductDisplay products={products}/>
        </React.Fragment>
    );
};

export default Customer;