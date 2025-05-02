// src/hooks/useXPortalLogin.ts
import { useEffect, useRef, useState } from "react";
import { WalletConnectV2Provider } from "@multiversx/sdk-wallet-connect-provider";
import { useChain } from "../context/chainContext";
import { useWalletContext } from "../context/walletContext";

const projectId = "9b1a9564f91cb659ffe21b73d5c4e2d8";
const relayUrl = "wss://relay.walletconnect.com";

export const useXPortalConnect = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [uri, setUri] = useState<string | null>(null);
  const providerRef = useRef<WalletConnectV2Provider | null>(null);
  const { chain } = useChain();

  const login = async () => {
    const provider = new WalletConnectV2Provider(
      {
        onClientLogin: async () => {
          const addr = await provider.getAddress();
          setAddress(addr);
          localStorage.setItem("walletAddress", addr);
          setUri(null);
        },
        onClientLogout: async () => {
          setAddress(null);
          setUri(null);
        },
        onClientEvent: async (event) => {
          console.log("xPortal Event:", event);
        },
      },
      chain,
      relayUrl,
      projectId,
      { logger: "debug" }
    );

    await provider.init();
    const { uri, approval } = await provider.connect();
    setUri(uri ?? null);
    await provider.login({ approval });
    providerRef.current = provider;
  };

  const logout = async () => {
    if (providerRef.current) {
        console.log("[xPortal] Attempting to logout via WalletConnect");
        await providerRef.current.logout();
        console.log("[xPortal] Logout sent to WalletConnect");
    }
    setAddress(null);
    setUri(null);
  };

  useEffect(() => {
    const tryReconnect = async () => {
      const loginMethod = localStorage.getItem("loginMethod");
      if (loginMethod === "xportal") {
        await login();
      }
    };
    tryReconnect();
  }, []);

  return {
    login,
    logout,
    address,
    uri,
  };
};
