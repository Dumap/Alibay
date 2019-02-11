import React, { Component } from "react";
import { connect } from "react-redux";
import Socket from "./Socket";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends Component {
constructor(props){
  super(props);
  this.state={
    username:'',
    password:''
  }
 }
 handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = event => {
    console.log("in Login handleSubmit");
    event.preventDefault();
    Socket.emit("login", {
      user: this.state.username,
      pwd: this.state.password
    });
    Socket.on("login-success", res => {
      if (res.success === true) {
        this.props.dispatch({
          type: "login",
          username: res.username
        });
      } else {
        alert("Wrong password or username.");
      }
    });
    this.setState({ username: "", password: "" });
  };
render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleSubmit(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};

let mapStateToProps = function(state) {
  return {
      isLogin: state.isLogin,
      username: state.username
  };
};

let connectLogin = connect(mapStateToProps)(Login);

export default connectLogin;
  
