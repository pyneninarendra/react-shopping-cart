//Feature - 1
import React, { Component } from "react";
import products from "./products.json";
import Products from "./components/Products";
import Filter from "./components/Filter";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: products.products,
      size: "",
      sorts: "",
    };
  }

  sortProducts = (e) => {
    const sort = e.target.value;
    this.setState({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a.id > b.id
            ? 1
            : -1
        ),
    });
  };

  filteredProducts = (e) => {
    if (e.target.value === "") {
      this.setState({
        size: e.target.value,
        products: products.products,
      });
    } else {
      this.setState({
        size: e.target.value,
        products: products.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        ),
      });
    }
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sorts={this.state.sorts}
                sortProducts={this.sortProducts}
                filteredProducts={this.filteredProducts}
              />
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
