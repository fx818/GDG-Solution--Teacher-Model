import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#0a0a0a] text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">AI Tutor</h1>
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-xl">Loading amazing content...</p>
      </div>
    </div>
  );
} 