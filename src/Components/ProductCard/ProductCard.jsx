const ProductCard = (props) => {
    
    return (
        <React.Fragment>
            {props.products.map((product) => {
                <div style={{ maxWidth: "15rem" }}>
                    <div className="card-header">{product.Name}</div>
                    <div className="card-body">
                        <img src="#" alt="#" />
                        <p>{product.Description}</p>
                        <p>${product.Price}</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => addItemToCart()}>Add to Cart</button>
                </div>      
            })}
        </React.Fragment>
    )
}

export default ProductCard;