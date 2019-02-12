import React, { Component } from "react";

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { item: "" };
  }
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
              item: <div>Hello</div>
            });
          } else {
            this.setState({
              item: <div>The item does not exist</div>
            });
            return;
          }
        });
    } else {
      this.setState({
        item: <div>The item does not exist</div>
      });
    }
  };
  render() {
    return this.state.item;
  }
}

export default ItemDetail;
