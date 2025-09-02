import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import { useState } from 'react';

interface CoupleInfoProps {
  user?: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
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

      <DashboardLayout user={user || null} currentPath="/onboarding/couple-info">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Inveet! 💕
          </h1>
          <p className="text-muted-foreground">
            Let's start by gathering some information about the happy couple
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="icon-container icon-gradient-1">
                <span className="text-sm font-medium text-primary-foreground">1</span>
              </div>
              <span className="ml-2 text-sm font-medium text-foreground">Couple Info</span>
            </div>
            <div className="w-16 h-0.5 bg-muted"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="ml-2 text-sm text-muted-foreground">Location</span>
            </div>
            <div className="w-16 h-0.5 bg-muted"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="ml-2 text-sm text-muted-foreground">Design</span>
            </div>
            <div className="w-16 h-0.5 bg-muted"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                4
              </div>
              <span className="ml-2 text-sm text-muted-foreground">URL</span>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="card-elegant hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="icon-container icon-gradient-1">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">{step === 1 ? 'Groom Information' : 'Bride Information'}</CardTitle>
                  <CardDescription>
                    {step === 1
                      ? 'Tell us about the groom'
                      : 'Tell us about the bride'
                    }
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 ? (
                  <>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="groom_name">Groom's Full Name</Label>
                        <Input
                          id="groom_name"
                          type="text"
                          value={data.groom_name}
                          onChange={(e) => setData('groom_name', e.target.value)}
                          placeholder="Enter groom's full name"
                          className="mt-1"
                        />
                        {errors.groom_name && (
                          <p className="text-sm text-destructive mt-1">{errors.groom_name}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="groom_email">Groom's Email</Label>
                        <Input
                          id="groom_email"
                          type="email"
                          value={data.groom_email}
                          onChange={(e) => setData('groom_email', e.target.value)}
                          placeholder="Enter groom's email address"
                          className="mt-1"
                        />
                        {errors.groom_email && (
                          <p className="text-sm text-destructive mt-1">{errors.groom_email}</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="bride_name">Bride's Full Name</Label>
                        <Input
                          id="bride_name"
                          type="text"
                          value={data.bride_name}
                          onChange={(e) => setData('bride_name', e.target.value)}
                          placeholder="Enter bride's full name"
                          className="mt-1"
                        />
                        {errors.bride_name && (
                          <p className="text-sm text-destructive mt-1">{errors.bride_name}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="bride_email">Bride's Email</Label>
                        <Input
                          id="bride_email"
                          type="email"
                          value={data.bride_email}
                          onChange={(e) => setData('bride_email', e.target.value)}
                          placeholder="Enter bride's email address"
                          className="mt-1"
                        />
                        {errors.bride_email && (
                          <p className="text-sm text-destructive mt-1">{errors.bride_email}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="couple_phone">Contact Phone Number</Label>
                        <Input
                          id="couple_phone"
                          type="tel"
                          value={data.couple_phone}
                          onChange={(e) => setData('couple_phone', e.target.value)}
                          placeholder="Enter contact phone number"
                          className="mt-1"
                        />
                        {errors.couple_phone && (
                          <p className="text-sm text-destructive mt-1">{errors.couple_phone}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="wedding_date">Wedding Date</Label>
                        <Input
                          id="wedding_date"
                          type="date"
                          value={data.wedding_date}
                          onChange={(e) => setData('wedding_date', e.target.value)}
                          className="mt-1"
                        />
                        {errors.wedding_date && (
                          <p className="text-sm text-destructive mt-1">{errors.wedding_date}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <div className="flex justify-between pt-6">
                  <div>
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="flex items-center"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    {step < 2 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center"
                      >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={processing}
                        className="flex items-center"
                      >
                        {processing ? 'Saving...' : 'Continue to Location'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Need help? Contact our support team
            </p>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
