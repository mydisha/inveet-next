import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, CameraOff, CheckCircle, Loader2, RotateCcw, XCircle } from 'lucide-react';
import QrScanner from 'qr-scanner';
import React, { useEffect, useRef, useState } from 'react';

interface QRScannerProps {
  onScan: (result: string) => void;
  onError?: (error: string) => void;
  className?: string;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onError, className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');

  const startScanning = async () => {
    try {
      if (!videoRef.current) return;

      setError(null);
      setIsScanning(true);
      setIsProcessing(false);

      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          if (result && !isProcessing) {
            setIsProcessing(true);
            setScanResult(result.data);
            onScan(result.data);
          }
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: cameraFacing,
        }
      );

      await qrScannerRef.current.start();
      setHasPermission(true);
    } catch (err) {

      const errorMessage = err instanceof Error ? err.message : 'Failed to start camera';
      setError(errorMessage);
      setHasPermission(false);
      setIsScanning(false);
      onError?.(errorMessage);
    }
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
    setIsScanning(false);
    setIsProcessing(false);
    setScanResult(null);
  };

  const toggleCamera = async () => {
    if (isScanning) {
      stopScanning();
      setCameraFacing(prev => prev === 'environment' ? 'user' : 'environment');
      // Small delay to ensure camera is properly stopped before starting new one
      setTimeout(() => {
        startScanning();
      }, 100);
    }
  };

  const resetScanner = () => {
    stopScanning();
    setError(null);
    setScanResult(null);
    setIsProcessing(false);
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <Card className="overflow-hidden bg-gradient-to-br from-white to-primary-light/10 border-primary/20 shadow-lg">
        <CardContent className="p-0">
          {/* Camera View */}
          <div className="relative aspect-square bg-black">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
            />

            {/* Scanning Overlay */}
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Corner indicators */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
                  {/* Top-left corner */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg animate-pulse" />
                  {/* Top-right corner */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg animate-pulse" />
                  {/* Bottom-left corner */}
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg animate-pulse" />
                  {/* Bottom-right corner */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg animate-pulse" />

                  {/* Scanning line */}
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
                </div>

                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full animate-ping" />
              </div>
            )}

            {/* Status Overlay */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div className="flex items-center space-x-2">
                {isScanning && (
                  <div className="flex items-center space-x-1 bg-green-500/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                    <span className="text-green-600 text-xs font-medium">Scanning</span>
                  </div>
                )}
                {isProcessing && (
                  <div className="flex items-center space-x-1 bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <Loader2 className="w-3 h-3 text-primary animate-spin" />
                    <span className="text-primary text-xs font-medium">Processing</span>
                  </div>
                )}
              </div>

              {scanResult && (
                <div className="flex items-center space-x-1 bg-green-500/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span className="text-green-600 text-xs font-medium">Success</span>
                </div>
              )}
            </div>

            {/* Error Overlay */}
            {error && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <div className="text-center p-6">
                  <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <p className="text-red-400 text-sm mb-4">{error}</p>
                  <Button onClick={resetScanner} variant="outline" size="sm">
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {/* No Camera Permission Overlay */}
            {hasPermission === false && !error && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <div className="text-center p-6">
                  <CameraOff className="w-12 h-12 text-accent mx-auto mb-4" />
                  <p className="text-accent text-sm mb-4">Camera permission required</p>
                  <Button onClick={startScanning} variant="outline" size="sm" className="border-accent/20 text-accent hover:bg-accent/10">
                    Grant Permission
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {!isScanning ? (
                  <Button
                    onClick={startScanning}
                    className="bg-primary hover:bg-primary-glow text-white"
                    size="sm"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Start Scanner
                  </Button>
                ) : (
                  <Button
                    onClick={stopScanning}
                    variant="outline"
                    size="sm"
                    className="border-red-500 text-red-600 hover:bg-red-500/10"
                  >
                    <CameraOff className="w-4 h-4 mr-2" />
                    Stop
                  </Button>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {isScanning && (
                  <Button
                    onClick={toggleCamera}
                    variant="outline"
                    size="sm"
                    className="border-primary/20 text-primary hover:bg-primary/10"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                )}

                {(error || scanResult) && (
                  <Button
                    onClick={resetScanner}
                    variant="outline"
                    size="sm"
                    className="border-primary/20 text-primary hover:bg-primary/10"
                  >
                    Reset
                  </Button>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-3 text-center">
              <p className="text-muted-foreground text-xs">
                {isScanning
                  ? "Point your camera at the QR code"
                  : "Tap 'Start Scanner' to begin scanning"
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRScanner;
