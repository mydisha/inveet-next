import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import {
    Clock,
    ExternalLink,
    Gift,
    Heart,
    MapPin,
    MessageCircle,
    Play,
    Users
} from 'lucide-react';
import React, { useState } from 'react';
import {
    Gallery
} from '../components/BaseComponents';
import { InvitationThemeProps } from '../types';
import { classyFlowerStyles } from './classy-flower';

const ClassyFlowerTheme: React.FC<InvitationThemeProps> = ({
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
      <style dangerouslySetInnerHTML={{ __html: classyFlowerStyles }} />

      <div className="classy-flower-theme min-h-screen bg-background overflow-x-hidden">
        {/* Hero Section */}
        <div
          className="hero-section"
          style={{
            backgroundImage: `url(${wedding.cover_photo || '/themes/classy-flower/backdrop.jpg'})`
          }}
        >
          <div className="hero-overlay" />

          {/* Ornament */}
          <img
            src="/themes/classy-flower/orn-hero.png"
            alt="Ornament"
            className="ornament-hero"
          />

          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl mx-auto">
              <h1 className="font-merienda text-5xl md:text-7xl mb-6">
                {wedding.cover_title || 'Undangan Pernikahan'}
              </h1>
              <h2 className="font-merienda text-4xl md:text-6xl mb-8 text-gradient">
                {getCoupleName()}
              </h2>
              {wedding.is_show_date_cover && wedding.reception_date && (
                <div className="space-y-2">
                  <p className="font-montserrat text-xl md:text-2xl tracking-widest">
                    {formatDate(wedding.reception_date)}
                  </p>
                  <p className="font-montserrat text-lg md:text-xl">
                    {wedding.reception_start_time} - {wedding.reception_end_time} {wedding.reception_timezone || wedding.timezone || 'WIB'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 text-center">
            <img
              src="/themes/classy-flower/Icon-date.png"
              alt="Date Icon"
              className="w-16 h-16 mx-auto mb-8"
            />
            {wedding.wedding_quotes ? (
              <p className="font-montserrat text-lg italic text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {wedding.wedding_quotes}
              </p>
            ) : (
              <p className="font-montserrat text-lg italic text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Every love story is beautiful, but ours is the best one. I loved her since the first time I saw her.
                My mother told me to pick the very best one, and I did. True love stories never have endings.
              </p>
            )}
          </div>
        </section>

        {/* Couple Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="section-title">
              {wedding.section_couple || 'The Happy Couple'}
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-4xl mx-auto">
              {/* Groom */}
              <div className="flex flex-col items-center text-center">
                {wedding.is_enable_photo && wedding.groom_photo && (
                  <img
                    src={wedding.groom_photo}
                    alt={wedding.groom_name}
                    className="couple-photo mb-6"
                  />
                )}
                <h3 className="font-merienda text-3xl font-bold text-foreground mb-2">
                  {wedding.groom_name}
                </h3>
                {wedding.groom_father_name && wedding.groom_mother_name && (
                  <p className="font-montserrat text-sm text-muted-foreground mb-2">
                    Son of {wedding.groom_father_name} & {wedding.groom_mother_name}
                  </p>
                )}
                {wedding.groom_instagram && (
                  <a
                    href={`https://instagram.com/${wedding.groom_instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <img src="/themes/classy-flower/icon-ig.svg" alt="Instagram" className="w-6 h-6" />
                  </a>
                )}
              </div>

              {/* Heart Icon */}
              <div className="text-4xl text-primary">
                <Heart className="w-12 h-12" />
              </div>

              {/* Bride */}
              <div className="flex flex-col items-center text-center">
                {wedding.is_enable_photo && wedding.bride_photo && (
                  <img
                    src={wedding.bride_photo}
                    alt={wedding.bride_name}
                    className="couple-photo mb-6"
                  />
                )}
                <h3 className="font-merienda text-3xl font-bold text-foreground mb-2">
                  {wedding.bride_name}
                </h3>
                {wedding.bride_father_name && wedding.bride_mother_name && (
                  <p className="font-montserrat text-sm text-muted-foreground mb-2">
                    Daughter of {wedding.bride_father_name} & {wedding.bride_mother_name}
                  </p>
                )}
                {wedding.bride_instagram && (
                  <a
                    href={`https://instagram.com/${wedding.bride_instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <img src="/themes/classy-flower/icon-ig.svg" alt="Instagram" className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        {wedding.is_countdown_enabled && wedding.reception_date && (
          <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="container mx-auto px-4 text-center">
              <h2 className="section-title">
                {wedding.section_countdown || 'Menghitung Hari'}
              </h2>
              <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="countdown-item">
                  <div className="countdown-number" id="days">-</div>
                  <div className="countdown-label">{wedding.section_countdown_days || 'Hari'}</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-number" id="hours">-</div>
                  <div className="countdown-label">{wedding.section_countdown_hours || 'Jam'}</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-number" id="minutes">-</div>
                  <div className="countdown-label">{wedding.section_countdown_minutes || 'Menit'}</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-number" id="seconds">-</div>
                  <div className="countdown-label">{wedding.section_countdown_seconds || 'Detik'}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Location Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="section-title">
              {wedding.section_location || 'Lokasi'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {wedding.is_show_reception && wedding.reception_place_name && (
                <div className="schedule-card">
                  {wedding.is_enable_maps && wedding.reception_latitude && wedding.reception_longitude ? (
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${wedding.reception_latitude},${wedding.reception_longitude}&language=id`}
                      height="230"
                      width="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src="/themes/classy-flower/img-schedule.png"
                      alt="Schedule"
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="font-merienda text-xl font-bold text-foreground mb-4 uppercase">
                      {wedding.reception_type || 'Resepsi'}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">{wedding.reception_place_name}</p>
                          <p className="text-sm text-muted-foreground">{wedding.reception_location}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">{formatDate(wedding.reception_date)}</p>
                          <p className="text-sm text-muted-foreground">
                            {wedding.reception_start_time} - {wedding.reception_end_time} {wedding.reception_timezone || wedding.timezone || 'WIB'}
                          </p>
                        </div>
                      </div>
                    </div>
                    {wedding.is_navigation_enabled && wedding.reception_latitude && wedding.reception_longitude && (
                      <Button
                        onClick={() => {
                          const url = `https://www.google.com/maps/dir/?api=1&destination=${wedding.reception_latitude},${wedding.reception_longitude}&dir_action=navigate`;
                          window.open(url, '_blank');
                        }}
                        className="w-full mt-4 btn-theme-v1"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {wedding.section_navigate_to || 'Arahkan ke Lokasi'}
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {wedding.is_show_ceremony && wedding.ceremony_place_name && (
                <div className="schedule-card">
                  <img
                    src="/themes/classy-flower/img-schedule.png"
                    alt="Schedule"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-merienda text-xl font-bold text-foreground mb-4 uppercase">
                      {wedding.ceremony_type || 'Akad Nikah'}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">{wedding.ceremony_place_name}</p>
                          <p className="text-sm text-muted-foreground">{wedding.ceremony_location}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">{formatDate(wedding.ceremony_date)}</p>
                          <p className="text-sm text-muted-foreground">
                            {wedding.ceremony_start_time} - {wedding.ceremony_end_time} {wedding.ceremony_timezone || wedding.timezone || 'WIB'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Live Streaming Section */}
        {wedding.youtube_url && (
          <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto">
                <Card className="card-elegant text-center">
                  <CardContent className="p-8">
                    <img
                      src="/themes/classy-flower/ic-live.png"
                      alt="Live"
                      className="w-16 h-16 mx-auto mb-4"
                    />
                    <h3 className="font-merienda text-2xl font-bold text-foreground mb-4">
                      {wedding.livestream_title || 'Live Streaming'}
                    </h3>
                    <p className="font-montserrat text-muted-foreground mb-6">
                      {wedding.livestream_description || 'Hadiri acara Kami secara virtual melalui live stream yang disiarkan melalui platform Youtube'}
                    </p>
                    <Button
                      onClick={() => window.open(wedding.youtube_url, '_blank')}
                      className="btn-theme-v2"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {wedding.livestream_button || 'Kunjungi Live Streaming'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* COVID Protocol Section */}
        {wedding.show_covid_protocol && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 text-center">
              <h2 className="section-title">
                {wedding.information_title || 'Protokol Kesehatan'}
              </h2>
              <div className="max-w-4xl mx-auto">
                {wedding.covid_protocol_text ? (
                  <div
                    className="font-montserrat text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: wedding.covid_protocol_text }}
                  />
                ) : (
                  <p className="font-montserrat text-muted-foreground leading-relaxed">
                    Menggunakan masker selama acara, Selalu bersihkan tangan, Menjaga jarak, &
                    Dianjurkan untuk tidak membawa bayi selama acara. Menjaga protokol kesehatan, menjaga sesama
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Donation Section */}
        {wedding.is_donation_enabled && (
          <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="container mx-auto px-4">
              <h2 className="section-title">
                {wedding.section_donation || 'Amplop Undangan'}
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
                <div className="flex-shrink-0">
                  <img
                    src="/themes/classy-flower/img-amplop.png"
                    alt="Gift"
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <div className="text-center md:text-left">
                  <p className="font-montserrat text-lg text-muted-foreground mb-6">
                    {wedding.section_donation_sub || 'Your presence is the greatest gift, but if you wish to give something more, we would be honored to receive your blessing.'}
                  </p>
                  <Button
                    onClick={onDonationClick || (() => {})}
                    className="btn-theme-v2"
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    {wedding.section_donation_button || 'Kirim Hadiah'}
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Gallery Section */}
        {wedding.galleries && wedding.galleries.length > 0 && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <Gallery
                galleries={wedding.galleries}
                youtubeUrl={wedding.youtube_url}
              />
            </div>
          </section>
        )}

        {/* Guestbook Section */}
        {wedding.is_show_comment && wedding.comments && (
          <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="container mx-auto px-4">
              <h2 className="section-title">
                {wedding.section_guestbook || 'Buku Tamu'}
              </h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                Yuk kirim ucapan, doa serta konfirmasi kehadiran
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
                {wedding.comments.map((comment) => (
                  <div key={comment.id} className="guest-card p-6">
                    <p className="font-montserrat text-foreground mb-4 leading-relaxed">
                      {comment.comment}
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{comment.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(comment.created_at).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button
                  onClick={() => {/* Handle guestbook modal */}}
                  className="btn-theme-v2"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {wedding.section_guestbook_button || 'Isi Buku Tamu'}
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Music Player */}
        {wedding.is_music_enabled && wedding.wedding_music && (
          <div className="music-button" onClick={handleMusicToggle}>
            {isMusicPlaying ? (
              <img src="/themes/classy-flower/pause.svg" alt="Pause" className="w-6 h-6" />
            ) : (
              <img src="/themes/classy-flower/play.svg" alt="Play" className="w-6 h-6" />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ClassyFlowerTheme;
