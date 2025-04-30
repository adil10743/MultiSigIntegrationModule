//src/components/accountModal.tsx
import React from "react";

type AccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  address: string;
  onDisconnect: () => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
};

const AccountModal: React.FC<AccountModalProps> = ({
    isOpen,
    onClose,
    address,
    onDisconnect,
    anchorRef,
  }) => {
    if (!isOpen || !anchorRef.current) return null;
  
    const rect = anchorRef.current.getBoundingClientRect();
  
    return (
      <div
        className="absolute z-50 bg-white rounded-lg p-4 shadow-lg w-72"
        style={{
          position: "absolute",
          top: rect.bottom + window.scrollY + 8, // 8px spacing
          left: rect.right - 288, // 288 = width of modal (72 * 4)
        }}
      >
        <h2 className="text-lg font-semibold mb-2">Account</h2>
        <p className="text-sm text-gray-500">Connected Address:</p>
        <p className="text-sm font-mono break-all mb-4">{address}</p>
        <button
          onClick={onDisconnect}
          className="w-full mb-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Disconnect
        </button>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        >
          Close
        </button>
      </div>
    );
  };

  export default AccountModal;
  