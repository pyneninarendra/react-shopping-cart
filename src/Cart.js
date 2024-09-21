import React, { Component } from "react";
import formatCurrency from "./utils";

export default class Cart extends Component {
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is Empty</div>
        ) : (
          <div className="cart">
            <div className="cart-header">
              Cart Contains {cartItems.length} Items
            </div>
            <div className="cart-body">
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <div>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div>
                      <div>
                        <p>{item.title}</p>
                      </div>
                      <div className="right">
                        {formatCurrency(item.price)} * {item.count} {"  "}
                        <button onClick={() => this.props.removeItem(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button className="button primary">Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
