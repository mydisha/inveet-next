import React from 'react';

interface TestProps {
  message: string;
  timestamp: string;
}

export default function Test({ message, timestamp }: TestProps) {
  return (
    <div className="min-h-screen bg-green-500 flex items-center justify-center">
      <div className="text-white text-center p-8 bg-black bg-opacity-50 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Inertia Test Page</h1>
        <p className="text-xl mb-2">Message: {message}</p>
        <p className="text-lg">Timestamp: {timestamp}</p>
        <div className="mt-4 p-4 bg-white text-black rounded">
          <p>If you can see this, Inertia.js is working correctly!</p>
        </div>
      </div>
    </div>
  );
}
