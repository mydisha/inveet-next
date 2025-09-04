import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import { ONBOARDING_STEPS } from '@/components/onboarding/OnboardingProgress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Link as LinkIcon, Sparkles, XCircle } from 'lucide-react';
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
    <OnboardingLayout
      title="Choose Your Invitation URL"
      description="Pick a unique web address for your wedding invitation. This is how your guests will find your special page."
      icon={LinkIcon}
      steps={ONBOARDING_STEPS.alternative}
      currentStep="custom-url"
      user={null}
      onSubmit={() => window.location.href = '/onboarding/design-selection'}
      submitLabel="Continue to Design Selection"
      showBackButton={true}
      onBackClick={() => window.location.href = '/onboarding/wedding-details'}
      maxWidth="4xl"
    >

        <div className="grid gap-8">
          {/* URL Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <LinkIcon className="w-6 h-6 text-rose-gold" />
                <span>Your Invitation URL</span>
              </h3>
              <p className="text-gray-600">
                Choose a memorable and easy-to-remember web address for your wedding invitation
              </p>
            </div>
            <div className="space-y-6">
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
            </div>
          </div>

          {/* URL Suggestions */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-rose-gold" />
                <span>Suggested URLs</span>
              </h3>
              <p className="text-gray-600">
                Here are some great options based on your names. Click any suggestion to use it.
              </p>
            </div>
            <div>
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
            </div>
          </div>

          {/* URL Guidelines */}
          <div className="space-y-6 bg-gradient-to-r from-soft-pink/10 to-sage/10 p-6 rounded-lg">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-800">
                URL Guidelines
              </h3>
            </div>
            <div>
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
            </div>
          </div>

          {/* Popular Examples */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-800">
                Popular URL Examples
              </h3>
              <p className="text-gray-600">
                See how other couples have created their invitation URLs
              </p>
            </div>
            <div>
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
            </div>
          </div>
        </div>
    </OnboardingLayout>
  );
}
