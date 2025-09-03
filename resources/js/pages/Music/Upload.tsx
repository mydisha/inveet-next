import { Link } from '@inertiajs/react';
import { ArrowLeft, Music, Upload } from 'lucide-react';
import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { UploadForm, type MusicMetadata } from '../../components/music';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

interface MusicUploadProps {
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export default function MusicUpload({ user }: MusicUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUpload = async (file: File, metadata: MusicMetadata) => {
    setIsUploading(true);

    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real application, this would upload to the server
      console.log('Uploading file:', file.name);
      console.log('Metadata:', metadata);

      setUploadSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);

    } catch (error) {
      throw new Error('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <DashboardLayout user={user || null} currentPath="/music/upload">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href="/music"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Music Library</span>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Upload Music</h1>
              <p className="text-muted-foreground mt-1">
                Add your own music to personalize your wedding invitation
              </p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {uploadSuccess && (
          <Card className="mb-6 border-green-500 bg-green-50">
            <CardContent className="flex items-center space-x-3 py-4">
              <div className="p-2 bg-green-500 rounded-full">
                <Music className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Upload Successful!</h3>
                <p className="text-sm text-green-600">
                  Your music has been uploaded and is now available in your library.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upload Guidelines */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Upload Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Supported Formats</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• MP3 (.mp3)</li>
                  <li>• WAV (.wav)</li>
                  <li>• M4A (.m4a)</li>
                  <li>• OGG (.ogg)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">File Requirements</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Maximum file size: 10MB</li>
                  <li>• High quality audio recommended</li>
                  <li>• Clear, copyright-free music only</li>
                  <li>• Appropriate for wedding celebrations</li>
                </ul>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Make sure you have the rights to use the music you're uploading.
                We recommend using royalty-free music or music you own the rights to.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Upload Form */}
        <div className="flex justify-center">
          <UploadForm
            onUpload={handleUpload}
            className="w-full max-w-2xl"
          />
        </div>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Tips for Great Wedding Music</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium text-primary">For Ceremonies</h4>
                <p className="text-sm text-muted-foreground">
                  Choose soft, romantic music that won't overpower the ceremony.
                  Classical or instrumental pieces work well.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-primary">For Receptions</h4>
                <p className="text-sm text-muted-foreground">
                  Upbeat, celebratory music creates a joyful atmosphere.
                  Consider your guests' musical preferences.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-primary">For Special Moments</h4>
                <p className="text-sm text-muted-foreground">
                  First dance, cake cutting, and bouquet toss deserve special songs
                  that reflect your personality as a couple.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
