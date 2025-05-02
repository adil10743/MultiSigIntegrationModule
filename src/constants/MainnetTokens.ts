import { safeImport } from "../utils/safeImport";

const ImgAshIcon = safeImport("../assets/images/ash-icon.png");
const IconBUSD = safeImport("../assets/images/busd-icon.png");
const ImgEgldIcon = safeImport("../assets/images/egld-icon.png");
const IconSEGLD = safeImport("../assets/images/segld-icon.png");
const IconHSEGLD = safeImport("../assets/images/hsegld-icon.png");
const IconUSDC = safeImport("../assets/images/usdc-icon.png");
const IconUSDT = safeImport("../assets/images/usdt-icon.png");
const ImgWEGLDIcon = safeImport("../assets/images/wegld-icon.png");
const IconHTM = safeImport("../assets/images/htm-icon.png");
const IconCGO = safeImport("../assets/images/cgo-icon.png");
const IconMEX = safeImport("../assets/images/mex-icon.png");
const IconUTK = safeImport("../assets/images/utk-icon.png");
const IconEPUNKS = safeImport("../assets/images/epunks-icon.png");
const IconWSDAI = safeImport("../assets/images/wsdai-icon.png");
const IconDNA = safeImport("../assets/images/dna-icon.png");
const IconDAI = safeImport("../assets/images/dai-icon.png");
const IconBTC = safeImport("../assets/images/btc-icon.png");
const IconETH = safeImport("../assets/images/eth-icon.png");
const IconAPUSDC = safeImport("../assets/images/apusdc-icon.png");
const IconJWLASH = safeImport("../assets/images/jwlash-icon.png");
const IconJWLEGLD = safeImport("../assets/images/jwlegld-icon.png");
const IconJWLHTM = safeImport("../assets/images/jwlhtm-icon.png");
const IconJWLMEX = safeImport("../assets/images/jwlmex-icon.png");
const IconJWLXMEX = safeImport("../assets/images/jwlxmex-icon.png");
const IconJWLUSD = safeImport("../assets/images/jwlusd-icon.png");
const IconJWLUTK = safeImport("../assets/images/jwlutk-icon.png");
const IconJWLETH = safeImport("../assets/images/jwleth-icon.png");
const IconJWLBTC = safeImport("../assets/images/jwlbtc-icon.png");

import { ChainId, IESDTInfo } from "../helper/token/token";

const TOKENS_ALIAS: Record<"EGLD" | "ASH" | "wEGLD", IESDTInfo> = {
  EGLD: {
    identifier: "EGLD",
    chainId: ChainId.Mainnet,
    symbol: "EGLD",
    name: "MultiversX",
    decimals: 18,
    logoURI: ImgEgldIcon,
  },
  wEGLD: {
    identifier: "WEGLD-bd4d79",
    chainId: ChainId.Mainnet,
    symbol: "wEGLD",
    name: "Wrapped EGLD",
    decimals: 18,
    logoURI: ImgWEGLDIcon,
  },
  ASH: {
    identifier: "ASH-a642d1",
    chainId: ChainId.Mainnet,
    symbol: "ASH",
    name: "Ashswap Token",
    decimals: 18,
    logoURI: ImgAshIcon,
  },
};

const TOKENS: IESDTInfo[] = [
  TOKENS_ALIAS.EGLD,
  TOKENS_ALIAS.wEGLD,
  TOKENS_ALIAS.ASH,
  {
    identifier: "USDT-f8c08c",
    chainId: ChainId.Mainnet,
    symbol: "USDT",
    name: "Tether",
    decimals: 6,
    logoURI: IconUSDT,
  },
  {
    identifier: "USDC-c76f1f",
    chainId: ChainId.Mainnet,
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    logoURI: IconUSDC,
  },
  {
    identifier: "BUSD-40b57e",
    chainId: ChainId.Mainnet,
    symbol: "BUSD",
    name: "Binance USD",
    decimals: 18,
    logoURI: IconBUSD,
  },
  {
    identifier: "SEGLD-3ad2d0",
    chainId: ChainId.Mainnet,
    symbol: "sEGLD",
    name: "Liquid Staked EGLD",
    decimals: 18,
    logoURI: IconSEGLD,
  },
  {
    identifier: "HSEGLD-c13a4e",
    chainId: ChainId.Mainnet,
    symbol: "HsEGLD",
    name: "Hatom SEGLD",
    decimals: 8,
    logoURI: IconHSEGLD,
  },
  {
    identifier: "JWLASH-f362b9",
    chainId: ChainId.Mainnet,
    symbol: "JWLASH",
    name: "JewelLockedASH",
    decimals: 18,
    logoURI: IconJWLASH,
  },
  {
    identifier: "JWLEGLD-023462",
    chainId: ChainId.Mainnet,
    symbol: "JWLEGLD",
    name: "JewelLockedEGLD",
    decimals: 18,
    logoURI: IconJWLEGLD,
  },
  {
    identifier: "CGO-5e9528",
    chainId: ChainId.Mainnet,
    symbol: "CGO",
    name: "CathenaGold",
    decimals: 18,
    logoURI: IconCGO,
  },
  {
    identifier: "JWLHTM-8e3cd5",
    chainId: ChainId.Mainnet,
    symbol: "JWLHTM",
    name: "JewelLockedHTM",
    decimals: 18,
    logoURI: IconJWLHTM,
  },
  {
    identifier: "HTM-f51d55",
    chainId: ChainId.Mainnet,
    symbol: "HTM",
    name: "Hatom Protocol",
    decimals: 18,
    logoURI: IconHTM,
  },
  {
    identifier: "MEX-455c57",
    chainId: ChainId.Mainnet,
    symbol: "MEX",
    name: "xExchange",
    decimals: 18,
    logoURI: IconMEX,
  },
  {
    identifier: "UTK-2f80e9",
    chainId: ChainId.Devnet,
    symbol: "UTK",
    name: "Utrust",
    decimals: 18,
    logoURI: IconUTK,
  },
  {
    identifier: "JWLMEX-ef8788",
    chainId: ChainId.Mainnet,
    symbol: "JWLMEX",
    name: "JewelLockedMEX",
    decimals: 18,
    logoURI: IconJWLMEX,
  },
  {
    identifier: "JWLXMEX-7df4db",
    chainId: ChainId.Mainnet,
    symbol: "JWLXMEX",
    name: "JewelLockedXMEX",
    decimals: 18,
    logoURI: IconJWLXMEX,
  },
  {
    identifier: "JWLUSD-62939e",
    chainId: ChainId.Mainnet,
    symbol: "JWLUSD",
    name: "JewelLockedUSD",
    decimals: 18,
    logoURI: IconJWLUSD,
  },
  {
    identifier: "JWLUTK-2a518c",
    chainId: ChainId.Mainnet,
    symbol: "JWLUTK",
    name: "JewelLockedUTK",
    decimals: 18,
    logoURI: IconJWLUTK,
  },
  {
    identifier: "WSDAI-277fee",
    chainId: ChainId.Mainnet,
    symbol: "WSDAI",
    name: "WrappedSDAI",
    decimals: 18,
    logoURI: IconWSDAI,
  },
  {
    identifier: "EPUNKS-dc0f59",
    chainId: ChainId.Mainnet,
    symbol: "EPUNKS",
    name: "ElrondPunks",
    decimals: 18,
    logoURI: IconEPUNKS,
  },
  {
    identifier: "DNA-b144d1",
    chainId: ChainId.Mainnet,
    symbol: "DNA",
    name: "DNA",
    decimals: 18,
    logoURI: IconDNA,
  },
  {
    identifier: "WDAI-9eeb54",
    chainId: ChainId.Mainnet,
    symbol: "WDAI",
    name: "WDAI",
    decimals: 18,
    logoURI: IconDAI,
  },
  {
    identifier: "APUSDC-1ac537",
    chainId: ChainId.Mainnet,
    symbol: "APUSDC",
    name: "APUSDC",
    decimals: 6,
    logoURI: IconAPUSDC,
  },
  {
    identifier: "WETH-b4ca29",
    chainId: ChainId.Mainnet,
    symbol: "WETH",
    name: "WETH",
    decimals: 18,
    logoURI: IconETH,
  },
  {
    identifier: "WBTC-5349b3",
    chainId: ChainId.Mainnet,
    symbol: "WBTC",
    name: "WBTC",
    decimals: 8,
    logoURI: IconBTC,
  },
  {
    identifier: "JWLETH-e458bc",
    chainId: ChainId.Mainnet,
    symbol: "JWLETH",
    name: "JWLETH",
    decimals: 18,
    logoURI: IconJWLETH,
  },
  {
    identifier: "JWLBTC-c80796",
    chainId: ChainId.Mainnet,
    symbol: "JWLBTC",
    name: "JWLBTC",
    decimals: 18,
    logoURI: IconJWLBTC,
  },
];

const LP_TOKENS: IESDTInfo[] = [
  {
    identifier: "ALP-afc922",
    chainId: ChainId.Mainnet,
    symbol: "ALP-3pool",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-5f9191",
    chainId: ChainId.Mainnet,
    symbol: "ALP-BUSD-WEGLD",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-2d0cf8",
    chainId: ChainId.Mainnet,
    symbol: "ALP-USDT-ASH",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-0fe50a",
    chainId: ChainId.Mainnet,
    symbol: "ALP-WEGLD-SEGLD",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-796121",
    chainId: ChainId.Mainnet,
    symbol: "ALP-HSEGLD-SEGLD",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-f7dee1",
    chainId: ChainId.Mainnet,
    symbol: "ALP-ASH-JWLASH",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-713ae8",
    chainId: ChainId.Mainnet,
    symbol: "ALP-WEGLD-JWLEGLD",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-d97011",
    chainId: ChainId.Mainnet,
    symbol: "ALP-WEGLD-CGO",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-0ed700",
    chainId: ChainId.Mainnet,
    symbol: "ALP-JWLHTM",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-2265f4",
    chainId: ChainId.Mainnet,
    symbol: "ALP-JWLEGLD",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-deda92",
    chainId: ChainId.Mainnet,
    symbol: "ALP-JWLMEX",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-fe21d9",
    chainId: ChainId.Mainnet,
    symbol: "ALP-JWLUSD",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-20179e",
    chainId: ChainId.Mainnet,
    symbol: "ALP-JWLUTK",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-487964",
    chainId: ChainId.Mainnet,
    symbol: "ALP-JWLUSD-WSDAI",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-0f46fa",
    chainId: ChainId.Mainnet,
    symbol: "ALP-JWLEGLD-EPUNKS",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-92992e",
    chainId: ChainId.Mainnet,
    symbol: "ALP-USDC-DNA",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-19d6c0",
    chainId: ChainId.Mainnet,
    symbol: "ALP-2USDC",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-8d8415",
    chainId: ChainId.Mainnet,
    symbol: "ALP-USDC-WEGLD",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-25b383",
    chainId: ChainId.Mainnet,
    symbol: "ALP-JWLUSD-JWLEGLD",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-45512a",
    chainId: ChainId.Mainnet,
    symbol: "ALP-USDT-WDAI-JWLUSD",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-1d3ebc",
    chainId: ChainId.Mainnet,
    symbol: "ALP-APUSDC-USDC",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-e05567",
    chainId: ChainId.Mainnet,
    symbol: "ALP-JWLETH-WETH",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-ba9b1b",
    chainId: ChainId.Mainnet,
    symbol: "ALP-JWLBTC-WBTC",
    name: "Ashswap LP",
    decimals: 18,
  },
  {
    identifier: "ALP-be468d",
    chainId: ChainId.Mainnet,
    symbol: "ALP-JWLMEX-JWLXMEX",
    name: "Ashswap LP",
    decimals: 18,
  },
];

const TOKENS_MAP: Record<string, IESDTInfo> & typeof TOKENS_ALIAS = {
  ...Object.fromEntries([...TOKENS, ...LP_TOKENS].map((t) => [t.identifier, t])),
  ...TOKENS_ALIAS,
};

const TOKENS_MAINNET = {
  TOKENS,
  LP_TOKENS,
  TOKENS_MAP,
} as const;

export default TOKENS_MAINNET;
