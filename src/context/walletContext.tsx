// src/context/walletContext.tsx
import React, { createContext, useContext, useState } from "react";

type WalletContextType = {
  address: string | null;
  setAddress: (address: string | null) => void;
};

const WalletContext = createContext<WalletContextType>({
  address: null,
  setAddress: () => {},
});

export const useWalletContext = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [address, setAddress] = useState<string | null>(() => {
      return localStorage.getItem("walletAddress") || null;
    });
  
    return (
      <WalletContext.Provider value={{ address, setAddress }}>
        {children}
      </WalletContext.Provider>
    );
  };
  
