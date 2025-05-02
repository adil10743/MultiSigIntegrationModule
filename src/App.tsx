// src/App.tsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar";
import SwapForm from "./pages/swapForm";
import { useWalletLogin } from "./hooks/useWalletLogin";
import "./index.css";

function App() {
  const { handleWebWalletRedirect } = useWalletLogin();

  useEffect(() => {
    handleWebWalletRedirect();
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="pt-40 min-h-screen bg-gray-100">
          <Routes>
            <Route path="SwapForm" element={<SwapForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
