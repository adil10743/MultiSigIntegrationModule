import React from "react";
import { ChainId } from "@ashswap/ash-sdk-js";
import { useChain } from "../context/chainContext";

const NetworkSelector: React.FC = () => {
  const { chain, setChain } = useChain();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected === "devnet") setChain(ChainId.Devnet);
    else if (selected === "mainnet") setChain(ChainId.Mainnet);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-white mb-1">Network:</label>
      <select
        value={chain === ChainId.Devnet ? "devnet" : "mainnet"}
        onChange={handleChange}
        className="bg-white text-black p-2 rounded"
      >
        <option value="devnet">Devnet</option>
        <option value="mainnet">Mainnet</option>
      </select>
    </div>
  );
};

export default NetworkSelector;
