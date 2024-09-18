//Feature - 1
import React, { Component } from "react";
import products from "./products.json";
import Products from "./components/Products";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: products.products,
      size: "",
      sorts: "",
    };
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>All rights reserved, 2024</footer>
      </div>
    );
  }
}

export default App;
