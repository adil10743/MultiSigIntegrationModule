// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChainProvider } from "./context/chainContext";
import { WalletProvider } from "./context/walletContext.tsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChainProvider>
      <WalletProvider>
        <App />
      </WalletProvider>
    </ChainProvider>
  </React.StrictMode>
);
