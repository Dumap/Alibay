import React, { Component } from "react";
import { connect } from "react-redux";
import Socket from "./Socket";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = event => {
    console.log("in Signup handleSubmit");
    event.preventDefault();

    Socket.emit("signup", {
      user: this.state.username,
      pwd: this.state.password
    });
    Socket.on("signup-success", res => {
      if (res.success === true) {
        alert("Profile has been created.");
      } else {
        alert("Username already exist.");
      }
    });
    this.setState({ username: "", password: "" });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h1 style={{ textAlign: "center" }}>Signup</h1>
          <div style={{ padding: "5px" }}>
            Username{" "}
            <input
              type="text"
              onChange={this.handleUsernameChange}
              value={this.state.username}
            />
          </div>
          <div style={{ padding: "5px" }}>
            Password{" "}
            <input
              type="text"
              onChange={this.handlePasswordChange}
              value={this.state.password}
            />
          </div>
          <div style={{ padding: "5px" }}>
            <input type="submit" />
          </div>
        </form>
      </>
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

let connectSignup = connect(mapStateToProps)(Signup);

export default connectSignup;
