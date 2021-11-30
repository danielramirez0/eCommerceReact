import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import logo from "../../img/Elogo.png";
import useForm from "../useForm/useForm";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Components/useAuth/useAuth";
import { BaseURLContext } from "../../baseURL-context";
import { Spinner, ToastContainer } from "react-bootstrap";
import { Toast } from "react-bootstrap";
import { loginUser } from "../../static/functions";

const Login = () => {
    const { values, handleChange, handleSubmit } = useForm(login);
    const { baseURL } = useContext(BaseURLContext);
    const [checked, setChecked] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();
    // const from = location.state?.from?.pathname || "/staging";

    useEffect(() => {
        checkCache();
    }, []);

    function checkCache() {
        const cache = localStorage.getItem("ecomJWT");
        if (cache) {
            auth.signin(cache, () => {
                navigate("/staging");
            });
        }
    }

    function login() {
        setIsLoading(true);
        getJwt();
    }

    const getJwt = async () => {
        const credentials = { username: values.username, password: values.password };
        const response = await loginUser(`${baseURL}authentication/login/`, credentials);
        if (response) {
            const { token } = response.data;
            if (checked) {
                localStorage.setItem("ecomJWT", token);
            }
            auth.signin(token, () => {
                // Send them back to the page they tried to visit when they were
                // redirected to the login page. Use { replace: true } so we don't create
                // another entry in the history stack for the login page.  This means that
                // when they get to the protected page and click the back button, they
                // won't end up back on the login page, which is also really nice for the
                // user experience.
                // navigate(from, { replace: true });
                navigate("/staging");
            });
        } else {
            setShowToast(true);
            setIsLoading(false);
        }
    };

    return (
        <React.Fragment>
            <ToastContainer className="p-3" position="top-center">
                <Toast
                    className="toast"
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={3000}
                    autohide
                >
                    <Toast.Header className="toast-header">
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Invalid Credentials</strong>
                        <small>Login error</small>
                    </Toast.Header>
                    <Toast.Body className="toast-body">Bad username and/or password</Toast.Body>
                </Toast>
            </ToastContainer>
            <div className="account-form m-auto">
                <img className="mt-2" src={logo} alt="Company Logo" />
                <h1>Electronify</h1>
                <div className="ms-2 me-2">
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <div className="d-grid gap-4 ms-4 me-4">
                                <button className="btn btn-lg btn-primary mt-4" type="button">
                                    Google
                                </button>
                                <legend>---------- or -----------</legend>
                                <div className="form-group">
                                    <div className="form-group">
                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                name="username"
                                                className="form-control"
                                                id="floatingUsername"
                                                placeholder="bob123"
                                                value={values.username || ""}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="floatingUsername">Username</label>
                                        </div>
                                        <div className="form-floating">
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                id="floatingPassword"
                                                placeholder="Password"
                                                value={values.password || ""}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="floatingPassword">Password</label>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-lg btn-primary"
                                    type="submit"
                                    hidden={isLoading ? true : false}
                                >
                                    Login
                                </button>
                                <Spinner
                                    className="m-auto"
                                    animation="border"
                                    role="status"
                                    hidden={isLoading ? false : true}
                                >
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                <div className="form-check m-auto">
                                    <input
                                        type="checkbox"
                                        name="saveLogin"
                                        className="form-check-input"
                                        id="saveLogin"
                                        onChange={() => setChecked(!checked)}
                                    />
                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                        Remember me on this computer
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                    <small>Not registered?</small>
                    <Link to="/register"> Register</Link>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Login;
