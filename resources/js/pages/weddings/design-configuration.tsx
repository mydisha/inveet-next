import DashboardPage from '@/components/dashboard/DashboardPage';
import StandardFormLayout from '@/components/dashboard/StandardFormLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Head } from '@inertiajs/react';
import {
    Check,
    Eye,
    Filter,
    Heart,
    Image as ImageIcon,
    Palette,
    Save,
    Sparkles,
    Star,
    Upload,
    X
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import ApiService from '../../services/api';

interface Theme {
  id: number;
  name: string;
  description: string;
  slug: string;
  is_active: boolean;
  preview_image?: string;
  preview_image_url?: string;
  is_public?: boolean;
  images?: Array<{
    id: number;
    image_path: string;
    alt_text?: string;
  }>;
  packages?: Array<{
    id: number;
    name: string;
  }>;
}

interface DesignTemplate {
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

interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  description: string;
}

interface DesignConfigurationProps {
  user?: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
  wedding?: {
    id: number;
    title: string;
    slug: string;
    cover_image?: string;
    theme_id?: number;
    color_palette?: string;
  } | null;
}

export default function DesignConfiguration({ user, wedding }: DesignConfigurationProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPalette, setSelectedPalette] = useState<string>('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>(wedding?.cover_image || '');
  const [isSaving, setIsSaving] = useState(false);
  const [showCustomPalette, setShowCustomPalette] = useState(false);
  const [customColors, setCustomColors] = useState<string[]>(['#8B4513', '#DAA520', '#F5F5DC', '#FFFFFF']);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch themes from API
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        console.log('🎨 Design Configuration: Fetching themes from API...');
        setLoading(true);
        setError(null);

        // Try direct fetch first to debug
        const directResponse = await fetch('/api/themes/active?limit=12');
        const directData = await directResponse.json();
        console.log('🎨 Design Configuration: Direct fetch response:', directData);

        if (directData.success && directData.data) {
          console.log('🎨 Design Configuration: Themes loaded successfully:', directData.data.length, 'themes');
          setThemes(directData.data);
        } else {
          console.error('🎨 Design Configuration: Direct fetch failed:', directData);
          setError('Failed to load themes');
        }
      } catch (err) {
        console.error('🎨 Design Configuration: Error fetching themes:', err);
        setError(`Failed to load themes: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  // Convert themes to design templates format for compatibility
  const designTemplates: DesignTemplate[] = themes.map(theme => {
    console.log('🎨 Design Configuration: Converting theme:', theme);
    return {
      id: theme.id.toString(),
      name: theme.name,
      category: theme.name.split(' ')[0] || 'General',
      description: theme.description,
      preview: theme.preview_image_url || '/api/placeholder/400/300',
      features: [
        'Responsive design',
        'Customizable colors',
        'Modern layout',
        'Mobile optimized'
      ],
      colors: ['#8B4513', '#DAA520', '#F5F5DC', '#FFFFFF'], // Default colors
      popular: theme.is_active,
      trending: false
    };
  });

  console.log('🎨 Design Configuration: Converted design templates:', designTemplates);

  // Fallback design templates if no themes are loaded
  const fallbackDesignTemplates: DesignTemplate[] = [
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
    }
  ];

  const colorPalettes: ColorPalette[] = [
    {
      id: 'classic-gold',
      name: 'Classic Gold',
      colors: ['#8B4513', '#DAA520', '#F5F5DC', '#FFFFFF'],
      description: 'Elegant gold and brown tones for traditional weddings'
    },
    {
      id: 'romantic-pink',
      name: 'Romantic Pink',
      colors: ['#E91E63', '#F8BBD9', '#FFF8E1', '#FFFFFF'],
      description: 'Soft pink and cream for romantic celebrations'
    },
    {
      id: 'modern-navy',
      name: 'Modern Navy',
      colors: ['#2C3E50', '#E74C3C', '#ECF0F1', '#FFFFFF'],
      description: 'Contemporary navy and red for modern couples'
    },
    {
      id: 'rustic-earth',
      name: 'Rustic Earth',
      colors: ['#8D6E63', '#A1887F', '#EFEBE9', '#FFFFFF'],
      description: 'Natural earth tones for rustic celebrations'
    },
    {
      id: 'tropical-vibrant',
      name: 'Tropical Vibrant',
      colors: ['#4CAF50', '#FF9800', '#E1F5FE', '#FFFFFF'],
      description: 'Bright tropical colors for destination weddings'
    },
    {
      id: 'vintage-muted',
      name: 'Vintage Muted',
      colors: ['#5D4037', '#BCAAA4', '#F3E5F5', '#FFFFFF'],
      description: 'Muted vintage tones for classic elegance'
    }
  ];

  // Use themes if available, otherwise fallback to hardcoded templates
  // Only use fallback if we're still loading or if there's an error AND no themes
  const templatesToUse = themes.length > 0 ? designTemplates : fallbackDesignTemplates;

  // Debug logging
  console.log('🎨 Design Configuration: State:', {
    loading,
    error,
    themesCount: themes.length,
    usingApiData: !loading && !error && themes.length > 0,
    templatesCount: templatesToUse.length
  });

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(templatesToUse.map(template => template.category)));
    return [
      { id: 'all', name: 'All Designs', count: templatesToUse.length },
      ...uniqueCategories.map(category => ({
        id: category.toLowerCase(),
        name: category,
        count: templatesToUse.filter(template => template.category === category).length
      }))
    ];
  }, [templatesToUse]);

  // Filter templates based on selected category
  const filteredTemplates = useMemo(() => {
    if (selectedCategory === 'all') {
      return templatesToUse;
    }
    return templatesToUse.filter(template =>
      template.category.toLowerCase() === selectedCategory
    );
  }, [templatesToUse, selectedCategory]);

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomPaletteClick = () => {
    setShowCustomPalette(true);
    setSelectedPalette('custom');
  };

  const handleCustomColorChange = (index: number, color: string) => {
    const newColors = [...customColors];
    newColors[index] = color;
    setCustomColors(newColors);
  };

  const handleSaveCustomPalette = () => {
    // Here you would typically save the custom palette to the backend
    console.log('Custom palette saved:', customColors);
    setShowCustomPalette(false);
  };

  const handleCancelCustomPalette = () => {
    setShowCustomPalette(false);
    setSelectedPalette('');
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Here you would typically make an API call to save the design configuration
      // For now, we'll just simulate the save
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message or redirect
      console.log('Design configuration saved:', {
        template: selectedTemplate,
        palette: selectedPalette,
        customColors: selectedPalette === 'custom' ? customColors : null,
        coverImage: coverImage
      });
    } catch (error) {
      console.error('Error saving design configuration:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Head title="Design Configuration" />

      <DashboardPage
        title={`${wedding?.title || 'Wedding'} - Design Configuration`}
        user={user || null}
        currentPath={`/weddings/${wedding?.id}/design-configuration`}
      >
        <StandardFormLayout
          title="Design Configuration"
          backHref={`/wedding/${wedding?.id}`}
          backLabel="Kembali ke Detail Pernikahan"
          icon={Palette}
          maxWidth="7xl"
        >

        <Tabs defaultValue="cover" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cover" className="flex items-center">
                <ImageIcon className="w-4 h-4 mr-2" />
                Cover Image
              </TabsTrigger>
              <TabsTrigger value="template" className="flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Design Template
              </TabsTrigger>
              <TabsTrigger value="colors" className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Color Palette
              </TabsTrigger>
            </TabsList>

            {/* Cover Image Tab */}
            <TabsContent value="cover" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2" />
                    Wedding Cover Image
                  </CardTitle>
                  <CardDescription>
                    Upload a beautiful cover image for your wedding invitation. This will be the first thing your guests see.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Cover Preview */}
                  {coverPreview && (
                    <div className="space-y-4">
                      <Label>Current Cover</Label>
                      <div className="relative w-full max-w-md mx-auto">
                        <div className="aspect-[4/3] rounded-lg overflow-hidden border border-border">
                          <img
                            src={coverPreview}
                            alt="Wedding cover preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setCoverPreview('');
                            setCoverImage(null);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Upload Section */}
                  <div className="space-y-4">
                    <Label htmlFor="cover-upload">Upload New Cover Image</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      <input
                        id="cover-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="hidden"
                      />
                      <label htmlFor="cover-upload" className="cursor-pointer">
                        <div className="space-y-4">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <Upload className="w-8 h-8 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Cover Guidelines */}
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm mb-2">Cover Image Guidelines</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Recommended size: 1200x800 pixels (4:3 aspect ratio)</li>
                        <li>• High resolution images work best</li>
                        <li>• Avoid text-heavy images as they may be hard to read</li>
                        <li>• Consider how the image will look on mobile devices</li>
                      </ul>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Design Template Tab */}
            <TabsContent value="template" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    Design Template
                  </CardTitle>
                  <CardDescription>
                    Choose from our collection of beautiful wedding invitation templates.
                    {themes.length > 0 && (
                      <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {themes.length} themes from database
                      </span>
                    )}
                    {themes.length === 0 && !loading && (
                      <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Using sample templates
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Category Filter */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
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

                  <Separator />

                  {/* Debug Info */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="text-sm text-blue-800">
                        <strong>Debug Info:</strong>
                        <br />• Loading: {loading ? 'Yes' : 'No'}
                        <br />• Error: {error || 'None'}
                        <br />• Themes from API: {themes.length}
                        <br />• Using API Data: {themes.length > 0 ? 'Yes' : 'No'}
                        <br />• Total Templates: {templatesToUse.length}
                        <br />
                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={async () => {
                              console.log('🧪 Manual API test...');
                              try {
                                const response = await ApiService.getActiveThemes();
                                console.log('🧪 Manual API response:', response);
                              } catch (err) {
                                console.error('🧪 Manual API error:', err);
                              }
                            }}
                          >
                            Test API Call
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={async () => {
                              console.log('🧪 Direct fetch test...');
                              try {
                                        const response = await fetch('/api/themes/active?limit=12');
        const data = await response.json();
                                console.log('🧪 Direct fetch response:', data);
                              } catch (err) {
                                console.error('🧪 Direct fetch error:', err);
                              }
                            }}
                          >
                            Test Direct Fetch
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Template Grid */}
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading themes...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <X className="w-8 h-8 text-red-500" />
                      </div>
                      <h3 className="text-lg font-medium text-foreground mb-2">Error loading themes</h3>
                      <p className="text-muted-foreground text-sm mb-4">{error}</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.reload()}
                        className="flex items-center"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Try Again
                      </Button>
                    </div>
                  ) : filteredTemplates.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredTemplates.map((template) => (
                        <div
                          key={template.id}
                                                  className={`relative cursor-pointer transition-all duration-300 group ${
                          selectedTemplate === template.id
                            ? 'ring-2 ring-primary ring-offset-2 scale-105 rounded-lg'
                            : 'hover:scale-105'
                        }`}
                          onClick={() => setSelectedTemplate(template.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelectedTemplate(template.id);
                            }
                          }}
                          tabIndex={0}
                          role="button"
                          aria-label={`Select ${template.name} design template`}
                          aria-pressed={selectedTemplate === template.id}
                        >
                          <Card className={`h-full transition-all duration-300 ${
                            selectedTemplate === template.id
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
                              {selectedTemplate === template.id && (
                                <div className="absolute top-3 right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg">
                                  <Check className="w-4 h-4" />
                                </div>
                              )}

                              {/* Badges */}
                              <div className="absolute top-3 left-3 flex gap-1">
                                {template.popular && (
                                  <Badge variant="secondary" className="text-xs bg-accent/20 text-accent-foreground border-accent/30">
                                    <Heart className="w-3 h-3 mr-1" />
                                    Popular
                                  </Badge>
                                )}
                                {template.trending && (
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
                                  <h3 className="font-semibold text-foreground text-sm mb-1">{template.name}</h3>
                                  <p className="text-xs text-muted-foreground overflow-hidden" style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical'
                                  }}>{template.description}</p>
                                </div>

                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className="text-xs">
                                    {template.category}
                                  </Badge>
                                  <div className="flex space-x-1">
                                    {template.colors.slice(0, 3).map((color, index) => (
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
                                  <span>{template.features.length} features included</span>
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
                      <h3 className="text-lg font-medium text-foreground mb-2">No templates found</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        No templates match the selected category. Try a different filter.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCategory('all')}
                        className="flex items-center"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Show All Templates
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Color Palette Tab */}
            <TabsContent value="colors" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Color Palette
                  </CardTitle>
                  <CardDescription>
                    Choose a color palette that matches your wedding theme and personal style.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {colorPalettes.map((palette) => (
                      <div
                        key={palette.id}
                        className={`relative cursor-pointer transition-all duration-300 group ${
                          selectedPalette === palette.id
                            ? 'ring-2 ring-primary ring-offset-2 scale-105 rounded-lg'
                            : 'hover:scale-105'
                        }`}
                        onClick={() => setSelectedPalette(palette.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedPalette(palette.id);
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={`Select ${palette.name} color palette`}
                        aria-pressed={selectedPalette === palette.id}
                      >
                        <Card className={`h-full transition-all duration-300 ${
                          selectedPalette === palette.id
                            ? 'border-primary shadow-xl bg-primary/5'
                            : 'hover:shadow-lg hover:border-primary/30'
                        }`}>
                          <CardContent className="p-4">
                            <div className="space-y-4">
                              {/* Color Swatches */}
                              <div className="flex space-x-2">
                                {palette.colors.map((color, index) => (
                                  <div
                                    key={index}
                                    className="flex-1 h-12 rounded-md border border-border/50"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>

                              {/* Palette Info */}
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-semibold text-foreground text-sm">{palette.name}</h3>
                                  {selectedPalette === palette.id && (
                                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                                      <Check className="w-4 h-4" />
                                    </div>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {palette.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>

                  {/* Custom Color Palette Option */}
                  <Card className={`border-dashed border-2 border-border hover:border-primary/50 transition-colors ${
                    selectedPalette === 'custom' ? 'ring-2 ring-primary ring-offset-2 rounded-lg' : ''
                  }`}>
                    <CardContent className="p-6 text-center">
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                          <Palette className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Custom Color Palette</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Create your own unique color combination
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCustomPaletteClick}
                          >
                            Create Custom Palette
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Custom Color Palette Modal */}
          {showCustomPalette && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={handleCancelCustomPalette}
            >
              <Card
                className="w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    Create Custom Color Palette
                  </CardTitle>
                  <CardDescription>
                    Choose your own colors for your wedding invitation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Color Inputs */}
                  <div className="space-y-4">
                    {customColors.map((color, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="flex-1">
                          <Label htmlFor={`color-${index}`} className="text-sm font-medium">
                            Color {index + 1}
                          </Label>
                          <div className="flex items-center space-x-3 mt-1">
                            <input
                              id={`color-${index}`}
                              type="color"
                              value={color}
                              onChange={(e) => handleCustomColorChange(index, e.target.value)}
                              className="w-12 h-10 rounded border border-border cursor-pointer"
                            />
                            <Input
                              type="text"
                              value={color}
                              onChange={(e) => handleCustomColorChange(index, e.target.value)}
                              className="flex-1 font-mono text-sm"
                              placeholder="#000000"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Color Preview */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Preview</Label>
                    <div className="flex space-x-2">
                      {customColors.map((color, index) => (
                        <div
                          key={index}
                          className="flex-1 h-12 rounded-md border border-border/50"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={handleCancelCustomPalette}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveCustomPalette}
                      className="flex-1"
                    >
                      Save Palette
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-hero flex items-center"
              size="lg"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Design Configuration
                </>
              )}
            </Button>
          </div>

          {/* Preview Section */}
          {(selectedTemplate || selectedPalette || coverPreview) && (
            <Card className="mt-6 bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Eye className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Design Preview</h4>
                    <p className="text-xs text-muted-foreground">
                      Your design configuration is ready. Click "Save" to apply changes to your wedding invitation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </StandardFormLayout>
      </DashboardPage>
    </>
  );
}
