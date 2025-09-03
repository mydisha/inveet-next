import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, CheckCircle, Heart, Link as LinkIcon, Sparkles, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CustomUrl() {
  const [urlSlug, setUrlSlug] = useState('');
  const [fullUrl, setFullUrl] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Mock suggestions based on common wedding patterns
  const generateSuggestions = (names: string[]) => {
    const suggestions = [];
    if (names[0] && names[1]) {
      suggestions.push(
        `${names[0].toLowerCase()}-${names[1].toLowerCase()}.inveet.id`,
        `${names[0].toLowerCase()}-and-${names[1].toLowerCase()}.inveet.id`,
        `${names[0].toLowerCase()}${names[1].toLowerCase()}.inveet.id`,
        `${names[0].toLowerCase()}-${names[1].toLowerCase()}-wedding.inveet.id`,
        `${names[0].toLowerCase()}-${names[1].toLowerCase()}-2024.inveet.id`
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

  const handleUrlChange = (value: string) => {
    // Extract slug from full subdomain format
    let cleanUrl = value.toLowerCase();

    // Remove .inveet.id if present
    if (cleanUrl.endsWith('.inveet.id')) {
      cleanUrl = cleanUrl.replace('.inveet.id', '');
    }

    // Clean the slug part
    const cleanSlug = cleanUrl
      .replace(/[^a-z0-9-]/g, '') // Only allow letters, numbers, and hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

    // Create full subdomain
    const fullSubdomain = cleanSlug ? `${cleanSlug}.inveet.id` : '';

    setUrlSlug(cleanSlug);
    setFullUrl(fullSubdomain);

    if (cleanSlug.length >= 3) {
      checkAvailability(cleanSlug);
    } else {
      setIsAvailable(null);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    // Extract slug from full subdomain
    const slug = suggestion.replace('.inveet.id', '');
    setUrlSlug(slug);
    setFullUrl(suggestion);
    checkAvailability(slug);
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
          {/* Clickable Progress Steps */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            {/* Step 1 - Couple Info */}
            <a href="/onboarding/couple-info" className="flex items-center group">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 group-hover:bg-primary/20 group-hover:text-primary cursor-pointer">
                1
              </div>
              <span className="ml-2 text-sm text-muted-foreground hidden sm:block group-hover:text-primary transition-colors duration-200">Info</span>
            </a>

            <div className="w-12 h-0.5 bg-primary"></div>

            {/* Step 2 - Wedding Location */}
            <a href="/onboarding/wedding-location" className="flex items-center group">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 group-hover:bg-primary/20 group-hover:text-primary cursor-pointer">
                2
              </div>
              <span className="ml-2 text-sm text-muted-foreground hidden sm:block group-hover:text-primary transition-colors duration-200">Location</span>
            </a>

            <div className="w-12 h-0.5 bg-primary"></div>

            {/* Step 3 - Design Selection */}
            <a href="/onboarding/design-selection" className="flex items-center group">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 group-hover:bg-primary/20 group-hover:text-primary cursor-pointer">
                3
              </div>
              <span className="ml-2 text-sm text-muted-foreground hidden sm:block group-hover:text-primary transition-colors duration-200">Design</span>
            </a>

            <div className="w-12 h-0.5 bg-primary"></div>

            {/* Step 4 - Wedding URL (Current) */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                4
              </div>
              <span className="ml-2 text-sm font-medium text-foreground hidden sm:block">URL</span>
            </div>

            <div className="w-12 h-0.5 bg-muted"></div>

            {/* Step 5 - Activation */}
            <a href="/onboarding/activation" className="flex items-center group">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 group-hover:bg-primary/20 group-hover:text-primary cursor-pointer">
                5
              </div>
              <span className="ml-2 text-sm text-muted-foreground hidden sm:block group-hover:text-primary transition-colors duration-200">Activate</span>
            </a>
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
                <div className="flex-1">
                  <Input
                    id="urlSlug"
                    value={fullUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="e.g., sarah-michael.inveet.id"
                    className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20 text-lg font-mono"
                    maxLength={60}
                  />
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
                  <span className={`text-sm ${fullUrl.length > 50 ? 'text-red-500' : 'text-gray-500'}`}>
                    {fullUrl.length}/60 characters
                  </span>
                </div>
              </div>

              {/* Preview */}
              {fullUrl && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <Label className="text-gray-700 font-medium mb-2 block">Preview:</Label>
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <span className="text-blue-600 font-mono">
                      https://{fullUrl}
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
                        {suggestion}
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
                  'sarah-michael.inveet.id',
                  'john-and-jane.inveet.id',
                  'alex-loves-sam.inveet.id',
                  'david-maria-2024.inveet.id',
                  'chris-kim-wedding.inveet.id',
                  'mike-sarah-forever.inveet.id'
                ].map((example, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-mono text-sm text-gray-600">
                      {example}
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
              disabled={!fullUrl || isAvailable !== true}
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
