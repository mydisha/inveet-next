import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';

interface WeddingLocationProps {
  user?: {
    id: number;
    name: string;
    email: string;
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
                Wedding Location & Venue 📍
              </h1>
              <p className="text-lg text-gray-600">
                Tell us about your wedding venue and ceremony details
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                    ✓
                  </div>
                  <span className="ml-2 text-sm font-medium text-primary">Couple Info</span>
                </div>
                <div className="w-16 h-1 bg-primary rounded"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <span className="ml-2 text-sm font-medium text-primary">Location</span>
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
                  <MapPin className="h-6 w-6 text-primary mr-2" />
                  Venue Information
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Where will your special day take place?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Venue Details */}
                  <div className="space-y-4">
                    <div className="flex items-center mb-4">
                      <MapPin className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">Venue Details</h3>
                    </div>

                    <div>
                      <Label htmlFor="venue_name" className="text-sm font-medium text-gray-700">
                        Venue Name *
                      </Label>
                      <Input
                        id="venue_name"
                        type="text"
                        value={data.venue_name}
                        onChange={(e) => setData('venue_name', e.target.value)}
                        className="mt-1"
                        placeholder="e.g., Grand Ballroom Hotel, Garden Venue"
                        required
                      />
                      {errors.venue_name && (
                        <p className="mt-1 text-sm text-red-600">{errors.venue_name}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="venue_address" className="text-sm font-medium text-gray-700">
                        Full Address *
                      </Label>
                      <Textarea
                        id="venue_address"
                        value={data.venue_address}
                        onChange={(e) => setData('venue_address', e.target.value)}
                        className="mt-1"
                        placeholder="Enter the complete venue address"
                        rows={3}
                        required
                      />
                      {errors.venue_address && (
                        <p className="mt-1 text-sm text-red-600">{errors.venue_address}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="venue_city" className="text-sm font-medium text-gray-700">
                          City *
                        </Label>
                        <Input
                          id="venue_city"
                          type="text"
                          value={data.venue_city}
                          onChange={(e) => setData('venue_city', e.target.value)}
                          className="mt-1"
                          placeholder="Jakarta"
                          required
                        />
                        {errors.venue_city && (
                          <p className="mt-1 text-sm text-red-600">{errors.venue_city}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="venue_province" className="text-sm font-medium text-gray-700">
                          Province *
                        </Label>
                        <Input
                          id="venue_province"
                          type="text"
                          value={data.venue_province}
                          onChange={(e) => setData('venue_province', e.target.value)}
                          className="mt-1"
                          placeholder="DKI Jakarta"
                          required
                        />
                        {errors.venue_province && (
                          <p className="mt-1 text-sm text-red-600">{errors.venue_province}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="venue_postal_code" className="text-sm font-medium text-gray-700">
                          Postal Code
                        </Label>
                        <Input
                          id="venue_postal_code"
                          type="text"
                          value={data.venue_postal_code}
                          onChange={(e) => setData('venue_postal_code', e.target.value)}
                          className="mt-1"
                          placeholder="12345"
                        />
                        {errors.venue_postal_code && (
                          <p className="mt-1 text-sm text-red-600">{errors.venue_postal_code}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="venue_phone" className="text-sm font-medium text-gray-700">
                        Venue Contact Number
                      </Label>
                      <Input
                        id="venue_phone"
                        type="tel"
                        value={data.venue_phone}
                        onChange={(e) => setData('venue_phone', e.target.value)}
                        className="mt-1"
                        placeholder="+62 21 1234 5678"
                      />
                      {errors.venue_phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.venue_phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Ceremony & Reception Times */}
                  <div className="space-y-4">
                    <div className="flex items-center mb-4">
                      <Clock className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">Ceremony & Reception Times</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ceremony_time" className="text-sm font-medium text-gray-700">
                          Ceremony Time *
                        </Label>
                        <Input
                          id="ceremony_time"
                          type="time"
                          value={data.ceremony_time}
                          onChange={(e) => setData('ceremony_time', e.target.value)}
                          className="mt-1"
                          required
                        />
                        {errors.ceremony_time && (
                          <p className="mt-1 text-sm text-red-600">{errors.ceremony_time}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="reception_time" className="text-sm font-medium text-gray-700">
                          Reception Time *
                        </Label>
                        <Input
                          id="reception_time"
                          type="time"
                          value={data.reception_time}
                          onChange={(e) => setData('reception_time', e.target.value)}
                          className="mt-1"
                          required
                        />
                        {errors.reception_time && (
                          <p className="mt-1 text-sm text-red-600">{errors.reception_time}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <div className="flex items-center mb-4">
                      <Calendar className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
                    </div>

                    <div>
                      <Label htmlFor="venue_description" className="text-sm font-medium text-gray-700">
                        Venue Description
                      </Label>
                      <Textarea
                        id="venue_description"
                        value={data.venue_description}
                        onChange={(e) => setData('venue_description', e.target.value)}
                        className="mt-1"
                        placeholder="Describe the venue, its features, or any special details..."
                        rows={3}
                      />
                      {errors.venue_description && (
                        <p className="mt-1 text-sm text-red-600">{errors.venue_description}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="venue_notes" className="text-sm font-medium text-gray-700">
                        Special Notes
                      </Label>
                      <Textarea
                        id="venue_notes"
                        value={data.venue_notes}
                        onChange={(e) => setData('venue_notes', e.target.value)}
                        className="mt-1"
                        placeholder="Any special instructions, parking info, or notes for guests..."
                        rows={2}
                      />
                      {errors.venue_notes && (
                        <p className="mt-1 text-sm text-red-600">{errors.venue_notes}</p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between pt-6">
                    <Link
                      href="/onboarding/couple-info"
                      className="flex items-center px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
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
