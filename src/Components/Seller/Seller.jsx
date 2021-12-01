import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FlexNav from "../FlexNav/FlexNav";
import logo from "../../img/LogoWithName.svg";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import { BaseURLContext } from "../../baseURL-context";
import {
    defaultGetRequest,
    protectedEnpointGetRequest,
    protectedEnpointPostRequest,
} from "../../static/functions";
import { Card, Spinner } from "react-bootstrap";
import useForm from "../useForm/useForm";
import useAuth from "../useAuth/useAuth";

const Seller = (props) => {
    const { values, handleChange, handleSubmit } = useForm(addSellerProduct);
    const [products, setProducts] = useState([]);
    const { baseURL } = useContext(BaseURLContext);
    const [categories, setCategories] = useState([]);
    const [view, setView] = useState("loading");
    const auth = useAuth();

    useEffect(() => {
        getSellerProducts();
        getCategories();
    }, []);

    useEffect(() => {
        renderMain(view);
    }, [view]);

    async function getSellerProducts() {
        if (auth.jwt) {
            const response = await protectedEnpointGetRequest(`${baseURL}sellerproduct/`, auth.jwt);
            if (response) {
                console.log(response);
                await setProducts(response.data);
                setView("products")
            }
        }
    }

    async function addSellerProduct() {
        let product = {
            Name: values.name,
            Description: values.description,
            Price: parseFloat(values.price),
            Stock: parseInt(values.stock),
            CategoryId: parseInt(values.category),
        };
        const response = await protectedEnpointPostRequest(`${baseURL}product/`, product, auth.jwt);
        if (response) {
            await setProducts(response.data);
        }
        setView("products");
    }

    async function getCategories() {
        const response = await defaultGetRequest(`${baseURL}categories/all/`);
        if (response) {
            setCategories(response.data);
        }
    }

    function renderMain() {
        if (view === "products") {
            return products && <ProductDisplay products={products} />;
        } else if (view === "addProduct") {
            return renderAddProductForm();
        } else if( view === "loading"){
            return renderLoading()
        }
    }

    function renderLoading() {
        return (
            <div className="m-auto mt-4">
                <h3>Collecting product data...</h3>
                <Spinner className="m-auto" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    function renderAddProductForm() {
        return (
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>New Product</legend>
                    <div className="ms-4 me-4">
                        <div className="form-group mt-4 mb-4 ms-auto me-auto w-25">
                            <div className="form-input mb-3">
                                <label htmlFor="name">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control text-center"
                                    id="name"
                                    placeholder="My New Product"
                                    value={values.name || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-input mb-3">
                                <label htmlFor="description">Product description</label>
                                <input
                                    type="text"
                                    name="description"
                                    className="form-control text-center"
                                    id="description"
                                    placeholder="Description"
                                    value={values.description || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-input mb-3">
                                <label htmlFor="price">Product price</label>
                                <input
                                    type="text"
                                    name="price"
                                    className="form-control text-center"
                                    id="price"
                                    placeholder="9.99"
                                    value={values.price || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-input mb-3">
                                <label htmlFor="stock">Product stock</label>
                                <input
                                    type="text"
                                    name="stock"
                                    className="form-control text-center"
                                    id="stock"
                                    placeholder="Stock quantity"
                                    value={values.stock || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category" className="form-label mt-4">
                                    Category
                                </label>
                                <select
                                    className="form-select"
                                    id="category"
                                    name="category"
                                    onChange={handleChange}
                                >
                                    {categories.map((category) => (
                                        <option value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">
                        Add item
                    </button>
                </fieldset>
            </form>
        );
    }

    return (
        <React.Fragment>
            <div className="row mt-0">
                <div className="col-8"></div>
                <div className="col-2">
                    <Link to="/seller/account">Account</Link>
                </div>
                <div className="col-2">
                    <Link to="/logoff">Logoff</Link>
                </div>
            </div>
            <div className="row">
                <div className="col-4 ">
                    <Card style={{ width: "22rem", height: "10rem" }}>
                        <Card.Img className="m-auto" src={logo} alt="Electronify Logo" />
                    </Card>
                </div>
                <div className="col-4" onClick={() => setView("addProduct")}>
                    <Card style={{ width: "22rem", height: "10rem" }}>
                        <Card.Body className="m-auto">
                            <Card.Title>Add Product</Card.Title>
                            <Card.Text>Add a new product to sell</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-4">
                    <Card style={{ width: "22rem", height: "10rem" }}>
                        <Card.Body className="m-auto">
                            <Card.Title>Popular Item</Card.Title>
                            <Card.Text className="m-auto">Here's your best selling item</Card.Text>
                            <Card.Text className="m-auto">Coming Soon!</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            {renderMain(view)}
        </React.Fragment>
    );
};

export default Seller;
