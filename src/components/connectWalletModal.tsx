// src/components/ConnectWalletModal.tsx
import React from "react";
import { QRCodeSVG } from "qrcode.react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  uri?: string;
  isQrVisible: boolean;
  setQrVisible: (visible: boolean) => void;
  onXPortalLogin: () => void;
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
  onWebWalletLogin
}) => {
  if (!isOpen) return null;

  const handleXPortalClick = () => {
    setQrVisible(true);
    onXPortalLogin();
  };

  const handleDefiExtensionClick = () => {
    onDefiExtensionLogin();
    onClose(); // Hide modal immediately if Defi login is silent
  };

  const handleWebWalletClick = () => {
    onWebWalletLogin();
    onClose(); // Will redirect
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md text-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-2xl"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">Connect a Wallet</h2>

        {isQrVisible && uri ? (
          <>
            <QRCodeSVG value={uri} size={180} className="mx-auto mb-4" />
            <p className="text-sm text-gray-700 mb-2">Scan with xPortal</p>
            <button
              onClick={() => setQrVisible(false)}
              className="mt-2 text-blue-600 text-sm underline"
            >
              Back to options
            </button>
          </>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleXPortalClick}
              className="w-full p-3 bg-gray-100 rounded hover:bg-gray-200"
            >
              <div className="font-semibold">xPortal App</div>
              <div className="text-xs text-gray-500">Scan QR using xPortal</div>
            </button>

            <button
              onClick={handleDefiExtensionClick}
              className="w-full p-3 bg-gray-100 rounded hover:bg-gray-200"
            >
              <div className="font-semibold">DeFi Extension</div>
              <div className="text-xs text-gray-500">Use browser extension</div>
            </button>

            <button
              onClick={handleWebWalletClick}
              className="w-full p-3 bg-gray-100 rounded hover:bg-gray-200"
            >
              <div className="font-semibold">Web Wallet</div>
              <div className="text-xs text-gray-500">Login using web wallet (redirect)</div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectWalletModal;