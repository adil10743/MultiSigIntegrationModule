//src/services/aggregator.ts
import { Address } from "@multiversx/sdk-core";
import { Aggregator, ChainId } from "@ashswap/ash-sdk-js";
import BigNumber from "bignumber.js";
import { openSwapModal } from './modalManager';


export const DEV_Address = "erd1uz92l8mpkxvjnhnptumuyeqdwxkrdp90ksryp4eyjm0r35q9nsms0j0ku7";

export async function getSwapTransaction({
  fromToken,
  toToken,
  amount,
  senderAddress,
  currentChain,
}: {
  fromToken: string;
  toToken: string;
  amount: number;
  senderAddress: string;
  currentChain: ChainId.Devnet | ChainId.Mainnet;
}) {
  
  console.log(fromToken, toToken, amount, senderAddress);
  console.log("Active Chain:", "M");//currentChain);
  const agService = new Aggregator({
    chainId: "D",//currentChain,
    // protocol: DEV_Address, // optional fee sharing
  });

  const amountBaseUnits = new BigNumber(amount).multipliedBy(1e18);

  const { sorResponse, getInteraction } = await agService.aggregate(
    fromToken,
    toToken,
    amountBaseUnits,
    100 // 0.1% slippage
  );

  if (sorResponse.warning) {
    console.log(sorResponse.warning);
    console.log(sorResponse.routes)
  }

  if (!sorResponse.routes || sorResponse.routes.length === 0) {
    await openSwapModal(
      `Could not find any paths for ${fromToken} to ${toToken}`,
      null  // No summary data
    );
    return null;
  }

  console.log("AshSwap SOR:", sorResponse);
  console.log("Route:", sorResponse.routes);
  console.log("MinOutput:", sorResponse.minReturnAmount);
  console.log("Price Impact:", sorResponse.priceImpact);

  // Always show modal for confirmation
  const confirmed = await openSwapModal(
    sorResponse.warning ?? "Review your swap",
    {
      returnAmount: sorResponse.returnAmount,
      minReturnAmount: sorResponse.minReturnAmount,
      priceImpact: sorResponse.priceImpact,
      routes: sorResponse.routes,
    }
  ).catch(() => false);

  if (!confirmed) return null;

  // Still required: a dummy warning handler (e.g., user already confirmed earlier)
  const tx = await getInteraction(() => Promise.resolve(true)).catch(() => null);

  if (!tx) return null;

  return tx
    .withSender(new Address(senderAddress))
    .check()
    .buildTransaction();
}
