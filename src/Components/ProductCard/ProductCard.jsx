import React from 'react';

const ProductCard = (props) => {
    let productName = props.product.name.replace('"', "");
    let imgSrc = productName + ".jpg";

    return (
        <div className="col" style={{ maxWidth: "15rem"  }}>
            <div className="card-header">{props.product.name}</div>
            <div className="card-body">
                <img src={`/ProductImages/${imgSrc}`} width="100rem"/>
                <p>{props.product.description}</p>
                <p>${props.product.price}</p>
            </div>
            <button className="btn btn-primary">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
