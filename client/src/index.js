import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import react Router dom
import { BrowserRouter } from "react-router-dom";
// import Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// import react-toastify
import "react-toastify/dist/ReactToastify.css";
// import Antd Design
import "antd/dist/antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
