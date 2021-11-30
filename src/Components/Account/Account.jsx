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

    return auth.jwt ? (
        <React.Fragment>
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
                        <td>{accountData.username}</td>
                        <td>
                            <button disabled className="btn btn-primary disabled">
                                Edit
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"> {"Email Address"} </th>
                        <td>{accountData.email}</td>
                        <td>
                            <button disabled className="btn btn-primary disabled">
                                Edit
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"> {"First Name"} </th>
                        <td>{accountData.firstName}</td>
                        <td>
                            <button disabled className="btn btn-primary disabled">
                                Edit
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"> {"Last Name"} </th>
                        <td>{accountData.lastName}</td>
                        <td>
                            <button disabled className="btn btn-primary disabled">Edit</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"> {"Phone Number"} </th>
                        <td>{accountData.phoneNumber}</td>
                        <td>
                            <button disabled className="btn btn-primary disabled">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </React.Fragment>
    ) : (
        <h1>Not Authenticated</h1>
    );
};
export default Account;
