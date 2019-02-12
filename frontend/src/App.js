import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import LoginScreen from "./LoginScreen";
import Market from "./Market";
import AddItem from "./AddItem";
import ButtonAppBar from './ButtonAppBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderHomepage = () => {
    let title = "Market Place";
    if (this.props.isLogin === true){
      title = this.props.username + "'s Market Place"
    }
    this.props.dispatch({
      type: "changePage",
      content: title
    })
    return <Market />;
  };

  renderLoginScreen = () => {
    this.props.dispatch({
      type: "changePage",
      content: "Login"
    })
    return <LoginScreen />;
  };

  renderAddItem = () => {
    this.props.dispatch({
      type: "changePage",
      content: "Add Item"
    })
    return <AddItem />;
  };

  renderLogout = () => {
    return <div />;
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
        {console.log("The page we are looking at: ", this.props.page)}
        <ButtonAppBar login={this.props.isLogin} title={this.props.page}/> 
          {/* {this.props.isLogin === true ? <Market /> : <LoginScreen />} */}
          <Route exact path="/" render={this.renderHomepage} />
          <Route exact path="/loginscreen" render={this.renderLoginScreen} />
          <Route exact path="/additem" render={this.renderAddItem} />
        </div>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = function(state) {
  return {
    isLogin: state.isLogin,
    username: state.username,
    page: state.page
  };
};

let connectApp = connect(mapStateToProps)(App);

export default connectApp;
