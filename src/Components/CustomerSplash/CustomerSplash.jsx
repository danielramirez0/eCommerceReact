import ProductCard from "../ProductCard/ProductCard.jsx";

const CustomerSplash = (props) => {
    
    return (
        <ReactFragment>
            <div className="navbarContainer">
                <ul>
                    <li>Account</li>
                    <li>My Cart -- Items: {shoppingcart.count()} Total: ${shoppingcart.price.sum()}</li>
                </ul>
            </div>
            <div className="headerContainer">
                <div className="logo">

                </div>
                <div className="slogan">

                </div>
                <div className="policy">

                </div>
            </div>
            <div className="searchBarContainer">
                <input type="text" defaultValue="SEARCH by keyword or product number"/>
                <button className="btn btn-primary">Search</button>
            </div>
            <div className="productContainer">
                <ProductCard />
            </div>
        </ReactFragment>
    )
}

export default CustomerSplash;