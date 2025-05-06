// src/components/SwapForm.tsx
import React, { useRef, useState, useEffect } from "react";
import  { useWalletContext } from "../context/walletContext.tsx";
import { ChainId } from "@ashswap/ash-sdk-js";
import { getSwapTransaction, DEV_Address } from "../services/aggregator";
import TokenSelector from "../components/tokenSelector";
import SwapModal from "../components/swapModal";
import { registerSwapModalOpener } from "../services/modalManager";
import NetworkSelector from "../components/networkSelector";
import SlippageControl from "../components/slippageControl";
import { useChain } from "../context/chainContext";



const SwapForm: React.FC = () => {
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [slippage, setSlippage] = useState(1.0);

  const modalRef = useRef<any>(null);
  const { chain } = useChain();
  const {address} = useWalletContext()

  useEffect(() => {
    if (modalRef.current) {
      registerSwapModalOpener(modalRef.current.open);
    }
  }, []);

  const handleSwap = async () => {
    try {

      if (!address) {
        setStatus("No wallet connected.");
        return;
      }
      
      if (!fromToken || !toToken || !amount) return;
      // Optional warnings
      let warning = "";
      if (slippage === 0) {
        warning = "You have set slippage tolerance to 0%. Execution will likely fail";
      } else if (slippage > 5) {
        warning = `You have set a high slippage tolerance (${slippage}%). This may result in significant losses.`;
      }

      setStatus("Preparing transaction...");
      

      const tx = await getSwapTransaction({
        fromToken,
        toToken,
        amount: parseFloat(amount),
        senderAddress: address,
        slippage,
        currentChain: chain as ChainId.Devnet | ChainId.Mainnet,
        warningOverride: warning,
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
                setFromToken(tokens[0].id); // EGLD or first token
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
        <div>
          <label className="block text-sm font-medium text-gray-500">To Token</label>
          <TokenSelector
            selectedToken={toToken}
            onChange={setToToken}
            onTokensLoaded={() => {
              // No-op — all init is handled in the first TokenSelector above
            }}
          />
        </div>
        <SlippageControl value={slippage} onChange={setSlippage} />
        <button
          onClick={handleSwap}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Swap
        </button>

        {status && <p className="text-gray-400 text-sm">{status}</p>}
      </div>

      <SwapModal ref={modalRef} />
    </>
  );
};

export default SwapForm;
