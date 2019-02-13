import React, { Component } from "react";
import { connect } from "react-redux";
import Socket from "./Socket";
import { withStyles } from "@material-ui/core/styles";
import MediaCard from "./ItemCard";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  root: {
    margin: "auto",
    width: "90%",
    padding: "20px"
  },
  paper: {
    padding: theme.spacing.unit * 1,
    margin: theme.spacing.unit * 1,
    textAlign: "center",
    color: theme.palette.text.secondary,
    minWidth: 275
  }
});
class Market extends Component {
  displayItems = () => {
    return this.props.items.map(element => {
      return (
        <Grid item md={3}>
          <Paper className={this.props.classes.paper}>
            <MediaCard elem={element} />
          </Paper>
        </Grid>
      );
    });
  };
  componentDidMount = () => {
    Socket.emit("ask-items");
    Socket.on("send-items", result => {
      this.props.dispatch({ type: "modify-items", items: result.items });
    });
  };

  selectTitle = () => {
    return this.props.isLogin === true
      ? this.props.username + "'s Market Place"
      : "Market Place";
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <Grid container spacing={24}>
          {this.displayItems()}
        </Grid>
      </div>
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

let connectMarket = connect(mapStateToProps)(Market);

export default withStyles(styles)(connectMarket);
