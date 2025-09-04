import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import { ONBOARDING_STEPS } from '@/components/onboarding/OnboardingProgress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { Building, Calendar, Camera, Clock, Heart, Instagram, Mail, MapPin as MapIcon, MapPin, Navigation, Phone, RotateCw, Search, User, Users, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';

// Google Maps API type declarations
declare global {
  interface Window {
    google: any;
  }
}

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
  const [groomPhoto, setGroomPhoto] = useState<File | null>(null);
  const [bridePhoto, setBridePhoto] = useState<File | null>(null);
  const [groomPhotoPreview, setGroomPhotoPreview] = useState<string>('');
  const [bridePhotoPreview, setBridePhotoPreview] = useState<string>('');
  const [showCropper, setShowCropper] = useState(false);
  const [cropperImage, setCropperImage] = useState<string>('');
  const [cropperType, setCropperType] = useState<'groom' | 'bride'>('groom');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const groomPhotoRef = useRef<HTMLInputElement>(null);
  const bridePhotoRef = useRef<HTMLInputElement>(null);

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setMapLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  const { data, setData, post, processing, errors } = useForm({
    // Groom Information
    groom_name: '',
    groom_nickname: '',
    groom_email: '',
    groom_phone: '',
    groom_instagram: '',
    groom_father_name: '',
    groom_mother_name: '',

    // Bride Information
    bride_name: '',
    bride_nickname: '',
    bride_email: '',
    bride_phone: '',
    bride_instagram: '',
    bride_father_name: '',
    bride_mother_name: '',

    // Wedding Information
    couple_phone: '',
    wedding_date: '',

    // Venue Information
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

  const handlePhotoUpload = (file: File, type: 'groom' | 'bride') => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCropperImage(result);
        setCropperType(type);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getCroppedImg = async (imageSrc: string, pixelCrop: any, rotation = 0): Promise<string> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return '';
    }

    const maxSize = 300;
    canvas.width = maxSize;
    canvas.height = maxSize;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      maxSize,
      maxSize
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `${cropperType}-photo.jpg`, { type: 'image/jpeg' });
          if (cropperType === 'groom') {
            setGroomPhoto(file);
          } else {
            setBridePhoto(file);
          }
        }
        resolve(canvas.toDataURL('image/jpeg', 0.9));
      }, 'image/jpeg', 0.9);
    });
  };

  const handleCropComplete = async () => {
    if (croppedAreaPixels) {
      try {
        const croppedImageUrl = await getCroppedImg(cropperImage, croppedAreaPixels, rotation);

        if (cropperType === 'groom') {
          setGroomPhotoPreview(croppedImageUrl);
        } else {
          setBridePhotoPreview(croppedImageUrl);
        }
      } catch (error) {
        console.error('Error cropping image:', error);
      }
    }
    setShowCropper(false);
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setCropperImage('');
  };

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

    // Initialize map with selected place
    if (mapLoaded && mapRef.current && place.geometry) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: place.geometry.location,
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      new window.google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
      });
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      if (window.google && window.google.maps) {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        const request = {
          query: searchQuery,
          fields: ['place_id', 'name', 'formatted_address', 'geometry', 'address_components', 'formatted_phone_number']
        };

        service.textSearch(request, (results: any, status: any) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            setSearchResults(results.slice(0, 5));
            setShowSearchResults(true);
          }
        });
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Client-side only - no backend submission
    console.log('Form data:', data);
    alert('Form completed! (This is a demo - no data was saved)');
    // Navigate to next step
    window.location.href = '/onboarding/design-selection';
  };

  const nextStep = () => {
    if (step === 1) {
      setStep(3); // Skip step 2, go directly to step 3 (Wedding Location)
    } else if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step === 3) {
      setStep(1); // Go back to step 1 from step 3
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Couple Information';
      case 2: return 'Wedding Details';
      case 3: return 'Wedding Location & Details';
      default: return 'Couple Information';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1: return 'Tell us about both the groom and bride';
      case 2: return 'Wedding date and contact information';
      case 3: return 'Find your venue and set wedding details';
      default: return 'Let\'s gather information about the happy couple';
    }
  };

  return (
    <OnboardingLayout
      title="Couple Information"
      description={getStepDescription()}
      icon={step === 1 ? Users : Heart}
      steps={ONBOARDING_STEPS.main}
      currentStep="couple-info"
      user={user}
      onSubmit={step < 3 ? nextStep : handleSubmit}
      submitLabel={step < 3 ? "Next" : "Continue to Design"}
      isSubmitting={processing}
      showBackButton={step > 1}
      onBackClick={step > 1 ? prevStep : undefined}
      maxWidth="6xl"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
                {step === 1 && (
                  <div className="space-y-8">
                    {/* Groom Information Section */}
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                        {/* Groom Photo */}
                        <div className="text-center flex-shrink-0">
                          <Label className="text-lg font-medium mb-4 block">Groom Photo</Label>
                          <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group"
                                 onClick={() => groomPhotoRef.current?.click()}>
                              {groomPhotoPreview ? (
                                <div className="relative w-full h-full">
                                  <img src={groomPhotoPreview} alt="Groom preview" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Camera className="w-6 h-6 text-white" />
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                  <p className="text-xs text-muted-foreground">Upload Photo</p>
                                </div>
                              )}
                            </div>
                            <input
                              ref={groomPhotoRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handlePhotoUpload(file, 'groom');
                              }}
                            />
                          </div>
                          <div className="mt-3">
                            <h4 className="font-semibold text-foreground">{data.groom_name || 'Groom Name'}</h4>
                            <p className="text-sm text-muted-foreground">Mempelai Pria</p>
                          </div>
                        </div>

                        <div className="flex-1 w-full">
                          <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">Groom Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="groom_name" className="flex items-center mb-2">
                                <User className="w-4 h-4 mr-2" />
                                Full Name *
                              </Label>
                              <Input
                                id="groom_name"
                                type="text"
                                value={data.groom_name}
                                onChange={(e) => setData('groom_name', e.target.value)}
                                placeholder="Enter groom's full name"
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                              {errors.groom_name && (
                                <p className="text-sm text-destructive mt-1">{errors.groom_name}</p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="groom_nickname" className="flex items-center mb-2">
                                <Heart className="w-4 h-4 mr-2" />
                                Nickname
                              </Label>
                              <Input
                                id="groom_nickname"
                                type="text"
                                value={data.groom_nickname}
                                onChange={(e) => setData('groom_nickname', e.target.value)}
                                placeholder="What should we call you?"
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                              {errors.groom_nickname && (
                                <p className="text-sm text-destructive mt-1">{errors.groom_nickname}</p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="groom_email" className="flex items-center mb-2">
                                <Mail className="w-4 h-4 mr-2" />
                                Email Address *
                              </Label>
                              <Input
                                id="groom_email"
                                type="email"
                                value={data.groom_email}
                                onChange={(e) => setData('groom_email', e.target.value)}
                                placeholder="groom@example.com"
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                              {errors.groom_email && (
                                <p className="text-sm text-destructive mt-1">{errors.groom_email}</p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="groom_phone" className="flex items-center mb-2">
                                <Phone className="w-4 h-4 mr-2" />
                                Phone Number
                              </Label>
                              <Input
                                id="groom_phone"
                                type="tel"
                                value={data.groom_phone}
                                onChange={(e) => setData('groom_phone', e.target.value)}
                                placeholder="+1 (555) 123-4567"
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                              {errors.groom_phone && (
                                <p className="text-sm text-destructive mt-1">{errors.groom_phone}</p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="groom_instagram" className="flex items-center mb-2">
                                <Instagram className="w-4 h-4 mr-2" />
                                Instagram
                              </Label>
                              <Input
                                id="groom_instagram"
                                type="text"
                                value={data.groom_instagram}
                                onChange={(e) => setData('groom_instagram', e.target.value)}
                                placeholder="@groom_username"
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                              {errors.groom_instagram && (
                                <p className="text-sm text-destructive mt-1">{errors.groom_instagram}</p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="groom_father_name" className="flex items-center mb-2">
                                <Users className="w-4 h-4 mr-2" />
                                Father's Name
                              </Label>
                              <Input
                                id="groom_father_name"
                                type="text"
                                value={data.groom_father_name}
                                onChange={(e) => setData('groom_father_name', e.target.value)}
                                placeholder="Father's full name"
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                              {errors.groom_father_name && (
                                <p className="text-sm text-destructive mt-1">{errors.groom_father_name}</p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="groom_mother_name" className="flex items-center mb-2">
                                <Users className="w-4 h-4 mr-2" />
                                Mother's Name
                              </Label>
                              <Input
                                id="groom_mother_name"
                                type="text"
                                value={data.groom_mother_name}
                                onChange={(e) => setData('groom_mother_name', e.target.value)}
                                placeholder="Mother's full name"
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                              {errors.groom_mother_name && (
                                <p className="text-sm text-destructive mt-1">{errors.groom_mother_name}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bride Information Section */}
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                        {/* Bride Photo */}
                        <div className="text-center flex-shrink-0">
                          <Label className="text-lg font-medium mb-4 block">Bride Photo</Label>
                          <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group"
                                 onClick={() => bridePhotoRef.current?.click()}>
                              {bridePhotoPreview ? (
                                <div className="relative w-full h-full">
                                  <img src={bridePhotoPreview} alt="Bride preview" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Camera className="w-6 h-6 text-white" />
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                  <p className="text-xs text-muted-foreground">Upload Photo</p>
                                </div>
                              )}
                            </div>
                            <input
                              ref={bridePhotoRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handlePhotoUpload(file, 'bride');
                              }}
                            />
                          </div>
                          <div className="mt-3">
                            <h4 className="font-semibold text-foreground">{data.bride_name || 'Bride Name'}</h4>
                            <p className="text-sm text-muted-foreground">Mempelai Wanita</p>
                          </div>
                        </div>

                        <div className="flex-1 w-full">
                          <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">Bride Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="bride_name" className="flex items-center mb-2">
                                <User className="w-4 h-4 mr-2" />
                                Full Name *
                              </Label>
                              <Input
                                id="bride_name"
                                type="text"
                                value={data.bride_name}
                                onChange={(e) => setData('bride_name', e.target.value)}
                                placeholder="Enter bride's full name"
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                              {errors.bride_name && (
                                <p className="text-sm text-destructive mt-1">{errors.bride_name}</p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="bride_nickname" className="flex items-center mb-2">
                                <Heart className="w-4 h-4 mr-2" />
                                Nickname
                              </Label>
                              <Input
                                id="bride_nickname"
                                type="text"
                                value={data.bride_nickname}
                                onChange={(e) => setData('bride_nickname', e.target.value)}
                                placeholder="What should we call you?"
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                              {errors.bride_nickname && (
                                <p className="text-sm text-destructive mt-1">{errors.bride_nickname}</p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="bride_email" className="flex items-center mb-2">
                                <Mail className="w-4 h-4 mr-2" />
                                Email Address *
                              </Label>
                              <Input
                                id="bride_email"
                                type="email"
                                value={data.bride_email}
                                onChange={(e) => setData('bride_email', e.target.value)}
                                placeholder="bride@example.com"
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                              {errors.bride_email && (
                                <p className="text-sm text-destructive mt-1">{errors.bride_email}</p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="bride_phone" className="flex items-center mb-2">
                                <Phone className="w-4 h-4 mr-2" />
                                Phone Number
                              </Label>
                              <Input
                                id="bride_phone"
                                type="tel"
                                value={data.bride_phone}
                                onChange={(e) => setData('bride_phone', e.target.value)}
                                placeholder="+1 (555) 123-4567"
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                              {errors.bride_phone && (
                                <p className="text-sm text-destructive mt-1">{errors.bride_phone}</p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="bride_instagram" className="flex items-center mb-2">
                                <Instagram className="w-4 h-4 mr-2" />
                                Instagram
                              </Label>
                              <Input
                                id="bride_instagram"
                                type="text"
                                value={data.bride_instagram}
                                onChange={(e) => setData('bride_instagram', e.target.value)}
                                placeholder="@bride_username"
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                              {errors.bride_instagram && (
                                <p className="text-sm text-destructive mt-1">{errors.bride_instagram}</p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="bride_father_name" className="flex items-center mb-2">
                                <Users className="w-4 h-4 mr-2" />
                                Father's Name
                              </Label>
                              <Input
                                id="bride_father_name"
                                type="text"
                                value={data.bride_father_name}
                                onChange={(e) => setData('bride_father_name', e.target.value)}
                                placeholder="Father's full name"
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                              {errors.bride_father_name && (
                                <p className="text-sm text-destructive mt-1">{errors.bride_father_name}</p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="bride_mother_name" className="flex items-center mb-2">
                                <Users className="w-4 h-4 mr-2" />
                                Mother's Name
                              </Label>
                              <Input
                                id="bride_mother_name"
                                type="text"
                                value={data.bride_mother_name}
                                onChange={(e) => setData('bride_mother_name', e.target.value)}
                                placeholder="Mother's full name"
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                              {errors.bride_mother_name && (
                                <p className="text-sm text-destructive mt-1">{errors.bride_mother_name}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="wedding_date" className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 mr-2" />
                          Wedding Date *
                        </Label>
                        <Input
                          id="wedding_date"
                          type="date"
                          value={data.wedding_date}
                          onChange={(e) => setData('wedding_date', e.target.value)}
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        />
                        {errors.wedding_date && (
                          <p className="text-sm text-destructive mt-1">{errors.wedding_date}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="couple_phone" className="flex items-center mb-2">
                          <Phone className="w-4 h-4 mr-2" />
                          Couple Contact Phone
                        </Label>
                        <Input
                          id="couple_phone"
                          type="tel"
                          value={data.couple_phone}
                          onChange={(e) => setData('couple_phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        />
                        {errors.couple_phone && (
                          <p className="text-sm text-destructive mt-1">{errors.couple_phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    {/* Wedding Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Wedding Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="wedding_date" className="flex items-center mb-2">
                            <Calendar className="w-4 h-4 mr-2" />
                            Wedding Date *
                          </Label>
                          <Input
                            id="wedding_date"
                            type="date"
                            value={data.wedding_date}
                            onChange={(e) => setData('wedding_date', e.target.value)}
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                          />
                          {errors.wedding_date && (
                            <p className="text-sm text-destructive mt-1">{errors.wedding_date}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="couple_phone" className="flex items-center mb-2">
                            <Phone className="w-4 h-4 mr-2" />
                            Contact Phone Number
                          </Label>
                          <Input
                            id="couple_phone"
                            type="tel"
                            value={data.couple_phone}
                            onChange={(e) => setData('couple_phone', e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                          />
                          {errors.couple_phone && (
                            <p className="text-sm text-destructive mt-1">{errors.couple_phone}</p>
                          )}
                        </div>
                      </div>
                    </div>

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
                              <MapIcon className="w-4 h-4 mr-2" />
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
                              <MapIcon className="w-4 h-4 mr-2" />
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

                    {/* Map Preview */}
                    <div className="space-y-4 pt-6 border-t border-border">
                      <h3 className="text-lg font-semibold text-foreground flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Venue Location Preview
                      </h3>

                      {selectedPlace ? (
                        <div className="space-y-4">
                          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                            <h4 className="font-semibold text-primary mb-2">Selected Venue</h4>
                            <p className="text-sm font-medium">{selectedPlace.name}</p>
                            <p className="text-xs text-muted-foreground">{selectedPlace.formatted_address}</p>
                          </div>
                          <div
                            ref={mapRef}
                            className="w-full h-64 rounded-lg border border-border bg-muted/20"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-64 rounded-lg border border-border bg-muted/20 flex items-center justify-center">
                          <div className="text-center">
                            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">Search for a venue to see it on the map</p>
                            {!mapLoaded && (
                              <p className="text-sm text-muted-foreground mt-2">Loading Google Maps...</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

      </form>

      {/* Photo Cropper Modal */}
      {showCropper && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4">
          <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[95vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
              <h3 className="text-xl font-semibold">
                Crop {cropperType === 'groom' ? "Groom's" : "Bride's"} Photo
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCropCancel}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div className="relative w-full h-80 bg-muted/20 rounded-lg overflow-hidden">
                  <Cropper
                    image={cropperImage}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    showGrid={true}
                    style={{
                      containerStyle: {
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                      },
                    }}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setRotation(rotation - 90)}
                    >
                      <RotateCw className="w-4 h-4 mr-2" />
                      Rotate Left
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setRotation(rotation + 90)}
                    >
                      <RotateCw className="w-4 h-4 mr-2" />
                      Rotate Right
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Zoom: {Math.round(zoom * 100)}%</Label>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Rotation: {rotation}°</Label>
                    <input
                      type="range"
                      min={0}
                      max={360}
                      step={1}
                      value={rotation}
                      onChange={(e) => setRotation(Number(e.target.value))}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border flex-shrink-0">
              <Button
                variant="outline"
                onClick={handleCropCancel}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCropComplete}
                className="btn-hero"
              >
                Crop & Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </OnboardingLayout>
  );
}
