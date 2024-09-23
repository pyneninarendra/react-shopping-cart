import React, { Component } from "react";
import formatCurrency from "./utils";
import { Fade } from "react-reveal";

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCheckout: false,
      name: "",
      email: "",
      address: "",
    };
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createOrder = (e) => {
    e.preventDefault();
    this.setState({
      showCheckout: false,
    });
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);
  };

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
              <Fade left cascade={true}>
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
                          <button
                            onClick={() => this.props.removeItem(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Fade>
            </div>
            <div className="total">
              <div>
                Total:{" "}
                {formatCurrency(
                  cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}
              </div>
              <button
                className="button primary"
                onClick={() => this.setState({ showCheckout: true })}
              >
                Proceed
              </button>
            </div>
            {this.state.showCheckout && (
              <form onSubmit={this.createOrder}>
                <Fade right cascade={true}>
                  <ul className="formContainer">
                    <li>
                      <label>Name:</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={this.state.name}
                        onChange={this.handleInput}
                      />
                    </li>

                    <li>
                      <label>Email:</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={this.state.email}
                        onChange={this.handleInput}
                      />
                    </li>

                    <li>
                      <label>Address:</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={this.state.address}
                        onChange={this.handleInput}
                      />
                    </li>
                    <li>
                      <button type="submit" className="button primary">
                        Checkout
                      </button>
                    </li>
                  </ul>
                </Fade>
              </form>
            )}
          </div>
        )}
      </div>
    );
  }
}
