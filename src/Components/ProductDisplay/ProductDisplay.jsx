import ProductCard from "../ProductCard/ProductCard";


const ProductDisplay = (props) => {
    return (
        <div>
            <div className="row row-cols-5">
            {props.products.map((product) => {
                    return (
                        
                        <ProductCard product={product}/>
                        
                    );
                })}
            </div>
            <div>
                <ul className="pagination">
                    <li className="page-item disabled">
                    <a className="page-link" href="#">&laquo;</a>
                    </li>
                    <li className="page-item active">
                    <a className="page-link" href="#">1</a>
                    </li>
                    <li className="page-item">
                    <a className="page-link" href="#">2</a>
                    </li>
                    <li className="page-item">
                    <a className="page-link" href="#">3</a>
                    </li>
                    <li className="page-item">
                    <a className="page-link" href="#">4</a>
                    </li>
                    <li className="page-item">
                    <a className="page-link" href="#">5</a>
                    </li>
                    <li className="page-item">
                    <a className="page-link" href="#">&raquo;</a>
                    </li>
                </ul>
            </div>
        </div> 
     );
}
 
export default ProductDisplay;