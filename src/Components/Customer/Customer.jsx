import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FlexNav from "../FlexNav/FlexNav";
import logo from "../../img/LogoWithName.svg";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import { BaseURLContext } from "../../baseURL-context";
import { defaultGetRequest, protectedEnpointGetRequest, protectedEnpointPostRequest } from "../../static/functions";
import { Card } from "react-bootstrap";
import useForm from "../useForm/useForm";
import useAuth from "../useAuth/useAuth";

const Customer = () => {
    const { values, handleChange, handleSubmit } = useForm(searchByName);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [shoppingCart, setShoppingCart] = useState([]);
    const [total, setTotal] = useState(0);
    const { baseURL } = useContext(BaseURLContext);
    const [filter, setFilter] = useState("all");
    const auth = useAuth();

    useEffect(() => {
        getCategories();
        getShoppingCart();
        setDisplayProducts(filter);
    }, []);

    useEffect(() => {
        setDisplayProducts(filter);
    }, [filter]);

    useEffect(() => {
        calcTotal();
    }, [shoppingCart]);

    useEffect(() => {
        getShoppingCart();
    }, [total]);

    function setDisplayProducts(filter) {
        if (filter === "all") {
            getAllProducts();
        } else if (filter === "name") {
            getProductsByName(values.searchName);
        } else {
            getProductsByCategory(filter);
        }
    }

    const calcTotal = () => {
        let sum = 0;
        if (shoppingCart.length > 0) {
            shoppingCart.forEach((item) => {
                sum += item.price;
            });
        }
        setTotal(sum);
    };

    const getShoppingCart = async () => {
        const response = await protectedEnpointGetRequest(`${baseURL}shoppingcart/`, auth.jwt);
        if (response) {
            setShoppingCart(response.data);
        }
    };

    const addItemToShoppingCart = async (product) => {
        let updatedCart = shoppingCart;
        const response = await protectedEnpointPostRequest(
            `${baseURL}shoppingcart?quantity=1`,
            product,
            auth.jwt
        );
        console.log(response);
        if (response) {
            updatedCart.push(response.data);
            setShoppingCart(updatedCart);
        }
    };

    const getAllProducts = async () => {
        const response = await defaultGetRequest(`${baseURL}product/all/`);
        if (response) {
            setProducts(response.data);
        }
    };

    const getProductsByCategory = async () => {
        const response = await defaultGetRequest(`${baseURL}product/category/${filter}`);
        if (response) {
            setProducts(response.data);
        }
    };

    const getProductsByName = async () => {
        const response = await defaultGetRequest(`${baseURL}product/name/${values.searchName}`);
        if (response) {
            setProducts(response.data);
        } else {
            //TODO notify no products found with that name
        }
    };

    function searchByName() {
        updateFilter("name");
    }
    function updateFilter(string) {
        setFilter(string);
    }

    const getCategories = async () => {
        const response = await defaultGetRequest(`${baseURL}categories/all/`);
        if (response) {
            setCategories(response.data);
        }
    };

    return (
        <React.Fragment>
            <div className="row mt-0">
                <div className="col-7"></div>
                <div className="col-2">
                    <Link to="/customer/account">Account</Link>
                </div>
                <div className="col-2">
                    <Link to="/customer/shoppingCart">
                        My Cart -- Items: {shoppingCart.length} Total: ${total}
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

            <FlexNav data={categories} setFilter={(category) => setFilter(category)}></FlexNav>

            <div className="">
                <form onSubmit={handleSubmit} className="d-flex">
                    <input
                        className="form-control me-sm-2"
                        type="text"
                        placeholder="Search by name"
                        name="searchName"
                        value={values.searchName || ""}
                        onChange={handleChange}
                    />
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                        Search
                    </button>
                </form>
            </div>
            <ProductDisplay products={products} addItemToShoppingCart={(product) => addItemToShoppingCart(product)}/>
        </React.Fragment>
    );
};

export default Customer;
