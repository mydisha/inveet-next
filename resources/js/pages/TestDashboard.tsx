import { Head } from '@inertiajs/react';

export default function TestDashboard() {
  return (
    <>
      <Head title="Test Dashboard" />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800">Test Dashboard</h1>
          <p className="text-gray-600 mt-2">This is a simple test to verify the component is working.</p>
        </div>
      </div>
    </>
  );
}
