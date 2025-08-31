import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Heart, ArrowLeft, ArrowRight, Palette, Eye, EyeOff, Clock, Image, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Toggle } from '@/components/ui/toggle';
import { Label } from '@/components/ui/label';

interface Design {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  features: string[];
  isPopular?: boolean;
  isNew?: boolean;
}

interface DesignSettings {
  showCouplePhotos: boolean;
  showCountdown: boolean;
  showRSVP: boolean;
  showGallery: boolean;
  showLoveStory: boolean;
  showParents: boolean;
  showSocialMedia: boolean;
  showVenueMap: boolean;
}

export default function DesignSelection() {
  const [selectedDesign, setSelectedDesign] = useState<string>('');
  const [settings, setSettings] = useState<DesignSettings>({
    showCouplePhotos: true,
    showCountdown: true,
    showRSVP: true,
    showGallery: true,
    showLoveStory: true,
    showParents: true,
    showSocialMedia: true,
    showVenueMap: true
  });

  const designs: Design[] = [
    {
      id: 'elegant-classic',
      name: 'Elegant Classic',
      category: 'Traditional',
      description: 'Timeless design with sophisticated typography and elegant spacing',
      preview: '/api/placeholder/400/300',
      features: ['Clean typography', 'Elegant spacing', 'Traditional layout', 'Professional look'],
      isPopular: true
    },
    {
      id: 'modern-minimal',
      name: 'Modern Minimal',
      category: 'Contemporary',
      description: 'Clean, minimalist design with plenty of white space',
      preview: '/api/placeholder/400/300',
      features: ['Minimalist layout', 'Clean lines', 'Modern typography', 'Plenty of whitespace']
    },
    {
      id: 'romantic-floral',
      name: 'Romantic Floral',
      category: 'Romantic',
      description: 'Beautiful floral elements with romantic color palette',
      preview: '/api/placeholder/400/300',
      features: ['Floral elements', 'Romantic colors', 'Soft textures', 'Elegant curves']
    },
    {
      id: 'vintage-charm',
      name: 'Vintage Charm',
      category: 'Vintage',
      description: 'Retro-inspired design with vintage typography and elements',
      preview: '/api/placeholder/400/300',
      features: ['Vintage typography', 'Retro elements', 'Classic patterns', 'Nostalgic feel']
    },
    {
      id: 'tropical-paradise',
      name: 'Tropical Paradise',
      category: 'Destination',
      description: 'Perfect for beach or destination weddings',
      preview: '/api/placeholder/400/300',
      features: ['Tropical elements', 'Bright colors', 'Beach vibes', 'Destination feel']
    },
    {
      id: 'rustic-charm',
      name: 'Rustic Charm',
      category: 'Rustic',
      description: 'Warm, rustic design with natural elements',
      preview: '/api/placeholder/400/300',
      features: ['Natural textures', 'Warm colors', 'Rustic elements', 'Cozy feel']
    }
  ];

  const handleSettingToggle = (setting: keyof DesignSettings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Traditional': 'bg-blue-100 text-blue-800',
      'Contemporary': 'bg-purple-100 text-purple-800',
      'Romantic': 'bg-pink-100 text-pink-800',
      'Vintage': 'bg-amber-100 text-amber-800',
      'Destination': 'bg-green-100 text-green-800',
      'Rustic': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
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
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-peach/20 px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">🎨</span>
            <span className="text-peach font-medium">Step 4 of 5</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Choose Your Perfect Design
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select from our beautiful collection of wedding invitation templates and customize the features to match your style.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Design Selection */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                  <Palette className="w-6 h-6 text-rose-gold" />
                  <span>Available Designs</span>
                </CardTitle>
                <CardDescription>
                  Browse through our curated collection of beautiful wedding invitation designs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {designs.map((design) => (
                    <div
                      key={design.id}
                      className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
                        selectedDesign === design.id
                          ? 'border-rose-gold bg-rose-gold/5'
                          : 'border-gray-200 hover:border-rose-gold/50'
                      }`}
                      onClick={() => setSelectedDesign(design.id)}
                    >
                      {/* Badges */}
                      <div className="absolute top-3 right-3 flex space-x-2">
                        {design.isPopular && (
                          <Badge className="bg-rose-gold text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                        {design.isNew && (
                          <Badge className="bg-green-500 text-white">
                            New
                          </Badge>
                        )}
                      </div>

                      {/* Preview Image */}
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <Image className="w-12 h-12 mx-auto mb-2" />
                          <span className="text-sm">Design Preview</span>
                        </div>
                      </div>

                      {/* Design Info */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800">{design.name}</h3>
                          <Badge className={getCategoryColor(design.category)}>
                            {design.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{design.description}</p>
                        
                        {/* Features */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {design.features.slice(0, 2).map((feature, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                          {design.features.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{design.features.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Selection Indicator */}
                      {selectedDesign === design.id && (
                        <div className="absolute top-3 left-3 w-6 h-6 bg-rose-gold rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected Design Preview */}
            {selectedDesign && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    Preview: {designs.find(d => d.id === selectedDesign)?.name}
                  </CardTitle>
                  <CardDescription>
                    This is how your invitation will look with the selected design
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <div className="w-full h-64 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Palette className="w-16 h-16 mx-auto mb-4 text-rose-gold" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          {designs.find(d => d.id === selectedDesign)?.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Design preview will be displayed here
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Design Settings */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Design Features
                </CardTitle>
                <CardDescription>
                  Customize which elements to show or hide on your invitation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'showCouplePhotos', label: 'Couple Photos', icon: Image, description: 'Display your beautiful photos' },
                  { key: 'showCountdown', label: 'Wedding Countdown', icon: Clock, description: 'Show days until your special day' },
                  { key: 'showRSVP', label: 'RSVP Form', icon: Heart, description: 'Allow guests to respond' },
                  { key: 'showGallery', label: 'Photo Gallery', icon: Image, description: 'Share more memories' },
                  { key: 'showLoveStory', label: 'Love Story', icon: Heart, description: 'Tell your journey together' },
                  { key: 'showParents', label: 'Parents Names', icon: Heart, description: 'Include family information' },
                  { key: 'showSocialMedia', label: 'Social Media', icon: Heart, description: 'Connect with guests' },
                  { key: 'showVenueMap', label: 'Venue Map', icon: Heart, description: 'Help guests find the location' }
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <setting.icon className="w-5 h-5 text-rose-gold" />
                      <div>
                        <Label className="text-sm font-medium text-gray-700 cursor-pointer">
                          {setting.label}
                        </Label>
                        <p className="text-xs text-gray-500">{setting.description}</p>
                      </div>
                    </div>
                    <Toggle
                      pressed={settings[setting.key as keyof DesignSettings]}
                      onPressedChange={() => handleSettingToggle(setting.key as keyof DesignSettings)}
                      className="data-[state=on]:bg-rose-gold data-[state=on]:text-white"
                    >
                      {settings[setting.key as keyof DesignSettings] ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </Toggle>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Design Tips */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-soft-pink/10 to-sage/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">
                  Design Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <span className="text-rose-gold">💡</span>
                  <span>Choose a design that reflects your wedding theme and personal style</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-rose-gold">💡</span>
                  <span>Consider your venue and wedding colors when selecting</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-rose-gold">💡</span>
                  <span>You can always customize colors and fonts later</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-rose-gold">💡</span>
                  <span>Popular designs are tested and loved by many couples</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12">
          <Link href="/onboarding/custom-url">
            <Button variant="outline" size="lg" className="border-gray-300 text-gray-600 hover:border-rose-gold hover:text-rose-gold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Custom URL
            </Button>
          </Link>
          
          <Link href="/onboarding/activation">
            <Button 
              size="lg" 
              className="bg-rose-gold hover:bg-rose-gold/90 text-white px-8"
              disabled={!selectedDesign}
            >
              Continue to Activation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
