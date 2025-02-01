import React from "react";

const SummarizedText = ({ text }) => {
  return (
    <div className="max-w-sm mx-auto bg-slate-800 shadow-lg rounded-lg overflow-hidden border border-gray-800 mt-6">
      {/* Header */}
      <div className="bg-gray-500 text-white px-4 py-3 font-semibold text-lg">
        <h1 className="text-center">Summarized Text</h1>
      </div>

      {/* Body */}
      <div className="p-4 text-gray-300 text-sm">
        {text ? (
          <p className="leading-relaxed">{text}</p>
        ) : (
          <p className="text-gray-500 italic text-center">No summary available</p>
        )}
      </div>
    </div>
  );
};

export default SummarizedText;
