
const ShoppingCart = (props) => {
    function removeProduct(product) {
        //TODO
        return product;
    }

    function calcTotal() {
        let sum = 0;
        //TODO calulation of cost of all products in cart
        return sum;
    }

    return (
        <table className="table table-hover" id="shoppingcart">
            <caption>Shopping Cart</caption>
            <thead>
                <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Description</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">SubTotal</th>
                    <th scope="col">Remove</th>
                </tr>
            </thead>
            <tbody>
                {props.shoppingCart.map((product) => {
                    return (
                        <tr>
                            <th scope="row"> {product.name} </th>
                            <td>{product.description}</td>
                            <td>${product.price}</td>
                            <td>{product.quantity}</td>
                            {/*need increment decrement button with callback to update product quantity*/}
                            <td>${product.quantity * product.price}</td>
                            <td>
                                <button
                                    class="button btn-danger"
                                    onClick={() => props.removeProduct(product)}
                                >
                                    X
                                </button>
                            </td>
                        </tr>
                    );
                })}
                <tr>
                    <th scope="row"></th>
                    <td colSpan="2" className="table-primary"></td>
                    <td>Total</td>
                    <td colSpan="2">${calcTotal()}</td>
                </tr>
            </tbody>
        </table>
    );
};
export default ShoppingCart;
