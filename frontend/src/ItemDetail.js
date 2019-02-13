import React, { Component } from "react";
import { connect } from "react-redux";

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { item: {} };
  }

  handleOnClickBuy = event => {
    this.props.dispatch({ type: "add-to-cart", itemId: this.props.item });
    console.log("cart", this.props.cart);
  };
  displayItem = () => {
    if (Object.entries(this.state.item).length === 0) {
      return <div>This item does not exist.</div>;
    } else {
      return (
        <div>
          <h1>{this.state.item.title}</h1>
          <div>
            <input type="button" onClick={this.handleOnClickBuy} value="Buy" />
          </div>
        </div>
      );
    }
  };
  componentDidMount = () => {
    let itemId = this.props.item;
    console.log(itemId);
    if (itemId.length === 24) {
      fetch("http://localhost:4001/find-item", {
        method: "POST",
        body: JSON.stringify({ id: itemId })
      })
        .then(res => res.json())
        .then(responseBody => {
          if (responseBody.success === true) {
            this.setState({
              item: responseBody.item
            });
          } else {
            this.setState({
              item: {}
            });
            return;
          }
        });
    } else {
      this.setState({
        item: {}
      });
    }
  };
  render() {
    return this.displayItem();
  }
}

let mapStateToProps = function(state) {
  return {
    isLogin: state.isLogin,
    username: state.username,
    page: state.page,
    items: state.items,
    cart: state.cart
  };
};

let connectItemDetail = connect(mapStateToProps)(ItemDetail);

export default connectItemDetail;
