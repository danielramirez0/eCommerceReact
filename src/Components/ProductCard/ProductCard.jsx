const ProductCard = (props) => {
    return (
        <div style={{ maxWidth: "15rem" }}>
            <div className="card-header">{props.product.Name}</div>
            <div className="card-body">
                <img src="#" alt="#" />
                <p>{props.product.Description}</p>
                <p>${props.product.Price}</p>
            </div>
            <button className="btn btn-primary">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
