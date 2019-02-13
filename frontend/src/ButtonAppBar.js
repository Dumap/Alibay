import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import compose from 'recompose/compose'
import { connect } from "react-redux";
import Socket from "./Socket";
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    backgroundColor: "#3d54b3",
    color: "#FFFFFF", 
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10, 
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  }
});

class ButtonAppBar extends Component{
    constructor(props) {
        super(props);

        this.renderButtons = this.renderButtons.bind(this)
        this.renderSearch = this.renderSearch.bind(this)
    }

    handleOnClick = () => {
        console.log("in Logout handleOnClick");
        Socket.emit("logout", {
          user: this.props.username
        });
        this.props.dispatch({ type: "logout" });
      };

    searchClick = (event) => {
        event.preventDefault();
        console.log("search", event.target.value);
        // TODO -> add call to backend
        event.target.value = "";
    }

    renderSearch(){
        if(this.props.title !== "Login" && this.props.title !== "Register"){
            return( <Typography>
                <div className={this.props.classes.search}>
                    <div className={this.props.classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                this.searchClick(ev);
                            }
                          }}
                        classes={{
                        root: this.props.classes.inputRoot,
                        input: this.props.classes.inputInput,
                        }}>
                    </InputBase>
                </div>
            </Typography>);
        }
        return
    }

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
                    {this.renderSearch()}
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

 