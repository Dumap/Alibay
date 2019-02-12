import React, { Component } from "react";
import { connect } from "react-redux";
import Socket from "./Socket";
import { withStyles } from '@material-ui/core/styles';
import MediaCard from './ItemCard';

const styles = {
  container: {
    flex: 1, 
    flexDirection: 'row'
  }
};
class Market extends Component {
  displayItems = () => {
    console.log("Dislaying Items")
    console.log("Items count: " + this.props.items.length)
    return this.props.items.map(element => {
      return (<MediaCard elem={element}/>);
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
      <div className={this.props.classes.container}>
        {this.displayItems()}
      </div>
    );
  }
}

let mapStateToProps = function(state) {
  return {
    isLogin: state.isLogin,
    username: state.username,
    items: state.items
  };
};

let connectMarket = connect(mapStateToProps)(Market);

export default withStyles(styles)(connectMarket);

