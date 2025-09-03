import DashboardPage from '@/components/dashboard/DashboardPage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    MapPin,
    Navigation
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  hasWedding: boolean;
}

interface WeddingVenueProps {
  user: User | null;
  wedding: {
    id: number;
    couple_name_1: string;
    couple_name_2: string;
    slug: string;
    wedding_start?: string;
    wedding_end?: string;
    details?: Array<{
      key: string;
      value: string;
    }>;
  };
}

export default function VenueInfo({ user, wedding }: WeddingVenueProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerInstance = useRef<any>(null);

  // Extract venue data from wedding details
  const getVenueData = () => {
    const details = wedding.details || [];
    return {
      venue_name: details.find(d => d.key === 'venue_name')?.value || '',
      venue_address: details.find(d => d.key === 'venue_address')?.value || '',
      venue_city: details.find(d => d.key === 'venue_city')?.value || '',
      venue_province: details.find(d => d.key === 'venue_province')?.value || '',
      venue_postal_code: details.find(d => d.key === 'venue_postal_code')?.value || '',
      venue_phone: details.find(d => d.key === 'venue_phone')?.value || '',
      ceremony_time: details.find(d => d.key === 'ceremony_time')?.value || '',
      reception_time: details.find(d => d.key === 'reception_time')?.value || '',
      venue_description: details.find(d => d.key === 'venue_description')?.value || '',
      venue_notes: details.find(d => d.key === 'venue_notes')?.value || '',
      venue_latitude: details.find(d => d.key === 'venue_latitude')?.value || '',
      venue_longitude: details.find(d => d.key === 'venue_longitude')?.value || '',
    };
  };

  const initialData = getVenueData();

  const { data, setData, put, processing, errors, reset } = useForm({
    venue_name: initialData.venue_name,
    venue_address: initialData.venue_address,
    venue_city: initialData.venue_city,
    venue_province: initialData.venue_province,
    venue_postal_code: initialData.venue_postal_code,
    venue_phone: initialData.venue_phone,
    ceremony_time: initialData.ceremony_time,
    reception_time: initialData.reception_time,
    venue_description: initialData.venue_description,
    venue_notes: initialData.venue_notes,
    venue_latitude: initialData.venue_latitude,
    venue_longitude: initialData.venue_longitude,
  });

  // Load Google Maps API - TEMPORARILY DISABLED
  // useEffect(() => {
  //   const loadGoogleMaps = () => {
  //     if (window.google && window.google.maps) {
  //       setMapLoaded(true);
  //       return;
  //     }

  //     const script = document.createElement('script');
  //     script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&libraries=places`;
  //     script.async = true;
  //     script.defer = true;
  //     script.onload = () => setMapLoaded(true);
  //     document.head.appendChild(script);
  //   };

  //   loadGoogleMaps();
  // }, []);

  // Initialize map when loaded and data is available - TEMPORARILY DISABLED
  // useEffect(() => {
  //   if (mapLoaded && mapRef.current && data.venue_latitude && data.venue_longitude) {
  //     const lat = parseFloat(data.venue_latitude);
  //     const lng = parseFloat(data.venue_longitude);

  //     if (!isNaN(lat) && !isNaN(lng)) {
  //       const mapOptions = {
  //         center: { lat, lng },
  //         zoom: 15,
  //         mapTypeId: window.google.maps.MapTypeId.ROADMAP,
  //         styles: [
  //           {
  //             featureType: 'poi',
  //             elementType: 'labels',
  //             stylers: [{ visibility: 'off' }]
  //           }
  //         ]
  //       };

  //       mapInstance.current = new window.google.maps.Map(mapRef.current, mapOptions);

  //       // Add marker
  //       markerInstance.current = new window.google.maps.Marker({
  //         position: { lat, lng },
  //         map: mapInstance.current,
  //         title: data.venue_name || 'Wedding Venue',
  //         animation: window.google.maps.Animation.DROP
  //       });

  //       // Add info window
  //       const infoWindow = new window.google.maps.InfoWindow({
  //         content: `
  //           <div class="p-2">
  //             <h3 class="font-semibold text-gray-900">${data.venue_name || 'Wedding Venue'}</h3>
  //             <p class="text-sm text-gray-600">${data.venue_address || ''}</p>
  //           </div>
  //         `
  //       });

  //       markerInstance.current.addListener('click', () => {
  //         infoWindow.open(mapInstance.current, markerInstance.current);
  //       });
  //     }
  //   }
  // }, [mapLoaded, data.venue_latitude, data.venue_longitude, data.venue_name, data.venue_address]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/api/weddings/${wedding.id}/venue`);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Belum diatur';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return 'Belum diatur';
    return timeString;
  };

  const getFullAddress = () => {
    const parts = [
      data.venue_address,
      data.venue_city,
      data.venue_province,
      data.venue_postal_code
    ].filter(Boolean);
    return parts.join(', ');
  };

  return (
    <DashboardPage
      title={`${wedding.couple_name_1} & ${wedding.couple_name_2} - Lokasi & Waktu`}
      user={user}
      currentPath={`/wedding/${wedding.id}/location-time`}
    >
      <Head title="Lokasi & Waktu" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href={`/wedding/${wedding.id}`}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-2xl font-bold text-foreground">Lokasi & Waktu</h1>
          </div>


        </div>

        {/* Wedding Date & Time Overview */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 via-background to-primary-light/10">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Tanggal & Waktu Pernikahan</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Tanggal Pernikahan</Label>
                <p className="text-lg font-semibold text-foreground">
                  {formatDate(wedding.wedding_start)}
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Durasi Acara</Label>
                <p className="text-lg font-semibold text-foreground">
                  {wedding.wedding_start && wedding.wedding_end
                    ? `${new Date(wedding.wedding_start).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} - ${new Date(wedding.wedding_end).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`
                    : 'Belum diatur'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Venue Information */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Informasi Venue</span>
            </CardTitle>
            <CardDescription>
              Detail lokasi dan informasi venue pernikahan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="venue_name">Nama Venue *</Label>
                    <Input
                      id="venue_name"
                      value={data.venue_name}
                      onChange={(e) => setData('venue_name', e.target.value)}
                      placeholder="Nama venue atau tempat"
                      className="border-2 focus:border-primary"
                    />
                    {errors.venue_name && (
                      <p className="text-sm text-destructive">{errors.venue_name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue_phone">Nomor Telepon</Label>
                    <Input
                      id="venue_phone"
                      value={data.venue_phone}
                      onChange={(e) => setData('venue_phone', e.target.value)}
                      placeholder="Nomor telepon venue"
                      className="border-2 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue_address">Alamat Lengkap *</Label>
                  <Textarea
                    id="venue_address"
                    value={data.venue_address}
                    onChange={(e) => setData('venue_address', e.target.value)}
                    placeholder="Alamat lengkap venue"
                    rows={3}
                    className="border-2 focus:border-primary resize-none"
                  />
                  {errors.venue_address && (
                    <p className="text-sm text-destructive">{errors.venue_address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="venue_city">Kota</Label>
                    <Input
                      id="venue_city"
                      value={data.venue_city}
                      onChange={(e) => setData('venue_city', e.target.value)}
                      placeholder="Kota"
                      className="border-2 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue_province">Provinsi</Label>
                    <Input
                      id="venue_province"
                      value={data.venue_province}
                      onChange={(e) => setData('venue_province', e.target.value)}
                      placeholder="Provinsi"
                      className="border-2 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue_postal_code">Kode Pos</Label>
                    <Input
                      id="venue_postal_code"
                      value={data.venue_postal_code}
                      onChange={(e) => setData('venue_postal_code', e.target.value)}
                      placeholder="Kode pos"
                      className="border-2 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="ceremony_time">Waktu Akad Nikah</Label>
                    <Input
                      id="ceremony_time"
                      type="time"
                      value={data.ceremony_time}
                      onChange={(e) => setData('ceremony_time', e.target.value)}
                      className="border-2 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reception_time">Waktu Resepsi</Label>
                    <Input
                      id="reception_time"
                      type="time"
                      value={data.reception_time}
                      onChange={(e) => setData('reception_time', e.target.value)}
                      className="border-2 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue_description">Deskripsi Venue</Label>
                  <Textarea
                    id="venue_description"
                    value={data.venue_description}
                    onChange={(e) => setData('venue_description', e.target.value)}
                    placeholder="Deskripsi singkat tentang venue"
                    rows={3}
                    className="border-2 focus:border-primary resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue_notes">Catatan Tambahan</Label>
                  <Textarea
                    id="venue_notes"
                    value={data.venue_notes}
                    onChange={(e) => setData('venue_notes', e.target.value)}
                    placeholder="Catatan tambahan untuk tamu (parkir, dress code, dll)"
                    rows={3}
                    className="border-2 focus:border-primary resize-none"
                  />
                </div>
              </form>
          </CardContent>
        </Card>

                {/* Google Maps - TEMPORARILY DISABLED */}
        {false && data.venue_latitude && data.venue_longitude && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground flex items-center space-x-2">
                <Navigation className="w-5 h-5 text-primary" />
                <span>Lokasi di Peta</span>
              </CardTitle>
              <CardDescription>
                Peta interaktif lokasi venue pernikahan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div 
                  ref={mapRef}
                  className="w-full h-96 rounded-lg border-2 border-border bg-muted"
                  style={{ minHeight: '400px' }}
                />
                
                {!mapLoaded && (
                  <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
                    <div className="text-center space-y-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="text-sm text-muted-foreground">Memuat peta...</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Klik marker untuk informasi lebih detail
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const lat = parseFloat(data.venue_latitude);
                      const lng = parseFloat(data.venue_longitude);
                      if (!isNaN(lat) && !isNaN(lng)) {
                        window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
                      }
                    }}
                    className="flex items-center space-x-2"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Petunjuk Arah</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}


      </div>
    </DashboardPage>
  );
}
