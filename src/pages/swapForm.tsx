// src/components/SwapForm.tsx
import React, { useRef, useState, useEffect } from "react";
import { ChainId } from "@ashswap/ash-sdk-js";
import { getSwapTransaction, DEV_Address} from "../services/aggregator";
import TokenSelector from '../components/tokenSelector';
import SwapModal from "../components/swapModal";
import { registerSwapModalOpener } from "../services/modalManager";
import NetworkSelector from "../components/networkSelector";
import { useChain } from "../context/chainContext";

const SwapForm: React.FC = () => {
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const modalRef = useRef<any>(null);
  const { chain } = useChain();

  useEffect(() => {
    if (modalRef.current) {
      registerSwapModalOpener(modalRef.current.open);
    }
  }, []);

  const handleSwap = async () => {
    try {
      setStatus("Preparing transaction...");

      const tx = await getSwapTransaction({
        fromToken,
        toToken,
        amount: parseFloat(amount),
        senderAddress: DEV_Address,
        currentChain: chain as ChainId.Devnet | ChainId.Mainnet,
      });

      if (tx) {
        setStatus("Transaction prepared.");
        console.log("Generated transaction:", tx.toPlainObject());
      } else {
        setStatus("Transaction cancelled or failed.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error preparing transaction.");
    }
  };

  return (
    <>
      <div className="p-6 max-w-md mx-auto bg-black rounded-xl shadow-md space-y-4 mt-20">
        <h2 className="text-white text-xl font-semibold">Swap Tokens</h2>
        <NetworkSelector />
        <div>
          <label className="block text-sm font-medium text-gray-500">From Token</label>
          <TokenSelector
            selectedToken={fromToken}
            onChange={setFromToken}
            onTokensLoaded={(tokens) => {
              if (!fromToken && tokens.length > 0) {
                setFromToken(tokens[0].id);
              }
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">To Token</label>
          <TokenSelector
            selectedToken={toToken}
            onChange={setToToken}
            onTokensLoaded={(tokens) => {
              if (!toToken && tokens.length > 0) {
                setToToken(tokens[0].id);
              }
            }}
          />
        </div>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-white p-2 border rounded"
        />

        <button
          onClick={handleSwap}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Swap
        </button>

        {status && <p className="text-gray-700">{status}</p>}
      </div>

      <SwapModal ref={modalRef} />
    </>
  );
};

export default SwapForm;
