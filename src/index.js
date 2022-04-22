import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UseWalletProvider } from "use-wallet";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UseWalletProvider>
      <App />
    </UseWalletProvider>
  </React.StrictMode>
);
