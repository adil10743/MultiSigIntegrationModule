// src/components/Navbar.tsx
import React, { useRef, useState, useEffect } from "react";
import { useWalletLogin } from "../hooks/useWalletLogin";
import ConnectWalletModal from "./connectWalletModal";
import AccountModal from "./accountModal";

const Navbar: React.FC = () => {
  const {
    address,
    uri,
    isLoggedIn,
    connectXPortal,
    connectDefiExtension,
    connectWebWallet,
    disconnect,
  } = useWalletLogin();

  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [isAccountModalOpen, setAccountModalOpen] = useState(false);
  const [isQrVisible, setQrVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleConnectClick = () => {
    setQrVisible(false); // reset QR state
    setWalletModalOpen(true); // open wallet modal
  };

  const handleDisconnect = () => {
    disconnect();
    setAccountModalOpen(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      setWalletModalOpen(false); // Close modal on login success
      setQrVisible(false); // Hide QR
    }
  }, [isLoggedIn]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-black text-white py-4 shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="text-lg font-bold">Swapping Module</div>

          <div>
            {!isLoggedIn ? (
              <button
                onClick={handleConnectClick}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                Connect Wallet
              </button>
            ) : (
              <button
                ref={buttonRef}
                onClick={() => setAccountModalOpen(true)}
                className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
              >
                {`${address!.slice(0, 6)}...${address!.slice(-4)}`}
              </button>
            )}
          </div>
        </div>
      </nav>

      <ConnectWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        uri={uri}
        isQrVisible={isQrVisible}
        setQrVisible={setQrVisible}
        onXPortalLogin={connectXPortal}
        onDefiExtensionLogin={connectDefiExtension}
        onWebWalletLogin={connectWebWallet}
      />

      {address && (
        <AccountModal
          isOpen={isAccountModalOpen}
          onClose={() => setAccountModalOpen(false)}
          onDisconnect={handleDisconnect}
          address={address}
          anchorRef={buttonRef}
        />
      )}
    </>
  );
};

export default Navbar;
