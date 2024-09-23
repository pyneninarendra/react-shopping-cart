import React, { Component } from "react";
import formatCurrency from "../utils";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
    };
  }

  openModal = (product) => {
    this.setState({
      product: product,
    });
  };

  closeModal = () => {
    this.setState({
      product: null,
    });
  };

  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade={true}>
          <ul className="products">
            {this.props.products.map((product) => (
              <li key={product.id}>
                <div className="product">
                  <a
                    href={"#" + product.id}
                    onClick={() => this.openModal(product)}
                  >
                    <img src={product.image} alt={product.title} />
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => this.props.addToCart(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <div className="modal">
                <button className="close-modal" onClick={this.closeModal}>
                  {" "}
                  X{" "}
                </button>
                <div className="product-details">
                  <img src={product.image} alt={product.title} />
                  <div className="product-details-description">
                    <p>{product.title}</p>
                    <p>{product.description}</p>
                    <p>
                      Available Sizes:{" "}
                      {product.availableSizes.map((x) => (
                        <span key={x.id}>
                          {" "}
                          <button className="button">{x}</button>{" "}
                        </span>
                      ))}
                    </p>
                    <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>
                      <button
                        className="button primary"
                        onClick={() => {
                          this.props.addToCart(product);
                          this.closeModal();
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
