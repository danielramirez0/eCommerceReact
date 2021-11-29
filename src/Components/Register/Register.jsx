import "./Register.css";
import React, { useContext, useEffect, useState } from "react";
import { BaseURLContext } from "../../baseURL-context";
import useForm from "../useForm/useForm";
import { useNavigate } from "react-router";

const Register = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const { values, errors, handleChange, handleSubmit } = useForm(registerUser);
    const { baseURL } = useContext(BaseURLContext);
    const [formPage, setFormPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate;

    useEffect(() => {
        if (isRegistered) {
            navigate("/Login");
        }
    }, [isRegistered]);

    async function registerUser() {
        if (values.password) {
            if (isOkPass(values.password)) {
                // Formats the object with structure needed for backend
                const { verifyPassword, password, ...newUser } = {
                    password: values.password,
                    ...values,
                };

                setLoading(true);
                const response = await registerNewUser(newUser, `${baseURL}authentication/`);
                setIsRegistered(true);
            }
        }
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
                            <label htmlFor="floatingUsername">Username</label>
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
                            <label htmlFor="username">Email Address</label>
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
                            <label htmlFor="username">First Name</label>
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
                            <label htmlFor="username">Last Name</label>
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
                        <button onClick={() => setFormPage(2)}>Next</button>
                    </div>
                </div>
            </fieldset>
        );
    }

    function renderAddressForm() {
        return (
            <fieldset>
                <legend>SHIPPING ADDRESS</legend>
                <div className="ms-4 me-4">
                    <div className="form-group mt-4 mb-4">
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
                        <legend className="mt-4">BILLING ADDRESS</legend>
                        <div className="form-check form-switch text-start">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="billingSetup"
                                id="billingSetup"
                                value={true}
                                onChange={handleChange}
                            />
                            <label htmlFor="billingSetup" className="form-check-label text-left">
                                Use Shipping Address
                            </label>
                        </div>
                        <button className="btn btn-primary" type="submit">
                            Register
                        </button>
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
