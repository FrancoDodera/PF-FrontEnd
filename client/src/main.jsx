import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { Provider } from "react-redux";
import store from "./redux/store.js";

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>,
  document.getElementById("root")
);
