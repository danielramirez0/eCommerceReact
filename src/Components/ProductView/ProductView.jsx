import React, { useContext, useEffect, useState } from "react";
import { BaseURLContext } from "../../baseURL-context";
import { defaultGetRequest } from "../../static/functions";
import { useParams } from "react-router";

const ProductView = (props) => {
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

    return ( 
        product ? (  
            <div className="col" style={{ maxWidth: "150rem"  }}>
                <div className="card-header">{product.name}</div>
                <div className="card-body">
                    <img src={`/ProductImages/${imgSrc}`} width="500rem"/>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                </div>
            </div>
            ): (
                <h1>Loading</h1>
            )
     );
}
 
export default ProductView;