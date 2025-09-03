import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Building, Calendar, Clock, Map, MapPin, Navigation, Phone, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface WeddingLocationProps {
  user?: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
}

export default function WeddingLocation({ user }: WeddingLocationProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<any>(null);

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
    venue_latitude: '',
    venue_longitude: '',
  });

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setMapLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (mapLoaded && window.google) {
      const input = document.getElementById('venue_search') as HTMLInputElement;
      if (input) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(input, {
          types: ['establishment', 'geocode'],
          fields: ['place_id', 'name', 'formatted_address', 'geometry', 'address_components', 'formatted_phone_number']
        });

        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current.getPlace();
          if (place && place.place_id) {
            handlePlaceSelect(place);
          }
        });
      }
    }
  }, [mapLoaded]);

  const handlePlaceSelect = (place: any) => {
    setSelectedPlace(place);
    setShowSearchResults(false);

    // Extract address components
    const addressComponents = place.address_components || [];
    let streetNumber = '';
    let route = '';
    let city = '';
    let province = '';
    let postalCode = '';

    addressComponents.forEach((component: any) => {
      const types = component.types;
      if (types.includes('street_number')) {
        streetNumber = component.long_name;
      } else if (types.includes('route')) {
        route = component.long_name;
      } else if (types.includes('locality')) {
        city = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        province = component.long_name;
      } else if (types.includes('postal_code')) {
        postalCode = component.long_name;
      }
    });

    // Update form data
    setData('venue_name', place.name || '');
    setData('venue_address', `${streetNumber} ${route}`.trim() || place.formatted_address || '');
    setData('venue_city', city);
    setData('venue_province', province);
    setData('venue_postal_code', postalCode);
    setData('venue_phone', place.formatted_phone_number || '');
    setData('venue_latitude', place.geometry?.location?.lat()?.toString() || '');
    setData('venue_longitude', place.geometry?.location?.lng()?.toString() || '');
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      const request = {
        query: searchQuery,
        fields: ['place_id', 'name', 'formatted_address', 'geometry', 'address_components', 'formatted_phone_number']
      };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          setSearchResults(results.slice(0, 5));
          setShowSearchResults(true);
        }
      });
    } catch (error) {
      console.error('Search error:', error);
    }
  };

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
        {/* Modern Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="icon-container icon-gradient-2 mr-4">
              <MapPin className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary">
              Wedding Location
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Find and select your perfect wedding venue with our integrated map search
          </p>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="onboarding-progress-dot completed">
                <span className="text-sm font-medium text-primary-foreground">1</span>
              </div>
              <span className="ml-2 text-sm font-medium text-foreground">Couple Info</span>
            </div>
            <div className="onboarding-progress-line active w-16"></div>
            <div className="flex items-center">
              <div className="onboarding-progress-dot active">
                <span className="text-sm font-medium text-primary-foreground">2</span>
              </div>
              <span className="ml-2 text-sm font-medium text-foreground">Location</span>
            </div>
            <div className="onboarding-progress-line bg-muted w-16"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="ml-2 text-sm text-muted-foreground">Design</span>
            </div>
            <div className="w-16 h-1 bg-muted rounded-full"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                4
              </div>
              <span className="ml-2 text-sm text-muted-foreground">URL</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Venue Search and Form */}
            <div className="space-y-6">
              <Card className="card-elegant hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-3">
                    <div className="icon-container icon-gradient-2">
                      <Search className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Find Your Venue</CardTitle>
                      <CardDescription className="text-base">
                        Search for your wedding venue using Google Maps
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Venue Search */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="venue_search" className="flex items-center">
                          <Search className="w-4 h-4 mr-2" />
                          Search Venue *
                        </Label>
                        <div className="relative">
                          <Input
                            id="venue_search"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for wedding venues, hotels, or venues..."
                            className="w-full pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                          />
                          <Button
                            type="button"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={handleSearch}
                          >
                            <Search className="w-4 h-4" />
                          </Button>
                        </div>
                        {!mapLoaded && (
                          <p className="text-sm text-muted-foreground">Loading Google Maps...</p>
                        )}
                      </div>

                      {/* Search Results */}
                      {showSearchResults && searchResults.length > 0 && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Search Results:</Label>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {searchResults.map((result, index) => (
                              <div
                                key={index}
                                className="p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                                onClick={() => handlePlaceSelect(result)}
                              >
                                <div className="flex items-start space-x-3">
                                  <MapPin className="w-4 h-4 text-primary mt-0.5" />
                                  <div className="flex-1">
                                    <p className="font-medium text-sm">{result.name}</p>
                                    <p className="text-xs text-muted-foreground">{result.formatted_address}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Venue Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center">
                        <Building className="w-5 h-5 mr-2" />
                        Venue Information
                      </h3>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="venue_name" className="flex items-center mb-2">
                            <Building className="w-4 h-4 mr-2" />
                            Venue Name *
                          </Label>
                          <Input
                            id="venue_name"
                            type="text"
                            value={data.venue_name}
                            onChange={(e) => setData('venue_name', e.target.value)}
                            placeholder="e.g., Grand Ballroom Hotel"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                          />
                          {errors.venue_name && (
                            <p className="text-sm text-destructive mt-1">{errors.venue_name}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="venue_address" className="flex items-center mb-2">
                            <MapPin className="w-4 h-4 mr-2" />
                            Address *
                          </Label>
                          <Input
                            id="venue_address"
                            type="text"
                            value={data.venue_address}
                            onChange={(e) => setData('venue_address', e.target.value)}
                            placeholder="Street address"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                          />
                          {errors.venue_address && (
                            <p className="text-sm text-destructive mt-1">{errors.venue_address}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="venue_city" className="flex items-center mb-2">
                              <Map className="w-4 h-4 mr-2" />
                              City *
                            </Label>
                            <Input
                              id="venue_city"
                              type="text"
                              value={data.venue_city}
                              onChange={(e) => setData('venue_city', e.target.value)}
                              placeholder="Jakarta"
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                            />
                            {errors.venue_city && (
                              <p className="text-sm text-destructive mt-1">{errors.venue_city}</p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="venue_province" className="flex items-center mb-2">
                              <Map className="w-4 h-4 mr-2" />
                              Province *
                            </Label>
                            <Input
                              id="venue_province"
                              type="text"
                              value={data.venue_province}
                              onChange={(e) => setData('venue_province', e.target.value)}
                              placeholder="DKI Jakarta"
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                            />
                            {errors.venue_province && (
                              <p className="text-sm text-destructive mt-1">{errors.venue_province}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="venue_postal_code" className="flex items-center mb-2">
                              <MapPin className="w-4 h-4 mr-2" />
                              Postal Code
                            </Label>
                            <Input
                              id="venue_postal_code"
                              type="text"
                              value={data.venue_postal_code}
                              onChange={(e) => setData('venue_postal_code', e.target.value)}
                              placeholder="12345"
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                            />
                          </div>

                          <div>
                            <Label htmlFor="venue_phone" className="flex items-center mb-2">
                              <Phone className="w-4 h-4 mr-2" />
                              Phone Number
                            </Label>
                            <Input
                              id="venue_phone"
                              type="tel"
                              value={data.venue_phone}
                              onChange={(e) => setData('venue_phone', e.target.value)}
                              placeholder="+62 123 456 7890"
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="venue_description" className="flex items-center mb-2">
                            <Building className="w-4 h-4 mr-2" />
                            Venue Description
                          </Label>
                          <Textarea
                            id="venue_description"
                            value={data.venue_description}
                            onChange={(e) => setData('venue_description', e.target.value)}
                            placeholder="Describe the venue, special features, or any important details..."
                            className="min-h-[100px] transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Wedding Schedule */}
                    <div className="space-y-4 pt-6 border-t border-border">
                      <h3 className="text-lg font-semibold text-foreground flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Wedding Schedule
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="ceremony_time" className="flex items-center mb-2">
                            <Clock className="w-4 h-4 mr-2" />
                            Ceremony Time *
                          </Label>
                          <Input
                            id="ceremony_time"
                            type="datetime-local"
                            value={data.ceremony_time}
                            onChange={(e) => setData('ceremony_time', e.target.value)}
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                          />
                          {errors.ceremony_time && (
                            <p className="text-sm text-destructive mt-1">{errors.ceremony_time}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="reception_time" className="flex items-center mb-2">
                            <Clock className="w-4 h-4 mr-2" />
                            Reception Time
                          </Label>
                          <Input
                            id="reception_time"
                            type="datetime-local"
                            value={data.reception_time}
                            onChange={(e) => setData('reception_time', e.target.value)}
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="venue_notes" className="flex items-center mb-2">
                          <Navigation className="w-4 h-4 mr-2" />
                          Additional Notes
                        </Label>
                        <Textarea
                          id="venue_notes"
                          value={data.venue_notes}
                          onChange={(e) => setData('venue_notes', e.target.value)}
                          placeholder="Any special instructions, parking information, or other details..."
                          className="min-h-[80px] transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-8 border-t border-border">
                      <Link href="/onboarding/couple-info">
                        <Button variant="outline" className="flex items-center comfort-button">
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back
                        </Button>
                      </Link>

                      <Button
                        type="submit"
                        disabled={processing}
                        className="btn-hero flex items-center comfort-button"
                      >
                        Continue to Design
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map Display */}
            <div className="space-y-6">
              <Card className="card-elegant hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-3">
                    <div className="icon-container icon-gradient-3">
                      <Map className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Venue Location</CardTitle>
                      <CardDescription className="text-base">
                        Preview your selected venue on the map
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedPlace ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                          <h4 className="font-semibold text-primary mb-2">Selected Venue</h4>
                          <p className="text-sm font-medium">{selectedPlace.name}</p>
                          <p className="text-xs text-muted-foreground">{selectedPlace.formatted_address}</p>
                        </div>
                        <div
                          ref={mapRef}
                          className="w-full h-64 rounded-lg border border-border bg-muted/20 flex items-center justify-center"
                        >
                          <p className="text-muted-foreground">Map will be displayed here</p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-64 rounded-lg border border-border bg-muted/20 flex items-center justify-center">
                        <div className="text-center">
                          <Map className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">Search for a venue to see it on the map</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
