import DashboardLayout from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageHeader from '@/components/ui/page-header';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
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
import { useMemo, useState } from 'react';

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

  const designTemplates: DesignTemplate[] = [
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

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(designTemplates.map(template => template.category)));
    return [
      { id: 'all', name: 'All Designs', count: designTemplates.length },
      ...uniqueCategories.map(category => ({
        id: category.toLowerCase(),
        name: category,
        count: designTemplates.filter(template => template.category === category).length
      }))
    ];
  }, [designTemplates]);

  // Filter templates based on selected category
  const filteredTemplates = useMemo(() => {
    if (selectedCategory === 'all') {
      return designTemplates;
    }
    return designTemplates.filter(template =>
      template.category.toLowerCase() === selectedCategory
    );
  }, [designTemplates, selectedCategory]);

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

      <DashboardLayout user={user || null} currentPath="/weddings/design-configuration">
        {/* Back Navigation */}
        <div className="mb-4">
          <Link href="/my-weddings">
            <Button variant="outline" size="sm" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Weddings
            </Button>
          </Link>
        </div>

        {/* Header */}
        <PageHeader
          icon={Palette}
          title="Design Configuration"
          description="Customize your wedding invitation design, cover image, and color palette"
        />

        <div className="max-w-7xl mx-auto">
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

                  {/* Template Grid */}
                  {filteredTemplates.length > 0 ? (
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
          <div className="flex justify-end pt-6 border-t border-border/50">
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
        </div>
      </DashboardLayout>
    </>
  );
}
