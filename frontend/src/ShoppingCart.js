import React, { Component } from "react";
import { connect } from "react-redux";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  displayShoppingCart = () => {
    this.state.items.map(element => {
      return <div>{element.title}</div>;
    });
  };

  componentDidMount = () => {
    let itemsId = this.props.cart;
    console.log("itemsId", itemsId);
    let items = [];

    itemsId.forEach(element => {
      console.log("element", element);
      fetch("http://localhost:4001/find-item", {
        method: "POST",
        body: JSON.stringify({ id: element })
      })
        .then(res => res.json())
        .then(responseBody => {
          console.log("rb", responseBody);
          if (responseBody.success === true) {
            items.push(responseBody.item);
          }
        });
    });

    console.log("shoppingcart", items);

    this.setState({
      items: items
    });
  };
  render() {
    return (
      <div>
        {Object.entries(this.state.items).length === 0
          ? "Nothing here"
          : this.displayShoppingCart()}
      </div>
    );
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

let connectShoppingCart = connect(mapStateToProps)(ShoppingCart);

export default connectShoppingCart;
