import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import LoginScreen from "./LoginScreen";
import Market from "./Market";
import AddItem from "./AddItem";
import ItemDetail from "./ItemDetail";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { itemDetail: "" };
  }

  renderHomepage = () => {
    return <Market />;
  };

  renderLoginScreen = () => {
    return <LoginScreen />;
  };

  renderAddItem = () => {
    return <AddItem />;
  };

  renderLogout = () => {
    return <div />;
  };

  renderItemDetail = routerData => {
    return <ItemDetail item={routerData.match.params.id} />;
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* {this.props.isLogin === true ? <Market /> : <LoginScreen />} */}
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
        </div>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = function(state) {
  return {
    isLogin: state.isLogin,
    username: state.username,
    items: state.items,
    cart: state.cart
  };
};

let connectApp = connect(mapStateToProps)(App);

export default connectApp;
