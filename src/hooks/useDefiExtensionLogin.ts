// src/hooks/useDefiExtensionLogin.ts
import { useEffect, useState, useRef } from "react";
import { ExtensionProvider } from "@multiversx/sdk-extension-provider";
import { useWalletContext } from "../context/walletContext";

export const useDefiExtensionLogin = () => {
  const {address, setAddress} = useWalletContext()
  const providerRef = useRef<ExtensionProvider | null>(null);

  const login = async () => {
    const isExtensionAvailable = typeof window.multiversxWallet !== "undefined";

    if (!isExtensionAvailable) {
      alert(
        "MultiversX DeFi Wallet extension not found. Please install it from the Chrome Web Store."
      );
      return;
    }
    const provider = ExtensionProvider.getInstance();
    const isInitialized = await provider.init();

    if (!isInitialized) {
      throw new Error("Could not initialize DeFi Wallet extension");
    }

    try {
      await provider.login();
      const addr = await provider.getAddress();
      setAddress(addr);
      localStorage.setItem("walletAddress", addr);
      providerRef.current = provider;
    } catch (error) {
      console.error("DeFi Wallet login error:", error);
    }
  };

  const logout = async () => {
    if (providerRef.current) {
      await providerRef.current.logout();
      setAddress(null);
    }
  };

  useEffect(() => {
    const tryReconnect = async () => {
      const loginMethod = localStorage.getItem("loginMethod");
      if (loginMethod === "defiextension") {
        await login();
      }
    };
    tryReconnect();
  }, []);

  return {
    login,
    logout,
    address,
    isLoggedIn: !!address,
  };
};
