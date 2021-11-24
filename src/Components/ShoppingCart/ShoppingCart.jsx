import React from 'react';

const ShoppingCart = props => {
  return (
    <React.Fragment>
      <p>This is an example of Music Table</p>
      <table id='shoppingcart'>
        <caption>Shopping Cart</caption>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Product</th>
            <th scope='col'>Quantity</th>
            <th scope='col'>Price</th>
            <th scope='col'>Total</th>
          </tr>
        </thead>
        <tbody>
          {props.shoppingcart.map(cart => {
            return (
              <tr>
                <th scope='row'> {cart.id} </th>
                <td>{cart.Product}</td>
                <td>{cart.Quantity}</td>
                <td>{cart.Price}</td>
                <td>{cart.Total}</td>
                <td>
                  <button class='button btn-secondary' id='editItem'>
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    class='button btn-danger'
                    id='removeItem'
                    onClick={() => props.removeItem(cart.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};
