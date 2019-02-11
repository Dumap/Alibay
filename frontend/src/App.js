import React, { Component } from "react";
import { connect } from "react-redux";
import './App.css';
import LoginScreen from "./LoginScreen";
import Logout from "./Logout";

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[]
    }
  }
  componentWillMount(){
    var loginPage =[];
    loginPage.push(<LoginScreen parentContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }
  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.uploadScreen}
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

let connectApp = connect(mapStateToProps)(App);

export default connectApp;
