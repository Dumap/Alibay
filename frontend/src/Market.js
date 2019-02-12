import React, { Component } from "react";
import { connect } from "react-redux";
import Socket from "./Socket";
import { withStyles } from '@material-ui/core/styles';
import MediaCard from './ItemCard';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  container: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'center'
  },
  root: {
    margin: 'auto',
    width: '90%',
    padding: '20px'
  },
  paper: {
    padding: theme.spacing.unit * 1,
    margin: theme.spacing.unit * 1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: 275
  }
});
class Market extends Component {
  displayItems = () => {
    console.log("Dislaying Items")
    console.log("Items count: " + this.props.items.length)
    return this.props.items.map(element => {
      return ( <Grid item md={3}>
                  <Paper className={this.props.classes.paper}>
                    <MediaCard elem={element}/>
                  </Paper>
                </Grid>);
    });
  };
  componentDidMount = () => {
    // let newItem = {
    //   seller: this.props.username,
    //   location: "LaSalle, Qc",
    //   title: "Dinning table",
    //   desc:
    //     "Moron is a term once used in psychology and psychiatry to denote mild intellectual disability.[1] The term was closely tied with the American eugenics movement.[",
    //   price: 1100,
    //   img: "image.jpg"
    // };
    // Socket.emit("add-item", newItem);
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

