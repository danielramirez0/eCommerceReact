const ProductCard = (props) => {
    return (
        <div style={{ maxWidth: "15rem" }}>
            <div className="card-header">{product.Name}</div>
            <div className="card-body">
                <img src="#" alt="#" />
                <p>{product.Description}</p>
                <p>${product.Price}</p>
            </div>
            <button className="btn btn-primary" onClick={() => props.addItemToCart()}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
