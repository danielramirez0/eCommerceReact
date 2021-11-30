import React, { useContext, useEffect, useState } from "react";
import { BaseURLContext } from "../../baseURL-context";
import { defaultGetRequest } from "../../static/functions";
import { useParams } from "react-router";
import useForm from "../useForm/useForm";
const ProductView = (props) => {
    const { values, errors,  handleChange, handleSubmit } = useForm(renderForm);
    const [formPage, setFormPage] = useState(1);
    const[reviews, setReviews] = useState([]);
    const [product, setProduct] = useState(null);
    const { baseURL } = useContext(BaseURLContext);
    const [imgSrc, setImg] = useState('');
    let { productId } = useParams();

    
    function getProductImage() {
        let productName = product.name.replace('"', "");
        setImg(productName + ".jpg");
    }

    useEffect(() => {
        getProductsById();
        getProductReview();
    }, [])
    
    useEffect(() => {
        if (product) {
            getProductImage();
        }
    }, [product])

    

    const getProductsById = async () => {
        const response = await defaultGetRequest(`${baseURL}product/${productId}`);
        if (response) {
            setProduct(response.data);
        } else {
            //TODO notify no products found with that name
        }
    };
    
    const getProductReview = async () => {
        const response = await defaultGetRequest(`${baseURL}product/reviews/${productId}`);
        if (response) {
            setReviews(response.data);
        } else {
            //TODO notify no products found with that name
        }
    }

    function renderForm(){
        return(
            <form onSubmit={handleSubmit}>
            <fieldset>
                <div className="ms-4 me-4">
                    <div className="form-group mt-4 mb-4">
                    <div className="form-floating mb-3">
                            <input
                                type="text"
                                name="review"
                                className="form-control"
                                id="review"
                                placeholder="review"
                                value={values.review || ""}
                                onChange={handleChange}
                            />
                            <label htmlFor="review">review</label>
                            <p>Rating</p>
                            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" value="1" onChange={handleChange} checked={values.btnradio === "1"?true:false} />
                            <label class="btn btn-outline-primary" htmlFor="btnradio1">1 Star</label>
                            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" value="2" onChange={handleChange} checked={values.btnradio === "2"?true:false} />
                            <label class="btn btn-outline-primary" htmlFor="btnradio2">2 Stars</label>
                            <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" value="3" onChange={handleChange} checked={values.btnradio === "3"?true:false} />
                            <label class="btn btn-outline-primary" htmlFor="btnradio3">3 Stars</label>
                            <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off" value="4" onChange={handleChange} checked={values.btnradio === "4"?true:false} />
                            <label class="btn btn-outline-primary" htmlFor="btnradio4">4 Stars</label>
                            <input type="radio" class="btn-check" name="btnradio" id="btnradio5" autocomplete="off" value="5" onChange={handleChange} checked={values.btnradio === "5"?true:false} />
                            <label class="btn btn-outline-primary" htmlFor="btnradio5">5 Stars</label>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
               </form>
        )
    }

   
    function renderProductPage(){

            function renderReviews(){
                return(
                        reviews.map((review)=>(
                                <div>
                                <p>User: {review.user.userName}   </p>
                                <p>Rating: {review.stars}</p>
                                <p>Review: {review.review}</p>
                                </div>
                                )
                        )
                    )
            }

        return ( 
            product ? (  
                <div className="col" style={{ maxWidth: "150rem"  }}>
                    <div className="card-header">{product.name}</div>
                    <div className="card-body">
                        <img src={`/ProductImages/${imgSrc}`} width="500rem"/>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                    </div>
                    <div className="card-body">
                    <button 
                            className="btn btn-primary mb-4" 
                            onClick={() => setFormPage(2)}>
                        Submit Review
                    </button>
                        <p>{renderReviews()}</p>
                    </div>
                </div>
                ): (
                    <h1>Loading</h1>
                )
         );
    }
    

     return (
        <React.Fragment>
            <div className="account-form m-auto">
                
                    {formPage === 1 ? renderProductPage() : renderForm()}
             
            </div>
        </React.Fragment>
    );
}
 
export default ProductView;