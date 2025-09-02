import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Check, Palette, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface Design {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  features: string[];
  colors: string[];
}

interface DesignSelectionProps {
  user?: {
    id: number;
    name: string;
    email: string;
  } | null;
}

export default function DesignSelection({ user }: DesignSelectionProps) {
  const [selectedDesign, setSelectedDesign] = useState<string>('');

  const { data, setData, post, processing, errors } = useForm({
    selected_design: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDesign) return;

    setData('selected_design', selectedDesign);
    post('/onboarding/design-selection', {
      onSuccess: () => {
        // Navigate to next step
        window.location.href = '/onboarding/wedding-url';
      },
    });
  };

  const designs: Design[] = [
    {
      id: 'elegant-classic',
      name: 'Elegant Classic',
      category: 'Traditional',
      description: 'Timeless and sophisticated design with elegant typography',
      preview: '/api/placeholder/400/300',
      features: ['Elegant typography', 'Classic layout', 'Gold accents', 'Formal style'],
      colors: ['#8B4513', '#DAA520', '#F5F5DC']
    },
    {
      id: 'modern-minimalist',
      name: 'Modern Minimalist',
      category: 'Contemporary',
      description: 'Clean and modern design with minimalist aesthetics',
      preview: '/api/placeholder/400/300',
      features: ['Clean lines', 'Modern typography', 'Minimal design', 'Contemporary feel'],
      colors: ['#2C3E50', '#E74C3C', '#ECF0F1']
    },
    {
      id: 'romantic-floral',
      name: 'Romantic Floral',
      category: 'Romantic',
      description: 'Beautiful floral design perfect for romantic weddings',
      preview: '/api/placeholder/400/300',
      features: ['Floral elements', 'Romantic colors', 'Soft typography', 'Elegant borders'],
      colors: ['#E91E63', '#F8BBD9', '#FFF8E1']
    },
    {
      id: 'vintage-charm',
      name: 'Vintage Charm',
      category: 'Vintage',
      description: 'Retro-inspired design with vintage typography and elements',
      preview: '/api/placeholder/400/300',
      features: ['Vintage typography', 'Retro elements', 'Classic patterns', 'Nostalgic feel'],
      colors: ['#8D6E63', '#D7CCC8', '#BCAAA4']
    },
    {
      id: 'tropical-paradise',
      name: 'Tropical Paradise',
      category: 'Destination',
      description: 'Perfect for beach or destination weddings',
      preview: '/api/placeholder/400/300',
      features: ['Tropical elements', 'Bright colors', 'Beach vibes', 'Destination feel'],
      colors: ['#4CAF50', '#81C784', '#C8E6C9']
    },
    {
      id: 'rustic-charm',
      name: 'Rustic Charm',
      category: 'Rustic',
      description: 'Warm, rustic design with natural elements',
      preview: '/api/placeholder/400/300',
      features: ['Natural textures', 'Warm colors', 'Rustic elements', 'Cozy feel'],
      colors: ['#795548', '#A1887F', '#D7CCC8']
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Traditional': 'bg-blue-100 text-blue-800',
      'Contemporary': 'bg-purple-100 text-purple-800',
      'Romantic': 'bg-pink-100 text-pink-800',
      'Vintage': 'bg-amber-100 text-amber-800',
      'Destination': 'bg-green-100 text-green-800',
      'Rustic': 'bg-orange-100 text-orange-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <Head title="Design Selection - Onboarding" />

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-light/10">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-primary-glow/10 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary-light/20 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-6xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <img
                  src="/inveet-logo.png"
                  alt="Inveet.Id"
                  className="h-12 w-auto"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Choose Your Design 🎨
              </h1>
              <p className="text-lg text-gray-600">
                Select the perfect design for your wedding invitation
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                    ✓
                  </div>
                  <span className="ml-2 text-sm font-medium text-primary">Couple Info</span>
                </div>
                <div className="w-16 h-1 bg-primary rounded"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                    ✓
                  </div>
                  <span className="ml-2 text-sm font-medium text-primary">Location</span>
                </div>
                <div className="w-16 h-1 bg-primary rounded"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <span className="ml-2 text-sm font-medium text-primary">Design</span>
                </div>
                <div className="w-16 h-1 bg-gray-200 rounded"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-500">URL</span>
                </div>
              </div>
            </div>

            {/* Design Selection */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {designs.map((design) => (
                  <Card
                    key={design.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedDesign === design.id
                        ? 'ring-2 ring-primary shadow-lg'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedDesign(design.id)}
                  >
                    <CardHeader className="p-4">
                      <div className="relative">
                        <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                          <Palette className="h-12 w-12 text-gray-400" />
                        </div>
                        {selectedDesign === design.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-semibold text-gray-900">
                            {design.name}
                          </CardTitle>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(design.category)}`}>
                            {design.category}
                          </span>
                        </div>

                        <CardDescription className="text-sm text-gray-600">
                          {design.description}
                        </CardDescription>
                      </div>
                    </CardHeader>

                    <CardContent className="p-4 pt-0">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {design.features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <Sparkles className="h-3 w-3 text-primary mr-1" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Color Palette:</h4>
                          <div className="flex space-x-2">
                            {design.colors.map((color, index) => (
                              <div
                                key={index}
                                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <Link
                  href="/onboarding/wedding-location"
                  className="flex items-center px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>

                <Button
                  type="submit"
                  disabled={processing || !selectedDesign}
                  className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-white px-8 py-2 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? 'Saving...' : 'Continue'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500">
                Need help? Contact our support team
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
