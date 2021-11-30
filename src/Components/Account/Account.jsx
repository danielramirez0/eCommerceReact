import React, { useContent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BaseURLContext } from "../../baseURL-context";
import { protectedEnpointGetRequest } from "../../static/functions";
import { Card } from "react-bootstrap";
import useForm from "../useForm/useForm";
import useAuth from "../useAuth/useAuth";
import { useNavigate } from "react-router";
import FlexNav from "../FlexNav/FlexNav";
import logo from "../../img/LogoWithName.svg";
import jwtDecode from "jwt-decode";

const Account = (props) => {
    const { values, handleChange, handleSubmit } = useForm(null);
    const [accountData, setAccountData] = useState();
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        if (auth.jwt) {
            setAccountData(jwtDecode(auth.jwt));
        } else {
            navigate("/");
        }
    }, []);

    return (
        <React.Fragment>
            <div className="row mt-0">
                <div className="col-7"></div>
                <div className="col-2">
                    <Link to="/customer/account">Account</Link>
                </div>
                <div className="col-2">
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
            <FlexNav data={[]} callback={(value) => navigate(value)} callbackParam="/customer" buttonText="Continue shopping"></FlexNav>
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
        </React.Fragment>
    );
};
export default Account;
