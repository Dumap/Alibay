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
      return { ...state, items: action.items };

    default:
      return state;
  }
};

const myStore = createStore(
  reducer,
  { isLogin: false, username: "", items: [], cart: [] },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
