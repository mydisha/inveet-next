import React from 'react';
import { usePage } from '@inertiajs/react';

// Main App component that works with Inertia.js
export default function App() {
  const { component, props } = usePage();

  // Inertia.js will automatically render the correct component
  // We just need to provide a wrapper
  return (
    <div className="app">
      {/* Inertia will render the component here automatically */}
    </div>
  );
}
