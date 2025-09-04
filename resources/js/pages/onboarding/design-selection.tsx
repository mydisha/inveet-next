import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import { ONBOARDING_STEPS } from '@/components/onboarding/OnboardingProgress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowUpDown, Check, Eye, Filter, Heart, Palette, Search, SortAsc, SortDesc, Sparkles, Star, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'popularity'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleContinue = () => {
    if (!selectedDesign) return;
    // Navigate directly to URL page without form submission
    window.location.href = '/onboarding/wedding-url';
  };


  // Screen reader announcements for selection changes
  useEffect(() => {
    if (selectedDesign) {
      const selectedDesignData = designs.find(d => d.id === selectedDesign);
      if (selectedDesignData) {
        // Announce selection to screen readers
        const announcement = `Selected design: ${selectedDesignData.name}. ${selectedDesignData.description}`;
        const announcementElement = document.createElement('div');
        announcementElement.setAttribute('aria-live', 'polite');
        announcementElement.setAttribute('aria-atomic', 'true');
        announcementElement.className = 'sr-only';
        announcementElement.textContent = announcement;
        document.body.appendChild(announcementElement);

        // Clean up after announcement
        setTimeout(() => {
          document.body.removeChild(announcementElement);
        }, 1000);
      }
    }
  }, [selectedDesign, designs]);

  const designs: Design[] = [
    {
      id: 'elegant-classic',
      name: 'Elegant Classic',
      category: 'Traditional',
      description: 'Timeless and sophisticated design with elegant typography',
      preview: '/themes/overlay-shadow-01/assets/og-image.jpg',
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

  // Filter and sort designs based on selected category, search query, and sort options
  const filteredDesigns = useMemo(() => {
    let filtered = designs;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(design =>
        design.category.toLowerCase() === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(design =>
        design.name.toLowerCase().includes(query) ||
        design.description.toLowerCase().includes(query) ||
        design.category.toLowerCase().includes(query) ||
        design.features.some(feature => feature.toLowerCase().includes(query))
      );
    }

    // Sort designs
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'popularity':
          // Sort by popularity (popular first, then trending, then others)
          const aScore = (a.popular ? 3 : 0) + (a.trending ? 2 : 0) + 1;
          const bScore = (b.popular ? 3 : 0) + (b.trending ? 2 : 0) + 1;
          comparison = bScore - aScore;
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [designs, selectedCategory, searchQuery, sortBy, sortOrder]);

  return (
    <OnboardingLayout
      title="Choose Your Design"
      description="Select the perfect template for your wedding invitation. You can customize it later."
      icon={Palette}
      steps={ONBOARDING_STEPS.main}
      currentStep="design-selection"
      user={user}
      onSubmit={handleContinue}
      submitLabel="Continue"
      showBackButton={true}
      onBackClick={() => window.location.href = '/onboarding/wedding-location'}
      maxWidth="7xl"
    >
      <div className="space-y-6">
        {/* Search and Filter Controls */}
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search designs by name, description, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-sm border-2 focus:border-primary/50 transition-colors"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Sort and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Category Filter */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-foreground">Filter by Style</h3>
                </div>
                {(selectedCategory !== 'all' || searchQuery) && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Clear All
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

            {/* Sort Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center space-x-2">
                <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Sort by:</span>
              </div>
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant={sortBy === 'name' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('name')}
                  className="text-xs"
                >
                  Name
                </Button>
                <Button
                  type="button"
                  variant={sortBy === 'category' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('category')}
                  className="text-xs"
                >
                  Category
                </Button>
                <Button
                  type="button"
                  variant={sortBy === 'popularity' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('popularity')}
                  className="text-xs"
                >
                  Popularity
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="text-xs px-2"
                >
                  {sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredDesigns.length} of {designs.length} designs
            {searchQuery && ` matching "${searchQuery}"`}
            {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
          </div>
        </div>

        {/* Design Grid */}
        {filteredDesigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredDesigns.map((design) => (
              <div
                key={design.id}
                className={`relative cursor-pointer transition-all duration-500 group touch-manipulation ${
                  selectedDesign === design.id
                    ? 'ring-2 ring-primary ring-offset-2 sm:ring-offset-4 scale-[1.02] rounded-xl shadow-2xl'
                    : 'hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]'
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
                aria-label={`Select ${design.name} design template. ${design.description}. Category: ${design.category}. Features: ${design.features.join(', ')}.`}
                aria-pressed={selectedDesign === design.id}
                aria-describedby={`design-${design.id}-description`}
              >
                <Card className={`h-full transition-all duration-500 overflow-hidden ${
                  selectedDesign === design.id
                    ? 'border-primary shadow-2xl bg-gradient-to-br from-primary/5 to-primary/10'
                    : 'hover:shadow-xl hover:border-primary/40 bg-gradient-to-br from-card to-card/95'
                }`}>
                  {/* Preview Area with Enhanced Visual Effects */}
                  <div className="relative overflow-hidden">
                    <div className="w-full h-40 sm:h-48 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                      {design.preview && design.preview !== '/api/placeholder/400/300' ? (
                        <img
                          src={design.preview}
                          alt={design.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-muted via-muted/80 to-muted/60 flex items-center justify-center relative">
                          {/* Animated background pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 animate-pulse"></div>
                          </div>

                          <div className="text-center relative z-10">
                            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 transition-all duration-500 ${
                              selectedDesign === design.id
                                ? 'bg-primary/20 scale-110'
                                : 'bg-primary/10 group-hover:bg-primary/15 group-hover:scale-105'
                            }`}>
                              <Palette className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-300 ${
                                selectedDesign === design.id ? 'text-primary' : 'text-primary/70 group-hover:text-primary'
                              }`} />
                            </div>
                            <p className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
                              selectedDesign === design.id ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                            }`}>
                              Preview
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Enhanced hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Enhanced Selection Indicator */}
                    {selectedDesign === design.id && (
                      <div className="absolute top-4 right-4 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <Check className="w-5 h-5" />
                      </div>
                    )}

                    {/* Enhanced Badges with better positioning */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {design.popular && (
                        <Badge variant="secondary" className="text-xs bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-700 border-pink-300/30 backdrop-blur-sm">
                          <Heart className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                      {design.trending && (
                        <Badge variant="secondary" className="text-xs bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 border-amber-300/30 backdrop-blur-sm">
                          <Star className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>

                    {/* Quick preview button */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add preview functionality here
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <CardContent className="p-3 sm:p-5">
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <h3 className={`font-bold text-foreground text-sm sm:text-base mb-1 sm:mb-2 transition-colors duration-300 ${
                          selectedDesign === design.id ? 'text-primary' : 'group-hover:text-primary'
                        }`}>
                          {design.name}
                        </h3>
                        <p
                          id={`design-${design.id}-description`}
                          className="text-xs sm:text-sm text-muted-foreground overflow-hidden leading-relaxed"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}
                        >
                          {design.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className={`text-xs transition-all duration-300 ${
                            selectedDesign === design.id
                              ? 'border-primary text-primary bg-primary/10'
                              : 'group-hover:border-primary/50 group-hover:text-primary'
                          }`}
                        >
                          {design.category}
                        </Badge>
                        <div className="flex space-x-1.5">
                          {design.colors.slice(0, 3).map((color, index) => (
                            <div
                              key={index}
                              className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                                selectedDesign === design.id
                                  ? 'border-primary/50 scale-110'
                                  : 'border-border/50 group-hover:border-primary/30 group-hover:scale-105'
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                          {design.colors.length > 3 && (
                            <div className="text-xs text-muted-foreground flex items-center">
                              +{design.colors.length - 3}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Eye className="w-4 h-4 mr-2" />
                          <span>{design.features.length} features</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Click to select
                        </div>
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

        {/* Compact Info Section */}
        {selectedDesign && (
          <Card className="bg-primary/5 border-primary/20">
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
    </OnboardingLayout>
  );
}
