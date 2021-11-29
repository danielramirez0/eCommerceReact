import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FlexNav from "../FlexNav/FlexNav";
import logo from "../../img/LogoWithName.svg";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import { BaseURLContext } from "../../baseURL-context";
import { defaultGetRequest } from "../../static/functions";
import { Card } from "react-bootstrap";
import useForm from "../useForm/useForm";

const Customer = () => {
    const { values, handleChange, handleSubmit } = useForm(searchByName);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [shoppingCart, setShoppingCart] = useState([]);
    const [total, setTotal] = useState(0);
    const { baseURL } = useContext(BaseURLContext);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        setDisplayProducts(filter);
    }, [filter]);

    function setDisplayProducts(filter) {
        if (filter == "all") {
            getAllProducts();
        } else if (filter === "name") {
            getProductsByName(values.searchName);
        } else {
            getProductsByCategory(filter);
        }
    }

    const getAllProducts = async () => {
        const response = await defaultGetRequest(`${baseURL}porduct/all/`);
        if (response) {
            setProducts(response.data);
        }
    };

    const getProductsByCategory = async () => {
        const response = await defaultGetRequest(`${baseURL}porduct/category/${filter}`);
        if (response) {
            setProducts(response.data);
        }
    };

    const getProductsByName = async () => {
        const response = await defaultGetRequest(`${baseURL}porduct/name/${values.searchName}`);
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

    return (
        <React.Fragment>
            <div className="row top-nav">
                <div className="col-8"></div>
                <div className="col-2">
                    <Link to="/customer/account">Account</Link>
                </div>
                <div className="col-2">
                    My Cart -- Items: {shoppingCart.length} Total: ${total}
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

            <FlexNav data={categories}></FlexNav>

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
            <div className="">Products Go here</div>
            <ProductDisplay products={products} />
        </React.Fragment>
    );
};

export default Customer;
