import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BaseURLContext } from "../../baseURL-context";
import {
    protectedEnpointGetRequest,
    protectedEnpointDeleteRequest,
    protectedEnpointPostRequest,
} from "../../static/functions";
import { Card, Spinner } from "react-bootstrap";
import useForm from "../useForm/useForm";
import useAuth from "../useAuth/useAuth";
import { useNavigate, useParams } from "react-router";
import FlexNav from "../FlexNav/FlexNav";
import logo from "../../img/LogoWithName.svg";

const Checkout = (props) => {
    const { values, handleChange, handleSubmit } = useForm(null);
    const [shoppingCart, setShoppingCart] = useState([]);
    const { baseURL } = useContext(BaseURLContext);
    const [display, setDisplay] = useState("payment");
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

    useEffect(() => {
        mainView(display);
    }, [display]);

    async function getShoppingCart() {
        const response = await protectedEnpointGetRequest(`${baseURL}shoppingcart/`, auth.jwt);
        if (response) {
            setShoppingCart(response.data);
        }
    }

    async function submitOrder() {
        const order = { total: parseInt(total) };
        console.log(total);
        const response = await protectedEnpointPostRequest(`${baseURL}order/`, order, auth.jwt);
        if (response) {
            setOrder(response.data);
            return response;
        } else {
            return false;
        }
    }

    async function submitOrderDetails(shoppingCartItem, order) {
        const orderDetails = {
            orderId: order.id,
            productId: shoppingCartItem.productId,
            price: shoppingCartItem.product.price,
            quantity: shoppingCartItem.quantity,
        };
        const response = await protectedEnpointPostRequest(
            `${baseURL}order/detail`,
            orderDetails,
            auth.jwt
        );
        if (response) {
            console.log(response);
            return;
        } else {
            return;
        }
    }

    async function processOrder() {
        setDisplay("processing");
        const response = await submitOrder();
        if (response) {
            for (let i = 0; i < shoppingCart.length; i++) {
                const item = shoppingCart[i];
                await submitOrderDetails(item, response.data);
            }
        }
        await clearShoppingCart();
        setShoppingCart([]);
        setDisplay("confirmation");
    }

    async function clearShoppingCart() {
        for (let i = 0; i < shoppingCart.length; i++) {
            const item = shoppingCart[i];
            await protectedEnpointDeleteRequest(
                `${baseURL}shoppingcart/${item.productId}`,
                auth.jwt
            );
        }
        return;
    }

    function mainView(display) {
        if (display === "payment") {
            return renderPaymentForm();
        } else if (display === "processing") {
            return renderLoading();
        } else if (display === "confirmation") {
            return renderConfirmation();
        }
    }

    function renderPaymentForm() {
        return (
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Submit Credit Card Information</legend>
                    <div className="ms-4 me-4">
                        <div className="form-group mt-4 mb-4 ms-auto me-auto w-25">
                            <div className="form-input mb-3">
                                <label htmlFor="creditCardNumber">Credit Card Number</label>
                                <input
                                    type="text"
                                    name="creditCardNumber"
                                    className="form-control text-center"
                                    id="creditCardNumber"
                                    placeholder="####-####-####-####"
                                    value={values.creditCardNumber || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-input mb-3">
                                <label htmlFor="expiration">Expiration</label>
                                <div className="input-group" id="expiration">
                                    <input
                                        type="text"
                                        name="expirationMonth"
                                        className="form-control text-center"
                                        id="expirationMonth"
                                        placeholder="MM"
                                        value={values.expirationMonth || ""}
                                        onChange={handleChange}
                                    />
                                    <span className="input-group-text">/</span>
                                    <input
                                        type="text"
                                        name="expirationYear"
                                        className="form-control text-center"
                                        id="expirationYear"
                                        placeholder="YY"
                                        value={values.expirationYear || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-input mb-3">
                                <label htmlFor="ccv">Security Code</label>
                                <div className="input-group" id="ccv">
                                    <input
                                        type="text"
                                        name="ccv"
                                        className="form-control text-center"
                                        id="ccv"
                                        placeholder="###"
                                        value={values.ccv || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => processOrder()}
                        type="button"
                    >
                        Place Order
                    </button>
                </fieldset>
            </form>
        );
    }

    function renderLoading() {
        return (
            <div className="m-auto mt-4">
                <h3>Processing order, please wait...</h3>
                <Spinner className="m-auto" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    function renderConfirmation() {
        return (
            <div className="col">
                <h3>Order complete</h3>
                <h4>Thanks for shopping with us!</h4>
                <div className="btn-group mt-4">
                    <button className="btn btn-primary" onClick={() => navigate("/customer")}>
                        Shop More
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate("/logoff")}>
                        Logoff
                    </button>
                </div>
            </div>
        );
    }

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
            <div className="ms-auto me-auto">{mainView(display)}</div>
        </React.Fragment>
    );
};

export default Checkout;
