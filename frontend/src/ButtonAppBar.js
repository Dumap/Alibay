import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import compose from "recompose/compose";
import { connect } from "react-redux";
import Socket from "./Socket";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";

const styles = theme => ({
  root: {
    backgroundColor: "#3d54b3",
    color: "#FFFFFF",
    flexGrow: 1,
    borderRadius: 5
  },
  cart: {
    marginLeft: 5,
    cursor: "pointer"
  },
  grow: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});

class ButtonAppBar extends Component {
  constructor(props) {
    super(props);

    this.renderButtons = this.renderButtons.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.renderCart = this.renderCart.bind(this);
  }

  handleOnClick = () => {
    console.log("in Logout handleOnClick");
    Socket.emit("logout", {
      user: this.props.username
    });
    this.props.dispatch({ type: "logout" });
  };

  searchClick = event => {
    event.preventDefault();
    let search = event.target.value;
    console.log("search", search);
    let body = JSON.stringify({ search: search });
    fetch("http://localhost:4001/searchallitems", {
      method: "POST",
      body: body
    })
      .then(res => {
        return res.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        this.props.dispatch({
          type: "search-results",
          search: search,
          results: body.items
        });
        this.props.history.push("/searchresults/");
      });
  };

  renderSearch() {
    if (this.props.title !== "Login" && this.props.title !== "Register") {
      return (
        <div>
          <div className={this.props.classes.search}>
            <div className={this.props.classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onKeyPress={ev => {
                if (ev.key === "Enter") {
                  this.searchClick(ev);
                }
              }}
              classes={{
                root: this.props.classes.inputRoot,
                input: this.props.classes.inputInput
              }}
            />
          </div>
        </div>
      );
    }
    return;
  }

  renderButtons() {
    console.log("Is logged in ?", this.props.login);
    console.log("Title", this.props.title);

    if (this.props.title !== "Login" && this.props.title !== "Register") {
      if (this.props.login === true) {
        if (this.props.title.includes("Market Place")) {
          return (
            <div>
              <Button
                color="inherit"
                onClick={() => {
                  this.props.history.push("/additem/");
                }}
              >
                Add Item
              </Button>
              <Button color="inherit" onClick={this.handleOnClick}>
                Log out
              </Button>
            </div>
          );
        } else if (this.props.title === "Add Item") {
          return (
            <div>
              <Button
                color="inherit"
                onClick={() => {
                  this.props.history.push("/");
                }}
              >
                Market Place{" "}
              </Button>
              <Button color="inherit" onClick={this.handleOnClick}>
                Log out
              </Button>
            </div>
          );
        } else if (this.props.title === "Item Detail") {
          return (
            <div>
              <Button
                color="inherit"
                onClick={() => {
                  this.props.history.push("/");
                }}
              >
                Market Place{" "}
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  this.props.history.push("/additem/");
                }}
              >
                Add Item
              </Button>
              <Button color="inherit" onClick={this.handleOnClick}>
                Log out
              </Button>
            </div>
          );
        }
      } else {
        return (
          <Button
            id="login"
            color="inherit"
            onClick={() => {
              this.props.history.push("/loginscreen/");
            }}
          >
            Login
          </Button>
        );
      }
      if (this.props.title !== "Login" && this.props.title !== "Register") {
        if (this.props.login === true) {
          if (this.props.title.includes("Market Place")) {
            return (
              <div>
                <Button
                  color="inherit"
                  onClick={() => {
                    this.props.history.push("/additem/");
                  }}
                >
                  Add Item
                </Button>
                <Button color="inherit" onClick={this.handleOnClick}>
                  Log out
                </Button>
              </div>
            );
          } else if (this.props.title === "Add Item") {
            return (
              <div>
                <Button
                  color="inherit"
                  onClick={() => {
                    this.props.history.push("/");
                  }}
                >
                  Market Place{" "}
                </Button>
                <Button color="inherit" onClick={this.handleOnClick}>
                  Log out
                </Button>
              </div>
            );
          } else if (this.props.title.includes("Shopping Cart")) {
            return (
              <div>
                <Button
                  color="inherit"
                  onClick={() => {
                    this.props.history.push("/");
                  }}
                >
                  Market Place{" "}
                </Button>
                <Button
                  color="inherit"
                  onClick={() => {
                    this.props.history.push("/additem/");
                  }}
                >
                  Add Item
                </Button>
                <Button color="inherit" onClick={this.handleOnClick}>
                  Log out
                </Button>
              </div>
            );
          } else if (this.props.title === "Item Detail" || this.props.title === "Checkout") {
            return (
              <div>
                <Button
                  color="inherit"
                  onClick={() => {
                    this.props.history.push("/");
                  }}
                >
                  Market Place{" "}
                </Button>
                <Button
                  color="inherit"
                  onClick={() => {
                    this.props.history.push("/additem/");
                  }}
                >
                  Add Item
                </Button>
                <Button color="inherit" onClick={this.handleOnClick}>
                  Log out
                </Button>
              </div>
            );
          }
        } else {
          return (
            <div>
              <Button
                id="login"
                color="inherit"
                onClick={() => {
                  this.props.history.push("/loginscreen/");
                }}
              >
                Login
              </Button>
            </div>
          );
        }
      }
    }
  }

  renderCart() {
    if (this.props.login === true) {
      return (
        <div
          className={this.props.classes.cart}
          onClick={() => {
            this.props.history.push("/shoppingcart/");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>
      );
    }
    return;
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            className={this.props.classes.grow}
          >
            {this.props.title}
          </Typography>
          {this.renderSearch()}
          {this.renderButtons()}
          {this.renderCart()}
        </Toolbar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
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

export default compose(withStyles(styles))(withRouter(ConnectedButtonAppBar));
