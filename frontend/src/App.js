import React, { Component } from "react";
import { connect } from "react-redux";
import Socket from "./Socket";
import Login from "./Login";
import Signup from "./Signup";
import Logout from "./Logout";

class App extends Component {
  displayHomepage = () => {
    return (
      <>
        <div style={{ padding: "20px" }}>
          <Login />
        </div>
        <div style={{ padding: "20px" }}>
          <Signup />
        </div>
      </>
    );
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {this.props.isLogin === true ? <Logout /> : this.displayHomepage()}
      </div>
    );
  }
}

let mapStateToProps = function(state) {
  return {
    isLogin: state.isLogin,
    username: state.username,
    color: state.color
  };
};

let connectApp = connect(mapStateToProps)(App);

export default connectApp;
