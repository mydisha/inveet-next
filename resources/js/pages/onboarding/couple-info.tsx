import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Heart, ArrowLeft, ArrowRight, Upload, X, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export default function CoupleInfo() {
  const [formData, setFormData] = useState({
    groomName: '',
    brideName: '',
    groomNickname: '',
    brideNickname: '',
    groomInstagram: '',
    brideInstagram: '',
    groomParentName: '',
    brideParentName: '',
    coupleStory: '',
    groomPhoto: null as File | null,
    bridePhoto: null as File | null,
    couplePhoto: null as File | null
  });

  const [photoPreview, setPhotoPreview] = useState({
    groom: '',
    bride: '',
    couple: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (field: string, file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }));
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(prev => ({ 
        ...prev, 
        [field]: e.target?.result as string 
      }));
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (field: string) => {
    setFormData(prev => ({ ...prev, [field]: null }));
    setPhotoPreview(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data:', formData);
  };

  return (
    <div className="min-h-screen bg-wedding-gradient">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-rose-gold rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-rose-gold">Inveet</span>
          </div>
          
          <Link href="/onboarding">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Onboarding
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-soft-pink/20 px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">👰‍♀️🤵‍♂️</span>
            <span className="text-rose-gold font-medium">Step 1 of 5</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Tell Us About Yourselves
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let's start with the basics. Share your names, nicknames, and a bit about your love story.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8">
            {/* Names Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Names & Nicknames
                </CardTitle>
                <CardDescription>
                  Enter your full names and any nicknames you'd like to use
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="groomName" className="text-gray-700 font-medium">
                      Groom's Full Name *
                    </Label>
                    <Input
                      id="groomName"
                      value={formData.groomName}
                      onChange={(e) => handleInputChange('groomName', e.target.value)}
                      placeholder="e.g., Michael James Anderson"
                      className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="brideName" className="text-gray-700 font-medium">
                      Bride's Full Name *
                    </Label>
                    <Input
                      id="brideName"
                      value={formData.brideName}
                      onChange={(e) => handleInputChange('brideName', e.target.value)}
                      placeholder="e.g., Sarah Elizabeth Johnson"
                      className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="groomNickname" className="text-gray-700 font-medium">
                      Groom's Nickname
                    </Label>
                    <Input
                      id="groomNickname"
                      value={formData.groomNickname}
                      onChange={(e) => handleInputChange('groomNickname', e.target.value)}
                      placeholder="e.g., Mike, MJ"
                      className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="brideNickname" className="text-gray-700 font-medium">
                      Bride's Nickname
                    </Label>
                    <Input
                      id="brideNickname"
                      value={formData.brideNickname}
                      onChange={(e) => handleInputChange('brideNickname', e.target.value)}
                      placeholder="e.g., Sarah, Saz"
                      className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Social Media
                </CardTitle>
                <CardDescription>
                  Share your Instagram handles for guests to follow your journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="groomInstagram" className="text-gray-700 font-medium">
                      Groom's Instagram
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        @
                      </span>
                      <Input
                        id="groomInstagram"
                        value={formData.groomInstagram}
                        onChange={(e) => handleInputChange('groomInstagram', e.target.value)}
                        placeholder="username"
                        className="pl-8 border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="brideInstagram" className="text-gray-700 font-medium">
                      Bride's Instagram
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        @
                      </span>
                      <Input
                        id="brideInstagram"
                        value={formData.brideInstagram}
                        onChange={(e) => handleInputChange('brideInstagram', e.target.value)}
                        placeholder="username"
                        className="pl-8 border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parents Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Parents' Names
                </CardTitle>
                <CardDescription>
                  Include your parents' names in the traditional format
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="groomParentName" className="text-gray-700 font-medium">
                      Groom's Parents
                    </Label>
                    <Input
                      id="groomParentName"
                      value={formData.groomParentName}
                      onChange={(e) => handleInputChange('groomParentName', e.target.value)}
                      placeholder="e.g., Mr. & Mrs. John Anderson"
                      className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="brideParentName" className="text-gray-700 font-medium">
                      Bride's Parents
                    </Label>
                    <Input
                      id="brideParentName"
                      value={formData.brideParentName}
                      onChange={(e) => handleInputChange('brideParentName', e.target.value)}
                      placeholder="e.g., Mr. & Mrs. Robert Johnson"
                      className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photos Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Photos
                </CardTitle>
                <CardDescription>
                  Upload beautiful photos to personalize your invitation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Groom Photo */}
                  <div className="space-y-3">
                    <Label className="text-gray-700 font-medium">Groom's Photo</Label>
                    <div className="relative">
                      {photoPreview.groom ? (
                        <div className="relative">
                          <img
                            src={photoPreview.groom}
                            alt="Groom preview"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto('groomPhoto')}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="block w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-rose-gold transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handlePhotoUpload('groomPhoto', e.target.files[0])}
                            className="hidden"
                          />
                          <div className="flex flex-col items-center justify-center h-full text-gray-400 hover:text-rose-gold">
                            <Camera className="w-8 h-8 mb-2" />
                            <span className="text-sm">Upload Photo</span>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Bride Photo */}
                  <div className="space-y-3">
                    <Label className="text-gray-700 font-medium">Bride's Photo</Label>
                    <div className="relative">
                      {photoPreview.bride ? (
                        <div className="relative">
                          <img
                            src={photoPreview.bride}
                            alt="Bride preview"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto('bridePhoto')}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="block w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-rose-gold transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handlePhotoUpload('bridePhoto', e.target.files[0])}
                            className="hidden"
                          />
                          <div className="flex flex-col items-center justify-center h-full text-gray-400 hover:text-rose-gold">
                            <Camera className="w-8 h-8 mb-2" />
                            <span className="text-sm">Upload Photo</span>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Couple Photo */}
                  <div className="space-y-3">
                    <Label className="text-gray-700 font-medium">Couple Photo</Label>
                    <div className="relative">
                      {photoPreview.couple ? (
                        <div className="relative">
                          <img
                            src={photoPreview.couple}
                            alt="Couple preview"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto('couplePhoto')}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="block w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-rose-gold transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handlePhotoUpload('couplePhoto', e.target.files[0])}
                            className="hidden"
                          />
                          <div className="flex flex-col items-center justify-center h-full text-gray-400 hover:text-rose-gold">
                            <Camera className="w-8 h-8 mb-2" />
                            <span className="text-sm">Upload Photo</span>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Love Story Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Your Love Story
                </CardTitle>
                <CardDescription>
                  Share a brief story about how you met or what makes your relationship special
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="coupleStory" className="text-gray-700 font-medium">
                    Love Story (Optional)
                  </Label>
                  <Textarea
                    id="coupleStory"
                    value={formData.coupleStory}
                    onChange={(e) => handleInputChange('coupleStory', e.target.value)}
                    placeholder="Tell us about your journey together..."
                    rows={4}
                    className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20 resize-none"
                  />
                  <p className="text-sm text-gray-500">
                    This will be displayed on your invitation to give guests a personal touch.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            <Link href="/onboarding">
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-600 hover:border-rose-gold hover:text-rose-gold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            
            <Link href="/onboarding/wedding-details">
              <Button size="lg" className="bg-rose-gold hover:bg-rose-gold/90 text-white px-8">
                Continue to Wedding Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
