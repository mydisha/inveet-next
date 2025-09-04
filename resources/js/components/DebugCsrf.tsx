import { forceRefreshCsrfToken, getCsrfToken } from '@/lib/auth';
import { useEffect, useState } from 'react';

export default function DebugCsrf() {
  const [currentToken, setCurrentToken] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const token = getCsrfToken();
    setCurrentToken(token || 'No token found');
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const newToken = await forceRefreshCsrfToken();
      setCurrentToken(newToken || 'Failed to refresh');
    } catch (error) {
      console.error('Refresh failed:', error);
      setCurrentToken('Refresh failed');
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <h3 className="font-bold mb-2">CSRF Debug</h3>
      <div className="text-xs space-y-1">
        <div>Current Token: {currentToken.substring(0, 20)}...</div>
        <div>Length: {currentToken.length}</div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 px-2 py-1 rounded text-xs"
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh Token'}
        </button>
      </div>
    </div>
  );
}
