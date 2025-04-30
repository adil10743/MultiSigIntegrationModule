// src/hooks/useWebWalletLogin.ts
import { useState } from "react";
import {
  WalletProvider,
  WALLET_PROVIDER_DEVNET,
  WALLET_PROVIDER_MAINNET,
} from "@multiversx/sdk-web-wallet-provider";
import { useChain } from "../context/chainContext";
import qs from "qs"; // for cleaner parsing
import { useWalletContext } from "../context/walletContext";

export const useWebWalletLogin = () => {
  const { address, setAddress } = useWalletContext();
  const { chain } = useChain();

  const provider = new WalletProvider(
    chain === "D" ? WALLET_PROVIDER_DEVNET : WALLET_PROVIDER_MAINNET
  );

  const login = async () => {
    const callbackUrl = encodeURIComponent(window.location.href.split("?")[0]);
    await provider.login({ callbackUrl });
  };

  const handleRedirect = () => {
    const query = window.location.search.slice(1);
    const params = qs.parse(query);

    if (params.address) {
      const addr = params.address as string;
      setAddress(addr);
      localStorage.setItem("walletAddress", addr);

      // Clean the URL
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, document.title, url.toString());
    }
  };

  const logout = async () => {
    const callbackUrl = window.location.href.split("?")[0];
    await provider.logout({ callbackUrl });
    setAddress(null);
  };

  return {
    login,
    logout,
    handleRedirect,
    address,
  };
};
