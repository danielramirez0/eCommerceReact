import React, { useContext, useEffect, useState } from "react";
import { BaseURLContext } from "../../baseURL-context";
import { protectedEnpointGetRequest, protectedEnpointDeleteRequest } from "../../static/functions";
import { Card } from "react-bootstrap";
import useForm from "../useForm/useForm";
import useAuth from "../useAuth/useAuth";
import { useNavigate } from "react-router";

const ShoppingCart = () => {
    const { values, handleChange, handleSubmit } = useForm(null);
    const [shoppingCart, setShoppingCart] = useState([]);
    const [total, setTotal] = useState(0);
    const { baseURL } = useContext(BaseURLContext);
    const [taxRate, setTaxRate] = useState(0.0825);
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.jwt) {
            navigate("/");
        } else {
            getShoppingCart();
        }
    }, []);

    useEffect(() => {
        calcTotal();
    }, [shoppingCart]);

    useEffect(() => {
        getShoppingCart();
    }, [total]);

    const calcTotal = () => {
        let sum = 0;
        if (shoppingCart.length > 0) {
            shoppingCart.forEach((item) => {
                sum = sum + item.product.price * item.quantity;
            });
        }
        setTotal(Math.round(sum));
    };

    async function getShoppingCart() {
        const response = await protectedEnpointGetRequest(`${baseURL}shoppingcart/`, auth.jwt);
        if (response) {
            setShoppingCart(response.data);
        }
    }

    async function removeProductFromCart(id) {
        const response = await protectedEnpointDeleteRequest(
            `${baseURL}shoppingcart/${id}`,
            auth.jwt
        );
        if (response) {
            setShoppingCart(response.data);
        }
    }

    return (
        <React.Fragment>
            <table className="table table-hover" id="shoppingcart">
                <caption>Shopping Cart</caption>
                <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">SubTotal</th>
                        <th scope="col" hidden>
                            Remove
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {shoppingCart.map((item) => {
                        return (
                            <tr key={item.product.id}>
                                <th scope="row"> {item.product.name} </th>
                                <td>{item.product.description}</td>
                                <td>${item.product.price}</td>
                                <td>{item.quantity}</td>
                                {/*TODO need increment decrement button with callback to update product quantity*/}
                                <td>${item.quantity * item.product.price}</td>
                                <td>
                                    <button
                                        className="button btn-danger"
                                        onClick={() => removeProductFromCart(item.product.id)}
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <th scope="row"></th>
                        <td colSpan="2" className="table-primary"></td>
                        <td>Sub-Total</td>
                        <td colSpan="2">${Math.floor(total)}</td>
                    </tr>
                    <tr>
                        <th scope="row"></th>
                        <td colSpan="2" className="table-primary"></td>
                        <td>Tax</td>
                        <td colSpan="2">${Math.floor(total * taxRate)}</td>
                    </tr>
                    <tr>
                        <th scope="row"></th>
                        <td colSpan="2" className="table-primary"></td>
                        <td>Total</td>
                        <td colSpan="2">${Math.floor(total + total * taxRate)}</td>
                    </tr>
                </tbody>
            </table>
        </React.Fragment>
    );
};
export default ShoppingCart;
