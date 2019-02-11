import React, { Component } from "react";
import { connect } from "react-redux";
import Socket from "./Socket";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      username:'',
      password:''
    }
  }
  handleSubmit = event => {
    console.log("in Signup handleSubmit");
    event.preventDefault();

    Socket.emit("signup", {
      fname: this.state.first_name,
      lname: this.state.last_name,
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
    this.setState({ first_name:'', last_name:'', username: "", password: "" });
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Username"
             type="username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
           <TextField
             type = "password"
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
  
  let connectRegister = connect(mapStateToProps)(Register);
  
  export default connectRegister;