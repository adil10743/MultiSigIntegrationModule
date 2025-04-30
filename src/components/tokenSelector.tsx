import React, { useEffect, useState } from "react";
import { DEVNET_ALPHA_TOKENS_MAP, MAINNET_TOKENS_MAP, ChainId } from "@ashswap/ash-sdk-js";
import { useChain } from "../context/chainContext";

type Props = {
  selectedToken: string;
  onChange: (value: string) => void;
  onTokensLoaded?: (tokens: { id: string; name: string; symbol: string }[]) => void;
};

const TokenSelector: React.FC<Props> = ({ selectedToken, onChange, onTokensLoaded }) => {
  const { chain } = useChain();
  const [tokens, setTokens] = useState<{ id: string; name: string; symbol: string }[]>([]);

  useEffect(() => {
    const tokenMap = chain === ChainId.Devnet ? DEVNET_ALPHA_TOKENS_MAP : MAINNET_TOKENS_MAP;
    const formattedTokens = Object.entries(tokenMap).map(([tokenId, info]) => ({
      id: tokenId,
      name: info.name,
      symbol: info.symbol,
    }));
    setTokens(formattedTokens);
    onTokensLoaded?.(formattedTokens);

    console.log("[TokenSelector] Tokens reloaded for chain:", chain);
  }, [chain]);

  return (
    <select
      className="w-full bg-white p-2 border rounded"
      value={selectedToken}
      onChange={(e) => onChange(e.target.value)}
    >
      {tokens.map((token) => (
        <option key={token.id} value={token.id}>
          {token.id} {token.name} ({token.symbol})
        </option>
      ))}
    </select>
  );
};

export default TokenSelector;
