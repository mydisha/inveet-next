
interface DashboardSimpleProps {
  user: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
}

export default function DashboardSimple({ user }: DashboardSimpleProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Dashboard
        </h1>
        <p className="text-gray-600 mb-4">
          Welcome to your dashboard!
        </p>
        {user ? (
          <div className="bg-green-100 p-4 rounded">
            <p className="text-green-800">
              ✅ User: {user.name} ({user.email})
            </p>
          </div>
        ) : (
          <div className="bg-yellow-100 p-4 rounded">
            <p className="text-yellow-800">
              ⚠️ No user data (testing mode)
            </p>
          </div>
        )}
        <div className="mt-4 p-4 bg-blue-100 rounded">
          <p className="text-blue-800">
            🎉 Dashboard component is working!
          </p>
        </div>
      </div>
    </div>
  );
}
