import DashboardLayout from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { ArrowLeft, ArrowRight, ArrowUpDown, Check, Eye, Filter, Heart, Palette, Search, SortAsc, SortDesc, Sparkles, Star, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface Theme {
  id: number;
  name: string;
  description: string;
  slug: string;
  category: string;
  colors: string[];
  features: string[];
  preview_image_url?: string;
  is_popular?: boolean;
  is_trending?: boolean;
  is_recommended?: boolean;
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
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch themes from API
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/themes/active');
        if (response.data.success) {
          setThemes(response.data.data);
        } else {
          setError('Failed to load themes');
        }
      } catch (err) {

        setError('Failed to load themes');
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  const handleContinue = () => {
    if (!selectedDesign) return;
    // Navigate to the next step - you can customize this based on your flow
    window.location.href = '/onboarding/wedding-url';
  };

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(themes.map(theme => theme.category).filter(category => category !== null)));
    return [
      { id: 'all', name: 'All Designs', count: themes.length },
      ...uniqueCategories.map(category => ({
        id: category.toLowerCase(),
        name: category,
        count: themes.filter(theme => theme.category === category).length
      }))
    ];
  }, [themes]);

  // Filter and sort themes based on selected category, search query, and sort options
  const filteredThemes = useMemo(() => {
    let filtered = themes;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(theme =>
        theme.category && theme.category.toLowerCase() === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(theme =>
        theme.name.toLowerCase().includes(query) ||
        theme.description.toLowerCase().includes(query) ||
        (theme.category && theme.category.toLowerCase().includes(query)) ||
        (theme.features && theme.features.some(feature => feature.toLowerCase().includes(query)))
      );
    }

    // Sort themes
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'category':
          comparison = (a.category || '').localeCompare(b.category || '');
          break;
        case 'popularity':
          // Sort by popularity (popular first, then trending, then recommended, then others)
          const aScore = (a.is_popular ? 4 : 0) + (a.is_trending ? 3 : 0) + (a.is_recommended ? 2 : 0) + 1;
          const bScore = (b.is_popular ? 4 : 0) + (b.is_trending ? 3 : 0) + (b.is_recommended ? 2 : 0) + 1;
          comparison = bScore - aScore;
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [themes, selectedCategory, searchQuery, sortBy, sortOrder]);

  if (loading) {
    return (
      <>
        <Head title="Design Selection" />
        <DashboardLayout user={user || null} currentPath="/design-selection">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground font-inter-normal">Loading themes...</p>
            </div>
          </div>
        </DashboardLayout>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head title="Design Selection" />
        <DashboardLayout user={user || null} currentPath="/design-selection">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Error Loading Themes</h3>
              <p className="text-muted-foreground text-sm mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                size="sm"
              >
                Try Again
              </Button>
            </div>
          </div>
        </DashboardLayout>
      </>
    );
  }

  return (
    <>
      <Head title="Design Selection" />

      <DashboardLayout user={user || null} currentPath="/design-selection">
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

        <div className="max-w-7xl mx-auto px-4">
          {/* Search and Filter Controls */}
          <div className="mb-8 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search themes by name, description, or features..."
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
              Showing {filteredThemes.length} of {themes.length} themes
              {searchQuery && ` matching "${searchQuery}"`}
              {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
            </div>
          </div>

          {/* Theme Grid */}
          {filteredThemes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {filteredThemes.map((theme) => (
                <div
                  key={theme.id}
                  className={`relative cursor-pointer transition-all duration-300 group ${
                    selectedDesign === theme.slug
                      ? 'ring-2 ring-primary ring-offset-2 scale-105 rounded-lg'
                      : 'hover:scale-105'
                  }`}
                  onClick={() => setSelectedDesign(theme.slug)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedDesign(theme.slug);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Select ${theme.name} design template`}
                  aria-pressed={selectedDesign === theme.slug}
                >
                  <Card className={`h-full transition-all duration-300 ${
                    selectedDesign === theme.slug
                      ? 'border-primary shadow-xl bg-primary/5'
                      : 'hover:shadow-lg hover:border-primary/30'
                  }`}>
                    {/* Preview Area */}
                    <div className="relative">
                      <div className="w-full h-40 bg-gradient-to-br from-muted to-muted/50 rounded-t-lg flex items-center justify-center overflow-hidden">
                        {theme.preview_image_url ? (
                          <img
                            src={theme.preview_image_url}
                            alt={theme.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Palette className="w-8 h-8 text-primary" />
                            </div>
                            <p className="text-xs text-muted-foreground font-medium">Preview</p>
                          </div>
                        )}
                      </div>

                      {/* Selection Indicator */}
                      {selectedDesign === theme.slug && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg">
                          <Check className="w-4 h-4" />
                        </div>
                      )}

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-1">
                        {theme.is_popular && (
                          <Badge variant="secondary" className="text-xs bg-accent/20 text-accent-foreground border-accent/30">
                            <Heart className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                        {theme.is_trending && (
                          <Badge variant="secondary" className="text-xs bg-warm/20 text-warm-foreground border-warm/30">
                            <Star className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                        {theme.is_recommended && (
                          <Badge variant="secondary" className="text-xs bg-primary/20 text-primary border-primary/30">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Recommended
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-foreground text-sm mb-1">{theme.name}</h3>
                          <p className="text-xs text-muted-foreground overflow-hidden" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>{theme.description}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {theme.category || 'Uncategorized'}
                          </Badge>
                          <div className="flex space-x-1">
                            {theme.colors && theme.colors.length > 0 ? (
                              theme.colors.slice(0, 3).map((color, index) => (
                                <div
                                  key={index}
                                  className="w-3 h-3 rounded-full border border-border/50"
                                  style={{ backgroundColor: color }}
                                />
                              ))
                            ) : (
                              <div className="text-xs text-muted-foreground">No colors</div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center text-xs text-muted-foreground">
                          <Eye className="w-3 h-3 mr-1" />
                          <span>{theme.features ? theme.features.length : 0} features included</span>
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
              <h3 className="text-lg font-medium text-foreground mb-2">No themes found</h3>
              <p className="text-muted-foreground text-sm mb-4">
                No themes match the selected category. Try a different filter.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className="flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Show All Themes
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border/50">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" size="sm" className="flex items-center w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>

            <Button
              type="button"
              onClick={handleContinue}
              disabled={!selectedDesign || filteredThemes.length === 0}
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
