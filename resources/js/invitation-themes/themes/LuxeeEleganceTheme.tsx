import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import {
    Facebook,
    Gift,
    Heart,
    Instagram,
    Twitter,
    MessageCircle as WhatsApp,
    Youtube
} from 'lucide-react';
import React, { useState } from 'react';
import {
    Gallery,
    Guestbook,
    LocationCard,
    MusicPlayer
} from '../components/BaseComponents';
import { InvitationThemeProps } from '../types';
import { luxeeEleganceStyles } from './luxee-elegance';

const LuxeeEleganceTheme: React.FC<InvitationThemeProps> = ({
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
            weekday: 'long',
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
            <style dangerouslySetInnerHTML={{ __html: luxeeEleganceStyles }} />

            <div className="luxee-elegance-theme min-h-screen bg-background">
                {/* Invitation Popup */}
                {!showInvitation && (
                    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                        <div className="invitation-popup">
                            <h1 className="font-playfair text-4xl text-primary mb-4">
                                {wedding.cover_title || 'THE WEDDING OF'}
                            </h1>
                            <h2 className="font-script text-5xl text-accent mb-8">
                                {getCoupleName()}
                            </h2>

                            {invitation && (
                                <div className="mb-6">
                                    <p className="text-lg text-muted-foreground mb-2">
                                        {wedding.popup_for || 'Kepada Yth.'}
                                    </p>
                                    <h3 className="text-2xl font-bold text-primary">
                                        {invitation.name}
                                        {invitation.is_vip && (
                                            <span className="ml-2 text-sm bg-accent text-white px-2 py-1 rounded">
                                                VIP
                                            </span>
                                        )}
                                    </h3>
                                </div>
                            )}

                            <p className="text-lg text-muted-foreground mb-8">
                                {wedding.popup_footer || 'You are cordially invited to our wedding.'}
                            </p>

                            <Button
                                onClick={handleOpenInvitation}
                                className="btn-elegant"
                            >
                                {wedding.popup_button || 'Buka Undangan'}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Hero Section */}
                <div className="hero-section">
                    <div className="hero-pattern" />
                    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                        <h1 className="font-playfair text-6xl md:text-8xl text-primary mb-4">
                            {wedding.cover_title || 'THE WEDDING OF'}
                        </h1>
                        <h2 className="font-script text-5xl md:text-7xl text-accent mb-8">
                            {getCoupleName()}
                        </h2>
                        {wedding.is_show_date_cover && wedding.reception_date && (
                            <p className="font-source text-xl md:text-2xl text-muted-foreground">
                                {formatDate(wedding.reception_date)}
                            </p>
                        )}
                    </div>
                </div>

                {/* Quote Section */}
                {wedding.wedding_quotes && (
                    <section className="quote-section">
                        <div className="max-w-4xl mx-auto">
                            <p className="font-playfair text-2xl md:text-3xl text-primary italic leading-relaxed">
                                {wedding.wedding_quotes}
                            </p>
                        </div>
                    </section>
                )}

                {/* Couple Section */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <h2 className="section-title">
                            {wedding.section_couple || 'The Happy Couple'}
                        </h2>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-16 max-w-6xl mx-auto">
                            {/* Groom */}
                            <div className="flex flex-col items-center text-center">
                                {wedding.is_enable_photo && wedding.groom_photo && (
                                    <img
                                        src={wedding.groom_photo}
                                        alt={wedding.groom_name}
                                        className="couple-photo mb-8"
                                    />
                                )}
                                <h3 className="font-playfair text-3xl font-bold text-primary mb-2">
                                    {wedding.groom_name}
                                </h3>
                                {wedding.groom_father_name && wedding.groom_mother_name && (
                                    <p className="font-source text-sm text-muted-foreground mb-4">
                                        Putra Pertama Bapak {wedding.groom_father_name} & Ibu {wedding.groom_mother_name}
                                    </p>
                                )}
                                <div className="flex space-x-2">
                                    {wedding.groom_instagram && (
                                        <a
                                            href={`https://instagram.com/${wedding.groom_instagram}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-icon"
                                        >
                                            <Instagram className="w-5 h-5" />
                                        </a>
                                    )}
                                    <a href="#" className="social-icon">
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="social-icon">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="social-icon">
                                        <Youtube className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="social-icon">
                                        <WhatsApp className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>

                            {/* Heart Icon */}
                            <div className="text-6xl text-accent">
                                <Heart className="w-16 h-16" />
                            </div>

                            {/* Bride */}
                            <div className="flex flex-col items-center text-center">
                                {wedding.is_enable_photo && wedding.bride_photo && (
                                    <img
                                        src={wedding.bride_photo}
                                        alt={wedding.bride_name}
                                        className="couple-photo mb-8"
                                    />
                                )}
                                <h3 className="font-playfair text-3xl font-bold text-primary mb-2">
                                    {wedding.bride_name}
                                </h3>
                                {wedding.bride_father_name && wedding.bride_mother_name && (
                                    <p className="font-source text-sm text-muted-foreground mb-4">
                                        Putri Ketiga Bapak {wedding.bride_father_name} & Ibu {wedding.bride_mother_name}
                                    </p>
                                )}
                                <div className="flex space-x-2">
                                    {wedding.bride_instagram && (
                                        <a
                                            href={`https://instagram.com/${wedding.bride_instagram}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-icon"
                                        >
                                            <Instagram className="w-5 h-5" />
                                        </a>
                                    )}
                                    <a href="#" className="social-icon">
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="social-icon">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="social-icon">
                                        <Youtube className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="social-icon">
                                        <WhatsApp className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Countdown Section */}
                {wedding.is_countdown_enabled && wedding.reception_date && (
                    <section className="py-20 bg-light-gray">
                        <div className="container mx-auto px-4 text-center">
                            <h2 className="section-title">
                                {wedding.section_countdown || 'Save The Date'}
                            </h2>
                            <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
                                <div className="countdown-item">
                                    <div className="countdown-number" id="days">-</div>
                                    <div className="countdown-label">{wedding.section_countdown_days || 'Days'}</div>
                                </div>
                                <div className="countdown-item">
                                    <div className="countdown-number" id="hours">-</div>
                                    <div className="countdown-label">{wedding.section_countdown_hours || 'Hours'}</div>
                                </div>
                                <div className="countdown-item">
                                    <div className="countdown-number" id="minutes">-</div>
                                    <div className="countdown-label">{wedding.section_countdown_minutes || 'Minutes'}</div>
                                </div>
                                <div className="countdown-item">
                                    <div className="countdown-number" id="seconds">-</div>
                                    <div className="countdown-label">{wedding.section_countdown_seconds || 'Seconds'}</div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Location Section */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <h2 className="section-title">
                            {wedding.section_location || 'Wedding Events'}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {wedding.is_show_ceremony && wedding.ceremony_place_name && (
                                <LocationCard
                                    type={wedding.ceremony_type || 'Wedding Ceremony'}
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

                            {wedding.is_show_reception && wedding.reception_place_name && (
                                <LocationCard
                                    type={wedding.reception_type || 'Wedding Reception'}
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
                        </div>
                    </div>
                </section>

                {/* Live Streaming Section */}
                {wedding.youtube_url && (
                    <section className="py-20 bg-light-gray">
                        <div className="container mx-auto px-4">
                            <div className="max-w-2xl mx-auto text-center">
                                <Card className="card-elegant">
                                    <CardContent className="p-8">
                                        <h3 className="font-playfair text-3xl font-bold text-primary mb-4">
                                            {wedding.livestream_title || 'LIVE STREAMING'}
                                        </h3>
                                        <p className="font-source text-lg text-muted-foreground mb-6">
                                            {wedding.livestream_description || 'Watch our wedding virtually on IG Live OR YOUTUBE. Click link below to join with us.'}
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <Button
                                                onClick={() => window.open(wedding.youtube_url, '_blank')}
                                                className="btn-elegant"
                                            >
                                                <Youtube className="w-5 h-5 mr-2" />
                                                {wedding.livestream_button || 'YOUTUBE LIVE'}
                                            </Button>
                                            <Button
                                                onClick={() => window.open(wedding.youtube_url, '_blank')}
                                                className="btn-outline"
                                            >
                                                <Instagram className="w-5 h-5 mr-2" />
                                                INSTAGRAM LIVE
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>
                )}

                {/* Gallery Section */}
                {wedding.galleries && wedding.galleries.length > 0 && (
                    <section className="py-20 bg-background">
                        <div className="container mx-auto px-4">
                            <h2 className="section-title">
                                {wedding.section_gallery || 'Our Moments'}
                            </h2>
                            <div className="max-w-4xl mx-auto text-center mb-12">
                                <p className="font-playfair text-xl italic text-muted-foreground">
                                    "A happy marriage is a long conversation which always seems too short"
                                </p>
                            </div>
                            <Gallery
                                galleries={wedding.galleries}
                                youtubeUrl={wedding.youtube_url}
                            />
                        </div>
                    </section>
                )}

                {/* COVID Protocol Section */}
                {wedding.show_covid_protocol && (
                    <section className="py-20 bg-light-gray">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto">
                                <div className="covid-protocol">
                                    <h3 className="font-playfair text-2xl text-center mb-8">
                                        {wedding.information_title || 'Protokol Kesehatan'}
                                    </h3>
                                    <p className="font-source text-center text-muted-foreground mb-8">
                                        Untuk mematuhi himbauan pemerintah dalam penegakan kesehatan bersama maka diharapkan Bapak/Ibu/Saudara/i tamu undangan untuk :
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="covid-item">
                                            <div className="covid-item-icon">1</div>
                                            <span>Mencuci Tangan</span>
                                        </div>
                                        <div className="covid-item">
                                            <div className="covid-item-icon">2</div>
                                            <span>Menggunakan Sabun</span>
                                        </div>
                                        <div className="covid-item">
                                            <div className="covid-item-icon">3</div>
                                            <span>Pakai Hand Sanitizer</span>
                                        </div>
                                        <div className="covid-item">
                                            <div className="covid-item-icon">4</div>
                                            <span>Memakai Masker</span>
                                        </div>
                                        <div className="covid-item">
                                            <div className="covid-item-icon">5</div>
                                            <span>Jaga Jarak</span>
                                        </div>
                                        <div className="covid-item">
                                            <div className="covid-item-icon">6</div>
                                            <span>Tidak Berjabat Tangan</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Donation Section */}
                {wedding.is_donation_enabled && (
                    <section className="py-20 bg-background">
                        <div className="container mx-auto px-4">
                            <h2 className="section-title">
                                {wedding.section_donation || 'Doa Untuk Pengantin'}
                            </h2>
                            <div className="max-w-2xl mx-auto text-center">
                                <p className="font-source text-lg text-muted-foreground mb-8">
                                    {wedding.section_donation_sub || 'Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.'}
                                </p>
                                <Button
                                    onClick={onDonationClick || (() => {})}
                                    className="btn-elegant"
                                >
                                    <Gift className="w-5 h-5 mr-2" />
                                    {wedding.section_donation_button || 'Kirim Ucapan'}
                                </Button>
                            </div>
                        </div>
                    </section>
                )}

                {/* Guestbook Section */}
                {wedding.is_show_comment && wedding.comments && (
                    <section className="py-20 bg-light-gray">
                        <div className="container mx-auto px-4">
                            <Guestbook
                                comments={wedding.comments}
                                onSubmit={onCommentSubmit || (() => {})}
                                maxRsvp={wedding.max_rsvp || 5}
                                isInvitationEnabled={wedding.is_invitation_enabled || false}
                                labels={{
                                    title: wedding.section_guestbook || 'Kirim Ucapan',
                                    name: wedding.section_guestbook_name || 'Nama Anda',
                                    content: wedding.section_guestbook_content || 'Ucapan dan Doa',
                                    present: wedding.section_guestbook_present || 'Ya',
                                    notPresent: wedding.section_guestbook_no_present || 'Tidak',
                                    person: wedding.section_guestbook_person || 'Orang',
                                    send: wedding.section_guestbook_send_button || 'Kirim Ucapan',
                                    button: wedding.section_guestbook_button || 'Kirim Ucapan'
                                }}
                            />
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="footer-gradient py-16 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-4xl mx-auto">
                            <h3 className="font-playfair text-2xl font-light italic mb-6">
                                Atas kehadiran dan Doa Restunya kami ucapkan terimakasih.
                            </h3>
                            <h4 className="font-script text-4xl mb-8">
                                {getCoupleName()}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                                <div>
                                    <h5 className="font-playfair text-xl mb-4">Keluarga Besar {wedding.groom_name}</h5>
                                    <p className="font-source">
                                        Bpk. {wedding.groom_father_name} & Ibu {wedding.groom_mother_name}
                                    </p>
                                </div>
                                <div>
                                    <h5 className="font-playfair text-xl mb-4">Keluarga Besar {wedding.bride_name}</h5>
                                    <p className="font-source">
                                        Bpk. {wedding.bride_father_name} & Ibu {wedding.bride_mother_name}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-12 pt-8 border-t border-white/20">
                                <p className="font-source text-sm opacity-80">
                                    Digital Invitation Created by Inveet
                                </p>
                                <p className="font-source text-sm opacity-80 mt-2">
                                    Copyright 2024 @ Inveet - All Rights Reserved
                                </p>
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

export default LuxeeEleganceTheme;
