// src/components/slippageControl.tsx
import React from "react";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

const presets = [0.5, 1, 3];

const SlippageControl: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-400 mb-2">
        Slippage Tolerance
      </label>

      <div className="flex gap-2 items-center mb-2">
        <input
          type="number"
          min={0}
          step={0.1}
          className="w-24 bg-white p-2 border rounded text-sm"
          placeholder="Custom %"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />

        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            className={`px-3 py-1 rounded text-sm border ${
              value === preset
                ? "bg-blue-600 text-white border-blue-700"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {preset}%
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlippageControl;
