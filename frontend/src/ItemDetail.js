import React, { Component } from "react";

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { item: {} };
  }
  displayItem = () => {
    if (Object.entries(this.state.item).length === 0) {
      return <div>This item does not exist.</div>;
    } else {
      return (
        <div>
          <h1>{this.state.item.title}</h1>
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

export default ItemDetail;
