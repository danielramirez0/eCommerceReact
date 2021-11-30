const ProductCard = (props) => {

    return (
        <div className="col" style={{ maxWidth: "15rem"  }}>
            <div className="card-header">{props.product.name}</div>
            <div className="card-body">
                <img src="#" alt="#" />
                <p>{props.product.description}</p>
                <p>${props.product.price}</p>
            </div>
            <button className="btn btn-primary" onClick={() => props.addItemToShoppingCart(props.product)}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
