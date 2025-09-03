import StandardFormLayout, { StandardFormSection, StandardInput } from '@/components/dashboard/StandardFormLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/ui/page-header';
import { Head, useForm } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import { useState } from 'react';

interface TitleSettingsProps {
  user: {
    id: number;
    name: string;
    email: string;
  };
  weddingId?: number;
  titleSettings?: {
    // Couple section
    couple_title: string;
    mother_title: string;
    father_title: string;
    separator_title: string;

    // Cover section
    cover_title: string;

    // Location section
    location_title: string;
    venue_title: string;
    time_title: string;

    // Additional sections
    rsvp_title: string;
    gift_title: string;
    message_title: string;
  };
}

export default function TitleSettings({ user, weddingId, titleSettings }: TitleSettingsProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { data, setData, patch, processing, errors, reset } = useForm({
    // Couple section
    couple_title: titleSettings?.couple_title || 'Mempelai',
    mother_title: titleSettings?.mother_title || 'Ibu',
    father_title: titleSettings?.father_title || 'Bapak',
    separator_title: titleSettings?.separator_title || 'dari',

    // Cover section
    cover_title: titleSettings?.cover_title || 'Pernikahan',

    // Location section
    location_title: titleSettings?.location_title || 'Lokasi',
    venue_title: titleSettings?.venue_title || 'Tempat',
    time_title: titleSettings?.time_title || 'Waktu',

    // Additional sections
    rsvp_title: titleSettings?.rsvp_title || 'Konfirmasi Kehadiran',
    gift_title: titleSettings?.gift_title || 'Hadiah',
    message_title: titleSettings?.message_title || 'Pesan',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = weddingId ? `/api/settings/title/${weddingId}` : '/api/settings/title';
    patch(url, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <>
      <Head title="Pengaturan Judul" />

      <DashboardLayout user={user} currentPath="/settings/title">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Page Header */}
          <PageHeader
            icon={Settings}
            title="Pengaturan Judul"
            description="Kustomisasi label undangan sesuai keinginan Anda"
          />

          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Pengaturan</span>
            <span>/</span>
            <span className="text-foreground font-medium">Judul</span>
          </div>

          <StandardFormLayout
            title="Pengaturan Judul"
            description="Kustomisasi label undangan sesuai keinginan Anda"
            onSubmit={isEditing ? handleSubmit : undefined}
            onCancel={isEditing ? handleCancel : undefined}
            submitLabel="Simpan Perubahan"
            cancelLabel="Batal"
            isSubmitting={processing}
            icon={Settings}
            maxWidth="4xl"
          >
            <div className="flex items-center justify-end mb-6">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {isEditing ? 'Batal' : 'Edit'}
              </button>
            </div>

            <div className="space-y-8">
              {/* Couple Section */}
              <StandardFormSection
                title="Bagian Mempelai"
                description="Kustomisasi label untuk bagian mempelai dan orang tua"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <StandardInput
                    label="Judul Mempelai"
                    id="couple_title"
                    value={data.couple_title}
                    onChange={(value) => setData('couple_title', value)}
                    error={errors.couple_title}
                    disabled={!isEditing}
                  />
                  <StandardInput
                    label="Judul Ibu"
                    id="mother_title"
                    value={data.mother_title}
                    onChange={(value) => setData('mother_title', value)}
                    error={errors.mother_title}
                    disabled={!isEditing}
                  />
                  <StandardInput
                    label="Judul Ayah"
                    id="father_title"
                    value={data.father_title}
                    onChange={(value) => setData('father_title', value)}
                    error={errors.father_title}
                    disabled={!isEditing}
                  />
                  <StandardInput
                    label="Judul Pemisah (Dari)"
                    id="separator_title"
                    value={data.separator_title}
                    onChange={(value) => setData('separator_title', value)}
                    error={errors.separator_title}
                    disabled={!isEditing}
                  />
                </div>
              </StandardFormSection>

              {/* Cover Section */}
              <StandardFormSection
                title="Bagian Cover"
                description="Kustomisasi label untuk bagian cover undangan"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <StandardInput
                    label="Judul Cover"
                    id="cover_title"
                    value={data.cover_title}
                    onChange={(value) => setData('cover_title', value)}
                    error={errors.cover_title}
                    disabled={!isEditing}
                  />
                </div>
              </StandardFormSection>

              {/* Location Section */}
              <StandardFormSection
                title="Bagian Lokasi"
                description="Kustomisasi label untuk bagian lokasi dan waktu"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <StandardInput
                    label="Judul Lokasi"
                    id="location_title"
                    value={data.location_title}
                    onChange={(value) => setData('location_title', value)}
                    error={errors.location_title}
                    disabled={!isEditing}
                  />
                  <StandardInput
                    label="Judul Tempat"
                    id="venue_title"
                    value={data.venue_title}
                    onChange={(value) => setData('venue_title', value)}
                    error={errors.venue_title}
                    disabled={!isEditing}
                  />
                  <StandardInput
                    label="Judul Waktu"
                    id="time_title"
                    value={data.time_title}
                    onChange={(value) => setData('time_title', value)}
                    error={errors.time_title}
                    disabled={!isEditing}
                  />
                </div>
              </StandardFormSection>

              {/* Additional Sections */}
              <StandardFormSection
                title="Bagian Tambahan"
                description="Kustomisasi label untuk bagian konfirmasi, hadiah, dan pesan"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <StandardInput
                    label="Judul Konfirmasi Kehadiran"
                    id="rsvp_title"
                    value={data.rsvp_title}
                    onChange={(value) => setData('rsvp_title', value)}
                    error={errors.rsvp_title}
                    disabled={!isEditing}
                  />
                  <StandardInput
                    label="Judul Hadiah"
                    id="gift_title"
                    value={data.gift_title}
                    onChange={(value) => setData('gift_title', value)}
                    error={errors.gift_title}
                    disabled={!isEditing}
                  />
                  <StandardInput
                    label="Judul Pesan"
                    id="message_title"
                    value={data.message_title}
                    onChange={(value) => setData('message_title', value)}
                    error={errors.message_title}
                    disabled={!isEditing}
                  />
                </div>
              </StandardFormSection>
            </div>
          </StandardFormLayout>
        </div>
      </DashboardLayout>
    </>
  );
}
