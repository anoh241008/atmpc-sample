import React from "react";

/**
 * Reusable green-themed loader.
 *
 * Props:
 * - size: "sm" | "md" | "lg"   (default: "md")
 * - fullScreen: boolean         (default: false) — renders as a full-page overlay
 * - label: string               (optional) — text shown below the spinner
 * - className: string           (optional) — extra classes for the wrapper
 */
const Loader = ({ size = "md", fullScreen = false, label, className = "" }) => {

  const sizeMap = {
    sm: "w-5 h-5 border-2",
    md: "w-10 h-10 border-[3px]",
    lg: "w-16 h-16 border-4",
  };

  const spinnerSize = sizeMap[size] || sizeMap.md;

  const spinner = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={`${spinnerSize} rounded-full border-green-100 border-t-green-700 animate-spin`}
      />
      {label && (
        <p className="text-sm text-gray-500 font-medium">{label}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loader;