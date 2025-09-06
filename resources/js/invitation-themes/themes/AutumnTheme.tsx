import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import {
    Countdown,
    CoupleInfo,
    Donation,
    Gallery,
    Guestbook,
    LocationCard,
    MusicPlayer
} from '../components/BaseComponents';
import { InvitationThemeProps } from '../types';
import { autumnStyles } from './autumn';

const AutumnTheme: React.FC<InvitationThemeProps> = ({
  wedding,
  invitation,
  onOpenInvitation,
  onMusicToggle,
  onRSVPSubmit,
  onCommentSubmit,
  onDonationClick,
  isPreview = false
}) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showInvitation, setShowInvitation] = useState(!invitation);

  const handleOpenInvitation = () => {
    setShowInvitation(true);
    onOpenInvitation?.();
  };

  const handleMusicToggle = () => {
    const newState = !isMusicPlaying;
    setIsMusicPlaying(newState);
    onMusicToggle?.(newState);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCoupleName = () => {
    if (wedding.name_position === 'female') {
      return `${wedding.bride_name} & ${wedding.groom_name}`;
    }
    return `${wedding.groom_name} & ${wedding.bride_name}`;
  };

  return (
    <>
      <Head title={`${wedding.title} - ${getCoupleName()}`} />
      <style dangerouslySetInnerHTML={{ __html: autumnStyles }} />

      <div className="autumn-theme min-h-screen bg-background">
        {/* Cover Section */}
        <div className="relative h-screen overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${wedding.cover_photo || '/themes/autumn/cover-bg.jpg'})`
            }}
          />
          <div className="absolute inset-0 bg-black/50" />

          {/* Particle Background */}
          <div className="particle-bg absolute inset-0" />

          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl mx-auto">
              <h1 className="font-satisfy text-6xl md:text-8xl mb-4">
                {wedding.cover_title || 'Undangan Pernikahan'}
              </h1>
              <h2 className="font-poppins text-4xl md:text-6xl mb-6 text-gradient">
                {getCoupleName()}
              </h2>
              {wedding.is_show_date_cover && wedding.reception_date && (
                <p className="font-poppins text-xl md:text-2xl tracking-widest">
                  {formatDate(wedding.reception_date)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="wave-divider h-16 bg-background" />

        {/* Couple Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <CoupleInfo
              groom={{
                name: wedding.groom_name,
                photo: wedding.groom_photo,
                instagram: wedding.groom_instagram,
                fatherName: wedding.groom_father_name,
                motherName: wedding.groom_mother_name
              }}
              bride={{
                name: wedding.bride_name,
                photo: wedding.bride_photo,
                instagram: wedding.bride_instagram,
                fatherName: wedding.bride_father_name,
                motherName: wedding.bride_mother_name
              }}
              quotes={wedding.wedding_quotes}
              namePosition={wedding.name_position || 'male'}
              showPhotos={wedding.is_enable_photo || false}
            />
          </div>
        </section>

        {/* Countdown Section */}
        {wedding.is_countdown_enabled && wedding.reception_date && (
          <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-satisfy text-4xl md:text-5xl text-primary mb-12">
                {wedding.section_countdown || 'Menghitung Hari'}
              </h2>
              <Countdown
                targetDate={wedding.reception_date}
                labels={{
                  days: wedding.section_countdown_days || 'Hari',
                  hours: wedding.section_countdown_hours || 'Jam',
                  minutes: wedding.section_countdown_minutes || 'Menit',
                  seconds: wedding.section_countdown_seconds || 'Detik'
                }}
              />
            </div>
          </section>
        )}

        {/* Location Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-satisfy text-4xl md:text-5xl text-primary text-center mb-16">
              {wedding.section_location || 'Lokasi'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {wedding.is_show_reception && wedding.reception_place_name && (
                <LocationCard
                  type={wedding.reception_type || 'Resepsi'}
                  placeName={wedding.reception_place_name}
                  location={wedding.reception_location || ''}
                  date={formatDate(wedding.reception_date)}
                  time={`${wedding.reception_start_time || ''} - ${wedding.reception_end_time || ''}`}
                  timezone={wedding.reception_timezone || wedding.timezone || 'WIB'}
                  latitude={wedding.reception_latitude}
                  longitude={wedding.reception_longitude}
                  onNavigate={() => {
                    if (wedding.reception_latitude && wedding.reception_longitude) {
                      const url = `https://www.google.com/maps/dir/?api=1&destination=${wedding.reception_latitude},${wedding.reception_longitude}&dir_action=navigate`;
                      window.open(url, '_blank');
                    }
                  }}
                  showMap={wedding.is_enable_maps || false}
                />
              )}

              {wedding.is_show_ceremony && wedding.ceremony_place_name && (
                <LocationCard
                  type={wedding.ceremony_type || 'Akad Nikah'}
                  placeName={wedding.ceremony_place_name}
                  location={wedding.ceremony_location || ''}
                  date={formatDate(wedding.ceremony_date)}
                  time={`${wedding.ceremony_start_time || ''} - ${wedding.ceremony_end_time || ''}`}
                  timezone={wedding.ceremony_timezone || wedding.timezone || 'WIB'}
                  latitude={wedding.ceremony_latitude}
                  longitude={wedding.ceremony_longitude}
                  onNavigate={() => {
                    if (wedding.ceremony_latitude && wedding.ceremony_longitude) {
                      const url = `https://www.google.com/maps/dir/?api=1&destination=${wedding.ceremony_latitude},${wedding.ceremony_longitude}&dir_action=navigate`;
                      window.open(url, '_blank');
                    }
                  }}
                  showMap={wedding.is_enable_maps || false}
                />
              )}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {wedding.galleries && wedding.galleries.length > 0 && (
          <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="container mx-auto px-4">
              <Gallery
                galleries={wedding.galleries}
                youtubeUrl={wedding.youtube_url}
              />
            </div>
          </section>
        )}

        {/* Donation Section */}
        {wedding.is_donation_enabled && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <Donation
                type={wedding.donation_type || 'modal'}
                defaultWallet={wedding.default_wallet || 'bank'}
                onSubmit={onDonationClick || (() => {})}
                labels={{
                  title: wedding.section_donation || 'Amplop Undangan',
                  subtitle: wedding.section_donation_sub || 'Your presence is the greatest gift, but if you wish to give something more, we would be honored to receive your blessing.',
                  button: 'Kirim Hadiah'
                }}
              />
            </div>
          </section>
        )}

        {/* Guestbook Section */}
        {wedding.is_show_comment && wedding.comments && (
          <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="container mx-auto px-4">
              <Guestbook
                comments={wedding.comments}
                onSubmit={onCommentSubmit || (() => {})}
                maxRsvp={wedding.max_rsvp || 5}
                isInvitationEnabled={wedding.is_invitation_enabled || false}
                labels={{
                  title: wedding.section_guestbook || 'Buku Tamu',
                  name: wedding.section_guestbook_name || 'Nama',
                  content: wedding.section_guestbook_content || 'Ucapan dan Doa',
                  present: wedding.section_guestbook_present || 'Hadir',
                  notPresent: wedding.section_guestbook_no_present || 'Tidak Hadir',
                  person: wedding.section_guestbook_person || 'Orang',
                  send: wedding.section_guestbook_send_button || 'Kirim',
                  button: wedding.section_guestbook_button || 'Isi Buku Tamu'
                }}
              />
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="footer-gradient py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="font-poppins text-2xl font-light italic mb-6">
                Terima Kasih
              </h3>
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-0.5 bg-white mr-4" />
                <h4 className="font-satisfy text-3xl">
                  {getCoupleName()}
                </h4>
                <div className="w-16 h-0.5 bg-white ml-4" />
              </div>
            </div>
          </div>
        </footer>

        {/* Music Player */}
        {wedding.is_music_enabled && wedding.wedding_music && (
          <MusicPlayer
            isPlaying={isMusicPlaying}
            onToggle={handleMusicToggle}
            musicUrl={wedding.wedding_music}
          />
        )}
      </div>
    </>
  );
};

export default AutumnTheme;
