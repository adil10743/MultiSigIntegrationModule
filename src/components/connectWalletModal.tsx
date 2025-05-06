//src/components/connectWalletModal.tsx
import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { safeImport } from "../utils/safeImport";
import ICConnectApp from "../assets/svg/connect-app.svg";
import ICConnectExtension from "../assets/svg/connect-extension.svg";
import ICConnectWebWallet from "../assets/svg/connect-web-wallet.svg";
const connectWalletBg = safeImport("../assets/images/connect-wallet-bg.png");
type Props = {
  isOpen: boolean;
  onClose: () => void;
  uri?: string;
  isQrVisible: boolean;
  setQrVisible: (visible: boolean) => void;
  onXPortalLogin: () => void
  onDefiExtensionLogin: () => void;
  onWebWalletLogin: () => void;
};

const ConnectWalletModal: React.FC<Props> = ({
  isOpen,
  onClose,
  uri,
  isQrVisible,
  setQrVisible,
  onXPortalLogin,
  onDefiExtensionLogin,
  onWebWalletLogin,
}) => {
  if (!isOpen) return null;

  const handleXPortalClick = () => {
    setQrVisible(true);
    onXPortalLogin();

  };

  const handleDefiExtensionClick = () => {
    onDefiExtensionLogin();
    onClose();
  };

  const handleWebWalletClick = () => {
    onWebWalletLogin();
    onClose();
  };

  const handleBackToOptionsClick = () => {
    setQrVisible(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center font-sans">
      <div
        //background should be white so QR code is easily visible
        className="bg-white text-black rounded-xl p-6 w-full max-w-md shadow-lg relative"
        style={{
          backgroundImage: `url(${connectWalletBg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
          backgroundSize: "cover", 
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 text-2xl hover:text-white"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Connect to <span className="text-blue-400">a wallet</span>
        </h2>

        {isQrVisible && uri ? (
          <>
            <div className="flex justify-center mb-4">
              <QRCodeSVG value={uri} size={180} />
            </div>
            <p className="text-center text-sm text-gray-500 mb-4">
              Scan this QR code using your{" "}
              <span className="text-blue-400 font-semibold">xPortal app</span>
            </p>
            <button
              onClick={handleBackToOptionsClick}
              className="block mx-auto text-blue-400 text-sm underline"
            >
              Back to options
            </button>
          </>
        ) : (
          <div className="flex flex-col space-y-4 items-center">
            <WalletButton
              onClick={handleXPortalClick}
              icon={<ICConnectApp className="w-10 text-blue-400" />}
              label="xPortal App"
              subtext="Scan QR using xPortal"
            />

            <WalletButton
              onClick={handleDefiExtensionClick}
              icon={<ICConnectExtension className="w-10 text-blue-400" />}
              label="DeFi Extension"
              subtext="Use the browser extension"
            />

            <WalletButton
              onClick={handleWebWalletClick}
              icon={<ICConnectWebWallet className="w-10 text-blue-400" />}
              label="Web Wallet"
              subtext="Use MultiversX Web Wallet"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const WalletButton = ({
  onClick,
  icon,
  label,
  subtext,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  subtext: string;
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center bg-gray-600 hover:bg-gray-500 rounded-lg px-4 py-3"
  >
    <div className="mr-4">{icon}</div>
    <div className="text-left">
      <div className="text-sm font-semibold">{label}</div>
      <div className="text-xs text-gray-400">{subtext}</div>
    </div>
  </button>
);

export default ConnectWalletModal;
