import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Clock, MapPin } from 'lucide-react';

interface WeddingLocationProps {
  user?: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
}

export default function WeddingLocation({ user }: WeddingLocationProps) {
  const { data, setData, post, processing, errors } = useForm({
    venue_name: '',
    venue_address: '',
    venue_city: '',
    venue_province: '',
    venue_postal_code: '',
    venue_phone: '',
    ceremony_time: '',
    reception_time: '',
    venue_description: '',
    venue_notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/onboarding/wedding-location', {
      onSuccess: () => {
        // Navigate to next step
        window.location.href = '/onboarding/design-selection';
      },
    });
  };

  return (
    <>
      <Head title="Wedding Location - Onboarding" />

      <DashboardLayout user={user || null} currentPath="/onboarding/wedding-location">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Wedding Location 📍
          </h1>
          <p className="text-muted-foreground">
            Tell us about your wedding venue and timing
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="ml-2 text-sm text-muted-foreground">Couple Info</span>
            </div>
            <div className="w-16 h-0.5 bg-primary"></div>
            <div className="flex items-center">
              <div className="icon-container icon-gradient-2">
                <span className="text-sm font-medium text-primary-foreground">2</span>
              </div>
              <span className="ml-2 text-sm font-medium text-foreground">Location</span>
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
                <div className="icon-container icon-gradient-2">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Venue Information</CardTitle>
                  <CardDescription>Tell us about your wedding venue</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Venue Details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="venue_name">Venue Name *</Label>
                      <Input
                        id="venue_name"
                        type="text"
                        value={data.venue_name}
                        onChange={(e) => setData('venue_name', e.target.value)}
                        placeholder="e.g., Grand Ballroom Hotel"
                        className="w-full"
                      />
                      {errors.venue_name && (
                        <p className="text-sm text-destructive">{errors.venue_name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="venue_phone">Venue Phone</Label>
                      <Input
                        id="venue_phone"
                        type="tel"
                        value={data.venue_phone}
                        onChange={(e) => setData('venue_phone', e.target.value)}
                        placeholder="+62 123 456 7890"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue_address">Venue Address *</Label>
                    <Input
                      id="venue_address"
                      type="text"
                      value={data.venue_address}
                      onChange={(e) => setData('venue_address', e.target.value)}
                      placeholder="Street address"
                      className="w-full"
                    />
                    {errors.venue_address && (
                      <p className="text-sm text-destructive">{errors.venue_address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="venue_city">City *</Label>
                      <Input
                        id="venue_city"
                        type="text"
                        value={data.venue_city}
                        onChange={(e) => setData('venue_city', e.target.value)}
                        placeholder="Jakarta"
                        className="w-full"
                      />
                      {errors.venue_city && (
                        <p className="text-sm text-destructive">{errors.venue_city}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="venue_province">Province *</Label>
                      <Input
                        id="venue_province"
                        type="text"
                        value={data.venue_province}
                        onChange={(e) => setData('venue_province', e.target.value)}
                        placeholder="DKI Jakarta"
                        className="w-full"
                      />
                      {errors.venue_province && (
                        <p className="text-sm text-destructive">{errors.venue_province}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="venue_postal_code">Postal Code</Label>
                      <Input
                        id="venue_postal_code"
                        type="text"
                        value={data.venue_postal_code}
                        onChange={(e) => setData('venue_postal_code', e.target.value)}
                        placeholder="12345"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue_description">Venue Description</Label>
                    <Textarea
                      id="venue_description"
                      value={data.venue_description}
                      onChange={(e) => setData('venue_description', e.target.value)}
                      placeholder="Describe the venue, special features, or any important details..."
                      className="w-full min-h-[100px]"
                    />
                  </div>
                </div>

                {/* Wedding Times */}
                <div className="space-y-4 pt-6 border-t">
                  <div className="flex items-center space-x-2 mb-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-medium text-foreground">Wedding Schedule</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ceremony_time">Ceremony Time *</Label>
                      <Input
                        id="ceremony_time"
                        type="datetime-local"
                        value={data.ceremony_time}
                        onChange={(e) => setData('ceremony_time', e.target.value)}
                        className="w-full"
                      />
                      {errors.ceremony_time && (
                        <p className="text-sm text-destructive">{errors.ceremony_time}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reception_time">Reception Time</Label>
                      <Input
                        id="reception_time"
                        type="datetime-local"
                        value={data.reception_time}
                        onChange={(e) => setData('reception_time', e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue_notes">Additional Notes</Label>
                    <Textarea
                      id="venue_notes"
                      value={data.venue_notes}
                      onChange={(e) => setData('venue_notes', e.target.value)}
                      placeholder="Any special instructions, parking information, or other details..."
                      className="w-full min-h-[80px]"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6">
                  <Link href="/onboarding/couple-info">
                    <Button variant="outline" className="flex items-center">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  </Link>

                  <Button
                    type="submit"
                    disabled={processing}
                    className="btn-hero flex items-center"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
}
