import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import LoginScreen from "./LoginScreen";
import Logout from "./Logout";
import Market from "./Market";

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

  render() {
    return (
      <BrowserRouter>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* {this.props.isLogin === true ? <Market /> : <LoginScreen />} */}
          <Route exact path="/" render={this.renderHomepage} />
          <Route exact path="/loginscreen" render={this.renderLoginScreen} />
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
