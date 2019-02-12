import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import LoginScreen from "./LoginScreen";
import Logout from "./Logout";
import Market from "./Market";
import AddItem from "./AddItem";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    return (
      <BrowserRouter>
        <div>
          {/* {this.props.isLogin === true ? <Market /> : <LoginScreen />} */}
          <Route exact path="/" render={this.renderHomepage} />
          <Route exact path="/loginscreen" render={this.renderLoginScreen} />
          <Route exact path="/additem" render={this.renderAddItem} />
        </div>
      </BrowserRouter>
    );
  }
}

const style = {
  margin: 15
};

let mapStateToProps = function(state) {
  return {
    isLogin: state.isLogin,
    username: state.username
  };
};

let connectApp = connect(mapStateToProps)(App);

export default connectApp;
