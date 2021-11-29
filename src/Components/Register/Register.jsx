import axios from "axios";
import "./Register.css";
import React, { useContext, useEffect, useState } from "react";
import { BaseURLContext } from "../../baseURL-context";
import useForm from "../useForm/useForm";
import { useNavigate } from "react-router";


const Register = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const {values, handleChange, handleSubmit} = useForm(registerUser);
    const {baseURL} =useContext(BaseURLContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate;

    useEffect(() => {
        if (isRegistered) {
          navigate("/Login");
        }
      }, [isRegistered]);

      async function registerUser() {
        if (values.setupPassword) {
          if (isOkPass(values.setupPassword)) {
            // Formats the object with structure needed for backend
            const { confirmPassword, setupPassword, ...newUser } = {
              password: values.setupPassword,
              ...values,
            };
    
            setLoading(true);
            const response = await registerNewUser(
              newUser,
              `${baseURL}authentication/`
            );
          setIsRegistered(true);
        }
      }
    }
    return(
        <React.Fragment>
            <div className="account-form m-auto">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="d-grid gap-4 ms-4 me-4">
                            <div className="form-group">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        id="floatingUsername"
                                        placeholder="username"
                                        value={values.username || ""}
                                        onChange={handleChange}
                                    />
                                        <label htmlFor="floatingUsername">Username</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="password"
                                        className="form-control"
                                        id="setupPassword"
                                        placeholder="password"
                                        value={values.setupPassword || ""}
                                        onChange={handleChange}
                                    />
                                        <label htmlFor="floatingPassword">Password</label>       
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="confirm password"
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="confirmPassword"
                                        value={values.confirmPassword || ""}
                                        onChange={handleChange}
                                    />
                                        <label htmlFor="floatingPassword">confirm password</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        id="floatingaddress"
                                        placeholder="address"
                                        value={values.address || ""}
                                        onChange={handleChange}
                                    />
                                        <label htmlFor="address">Address</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form> 
            </div>
        </React.Fragment>
    )
}


export default Register;