import DashboardPage from '@/components/dashboard/DashboardPage';
import StandardFormLayout, { StandardFormSection, StandardInput } from '@/components/dashboard/StandardFormLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import {
    Camera,
    Check,
    User,
    Users
} from 'lucide-react';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  hasWedding: boolean;
}

interface CoupleInfoProps {
  user: User | null;
  wedding: {
    id: number;
    couple_name_1: string;
    couple_name_2: string;
    slug: string;
    groom_name?: string;
    groom_nickname?: string;
    groom_email?: string;
    groom_phone?: string;
    groom_instagram?: string;
    groom_father_name?: string;
    groom_mother_name?: string;
    bride_name?: string;
    bride_nickname?: string;
    bride_email?: string;
    bride_phone?: string;
    bride_instagram?: string;
    bride_father_name?: string;
    bride_mother_name?: string;
    groom_photo?: string;
    bride_photo?: string;
  };
}

export default function CoupleInfo({ user, wedding }: CoupleInfoProps) {
  console.log('CoupleInfo component rendering with:', { user, wedding });

  const [groomPhotoPreview, setGroomPhotoPreview] = useState<string>(wedding.groom_photo || '');
  const [bridePhotoPreview, setBridePhotoPreview] = useState<string>(wedding.bride_photo || '');
  const [formData, setFormData] = useState({
    // Groom Information
    groom_name: wedding.groom_name || '',
    groom_nickname: wedding.groom_nickname || '',
    groom_email: wedding.groom_email || '',
    groom_phone: wedding.groom_phone || '',
    groom_instagram: wedding.groom_instagram || '',
    groom_father_name: wedding.groom_father_name || '',
    groom_mother_name: wedding.groom_mother_name || '',

    // Bride Information
    bride_name: wedding.bride_name || '',
    bride_nickname: wedding.bride_nickname || '',
    bride_email: wedding.bride_email || '',
    bride_phone: wedding.bride_phone || '',
    bride_instagram: wedding.bride_instagram || '',
    bride_father_name: wedding.bride_father_name || '',
    bride_mother_name: wedding.bride_mother_name || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Auto-save functionality - you can implement debounced saving here
    // For now, we'll just update the local state
  };

  const handlePhotoChange = (type: 'groom' | 'bride', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (type === 'groom') {
        setGroomPhotoPreview(e.target?.result as string);
      } else {
        setBridePhotoPreview(e.target?.result as string);
      }
    };
    reader.readAsDataURL(file);
    // TODO: Implement photo upload functionality
  };

  try {
    return (
      <DashboardPage
        title={`${wedding.couple_name_1} & ${wedding.couple_name_2} - Informasi Mempelai`}
        user={user}
        currentPath={`/wedding/${wedding.id}/couple`}
      >
        <StandardFormLayout
          title="Informasi Mempelai"
          backHref={`/wedding/${wedding.id}`}
          backLabel="Kembali ke Detail Pernikahan"
          icon={Users}
          maxWidth="6xl"
        >

        {/* Couple Photos Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-12 mb-6">
            <div className="text-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group"
                     onClick={() => document.getElementById('groom-photo')?.click()}>
                  {groomPhotoPreview ? (
                    <img src={groomPhotoPreview} alt="Groom preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Camera className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">Groom Photo</p>
                    </div>
                  )}
                </div>
                <input
                  id="groom-photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handlePhotoChange('groom', e.target.files[0])}
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mt-3">
                {formData.groom_name || wedding.couple_name_1}
              </h3>
              <p className="text-sm text-muted-foreground">Mempelai Pria</p>
            </div>

            <div className="text-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer group"
                     onClick={() => document.getElementById('bride-photo')?.click()}>
                  {bridePhotoPreview ? (
                    <img src={bridePhotoPreview} alt="Bride preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Camera className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">Bride Photo</p>
                    </div>
                  )}
                </div>
                <input
                  id="bride-photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handlePhotoChange('bride', e.target.files[0])}
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mt-3">
                {formData.bride_name || wedding.couple_name_2}
              </h3>
              <p className="text-sm text-muted-foreground">Mempelai Wanita</p>
            </div>
          </div>
        </div>

        {/* Information Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Groom Information */}
          <StandardFormSection
            title="Informasi Mempelai Pria"
            description="Lengkapi informasi mempelai pria dan orang tuanya"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StandardInput
                label="Nama Lengkap"
                id="groom_name"
                value={formData.groom_name}
                onChange={(value) => handleInputChange('groom_name', value)}
                placeholder="Masukkan nama lengkap"
              />
              <StandardInput
                label="Nama Panggilan"
                id="groom_nickname"
                value={formData.groom_nickname}
                onChange={(value) => handleInputChange('groom_nickname', value)}
                placeholder="Masukkan nama panggilan"
              />
              <StandardInput
                label="Email"
                id="groom_email"
                type="email"
                value={formData.groom_email}
                onChange={(value) => handleInputChange('groom_email', value)}
                placeholder="email@example.com"
              />
              <StandardInput
                label="Nomor Telepon"
                id="groom_phone"
                value={formData.groom_phone}
                onChange={(value) => handleInputChange('groom_phone', value)}
                placeholder="+62 812 3456 7890"
              />
              <div className="md:col-span-2">
                <StandardInput
                  label="Instagram"
                  id="groom_instagram"
                  value={formData.groom_instagram}
                  onChange={(value) => handleInputChange('groom_instagram', value)}
                  placeholder="@username"
                />
              </div>
            </div>

            {/* Parents Information */}
            <div className="border-t pt-4">
              <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Informasi Orang Tua</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StandardInput
                  label="Nama Ayah"
                  id="groom_father_name"
                  value={formData.groom_father_name}
                  onChange={(value) => handleInputChange('groom_father_name', value)}
                  placeholder="Nama ayah"
                />
                <StandardInput
                  label="Nama Ibu"
                  id="groom_mother_name"
                  value={formData.groom_mother_name}
                  onChange={(value) => handleInputChange('groom_mother_name', value)}
                  placeholder="Nama ibu"
                />
              </div>
            </div>
          </StandardFormSection>

          {/* Bride Information */}
          <StandardFormSection
            title="Informasi Mempelai Wanita"
            description="Lengkapi informasi mempelai wanita dan orang tuanya"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StandardInput
                label="Nama Lengkap"
                id="bride_name"
                value={formData.bride_name}
                onChange={(value) => handleInputChange('bride_name', value)}
                placeholder="Masukkan nama lengkap"
              />
              <StandardInput
                label="Nama Panggilan"
                id="bride_nickname"
                value={formData.bride_nickname}
                onChange={(value) => handleInputChange('bride_nickname', value)}
                placeholder="Masukkan nama panggilan"
              />
              <StandardInput
                label="Email"
                id="bride_email"
                type="email"
                value={formData.bride_email}
                onChange={(value) => handleInputChange('bride_email', value)}
                placeholder="email@example.com"
              />
              <StandardInput
                label="Nomor Telepon"
                id="bride_phone"
                value={formData.bride_phone}
                onChange={(value) => handleInputChange('bride_phone', value)}
                placeholder="+62 812 3456 7890"
              />
              <div className="md:col-span-2">
                <StandardInput
                  label="Instagram"
                  id="bride_instagram"
                  value={formData.bride_instagram}
                  onChange={(value) => handleInputChange('bride_instagram', value)}
                  placeholder="@username"
                />
              </div>
            </div>

            {/* Parents Information */}
            <div className="border-t pt-4">
              <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Informasi Orang Tua</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StandardInput
                  label="Nama Ayah"
                  id="bride_father_name"
                  value={formData.bride_father_name}
                  onChange={(value) => handleInputChange('bride_father_name', value)}
                  placeholder="Nama ayah"
                />
                <StandardInput
                  label="Nama Ibu"
                  id="bride_mother_name"
                  value={formData.bride_mother_name}
                  onChange={(value) => handleInputChange('bride_mother_name', value)}
                  placeholder="Nama ibu"
                />
              </div>
            </div>
          </StandardFormSection>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center pt-6">
          <Badge variant="secondary" className="bg-green-100 text-green-800 px-4 py-2">
            <Check className="w-4 h-4 mr-2" />
            Informasi mempelai telah lengkap
          </Badge>
        </div>
      </StandardFormLayout>
    </DashboardPage>
    );
  } catch (error) {
    console.error('Error in CoupleInfo component:', error);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Error Loading Page</h1>
          <p className="text-muted-foreground mb-4">There was an error loading the couple information page.</p>
          <Link href={`/wedding/${wedding.id}`}>
            <Button variant="outline">Go Back</Button>
          </Link>
        </div>
      </div>
    );
  }
}
