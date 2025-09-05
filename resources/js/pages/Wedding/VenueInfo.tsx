import DashboardPage from '@/components/dashboard/DashboardPage';
import StandardFormLayout, { StandardFormSection, StandardInput, StandardTextarea } from '@/components/dashboard/StandardFormLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import {
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

  // Load Google Maps API with error handling
  useEffect(() => {
    const loadGoogleMaps = () => {
      try {
        if (window.google && window.google.maps) {
          setMapLoaded(true);
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => setMapLoaded(true);
        script.onerror = () => {

          setMapLoaded(false);
        };
        document.head.appendChild(script);
      } catch (error) {

        setMapLoaded(false);
      }
    };

    loadGoogleMaps();
  }, []);

  // Initialize map when loaded and data is available with error handling
  useEffect(() => {
    try {
      if (mapLoaded && mapRef.current && data.venue_latitude && data.venue_longitude && window.google && window.google.maps) {
        const lat = parseFloat(data.venue_latitude);
        const lng = parseFloat(data.venue_longitude);

        if (!isNaN(lat) && !isNaN(lng)) {
          const mapOptions = {
            center: { lat, lng },
            zoom: 15,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          };

          mapInstance.current = new window.google.maps.Map(mapRef.current, mapOptions);

          // Add marker
          markerInstance.current = new window.google.maps.Marker({
            position: { lat, lng },
            map: mapInstance.current,
            title: data.venue_name || 'Wedding Venue',
            animation: window.google.maps.Animation.DROP
          });

          // Add info window
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div class="p-2">
                <h3 class="font-semibold text-gray-900">${data.venue_name || 'Wedding Venue'}</h3>
                <p class="text-sm text-gray-600">${data.venue_address || ''}</p>
              </div>
            `
          });

          markerInstance.current.addListener('click', () => {
            infoWindow.open(mapInstance.current, markerInstance.current);
          });
        }
      }
    } catch (error) {

    }
  }, [mapLoaded, data.venue_latitude, data.venue_longitude, data.venue_name, data.venue_address]);

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

      <StandardFormLayout
        title="Lokasi & Waktu"
        backHref={`/wedding/${wedding.id}`}
        backLabel="Kembali ke Detail Pernikahan"
        onSubmit={handleSubmit}
        submitLabel="Simpan Perubahan"
        isSubmitting={processing}
        icon={MapPin}
        maxWidth="6xl"
      >

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
        <StandardFormSection
          title="Informasi Venue"
          description="Detail lokasi dan informasi venue pernikahan"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StandardInput
              label="Nama Venue"
              id="venue_name"
              value={data.venue_name}
              onChange={(value) => setData('venue_name', value)}
              placeholder="Nama venue atau tempat"
              required
              error={errors.venue_name}
            />

            <StandardInput
              label="Nomor Telepon"
              id="venue_phone"
              value={data.venue_phone}
              onChange={(value) => setData('venue_phone', value)}
              placeholder="Nomor telepon venue"
            />
          </div>

          <StandardTextarea
            label="Alamat Lengkap"
            id="venue_address"
            value={data.venue_address}
            onChange={(value) => setData('venue_address', value)}
            placeholder="Alamat lengkap venue"
            rows={3}
            required
            error={errors.venue_address}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StandardInput
              label="Kota"
              id="venue_city"
              value={data.venue_city}
              onChange={(value) => setData('venue_city', value)}
              placeholder="Kota"
            />

            <StandardInput
              label="Provinsi"
              id="venue_province"
              value={data.venue_province}
              onChange={(value) => setData('venue_province', value)}
              placeholder="Provinsi"
            />

            <StandardInput
              label="Kode Pos"
              id="venue_postal_code"
              value={data.venue_postal_code}
              onChange={(value) => setData('venue_postal_code', value)}
              placeholder="Kode pos"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StandardInput
              label="Waktu Akad Nikah"
              id="ceremony_time"
              type="time"
              value={data.ceremony_time}
              onChange={(value) => setData('ceremony_time', value)}
            />

            <StandardInput
              label="Waktu Resepsi"
              id="reception_time"
              type="time"
              value={data.reception_time}
              onChange={(value) => setData('reception_time', value)}
            />
          </div>

          <StandardTextarea
            label="Deskripsi Venue"
            id="venue_description"
            value={data.venue_description}
            onChange={(value) => setData('venue_description', value)}
            placeholder="Deskripsi singkat tentang venue"
            rows={3}
          />

          <StandardTextarea
            label="Catatan Tambahan"
            id="venue_notes"
            value={data.venue_notes}
            onChange={(value) => setData('venue_notes', value)}
            placeholder="Catatan tambahan untuk tamu (parkir, dress code, dll)"
            rows={3}
          />
        </StandardFormSection>

                {/* Google Maps */}
        {data.venue_latitude && data.venue_longitude && (
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
                      try {
                        const lat = parseFloat(data.venue_latitude);
                        const lng = parseFloat(data.venue_longitude);
                        if (!isNaN(lat) && !isNaN(lng)) {
                          window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
                        }
                      } catch (error) {

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
      </StandardFormLayout>
    </DashboardPage>
  );
}
