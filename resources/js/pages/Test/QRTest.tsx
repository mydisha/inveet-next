import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Copy, QrCode } from 'lucide-react';
import { useState } from 'react';

export default function QRTest() {
  const [qrData, setQrData] = useState('invite:sample-wedding-invitation');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qrData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const generateQRCode = () => {
    // Simple QR code generation using a public API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
    return qrUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">QR Code Test Generator</h1>
          <p className="text-slate-600">Generate test QR codes for the reception scanner</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Code Generator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <QrCode className="w-5 h-5 mr-2" />
                Generate Test QR Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="qr-data">QR Code Data</Label>
                <Input
                  id="qr-data"
                  value={qrData}
                  onChange={(e) => setQrData(e.target.value)}
                  placeholder="Enter QR code data (e.g., invite:wedding-slug)"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Button onClick={handleCopy} variant="outline" size="sm">
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Copied!' : 'Copy Data'}
                </Button>
              </div>

              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <img
                  src={generateQRCode()}
                  alt="Generated QR Code"
                  className="mx-auto border rounded-lg"
                />
                <p className="text-sm text-slate-600 mt-2">Scan this QR code with the reception scanner</p>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Testing Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Generate QR Code</p>
                    <p className="text-sm text-slate-600">Enter invitation data and generate QR code</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Open Reception Scanner</p>
                    <p className="text-sm text-slate-600">Navigate to /reception/scanner</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Scan QR Code</p>
                    <p className="text-sm text-slate-600">Use the scanner to scan the generated QR code</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                    4
                  </div>
                  <div>
                    <p className="font-medium">View Guest Greeting</p>
                    <p className="text-sm text-slate-600">See the guest greeting page after successful scan</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Sample QR Data Formats:</h4>
                <div className="space-y-2 text-sm">
                  <code className="block p-2 bg-slate-100 rounded text-xs">
                    invite:sample-wedding-invitation
                  </code>
                  <code className="block p-2 bg-slate-100 rounded text-xs">
                    invite:vip-guest-invitation
                  </code>
                  <code className="block p-2 bg-slate-100 rounded text-xs">
                    sample-wedding-invitation
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <a href="/reception/scanner">Open Reception Scanner</a>
            </Button>
            <Button asChild variant="outline">
              <a href="/dashboard">Back to Dashboard</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
