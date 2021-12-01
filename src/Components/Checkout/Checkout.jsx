import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BaseURLContext } from "../../baseURL-context";
import { protectedEnpointGetRequest, protectedEnpointDeleteRequest } from "../../static/functions";
import { Card } from "react-bootstrap";
import useForm from "../useForm/useForm";
import useAuth from "../useAuth/useAuth";
import { useNavigate, useParams } from "react-router";
import FlexNav from "../FlexNav/FlexNav";
import logo from "../../img/LogoWithName.svg";

const Checkout = (props) => {
    const { values, handleChange, handleSubmit } = useForm(null);
    const [shoppingCart, setShoppingCart] = useState([]);
    const { baseURL } = useContext(BaseURLContext);
    const [order, setOrder] = useState({});
    const auth = useAuth();
    const navigate = useNavigate();
    const { total } = useParams();

    useEffect(() => {
        if (!auth.jwt) {
            navigate("/");
        } else {
            getShoppingCart();
        }
    }, []);

    async function getShoppingCart() {
        const response = await protectedEnpointGetRequest(`${baseURL}shoppingcart/`, auth.jwt);
        if (response) {
            setShoppingCart(response.data);
        }
    }

    // async function submitOrder() {
    //     const order = { total: params.total };
    //     const response = await protectedEnpointPostRequest(`${baseURL}order/`, order, auth.jwt);
    //     if (response) {
    //         setOrder(response.data);
    //     }
    // }

    return (
        <React.Fragment>
            <div className="row mt-0">
                <div className="col-7"></div>
                <div className="col-2">
                    <Link to="/customer/account">Account</Link>
                </div>
                <div className="col-2">
                    <Link to="/customer/shoppingCart">
                        Cart({shoppingCart.length}) ${total}
                    </Link>
                </div>
                <div className="col-1">
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
            <FlexNav
                data={[]}
                callback={(value) => navigate(value)}
                callbackParam="/customer/shoppingcart/"
                buttonText="Return to shopping cart"
            ></FlexNav>
            <h1>Coming soon...</h1>
        </React.Fragment>
    );
};

export default Checkout;
