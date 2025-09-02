import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, Heart, User, Users } from 'lucide-react';
import { useState } from 'react';

interface CoupleInfoProps {
  user?: {
    id: number;
    name: string;
    email: string;
  } | null;
}

export default function CoupleInfo({ user }: CoupleInfoProps) {
  const [step, setStep] = useState(1);

  const { data, setData, post, processing, errors } = useForm({
    groom_name: '',
    groom_email: '',
    bride_name: '',
    bride_email: '',
    couple_phone: '',
    wedding_date: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/onboarding/couple-info', {
      onSuccess: () => {
        // Navigate to next step
        window.location.href = '/onboarding/wedding-location';
      },
    });
  };

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <>
      <Head title="Couple Information - Onboarding" />

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-light/10">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-primary-glow/10 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary-light/20 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <img
                  src="/inveet-logo.png"
                  alt="Inveet.Id"
                  className="h-12 w-auto"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to Inveet! 💕
              </h1>
              <p className="text-lg text-gray-600">
                Let's start by gathering some information about the happy couple
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <span className="ml-2 text-sm font-medium text-primary">Couple Info</span>
                </div>
                <div className="w-16 h-1 bg-gray-200 rounded"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-500">Location</span>
                </div>
                <div className="w-16 h-1 bg-gray-200 rounded"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-500">Design</span>
                </div>
                <div className="w-16 h-1 bg-gray-200 rounded"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-500">URL</span>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary mr-2" />
                  Couple Information
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Tell us about the bride and groom
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Groom Information */}
                  <div className="space-y-4">
                    <div className="flex items-center mb-4">
                      <User className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">Groom Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="groom_name" className="text-sm font-medium text-gray-700">
                          Groom's Full Name *
                        </Label>
                        <Input
                          id="groom_name"
                          type="text"
                          value={data.groom_name}
                          onChange={(e) => setData('groom_name', e.target.value)}
                          className="mt-1"
                          placeholder="Enter groom's full name"
                          required
                        />
                        {errors.groom_name && (
                          <p className="mt-1 text-sm text-red-600">{errors.groom_name}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="groom_email" className="text-sm font-medium text-gray-700">
                          Groom's Email *
                        </Label>
                        <Input
                          id="groom_email"
                          type="email"
                          value={data.groom_email}
                          onChange={(e) => setData('groom_email', e.target.value)}
                          className="mt-1"
                          placeholder="groom@example.com"
                          required
                        />
                        {errors.groom_email && (
                          <p className="mt-1 text-sm text-red-600">{errors.groom_email}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bride Information */}
                  <div className="space-y-4">
                    <div className="flex items-center mb-4">
                      <Heart className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">Bride Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bride_name" className="text-sm font-medium text-gray-700">
                          Bride's Full Name *
                        </Label>
                        <Input
                          id="bride_name"
                          type="text"
                          value={data.bride_name}
                          onChange={(e) => setData('bride_name', e.target.value)}
                          className="mt-1"
                          placeholder="Enter bride's full name"
                          required
                        />
                        {errors.bride_name && (
                          <p className="mt-1 text-sm text-red-600">{errors.bride_name}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="bride_email" className="text-sm font-medium text-gray-700">
                          Bride's Email *
                        </Label>
                        <Input
                          id="bride_email"
                          type="email"
                          value={data.bride_email}
                          onChange={(e) => setData('bride_email', e.target.value)}
                          className="mt-1"
                          placeholder="bride@example.com"
                          required
                        />
                        {errors.bride_email && (
                          <p className="mt-1 text-sm text-red-600">{errors.bride_email}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <div className="flex items-center mb-4">
                      <Users className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="couple_phone" className="text-sm font-medium text-gray-700">
                          Contact Phone Number
                        </Label>
                        <Input
                          id="couple_phone"
                          type="tel"
                          value={data.couple_phone}
                          onChange={(e) => setData('couple_phone', e.target.value)}
                          className="mt-1"
                          placeholder="+62 812 3456 7890"
                        />
                        {errors.couple_phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.couple_phone}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="wedding_date" className="text-sm font-medium text-gray-700">
                          Wedding Date *
                        </Label>
                        <Input
                          id="wedding_date"
                          type="date"
                          value={data.wedding_date}
                          onChange={(e) => setData('wedding_date', e.target.value)}
                          className="mt-1"
                          required
                        />
                        {errors.wedding_date && (
                          <p className="mt-1 text-sm text-red-600">{errors.wedding_date}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between pt-6">
                    <Link
                      href="/dashboard"
                      className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Skip for now
                    </Link>

                    <Button
                      type="submit"
                      disabled={processing}
                      className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-white px-8 py-2 shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      {processing ? 'Saving...' : 'Continue'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500">
                Need help? Contact our support team
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
