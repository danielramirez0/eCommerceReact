import React, { useContext } from "react";
import { Link } from "react-router-dom";
import FlexNav from "../FlexNav/FlexNav";
import logo from "../../img/LogoWithName.svg";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import { BaseURLContext } from "../../baseURL-context";
import { defaultGetRequest } from "../../static/functions";
import { Card } from "react-bootstrap";

const Customer = () => {
    const { baseURL } = useContext(BaseURLContext);
    let products = [];
    let shoppingCart = [];
    let sum = 0;
    let links = [];

    const getAllProducts = async () => {
        const response = await defaultGetRequest(`${baseURL}porduct/all/`);
        products = response;
    };

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
                <div className="col-4 ">
                    <Card style={{ width: "22rem", height: "10rem" }}>
                        <Card.Img className="m-auto" src={logo} alt="Electronify Logo" />
                    </Card>
                </div>
                <div className="col-4">
                    <Card style={{ width: "22rem", height: "10rem" }}>
                        <Card.Body className="m-auto">
                            <Card.Title>Who we are</Card.Title>
                            <Card.Text>
                                We've got better things than Best Buy, Wal-Mart, K-Mart, Toys "R"
                                Us, and all the other thriving brick and mortar stores
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-4">
                    <Card style={{ width: "22rem", height: "10rem" }}>
                        <Card.Body className="m-auto">
                            <Card.Title>Refund Policy</Card.Title>
                            <Card.Text className="m-auto">
                                Under no circumstances do we accept refunds, sometimes you get what
                                you get
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            <FlexNav data={links}></FlexNav>

            <div className="">Search Bar goes here</div>
            <div className="">Products Go here</div>
            <ProductDisplay products={products} />
        </React.Fragment>
    );
};

export default Customer;
