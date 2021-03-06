import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import LoginScreen from "./LoginScreen";
import Market from "./Market";
import AddItem from "./AddItem";
import ButtonAppBar from "./ButtonAppBar";
import ItemDetail from "./ItemDetail";
import ShoppingCart from "./ShoppingCart";
import Checkout from "./Checkout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { itemDetail: "" };
  }

  renderHomepage = () => {
    return <Market isSearch={false} />;
  };

  renderSearch = () => {
    return <Market isSearch={true} />;
  };

  renderLoginScreen = () => {
    this.props.dispatch({
      type: "changePage",
      content: "Login"
    });
    return <LoginScreen />;
  };

  renderAddItem = () => {
    this.props.dispatch({
      type: "changePage",
      content: "Add Item"
    });
    return <AddItem />;
  };

  renderLogout = () => {
    return <div />;
  };

  renderItemDetail = routerData => {
    return <ItemDetail item={routerData.match.params.id} />;
  };

  renderShoppingCart = () => {
    let title = "Shopping Cart";
    if (this.props.isLogin === true) {
      title = this.props.username + "'s Shopping Cart";
    }
    this.props.dispatch({
      type: "changePage",
      content: title
    });
    return <ShoppingCart />;
  };

  renderCheckout = () => {
    this.props.dispatch({
      type: "changePage",
      content: "Checkout"
    });
    return <Checkout />;
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <ButtonAppBar login={this.props.isLogin} title={this.props.page} />
          <Route exact={true} path="/" render={this.renderHomepage} />
          <Route
            exact={true}
            path="/loginscreen"
            render={this.renderLoginScreen}
          />
          <Route exact={true} path="/additem" render={this.renderAddItem} />
          <Route
            exact={true}
            path="/itemdetail/:id"
            render={this.renderItemDetail}
          />
          <Route
            exact={true}
            path="/shoppingcart"
            render={this.renderShoppingCart}
          />
          <Route exact={true} path="/checkout" render={this.renderCheckout} />
          <Route exact={true} path="/search" render={this.renderSearch} />
        </div>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = function(state) {
  return {
    isLogin: state.isLogin,
    username: state.username,
    page: state.page,
    items: state.items,
    cart: state.cart
  };
};

let connectApp = connect(mapStateToProps)(App);

export default connectApp;
