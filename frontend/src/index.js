import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";

let reducer = function(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLogin: true,
        username: action.username
      };
    case "logout":
      return { ...state, isLogin: false, username: "" };
    case "modify-items":
      return { ...state, items: action.items, search: "" };
    case "changePage":
      return { ...state, page: action.content };
    case "add-to-cart":
      return { ...state, cart: state.cart.concat(action.itemId) };
    case "empty-cart":
      return { ...state, cart: [] };
    case "search-results":
      return { ...state, search: action.search, items: action.results };
    default:
      return state;
  }
};

const myStore = createStore(
  reducer,
  {
    isLogin: false,
    page: "Market Place",
    username: "",
    items: [],
    cart: [],
    search: ""
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
