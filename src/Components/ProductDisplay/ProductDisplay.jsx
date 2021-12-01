import ProductCard from "../ProductCard/ProductCard";

const ProductDisplay = (props) => {
    return (
        <div className="row row-cols-6">
            {props.products.map((product) => {
                return <ProductCard key={product.id} product={product} addItemToShoppingCart={props.addItemToShoppingCart} />;
            })}
        </div>
    );
};

export default ProductDisplay;
