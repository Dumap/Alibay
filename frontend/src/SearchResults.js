import React, { Component } from "react";
import { connect } from "react-redux";

class SearchResults extends Component {
  displaySearchResults = () => {
    return this.props.searchResults.results.map(element => {
      return <div>{element.title}</div>;
    });
  };
  render() {
    return (
      <div>
        <div>You have searched for {this.props.searchResults.search}</div>
        <div>{this.displaySearchResults()}</div>
      </div>
    );
  }
}

let mapStateToProps = function(state) {
  return {
    isLogin: state.isLogin,
    username: state.username,
    items: state.items,
    cart: state.cart,
    searchResults: state.searchResults
  };
};

let connectSearchResults = connect(mapStateToProps)(SearchResults);

export default connectSearchResults;
