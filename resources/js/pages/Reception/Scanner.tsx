import QRScanner from '@/components/QRScanner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import {
    AlertCircle,
    BarChart3,
    Camera,
    CheckCircle,
    QrCode,
    Settings,
    Users
} from 'lucide-react';
import { useState } from 'react';

interface ScannerStats {
  totalScanned: number;
  todayScanned: number;
  vipGuests: number;
}

interface ScannerProps {
  stats?: ScannerStats;
}

export default function Scanner({ stats }: ScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanResult, setLastScanResult] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleScan = async (qrData: string) => {
    try {
      setIsProcessing(true);
      setScanError(null);
      setLastScanResult(qrData);

      // Process the QR code data
      const response = await fetch('/api/reception/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ qr_code: qrData }),
      });

      const result = await response.json();

      if (response.ok) {
        // Show success message and reset scanner
        setScanResult(qrData);
        setTimeout(() => {
          resetScanner();
        }, 2000);
      } else {
        setScanError(result.message || 'Failed to process QR code');
      }
    } catch (error) {
      console.error('Scan error:', error);
      setScanError('Network error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleScanError = (error: string) => {
    setScanError(error);
  };

  const resetScanner = () => {
    setLastScanResult(null);
    setScanError(null);
    setIsProcessing(false);
  };

  return (
    <>
      <Head title="Guest Reception Scanner" />

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary-light/10 to-accent/5">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-primary/20 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-primary flex items-center">
                  <QrCode className="w-8 h-8 mr-3" />
                  Guest Reception Scanner
                </h1>
                <p className="text-muted-foreground mt-1">
                  Scan guest QR codes for check-in
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/20 text-primary hover:bg-primary/10"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/20 text-primary hover:bg-primary/10"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Reports
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-white/90 to-primary-light/20 border-primary/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Scanned</p>
                      <p className="text-2xl font-bold text-primary">{stats.totalScanned}</p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white/90 to-primary-light/20 border-primary/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Today</p>
                      <p className="text-2xl font-bold text-primary">{stats.todayScanned}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white/90 to-primary-light/20 border-primary/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">VIP Guests</p>
                      <p className="text-2xl font-bold text-primary">{stats.vipGuests}</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-accent to-warm text-white">
                      VIP
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Scanner Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Scanner */}
            <div>
              <Card className="bg-gradient-to-br from-white/90 to-primary-light/20 border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center">
                    <Camera className="w-5 h-5 mr-2" />
                    QR Code Scanner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <QRScanner
                    onScan={handleScan}
                    onError={handleScanError}
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Status Panel */}
            <div className="space-y-6">
              {/* Last Scan Result */}
              {lastScanResult && (
                <Card className="bg-gradient-to-br from-white/90 to-primary-light/20 border-primary/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-primary text-lg">Last Scan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-600 font-medium">QR Code Detected</span>
                      </div>
                      <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                        <p className="text-primary text-sm font-mono break-all">
                          {lastScanResult}
                        </p>
                      </div>
                      {isProcessing && (
                        <div className="flex items-center space-x-2 text-primary">
                          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          <span className="text-sm">Processing...</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Error Display */}
              {scanError && (
                <Alert className="bg-red-500/10 border-red-500/20">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-400">
                    {scanError}
                  </AlertDescription>
                </Alert>
              )}

              {/* Instructions */}
              <Card className="bg-gradient-to-br from-white/90 to-primary-light/20 border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-primary text-lg">Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                        1
                      </div>
                      <p className="text-sm">Tap "Start Scanner" to activate the camera</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                        2
                      </div>
                      <p className="text-sm">Point the camera at the guest's QR code</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                        3
                      </div>
                      <p className="text-sm">Wait for automatic detection and processing</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                        4
                      </div>
                      <p className="text-sm">Guest information will appear on the monitor</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-white/90 to-primary-light/20 border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-primary text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      onClick={resetScanner}
                      variant="outline"
                      className="w-full border-primary/20 text-primary hover:bg-primary/10"
                    >
                      Reset Scanner
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-primary/20 text-primary hover:bg-primary/10"
                    >
                      Manual Entry
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-primary/20 text-primary hover:bg-primary/10"
                    >
                      View Guest List
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-primary/20 text-primary hover:bg-primary/10"
                      onClick={() => window.open('/reception/monitor', '_blank')}
                    >
                      Open Monitor Display
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
