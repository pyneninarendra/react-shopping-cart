//Feature - 1
import React, { Component } from "react";
import products from "./products.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./Cart";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: products.products,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
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

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item.id === product.id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  removeItem = (num) => {
    const cartItems = this.state.cartItems.filter((item) => item.id !== num);
    this.setState({
      cartItems: this.state.cartItems.filter((item) => item.id !== num),
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  createOrder = (order) => {
    console.log(order);
    alert(`Need to save order from ${order.name}`);
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
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeItem={this.removeItem}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All rights reserved, 2024</footer>
      </div>
    );
  }
}

export default App;
