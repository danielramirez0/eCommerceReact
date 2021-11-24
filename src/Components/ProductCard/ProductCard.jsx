const ProductCard = (props) => {
    
    return (
        <div style={{ maxWidth: "15rem" }}>
            <div className="card-header">
                <h3>{props.Name}</h3>
                <p>{props.Description}</p>
                <h4>{props.price}</h4>
            </div>
            <button className="btn btn-primary" onClick={() => addItemToCart()}>Add to Cart</button>
        </div>
    )
}

export default ProductCard;