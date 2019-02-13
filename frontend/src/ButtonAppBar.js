import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import compose from 'recompose/compose'
import { connect } from "react-redux";
import Socket from "./Socket";

const styles = {
  root: {
    backgroundColor: "#3d54b3",
    color: "#FFFFFF", 
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends Component{
    constructor(props) {
        super(props);
        this.renderButtons = this.renderButtons.bind(this)
    }

    handleOnClick = () => {
        console.log("in Logout handleOnClick");
        Socket.emit("logout", {
          user: this.props.username
        });
        this.props.dispatch({ type: "logout" });
      };

    renderButtons(){
        console.log("Is logged in ?", this.props.login)
        console.log("Title", this.props.title)

        if(this.props.title !== "Login" && this.props.title !== "Register"){
            if(this.props.login === true ){
                if(this.props.title.includes("Market Place")){
                    return (<div>
                                <Button  color="inherit" onClick={() => {this.props.history.push("/additem/") }}>Add Item</Button>
                                <Button  color="inherit" onClick={this.handleOnClick}>Log out</Button>
                            </div>)
                }else if(this.props.title === "Add Item"){
                    return (<div>
                                 <Button  color="inherit" onClick={() => {this.props.history.push("/") }}>Market Place </Button>
                                 <Button  color="inherit" onClick={this.handleOnClick}>Log out</Button>
                            </div> ) 
                }else if(this.props.title === "Item Detail"){
                    return (<div>
                            <Button  color="inherit" onClick={() => {this.props.history.push("/") }}>Market Place </Button>
                            <Button  color="inherit" onClick={() => {this.props.history.push("/additem/") }}>Add Item</Button>
                            <Button  color="inherit" onClick={this.handleOnClick}>Log out</Button>
                            </div>)
                }
            }else{
                return <Button id="login" color="inherit" onClick={() => {this.props.history.push("/loginscreen/")}} >Login</Button>
            }
        }
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <Toolbar>
                <Typography variant="h6" color="inherit" className={this.props.classes.grow}>
                    {this.props.title}
                </Typography>
                    {this.renderButtons()}
                </Toolbar>
            </div>
        );
    }

}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

let mapStateToProps = function(state) {
    return {
      isLogin: state.isLogin,
      username: state.username,
      items: state.items,
      cart: state.cart
    };
  };
  
let ConnectedButtonAppBar = connect(mapStateToProps)(ButtonAppBar);
  
 
export default compose(
    withStyles(styles)
 )(withRouter(ConnectedButtonAppBar))

 