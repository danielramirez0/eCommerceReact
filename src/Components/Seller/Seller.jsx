import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FlexNav from "../FlexNav/FlexNav";
import logo from "../../img/LogoWithName.svg";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import { BaseURLContext } from "../../baseURL-context";
import { defaultGetRequest, protectedEnpointGetRequest, protectedEnpointPostRequest } from "../../static/functions";
import { Card } from "react-bootstrap";
import useForm from "../useForm/useForm";
import useAuth from "../useAuth/useAuth";

const Seller = (props) => {
    const [products, setProducts] = useState([]);
    const { baseURL } = useContext(BaseURLContext);
    const [categories, setCategories] = useState([]);
    const auth = useAuth();



    useEffect(() => {
        getSellerProducts();
    }, []);

    async function getSellerProducts() {
        const response = await protectedEnpointGetRequest(`${baseURL}sellerproduct/`, auth.jwt);
        if (response) {
            setProducts(response.data)
        }
    }




    return (
        <React.Fragment>
            <div className="row mt-0">
                <div className="col-8"></div>
                <div className="col-2">
                    <Link to="/customer/account">Account</Link>
                </div>
                <div className="col-2">
                    <Link to="/logoff">Logoff</Link>
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
                            <Card.Title>Add Product</Card.Title>
                            <Card.Text>
                                Add a new product to sell
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-4">
                    <Card style={{ width: "22rem", height: "10rem" }}>
                        <Card.Body className="m-auto">
                            <Card.Title>Popular Item</Card.Title>
                            <Card.Text className="m-auto">
                                Here's your best selling item
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <ProductDisplay products={products}/>
        </React.Fragment>
    );
};

export default Seller;
