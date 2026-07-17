import React from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  
  <div className="bg-white w-full max-w-md h-auto rounded-2xl shadow-lg p-4 flex flex-col">

    {/* HEADER (fixed height area) */}
    <div className="shrink-0 flex justify-between items-center mb-2">
      <h2 className="text-base font-semibold text-gray-800">
        {title}
      </h2>

      <button
        onClick={onClose}
        className="text-gray-500 cursor-pointer hover:text-black text-lg"
      >
        ✕
      </button>
    </div>

    {/* BODY (THIS is what controls height properly) */}
    <div className="flex-1 overflow-y-auto space-y-3 pr-1 pl-1">
      {children}
    </div>

  </div>
</div>
  );
}