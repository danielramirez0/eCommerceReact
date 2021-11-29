import React, { useContext, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import useAuth from "../useAuth/useAuth";
import { useNavigate } from "react-router-dom";
import { protectedEnpointGetRequest } from "../../static/functions";
import { BaseURLContext } from "../../baseURL-context";

const Staging = () => {
    const { baseURL } = useContext(BaseURLContext);
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        setTimeout(() => {
            getRole();
        }, 2000);
    }, []);

    const getRole = async () => {
        const role = await protectedEnpointGetRequest(`${baseURL}userroles`, auth.jwt);
        if (role) {
            if (role.data === "Customer") {
                navigate("/customer");
            } else if (role.data === "Seller") {
                navigate("/seller");
            }
        } else {
            navigate("/");
        }
    };

    return (
        <React.Fragment>
            <h1>Collecting Profile Data</h1>
            <Spinner className="m-auto" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </React.Fragment>
    );
};

export default Staging;
