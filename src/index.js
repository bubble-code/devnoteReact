/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from './redux/store'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { SoftUIControllerProvider } from "context";
import routes from "./routes/routes";
import { getRoutes } from './routes/renderRoutes';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <SoftUIControllerProvider>
        <Routes>
          <Route path="/" element={<App />} >
            {getRoutes(routes)}
          </Route>
        </Routes>
      </SoftUIControllerProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
