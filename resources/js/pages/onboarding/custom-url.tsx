import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Heart, ArrowLeft, ArrowRight, Link as LinkIcon, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CustomUrl() {
  const [urlSlug, setUrlSlug] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Mock suggestions based on common wedding patterns
  const generateSuggestions = (names: string[]) => {
    const suggestions = [];
    if (names[0] && names[1]) {
      suggestions.push(
        `${names[0].toLowerCase()}-${names[1].toLowerCase()}`,
        `${names[0].toLowerCase()}-and-${names[1].toLowerCase()}`,
        `${names[0].toLowerCase()}${names[1].toLowerCase()}`,
        `${names[0].toLowerCase()}-${names[1].toLowerCase()}-wedding`,
        `${names[0].toLowerCase()}-${names[1].toLowerCase()}-2024`
      );
    }
    return suggestions;
  };

  useEffect(() => {
    // Generate suggestions when component mounts
    const names = ['Sarah', 'Michael']; // This would come from previous step
    setSuggestions(generateSuggestions(names));
  }, []);

  const checkAvailability = async (slug: string) => {
    if (!slug) {
      setIsAvailable(null);
      return;
    }

    setIsChecking(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock availability check - in real app this would call your API
    const mockUnavailable = ['sarah-michael', 'wedding', 'love', 'bride', 'groom'];
    const available = !mockUnavailable.includes(slug.toLowerCase());
    
    setIsAvailable(available);
    setIsChecking(false);
  };

  const handleSlugChange = (value: string) => {
    const cleanSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '') // Only allow letters, numbers, and hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
    
    setUrlSlug(cleanSlug);
    
    if (cleanSlug.length >= 3) {
      checkAvailability(cleanSlug);
    } else {
      setIsAvailable(null);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setUrlSlug(suggestion);
    checkAvailability(suggestion);
  };

  const getStatusIcon = () => {
    if (isChecking) {
      return <div className="w-5 h-5 border-2 border-rose-gold border-t-transparent rounded-full animate-spin" />;
    }
    if (isAvailable === true) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    if (isAvailable === false) {
      return <XCircle className="w-5 h-5 text-red-500" />;
    }
    return null;
  };

  const getStatusText = () => {
    if (isChecking) return 'Checking availability...';
    if (isAvailable === true) return 'Available!';
    if (isAvailable === false) return 'Already taken';
    return '';
  };

  const getStatusColor = () => {
    if (isAvailable === true) return 'text-green-600';
    if (isAvailable === false) return 'text-red-600';
    return 'text-gray-500';
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
          <div className="inline-flex items-center space-x-2 bg-lavender/20 px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">🔗</span>
            <span className="text-lavender font-medium">Step 3 of 5</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Choose Your Invitation URL
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pick a unique web address for your wedding invitation. This is how your guests will find your special page.
          </p>
        </div>

        <div className="grid gap-8">
          {/* URL Input Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <LinkIcon className="w-6 h-6 text-rose-gold" />
                <span>Your Invitation URL</span>
              </CardTitle>
              <CardDescription>
                Choose a memorable and easy-to-remember web address for your wedding invitation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="urlSlug" className="text-gray-700 font-medium">
                  Custom URL *
                </Label>
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <Input
                      id="urlSlug"
                      value={urlSlug}
                      onChange={(e) => handleSlugChange(e.target.value)}
                      placeholder="e.g., sarah-michael"
                      className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20 text-lg"
                      maxLength={50}
                    />
                  </div>
                  <div className="text-gray-500 text-lg font-mono">
                    .inveet.id
                  </div>
                </div>
                
                {/* Status Display */}
                {urlSlug && (
                  <div className="flex items-center space-x-2 mt-2">
                    {getStatusIcon()}
                    <span className={`text-sm font-medium ${getStatusColor()}`}>
                      {getStatusText()}
                    </span>
                  </div>
                )}

                {/* Character count */}
                <div className="text-right">
                  <span className={`text-sm ${urlSlug.length > 40 ? 'text-red-500' : 'text-gray-500'}`}>
                    {urlSlug.length}/50 characters
                  </span>
                </div>
              </div>

              {/* Preview */}
              {urlSlug && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <Label className="text-gray-700 font-medium mb-2 block">Preview:</Label>
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <span className="text-blue-600 font-mono">
                      https://{urlSlug}.inveet.id
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* URL Suggestions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-rose-gold" />
                <span>Suggested URLs</span>
              </CardTitle>
              <CardDescription>
                Here are some great options based on your names. Click any suggestion to use it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => selectSuggestion(suggestion)}
                    className="flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg hover:border-rose-gold hover:bg-rose-gold/5 transition-colors text-left"
                  >
                    <div>
                      <span className="font-mono text-gray-800">
                        {suggestion}.inveet.id
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        Based on your names
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white"
                    >
                      Use This
                    </Button>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* URL Guidelines */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-soft-pink/10 to-sage/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                URL Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 text-green-600">✅ Do's</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Use 3-30 characters</li>
                    <li>• Include your names or initials</li>
                    <li>• Use hyphens to separate words</li>
                    <li>• Make it easy to remember</li>
                    <li>• Keep it wedding-themed</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 text-red-600">❌ Don'ts</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Use spaces or special characters</li>
                    <li>• Make it too long or complicated</li>
                    <li>• Use generic terms like "wedding"</li>
                    <li>• Include numbers unless meaningful</li>
                    <li>• Use offensive or inappropriate words</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Popular Examples */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                Popular URL Examples
              </CardTitle>
              <CardDescription>
                See how other couples have created their invitation URLs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  'sarah-michael',
                  'john-and-jane',
                  'alex-loves-sam',
                  'david-maria-2024',
                  'chris-kim-wedding',
                  'mike-sarah-forever'
                ].map((example, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-mono text-sm text-gray-600">
                      {example}.inveet.id
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12">
          <Link href="/onboarding/wedding-details">
            <Button variant="outline" size="lg" className="border-gray-300 text-gray-600 hover:border-rose-gold hover:text-rose-gold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Wedding Details
            </Button>
          </Link>
          
          <Link href="/onboarding/design-selection">
            <Button 
              size="lg" 
              className="bg-rose-gold hover:bg-rose-gold/90 text-white px-8"
              disabled={!urlSlug || isAvailable !== true}
            >
              Continue to Design Selection
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
