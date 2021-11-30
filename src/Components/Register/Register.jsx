import "./Register.css";
import React, { useContext, useEffect, useState } from "react";
import { BaseURLContext } from "../../baseURL-context";
import useForm from "../useForm/useForm";
import { useNavigate } from "react-router";
import { defaultPostRequest } from "../../static/functions";
import { Spinner } from "react-bootstrap";

const Register = () => {
    const { values, errors, handleChange, handleSubmit } = useForm(registerUser);
    const { baseURL } = useContext(BaseURLContext);
    const [formPage, setFormPage] = useState(1);
    const [applyShipping, setApplyShipping] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function registerUser() {
        const addresses = await addressBuilder();

        const shippingAddressId = await postAddress(addresses[0]);
        const billingAddressId = await postAddress(addresses[1]);

        const registrationData = {
            firstname: values.firstName,
            lastname: values.lastName,
            username: values.username,
            password: values.password,
            email: values.email,
            phonenumber: values.phoneNumber,
            shippingAddressID: shippingAddressId,
            billingAddressID: billingAddressId,
            roletype: values.accountType,
        };

        setIsLoading(true);
        const response = await defaultPostRequest(`${baseURL}authentication/`, registrationData);
        if (response) {
            navigate("/");
        }
    }

    async function postAddress(address) {
        setIsLoading(true);
        const response = await defaultPostRequest(`${baseURL}addresses/`, address);
        if (response) {
            return response.data.id;
        }
    }

    async function addressBuilder() {
        const billingAddress = {};
        const shippingAddress = {
            name: values.shippingName,
            street: values.shippingStreet,
            city: values.shippingCity,
            zip: values.shippingZip,
            type: "shipping",
        };
        if (applyShipping) {
            billingAddress.name = values.shippingName;
            billingAddress.street = values.shippingStreet;
            billingAddress.city = values.shippingCity;
            billingAddress.zip = values.shippingZip;
            billingAddress.type = "billing";
        } else {
            billingAddress.name = values.billingName;
            billingAddress.street = values.billingStreet;
            billingAddress.city = values.billingCity;
            billingAddress.zip = values.billingZip;
            billingAddress.type = "billing";
        }
        return [shippingAddress, billingAddress];
    }

    function renderUserForm() {
        return (
            <fieldset>
                <div className="ms-4 me-4">
                    <div className="form-group mt-4 mb-4">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                name="username"
                                className="form-control"
                                id="username"
                                placeholder="username"
                                value={values.username || ""}
                                onChange={handleChange}
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                id="email"
                                placeholder="Email"
                                value={values.email || ""}
                                onChange={handleChange}
                            />
                            <label htmlFor="email">Email Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                name="firstName"
                                className="form-control"
                                id="firstName"
                                placeholder="First Name"
                                value={values.firstName || ""}
                                onChange={handleChange}
                            />
                            <label htmlFor="firstName">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                name="lastName"
                                className="form-control"
                                id="lastName"
                                placeholder="Last Name"
                                value={values.lastName || ""}
                                onChange={handleChange}
                            />
                            <label htmlFor="lastName">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                name="phoneNumber"
                                className="form-control"
                                id="phoneNumber"
                                placeholder="Phone Number"
                                value={values.phoneNumber || ""}
                                onChange={handleChange}
                            />
                            <label htmlFor="phoneNumber">Phone Number</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="password"
                                placeholder="password"
                                value={values.password || ""}
                                onChange={handleChange}
                            />
                            <label htmlFor="password">Password</label>
                            <p className="errors">
                                {errors.password ? `${errors.password}` : null}
                            </p>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                name="verifyPassword"
                                className="form-control"
                                id="verifyPassword"
                                placeholder="verifyPassword"
                                value={values.verifyPassword || ""}
                                onChange={handleChange}
                            />
                            <label htmlFor="verifyPassword">Confirm password</label>
                            <p className="errors">
                                {errors.verifyPassword ? `${errors.verifyPassword}` : null}
                            </p>
                        </div>
                        <small>Select Account Type</small>
                        <br />
                        <div
                            className="btn-group"
                            role="group"
                            aria-label="Radio toggle registration for account type"
                        >
                            <input
                                type="radio"
                                class="btn-check"
                                name="accountType"
                                id="Customer"
                                value="Customer"
                                autoComplete="off"
                                onChange={handleChange}
                                checked={values.accountType === "Customer" ? true : false}
                            />
                            <label class="btn btn-outline-primary" htmlFor="Customer">
                                Customer
                            </label>
                            <input
                                type="radio"
                                class="btn-check"
                                name="accountType"
                                id="Seller"
                                value="Seller"
                                onChange={handleChange}
                                autoComplete="off"
                                checked={values.accountType === "Seller" ? true : false}
                            />
                            <label class="btn btn-outline-danger" htmlFor="Seller">
                                Seller
                            </label>
                        </div>
                    </div>
                    <button className="btn btn-primary mb-4" onClick={() => setFormPage(2)}>
                        Next
                    </button>
                </div>
            </fieldset>
        );
    }

    function renderShippingAddress() {
        return (
            <>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="shippingName"
                        className="form-control"
                        id="shippingName"
                        placeholder="My Name"
                        value={values.shippingName || ""}
                        onChange={handleChange}
                    />
                    <label htmlFor="shippingName">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="shippingStreet"
                        className="form-control"
                        id="shippingStreet"
                        placeholder="1234 Example St."
                        value={values.shippingStreet || ""}
                        onChange={handleChange}
                    />
                    <label htmlFor="shippingStreet">Street</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="shippingCity"
                        className="form-control"
                        id="shippingCity"
                        placeholder="My City Name"
                        value={values.shippingCity || ""}
                        onChange={handleChange}
                    />
                    <label htmlFor="shippingCity">City</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="shippingZip"
                        className="form-control"
                        id="shippingZip"
                        placeholder="12345"
                        value={values.shippingZip || ""}
                        onChange={handleChange}
                    />
                    <label htmlFor="shippingZip">Zip Code</label>
                </div>
            </>
        );
    }

    function renderBillingAddress() {
        return (
            <>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="billingName"
                        className="form-control"
                        id="billingName"
                        placeholder="My Name"
                        value={values.billingName || ""}
                        onChange={handleChange}
                    />
                    <label htmlFor="billingName">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="billingStreet"
                        className="form-control"
                        id="billingStreet"
                        placeholder="1234 Example St."
                        value={values.billingStreet || ""}
                        onChange={handleChange}
                    />
                    <label htmlFor="billingStreet">Street</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="billingCity"
                        className="form-control"
                        id="billingCity"
                        placeholder="My City Name"
                        value={values.billingCity || ""}
                        onChange={handleChange}
                    />
                    <label htmlFor="billingCity">City</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="billingZip"
                        className="form-control"
                        id="billingZip"
                        placeholder="12345"
                        value={values.billingZip || ""}
                        onChange={handleChange}
                    />
                    <label htmlFor="billingZip">Zip Code</label>
                </div>
            </>
        );
    }

    function renderAddressForm() {
        return (
            <fieldset>
                <legend>SHIPPING ADDRESS</legend>
                <div className="ms-4 me-4">
                    <div className="form-group mt-4 mb-4">
                        {renderShippingAddress()}
                        <legend className="mt-4">BILLING ADDRESS</legend>
                        <div className="form-check form-switch text-start">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="billingSetup"
                                id="billingSetup"
                                value={applyShipping}
                                checked={applyShipping ? true : false}
                                onChange={() => setApplyShipping(!applyShipping)}
                            />
                            <label htmlFor="billingSetup" className="form-check-label text-left">
                                Use Shipping Address
                            </label>
                        </div>
                        {!applyShipping ? renderBillingAddress() : null}
                        <button
                            className="btn btn-primary"
                            type="submit"
                            hidden={isLoading ? true : false}
                        >
                            Register
                        </button>
                        <Spinner
                            className="m-auto"
                            animation="border"
                            role="status"
                            hidden={isLoading ? false : true}
                        >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                </div>
            </fieldset>
        );
    }

    return (
        <React.Fragment>
            <h1>Account Registration</h1>
            <div className="account-form m-auto">
                <form onSubmit={handleSubmit}>
                    {formPage === 1 ? renderUserForm() : renderAddressForm()}
                </form>
            </div>
        </React.Fragment>
    );
};

export default Register;
