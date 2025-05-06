import React, { useEffect, useState, useRef } from "react";
import { ChainId } from "@ashswap/ash-sdk-js";
import TOKENS_BETA from "../constants/DevnetTokensBeta";
import TOKENS_MAINNET from "../constants/MainnetTokens";
import { useChain } from "../context/chainContext";

type TokenItem = {
  id: string;
  name: string;
  symbol: string;
  logoURI?: string;
};

type Props = {
  selectedToken: string;
  onChange: (value: string) => void;
  onTokensLoaded?: (tokens: TokenItem[]) => void;
};

const TokenSelector: React.FC<Props> = ({ selectedToken, onChange, onTokensLoaded }) => {
  const { chain } = useChain();
  const [tokens, setTokens] = useState<TokenItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const tokenMap = chain === ChainId.Devnet ? TOKENS_BETA.TOKENS_MAP : TOKENS_MAINNET.TOKENS_MAP;
    const formattedTokens = Object.entries(tokenMap).map(([tokenId, info]) => ({
      id: tokenId,
      name: info.name,
      symbol: info.symbol,
      logoURI: info.logoURI,
    }));
    setTokens(formattedTokens);
    onTokensLoaded?.(formattedTokens);
  }, [chain]);

  const selected = tokens.find((t) => t.id === selectedToken);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white border p-2 rounded"
      >
        {selected ? (
          <div className="flex items-center gap-2">
            {selected.logoURI && (
              <img src={selected.logoURI} alt="" className="w-5 h-5 object-contain" />
            )}
            <span>{selected.name} ({selected.symbol})</span>
          </div>
        ) : (
          <span>Select token</span>
        )}
        <span className="ml-auto">&#x25BC;</span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto">
          {tokens.map((token) => (
            <li
              key={token.id}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(token.id);
                setIsOpen(false);
              }}
            >
              {token.logoURI && (
                <img src={token.logoURI} alt={token.symbol} className="w-5 h-5 object-contain" />
              )}
              <span>{token.name} ({token.symbol})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TokenSelector;
