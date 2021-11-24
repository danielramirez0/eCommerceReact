const ProductCard = (props) => {
    
    return (
        <ReactFragment>
            {props.products.map((product) => {
                <div style={{ maxWidth: "15rem" }}>
                    <div className="card-header">
                        <img src="#" alt="#" />
                        <h3>{product.Name}</h3>
                        <p>{product.Description}</p>
                        <h4>{product.Price}</h4>
                    </div>
                    <button className="btn btn-primary" onClick={() => addItemToCart()}>Add to Cart</button>
                </div>      
            })}
        </ReactFragment>
    )
}

export default ProductCard;