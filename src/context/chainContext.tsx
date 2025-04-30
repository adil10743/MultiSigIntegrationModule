// src/context/chainContext.tsx
import React, { createContext, useContext, useState } from "react";
import { ChainId } from "@ashswap/ash-sdk-js";

type ChainContextType = {
  chain: ChainId;
  setChain: (chain: ChainId) => void;
};

const ChainContext = createContext<ChainContextType>({
  chain: ChainId.Mainnet,
  setChain: () => {},
});

export const useChain = () => useContext(ChainContext);

export const ChainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chain, setChain] = useState<ChainId>(ChainId.Devnet);

  return (
    <ChainContext.Provider value={{ chain, setChain }}>
      {children}
    </ChainContext.Provider>
  );
};
