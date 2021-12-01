import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BaseURLContext } from "../../baseURL-context";
import { protectedEnpointGetRequest } from "../../static/functions";
import { Card, Table } from "react-bootstrap";
import useForm from "../useForm/useForm";
import useAuth from "../useAuth/useAuth";
import { useNavigate } from "react-router";
import FlexNav from "../FlexNav/FlexNav";
import logo from "../../img/LogoWithName.svg";
import jwtDecode from "jwt-decode";
import dateFormat from "dateformat";

const Account = (props) => {
    const { values, handleChange, handleSubmit } = useForm(null);
    const [accountData, setAccountData] = useState();
    const { baseURL } = useContext(BaseURLContext);
    const navigate = useNavigate();
    const auth = useAuth();
    const [orderHistory, setOrderHistory] = useState([]);
    const [activeOrder, setActiveOrder] = useState();

    useEffect(() => {
        if (auth.jwt) {
            setAccountData(jwtDecode(auth.jwt));
            getOrderHistory();
        } else {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        renderOrderHistory();
    }, [orderHistory]);

    useEffect(() => {
        renderOrderDetail();
    }, [activeOrder]);

    async function getOrderHistory() {
        const response = await protectedEnpointGetRequest(`${baseURL}order/user`, auth.jwt);
        if (response) {
            setOrderHistory(response.data);
        }
    }

    async function getOrderDetails(id) {
        const response = await protectedEnpointGetRequest(`${baseURL}order/detail/${id}`, auth.jwt);
        console.log(response);
        if (response) {
            return response.data;
        } else {
            return [];
        }
    }

    async function renderOrderDetail() {
        const products = await getOrderDetails(activeOrder);
        return (
            <table className="table" id={`order${activeOrder}`}>
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Name</th>
                        <th>Price Paid</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr>
                            <th>
                                {product.product.id}
                                {product.product.name}
                                {product.price}
                                {product.quantity}
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    function renderOrderHistory() {
        return (
            <>
                <table className="table" id="orderHistory">
                    <thead>
                        <tr>
                            <th scope="col">Order Number</th>
                            <th scope="col">Date</th>
                            <th scope="col">Total</th>
                            <th scope="col">*Future Release* Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderHistory &&
                            orderHistory.map((order) => (
                                <tr>
                                    <th scope="row" className="col-4">
                                        {" "}
                                        {order.id}{" "}
                                    </th>
                                    <td className="col-4">{dateFormat(order.date)}</td>
                                    <td className="col-4">{order.total}</td>
                                    <td>
                                        <button
                                        disabled
                                            className="btn btn-primary disabled"
                                            onClick={() => setActiveOrder(order.id)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </>
        );
    }

    return (
        <React.Fragment>
            <div className="row mt-0">
                <div className="col-7"></div>
                <div className="col-2">
                    <Link to="/customer/account">Account</Link>
                </div>
                <div className="col-2"></div>
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
                callbackParam="/customer"
                buttonText="Continue shopping"
            ></FlexNav>
            <h1>Account Details</h1>
            <table className="table table-hover" id="shoppingcart">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">*Future Release*</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"> {"Username"} </th>
                        <td>{accountData ? accountData.username : "Loading..."}</td>
                        <td>
                            <button disabled className="btn btn-primary disabled">
                                Edit
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"> {"Email Address"} </th>
                        <td>{accountData ? accountData.email : "Loading..."}</td>
                        <td>
                            <button disabled className="btn btn-primary disabled">
                                Edit
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"> {"First Name"} </th>
                        <td>{accountData ? accountData.firstName : "Loading..."}</td>
                        <td>
                            <button disabled className="btn btn-primary disabled">
                                Edit
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"> {"Last Name"} </th>
                        <td>{accountData ? accountData.lastName : "Loading..."}</td>
                        <td>
                            <button disabled className="btn btn-primary disabled">
                                Edit
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"> {"Phone Number"} </th>
                        <td>{accountData ? accountData.phoneNumber : "Loading..."}</td>
                        <td>
                            <button disabled className="btn btn-primary disabled">
                                Edit
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="row">
                <div className="col">
                    <h3>Order History</h3>
                    {renderOrderHistory()}
                </div>
            </div>
        </React.Fragment>
    );
};
export default Account;
