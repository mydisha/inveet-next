import DashboardLayout from '@/components/layout/DashboardLayout';
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
    hasWedding: boolean;
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
      features: ['Floral elements', 'Romantic colors', 'Soft typography', 'Elegant layout'],
      colors: ['#E91E63', '#F8BBD9', '#FFF8E1']
    },
    {
      id: 'rustic-chic',
      name: 'Rustic Chic',
      category: 'Rustic',
      description: 'Rustic and charming design with natural elements',
      preview: '/api/placeholder/400/300',
      features: ['Natural textures', 'Rustic elements', 'Warm colors', 'Charming style'],
      colors: ['#8D6E63', '#A1887F', '#EFEBE9']
    },
    {
      id: 'vintage-elegance',
      name: 'Vintage Elegance',
      category: 'Vintage',
      description: 'Classic vintage design with timeless appeal',
      preview: '/api/placeholder/400/300',
      features: ['Vintage typography', 'Classic elements', 'Elegant layout', 'Timeless style'],
      colors: ['#5D4037', '#BCAAA4', '#F3E5F5']
    },
    {
      id: 'tropical-paradise',
      name: 'Tropical Paradise',
      category: 'Tropical',
      description: 'Vibrant tropical design perfect for destination weddings',
      preview: '/api/placeholder/400/300',
      features: ['Tropical elements', 'Vibrant colors', 'Exotic feel', 'Paradise vibes'],
      colors: ['#4CAF50', '#FF9800', '#E1F5FE']
    }
  ];

  return (
    <>
      <Head title="Design Selection - Onboarding" />

      <DashboardLayout user={user || null} currentPath="/onboarding/design-selection">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Choose Your Design 🎨
          </h1>
          <p className="text-muted-foreground">
            Select the perfect design for your wedding invitation
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="ml-2 text-sm text-muted-foreground">Couple Info</span>
            </div>
            <div className="w-16 h-0.5 bg-primary"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="ml-2 text-sm text-muted-foreground">Location</span>
            </div>
            <div className="w-16 h-0.5 bg-primary"></div>
            <div className="flex items-center">
              <div className="icon-container icon-gradient-3">
                <span className="text-sm font-medium text-primary-foreground">3</span>
              </div>
              <span className="ml-2 text-sm font-medium text-foreground">Design</span>
            </div>
            <div className="w-16 h-0.5 bg-muted"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                4
              </div>
              <span className="ml-2 text-sm text-muted-foreground">URL</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="card-elegant hover:shadow-2xl transition-all duration-300 mb-8">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="icon-container icon-gradient-3">
                  <Palette className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg">Design Templates</CardTitle>
                  <CardDescription>Choose from our beautiful collection of wedding invitation designs</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {designs.map((design) => (
                    <div
                      key={design.id}
                      className={`relative cursor-pointer transition-all duration-300 ${
                        selectedDesign === design.id
                          ? 'ring-2 ring-primary ring-offset-2'
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => setSelectedDesign(design.id)}
                    >
                      <Card className={`card-elegant h-full ${
                        selectedDesign === design.id
                          ? 'border-primary shadow-lg'
                          : 'hover:shadow-xl'
                      } transition-all duration-300`}>
                        <CardHeader className="pb-3">
                          <div className="relative">
                            <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
                              <div className="text-center">
                                <Palette className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground">Preview</p>
                              </div>
                            </div>
                            {selectedDesign === design.id && (
                              <div className="absolute top-2 right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                          <CardTitle className="text-lg">{design.name}</CardTitle>
                          <CardDescription>{design.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-foreground mb-2">Category:</p>
                              <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                {design.category}
                              </span>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-foreground mb-2">Features:</p>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {design.features.slice(0, 3).map((feature, index) => (
                                  <li key={index} className="flex items-center">
                                    <Check className="w-3 h-3 mr-1 text-primary" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-foreground mb-2">Colors:</p>
                              <div className="flex space-x-1">
                                {design.colors.map((color, index) => (
                                  <div
                                    key={index}
                                    className="w-4 h-4 rounded-full border border-border"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>

                {errors.selected_design && (
                  <p className="text-sm text-destructive mt-4 text-center">{errors.selected_design}</p>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-8 mt-8 border-t">
                  <Link href="/onboarding/wedding-location">
                    <Button variant="outline" className="flex items-center">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  </Link>

                  <Button
                    type="submit"
                    disabled={processing || !selectedDesign}
                    className="btn-hero flex items-center"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Design Preview Info */}
          <Card className="card-elegant hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="icon-container icon-gradient-4">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg">Design Customization</CardTitle>
                  <CardDescription>You can customize your chosen design after selection</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Palette className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-medium text-foreground mb-1">Custom Colors</h4>
                  <p className="text-sm text-muted-foreground">Change colors to match your theme</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-medium text-foreground mb-1">Easy Editing</h4>
                  <p className="text-sm text-muted-foreground">Edit text and details easily</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-medium text-foreground mb-1">Premium Quality</h4>
                  <p className="text-sm text-muted-foreground">High-quality designs for your special day</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
}
