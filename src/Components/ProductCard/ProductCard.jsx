import React from 'react';
import { useNavigate } from 'react-router';

const ProductCard = (props) => {
    let productName = props.product.name.replace('"', "");
    let imgSrc = productName + ".jpg";
    const navigate = useNavigate();

    return (
        <div className="col" style={{ maxWidth: "15rem"  }}>
            <div className="card-header">{props.product.name}</div>
            <div className="card-body">
                <img src={`/ProductImages/${imgSrc}`} width="100rem"/>
                <p>{props.product.description}</p>
                <p>${props.product.price}</p>
            </div>
            <button className="btn btn-primary" onClick={() => props.addItemToShoppingCart(props.product)}>
                Add to Cart
            </button>
            <button className="btn btn-primary" onClick={() => navigate(`/productview/${props.product.id}`)}>
                Details
            </button>
        </div>
    );
};

export default ProductCard;
