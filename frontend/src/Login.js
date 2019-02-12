import React, { Component } from "react";
import { connect } from "react-redux";
import Socket from "./Socket";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { withRouter } from "react-router-dom";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = () => {
    Socket.emit("login", {
      user: this.state.username,
      pwd: this.state.password
    });
    Socket.on("login-success", res => {
      console.log("res", res);
      if (res.success === true) {
        console.log("if yes");
        this.props.dispatch({
          type: "login",
          username: res.username
        });
        this.props.history.push("/");
      } else {
        console.log("if nope");
        alert("Wrong password or username.");
        this.setState({ username: "", password: "" });
      }
    });
  };
  render() {
    return (
      <div onKeyPress={(target) => {if(target.charCode===13){this.handleSubmit();}}}>
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) =>
                this.setState({ username: newValue })
              }
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
            />
            <br />
            <RaisedButton
              label="Submit"
              primary={false}
              style={style}
              color="#FFFFFF"
              backgroundColor="#3d54b3"
              onClick={event => this.handleSubmit(event)}
            />
          </div>
        </MuiThemeProvider>
      </div>
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

let connectLogin = connect(mapStateToProps)(withRouter(Login));

export default connectLogin;
