import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import { ONBOARDING_STEPS } from '@/components/onboarding/OnboardingProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Link } from '@inertiajs/react';
import { CheckCircle, Gift, Globe, Heart, Search, Share2, Star, Users } from 'lucide-react';
import { useState } from 'react';

export default function Activation() {
  const [howDidYouHear, setHowDidYouHear] = useState('');
  const [otherSource, setOtherSource] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const discoverySources = [
    {
      id: 'social-media',
      label: 'Social Media',
      description: 'Facebook, Instagram, TikTok, or other social platforms',
      icon: Share2
    },
    {
      id: 'search-engine',
      label: 'Search Engine',
      description: 'Google, Bing, or other search engines',
      icon: Search
    },
    {
      id: 'friend-family',
      label: 'Friend or Family',
      description: 'Recommended by someone I know',
      icon: Users
    },
    {
      id: 'wedding-vendor',
      label: 'Wedding Vendor',
      description: 'Suggested by photographer, planner, or venue',
      icon: Heart
    },
    {
      id: 'online-ad',
      label: 'Online Advertisement',
      description: 'Saw an ad on a website or app',
      icon: Globe
    },
    {
      id: 'wedding-blog',
      label: 'Wedding Blog/Website',
      description: 'Found on a wedding planning website',
      icon: Star
    },
    {
      id: 'other',
      label: 'Other',
      description: 'Another way not listed above',
      icon: Gift
    }
  ];

  const handleActivation = async () => {
    if (!howDidYouHear) return;

    setIsActivating(true);

    // Simulate activation process
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsActivating(false);
    setIsActivated(true);
  };

  if (isActivated) {
    return (
      <div className="min-h-screen bg-wedding-gradient flex items-center justify-center p-6">
        <div className="w-full max-w-2xl text-center">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardContent className="p-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                🎉 Congratulations!
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                Your wedding invitation has been successfully created and activated!
              </p>

              <div className="bg-gradient-to-r from-rose-gold/10 to-peach/10 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Your Invitation is Live!
                </h2>
                <div className="bg-white rounded-lg p-4 border border-rose-gold">
                  <span className="text-xl font-mono text-rose-gold">
                    https://sarah-michael.inveet.id
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-soft-pink/20 rounded-lg">
                  <Users className="w-8 h-8 text-rose-gold mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">Share with Guests</h3>
                  <p className="text-sm text-gray-600">Send your beautiful invitation to family and friends</p>
                </div>

                <div className="text-center p-4 bg-sage/20 rounded-lg">
                  <Heart className="w-8 h-8 text-sage mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800">Customize Further</h3>
                  <p className="text-sm text-gray-600">Add more photos, update details, or change design</p>
                </div>
              </div>

              <div className="space-y-4">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full bg-rose-gold hover:bg-rose-gold/90 text-white">
                    Go to Dashboard
                  </Button>
                </Link>

                <Button variant="outline" size="lg" className="w-full border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Your Invitation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <OnboardingLayout
      title="Almost There! ✨"
      description="Just one more question to help us improve, then your beautiful wedding invitation will be ready to share with the world."
      icon={Heart}
      steps={ONBOARDING_STEPS.alternative}
      currentStep="activation"
      user={null}
      onSubmit={handleActivation}
      submitLabel={isActivating ? "Activating Your Invitation..." : "Activate My Wedding Invitation"}
      isSubmitting={isActivating}
      showBackButton={true}
      onBackClick={() => window.location.href = '/onboarding/design-selection'}
      maxWidth="4xl"
    >

        <div className="grid gap-8">
          {/* How Did You Hear Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-800">
                How did you hear about Inveet?
              </h3>
              <p className="text-gray-600">
                Your feedback helps us reach more couples and improve our service
              </p>
            </div>
            <div className="space-y-6">
              <RadioGroup value={howDidYouHear} onValueChange={setHowDidYouHear}>
                <div className="grid gap-4">
                  {discoverySources.map((source) => (
                    <div key={source.id} className="flex items-start space-x-3">
                      <RadioGroupItem value={source.id} id={source.id} className="mt-1" />
                      <Label
                        htmlFor={source.id}
                        className="flex-1 cursor-pointer p-4 border-2 border-gray-200 rounded-lg hover:border-rose-gold/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-rose-gold/10 rounded-full flex items-center justify-center">
                            <source.icon className="w-5 h-5 text-rose-gold" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{source.label}</div>
                            <div className="text-sm text-gray-600">{source.description}</div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {/* Other Source Input */}
              {howDidYouHear === 'other' && (
                <div className="space-y-2">
                  <Label htmlFor="otherSource" className="text-gray-700 font-medium">
                    Please specify how you heard about us
                  </Label>
                  <Textarea
                    id="otherSource"
                    value={otherSource}
                    onChange={(e) => setOtherSource(e.target.value)}
                    placeholder="Tell us how you discovered Inveet..."
                    rows={3}
                    className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20 resize-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Summary Section */}
          <div className="space-y-6 bg-gradient-to-r from-soft-pink/10 to-sage/10 p-6 rounded-lg">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-800">
                Your Wedding Invitation Summary
              </h3>
              <p className="text-gray-600">
                Here's what you've created so far
              </p>
            </div>
            <div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Couple Information</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Wedding Details & Venue</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Custom URL: sarah-michael.inveet.id</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Design Template Selected</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">What's Next?</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Activate your invitation</li>
                    <li>• Share with your guests</li>
                    <li>• Customize further if needed</li>
                    <li>• Track RSVPs and views</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Activation Benefits */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-800">
                What You'll Get
              </h3>
            </div>
            <div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-soft-pink/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-8 h-8 text-rose-gold" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Live Website</h3>
                  <p className="text-sm text-gray-600">Your invitation goes live immediately with a beautiful, mobile-friendly design</p>
                </div>

                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-sage" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Guest Management</h3>
                  <p className="text-sm text-gray-600">Track RSVPs, send reminders, and manage your guest list easily</p>
                </div>

                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-lavender/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-8 h-8 text-lavender" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Premium Support</h3>
                  <p className="text-sm text-gray-600">Get help whenever you need it with our dedicated support team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </OnboardingLayout>
  );
}
