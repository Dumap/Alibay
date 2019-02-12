import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Socket from "./Socket";
import Logout from "./Logout";

class Market extends Component {
  displayItems = () => {
    return this.props.items.map(element => {
      return (
        <div style={{ marginBottom: "10px" }}>
          <div>
            <Link to={"/itemdetail/" + element._id}>
              {element.title}, {element.price}$
            </Link>
          </div>
          <div>
            {element.seller}, {element.location}
          </div>
          <div>{element.desc.slice(0, 50).concat("...")}</div>
        </div>
      );
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
      <div>
        <div>
          {this.props.isLogin === true ? (
            <>
              <Link to={"/additem/"}>Add Item</Link> <Logout />
            </>
          ) : (
            <Link to={"/loginscreen/"}>Login/Signin</Link>
          )}
        </div>
        <div>
          <h1>{this.selectTitle()}</h1>
        </div>
        {this.displayItems()}
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

export default connectMarket;
