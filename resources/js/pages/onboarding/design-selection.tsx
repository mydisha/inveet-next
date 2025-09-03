import DashboardLayout from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Check, Eye, Filter, Heart, Palette, Sparkles, Star, X } from 'lucide-react';
import { useMemo, useState } from 'react';

interface Design {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  features: string[];
  colors: string[];
  popular?: boolean;
  trending?: boolean;
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleContinue = () => {
    if (!selectedDesign) return;
    // Navigate directly to URL page without form submission
    window.location.href = '/onboarding/wedding-url';
  };

  const designs: Design[] = [
    {
      id: 'elegant-classic',
      name: 'Elegant Classic',
      category: 'Traditional',
      description: 'Timeless and sophisticated design with elegant typography',
      preview: '/api/placeholder/400/300',
      features: ['Elegant typography', 'Classic layout', 'Gold accents', 'Formal style'],
      colors: ['#8B4513', '#DAA520', '#F5F5DC'],
      popular: true
    },
    {
      id: 'modern-minimalist',
      name: 'Modern Minimalist',
      category: 'Contemporary',
      description: 'Clean and modern design with minimalist aesthetics',
      preview: '/api/placeholder/400/300',
      features: ['Clean lines', 'Modern typography', 'Minimal design', 'Contemporary feel'],
      colors: ['#2C3E50', '#E74C3C', '#ECF0F1'],
      trending: true
    },
    {
      id: 'romantic-floral',
      name: 'Romantic Floral',
      category: 'Romantic',
      description: 'Beautiful floral design perfect for romantic weddings',
      preview: '/api/placeholder/400/300',
      features: ['Floral elements', 'Romantic colors', 'Soft typography', 'Elegant layout'],
      colors: ['#E91E63', '#F8BBD9', '#FFF8E1'],
      popular: true
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
    },
    {
      id: 'overlay-shadow-01',
      name: 'Overlay Shadow 01',
      category: 'Elegant',
      description: 'Elegant wedding invitation with overlay shadow effects, inspired by Luxee design',
      preview: '/themes/overlay-shadow-01/assets/og-image.jpg',
      features: ['Responsive design', 'Countdown timer', 'RSVP form', 'Digital envelope', 'Gallery section', 'Smooth animations'],
      colors: ['#667eea', '#764ba2', '#ffd700', '#ff6b6b', '#ffffff'],
      popular: true,
      trending: true
    }
  ];

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(designs.map(design => design.category)));
    return [
      { id: 'all', name: 'All Designs', count: designs.length },
      ...uniqueCategories.map(category => ({
        id: category.toLowerCase(),
        name: category,
        count: designs.filter(design => design.category === category).length
      }))
    ];
  }, [designs]);

  // Filter designs based on selected category
  const filteredDesigns = useMemo(() => {
    if (selectedCategory === 'all') {
      return designs;
    }
    return designs.filter(design =>
      design.category.toLowerCase() === selectedCategory
    );
  }, [designs, selectedCategory]);

  return (
    <>
      <Head title="Design Selection - Onboarding" />

      <DashboardLayout user={user || null} currentPath="/onboarding/design-selection">
        {/* Compact Header */}
        <div className="text-center mb-6 px-4">
          <div className="flex items-center justify-center mb-3">
            <div className="icon-container icon-gradient-3 mr-3">
              <Palette className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold gradient-text-hero">
              Choose Your Design
            </h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Select the perfect template for your wedding invitation. You can customize it later.
          </p>
        </div>

        {/* Compact Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-2">
            {/* Step 1 - Couple Info */}
            <a href="/onboarding/couple-info" className="flex items-center group">
              <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 group-hover:bg-primary/20 group-hover:text-primary cursor-pointer">
                1
              </div>
              <span className="ml-1 text-xs text-muted-foreground hidden sm:block group-hover:text-primary transition-colors duration-200">Info</span>
            </a>

            <div className="w-8 h-0.5 bg-primary"></div>

            {/* Step 2 - Wedding Location */}
            <a href="/onboarding/wedding-location" className="flex items-center group">
              <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 group-hover:bg-primary/20 group-hover:text-primary cursor-pointer">
                2
              </div>
              <span className="ml-1 text-xs text-muted-foreground hidden sm:block group-hover:text-primary transition-colors duration-200">Location</span>
            </a>

            <div className="w-8 h-0.5 bg-primary"></div>

            {/* Step 3 - Design Selection (Current) */}
            <div className="flex items-center">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                3
              </div>
              <span className="ml-1 text-xs font-medium text-foreground hidden sm:block">Design</span>
            </div>

            <div className="w-8 h-0.5 bg-muted"></div>

            {/* Step 4 - Wedding URL */}
            <a href="/onboarding/wedding-url" className="flex items-center group">
              <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 group-hover:bg-primary/20 group-hover:text-primary cursor-pointer">
                4
              </div>
              <span className="ml-1 text-xs text-muted-foreground hidden sm:block group-hover:text-primary transition-colors duration-200">URL</span>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
            {/* Category Filter */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-foreground">Filter by Style</h3>
                </div>
                {selectedCategory !== 'all' && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Clear
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    type="button"
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`text-xs transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'hover:bg-primary/10 hover:border-primary/30'
                    }`}
                  >
                    {category.name}
                    <Badge
                      variant="secondary"
                      className={`ml-2 text-xs ${
                        selectedCategory === category.id
                          ? 'bg-primary-foreground/20 text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Design Grid */}
            {filteredDesigns.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {filteredDesigns.map((design) => (
                <div
                  key={design.id}
                  className={`relative cursor-pointer transition-all duration-300 group ${
                    selectedDesign === design.id
                      ? 'ring-2 ring-primary ring-offset-2 scale-105 rounded-lg'
                      : 'hover:scale-105'
                  }`}
                  onClick={() => setSelectedDesign(design.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedDesign(design.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Select ${design.name} design template`}
                  aria-pressed={selectedDesign === design.id}
                >
                  <Card className={`h-full transition-all duration-300 ${
                    selectedDesign === design.id
                      ? 'border-primary shadow-xl bg-primary/5'
                      : 'hover:shadow-lg hover:border-primary/30'
                  }`}>
                    {/* Preview Area */}
                    <div className="relative">
                      <div className="w-full h-40 bg-gradient-to-br from-muted to-muted/50 rounded-t-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Palette className="w-8 h-8 text-primary" />
                          </div>
                          <p className="text-xs text-muted-foreground font-medium">Preview</p>
                        </div>
                      </div>

                      {/* Selection Indicator */}
                      {selectedDesign === design.id && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg">
                          <Check className="w-4 h-4" />
                        </div>
                      )}

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-1">
                        {design.popular && (
                          <Badge variant="secondary" className="text-xs bg-accent/20 text-accent-foreground border-accent/30">
                            <Heart className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                        {design.trending && (
                          <Badge variant="secondary" className="text-xs bg-warm/20 text-warm-foreground border-warm/30">
                            <Star className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-foreground text-sm mb-1">{design.name}</h3>
                          <p className="text-xs text-muted-foreground overflow-hidden" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>{design.description}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {design.category}
                          </Badge>
                          <div className="flex space-x-1">
                            {design.colors.slice(0, 3).map((color, index) => (
                              <div
                                key={index}
                                className="w-3 h-3 rounded-full border border-border/50"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center text-xs text-muted-foreground">
                          <Eye className="w-3 h-3 mr-1" />
                          <span>{design.features.length} features included</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No designs found</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  No designs match the selected category. Try a different filter.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                  className="flex items-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  Show All Designs
                </Button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border/50">
              <Link href="/onboarding/wedding-location" className="w-full sm:w-auto">
                <Button variant="outline" size="sm" className="flex items-center w-full sm:w-auto">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>

              <Button
                type="button"
                onClick={handleContinue}
                disabled={!selectedDesign || filteredDesigns.length === 0}
                className="btn-hero flex items-center w-full sm:w-auto"
                size="sm"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

          {/* Compact Info Section */}
          {selectedDesign && (
            <Card className="mt-6 bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Great choice!</h4>
                    <p className="text-xs text-muted-foreground">
                      You can customize colors, text, and layout after selection. All designs are fully editable.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}
