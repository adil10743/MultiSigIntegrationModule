//src/hooks/useWalletLogin.ts
import { useEffect, useState } from "react";
import { useXPortalConnect } from "./useXPortalLogin";
import { useDefiExtensionLogin } from "./useDefiExtensionLogin";
import { useWebWalletLogin } from "./useWebWalletLogin";
import { useWalletContext } from "../context/walletContext";

export const useWalletLogin = () => {
  const xportal = useXPortalConnect();
  const defi = useDefiExtensionLogin();
  const web = useWebWalletLogin();

  const [loginMethod, setLoginMethod] = useState<string | null>(
    localStorage.getItem("loginMethod"  )
  );

  const { address, setAddress } = useWalletContext();
  const uri = xportal.uri ?? undefined;
  const isLoggedIn = !!address;

  const connectXPortal = async () => {      
    await xportal.login();
    setLoginMethod("xportal");
    localStorage.setItem("loginMethod", "xportal");
  };

  const connectDefiExtension = async () => {
    await defi.login();
    setLoginMethod("defi");
    localStorage.setItem("loginMethod", "defi");
  };

  const connectWebWallet = async () => {
    await web.login();
    setLoginMethod("webwallet");
    localStorage.setItem("loginMethod", "webwallet");
  };

  const disconnect = () => {
    if (loginMethod === "xportal") xportal.logout();
    else if (loginMethod === "defi") defi.logout();
    else if (loginMethod === "webwallet") web.logout();

    setLoginMethod(null);
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("loginMethod");
  };

  // Optional: clear address if login method fails or expires
  useEffect(() => {
    if (
      loginMethod === "xportal" && !xportal.address ||
      loginMethod === "defi" && !defi.address ||
      loginMethod === "webwallet" && !web.address
    ) {
      disconnect();
    }
  }, [xportal.address, defi.address, web.address]);

  return {
    address,
    uri,
    isLoggedIn,
    connectXPortal,
    connectDefiExtension,
    connectWebWallet,
    handleWebWalletRedirect: web.handleRedirect,
    disconnect,
  };
};
