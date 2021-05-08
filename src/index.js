import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";

//bootstrap pawa shuru kore dise
import "./bootstrap.min.css";

//main index e store and provider 2 ta e lagbe
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") //provider die surround kore diechi
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
