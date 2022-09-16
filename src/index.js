/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from './redux/store'
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <SoftUIControllerProvider>
        <App />
      </SoftUIControllerProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
