import React, { Component } from "react";
import { connect } from "react-redux";
import Socket from "./Socket";

class Logout extends Component {
  handleOnClick = event => {
    event.preventDefault();
    console.log("in Logout handleOnClick");
    Socket.emit("logout", {
      user: this.props.username
    });
    this.props.dispatch({ type: "logout" });
  };
  render() {
    return (
      <div>
        <input type="button" onClick={this.handleOnClick} value="logout" />
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

let connectLogout = connect(mapStateToProps)(Logout);

export default connectLogout;
