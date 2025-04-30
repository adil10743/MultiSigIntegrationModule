// swapModal.tsx
import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import SwapSummary from './swapSummary';


type SwapModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
  warning: string;
};

const SwapModal = forwardRef((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [swapInfo, setSwapInfo] = useState<any | null>(null);
  const [warning, setWarning] = useState('');
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  useImperativeHandle(ref, () => ({
    open: (warningText: string, data: any) => {
      setWarning(warningText);
      setSwapInfo(data);
      setIsOpen(true);
      return new Promise<boolean>((resolve) => {
        resolveRef.current = resolve;
      });
    },
  }));

  const handleConfirm = () => {
    setIsOpen(false);
    resolveRef.current?.(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    resolveRef.current?.(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg text-black">
        <h2 className="text-xl font-semibold mb-2">Swap Warning</h2>
        <p className="mb-4">{warning}</p>
  
        {swapInfo && (
          <>
            <h3 className="text-lg font-semibold mb-2">Swap Summary</h3>
            <SwapSummary
              returnAmount={swapInfo.returnAmount}
              minReturnAmount={swapInfo.minReturnAmount}
              priceImpact={swapInfo.priceImpact}
              routes={swapInfo.routes}
            />
          </>
        )}
  
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleConfirm}
          >
            Confirm Swap
          </button>
        </div>
      </div>
    </div>
  );
  
});

export default SwapModal;
