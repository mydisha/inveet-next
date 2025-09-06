import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import {
    Facebook,
    Gift,
    Heart,
    Instagram,
    MapPin,
    Pause,
    Play,
    Sparkles,
    Star,
    Twitter,
    MessageCircle as WhatsApp,
    Youtube,
    Zap
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
    Guestbook
} from '../components/BaseComponents';
import { InvitationThemeProps } from '../types';
import { uniqueModernStyles } from './unique-modern';

const UniqueModernTheme: React.FC<InvitationThemeProps> = ({
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
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const handleOpenInvitation = () => {
        setShowInvitation(true);
        onOpenInvitation?.();
    };

    const handleMusicToggle = () => {
        const newState = !isMusicPlaying;
        setIsMusicPlaying(newState);
        onMusicToggle?.(newState);
    };

    // Countdown timer
    useEffect(() => {
        if (!wedding.reception_date) return;

        const targetDate = new Date(wedding.reception_date).getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [wedding.reception_date]);

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
            <style dangerouslySetInnerHTML={{ __html: uniqueModernStyles }} />

            <div className="unique-modern-theme min-h-screen bg-background">
                {/* Invitation Popup */}
                {!showInvitation && (
                    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                        <div className="invitation-popup">
                            <h1 className="font-orbitron text-5xl mb-4">
                                {wedding.cover_title || 'THE WEDDING OF'}
                            </h1>
                            <h2 className="font-pacifico text-6xl mb-8">
                                {getCoupleName()}
                            </h2>

                            {invitation && (
                                <div className="mb-6">
                                    <p className="text-lg text-light mb-2">
                                        {wedding.popup_for || 'Kepada Yth.'}
                                    </p>
                                    <h3 className="text-2xl font-bold text-neon">
                                        {invitation.name}
                                        {invitation.is_vip && (
                                            <span className="ml-2 text-sm bg-accent text-white px-3 py-1 rounded-full">
                                                VIP
                                            </span>
                                        )}
                                    </h3>
                                </div>
                            )}

                            <p className="text-lg text-light mb-8">
                                {wedding.popup_footer || 'You are cordially invited to our wedding.'}
                            </p>

                            <Button
                                onClick={handleOpenInvitation}
                                className="btn-neon"
                            >
                                <Zap className="w-5 h-5 mr-2" />
                                {wedding.popup_button || 'Buka Undangan'}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Hero Section */}
                <div className="hero-section">
                    <div className="hero-bg-pattern" />
                    <div className="hero-content">
                        <h1 className="hero-title font-orbitron">
                            {wedding.cover_title || 'THE WEDDING OF'}
                        </h1>
                        <h2 className="hero-subtitle font-pacifico">
                            {getCoupleName()}
                        </h2>
                        <p className="hero-caption font-inter">
                            {wedding.popup_footer || 'You are cordially invited to our wedding.'}
                        </p>
                    </div>
                </div>

                {/* Quote Section */}
                {wedding.wedding_quotes && (
                    <section className="quote-section">
                        <div className="max-w-5xl mx-auto">
                            <p className="quote-text font-pacifico">
                                {wedding.wedding_quotes}
                            </p>
                        </div>
                    </section>
                )}

                {/* Couple Section */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <h2 className="section-title font-bebas">
                            {wedding.section_couple || 'The Happy Couple'}
                        </h2>

                        <div className="flex flex-col lg:flex-row items-center justify-center gap-20 max-w-7xl mx-auto">
                            {/* Groom */}
                            <div className="flex flex-col items-center text-center">
                                {wedding.is_enable_photo && wedding.groom_photo && (
                                    <img
                                        src={wedding.groom_photo}
                                        alt={wedding.groom_name}
                                        className="couple-photo mb-8"
                                    />
                                )}
                                <h3 className="couple-name font-orbitron">
                                    {wedding.groom_name}
                                </h3>
                                {wedding.groom_father_name && wedding.groom_mother_name && (
                                    <p className="couple-parents font-inter">
                                        Putra Pertama Bapak {wedding.groom_father_name} & Ibu {wedding.groom_mother_name}
                                    </p>
                                )}
                                <div className="social-icons">
                                    {wedding.groom_instagram && (
                                        <a
                                            href={`https://instagram.com/${wedding.groom_instagram}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-icon"
                                        >
                                            <Instagram className="w-6 h-6" />
                                        </a>
                                    )}
                                    <a href="#" className="social-icon">
                                        <Facebook className="w-6 h-6" />
                                    </a>
                                    <a href="#" className="social-icon">
                                        <Twitter className="w-6 h-6" />
                                    </a>
                                    <a href="#" className="social-icon">
                                        <Youtube className="w-6 h-6" />
                                    </a>
                                    <a href="#" className="social-icon">
                                        <WhatsApp className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>

                            {/* Heart Icon with Animation */}
                            <div className="text-8xl text-accent relative">
                                <Heart className="w-20 h-20 animate-pulse" />
                                <Sparkles className="w-6 h-6 text-neon absolute -top-2 -right-2 animate-spin" />
                                <Star className="w-4 h-4 text-gradient-1 absolute -bottom-2 -left-2 animate-bounce" />
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
                                <h3 className="couple-name font-orbitron">
                                    {wedding.bride_name}
                                </h3>
                                {wedding.bride_father_name && wedding.bride_mother_name && (
                                    <p className="couple-parents font-inter">
                                        Putri Ketiga Bapak {wedding.bride_father_name} & Ibu {wedding.bride_mother_name}
                                    </p>
                                )}
                                <div className="social-icons">
                                    {wedding.bride_instagram && (
                                        <a
                                            href={`https://instagram.com/${wedding.bride_instagram}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-icon"
                                        >
                                            <Instagram className="w-6 h-6" />
                                        </a>
                                    )}
                                    <a href="#" className="social-icon">
                                        <Facebook className="w-6 h-6" />
                                    </a>
                                    <a href="#" className="social-icon">
                                        <Twitter className="w-6 h-6" />
                                    </a>
                                    <a href="#" className="social-icon">
                                        <Youtube className="w-6 h-6" />
                                    </a>
                                    <a href="#" className="social-icon">
                                        <WhatsApp className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Countdown Section */}
                {wedding.is_countdown_enabled && wedding.reception_date && (
                    <section className="py-20 bg-background">
                        <div className="container mx-auto px-4">
                            <div className="countdown-container">
                                <h2 className="section-title font-bebas mb-8">
                                    {wedding.section_countdown || 'Save The Date'}
                                </h2>
                                <div className="flex flex-wrap justify-center gap-8">
                                    <div className="countdown-item">
                                        <span className="countdown-number font-orbitron">{timeLeft.days}</span>
                                        <span className="countdown-label font-inter">{wedding.section_countdown_days || 'Days'}</span>
                                    </div>
                                    <div className="countdown-item">
                                        <span className="countdown-number font-orbitron">{timeLeft.hours}</span>
                                        <span className="countdown-label font-inter">{wedding.section_countdown_hours || 'Hours'}</span>
                                    </div>
                                    <div className="countdown-item">
                                        <span className="countdown-number font-orbitron">{timeLeft.minutes}</span>
                                        <span className="countdown-label font-inter">{wedding.section_countdown_minutes || 'Minutes'}</span>
                                    </div>
                                    <div className="countdown-item">
                                        <span className="countdown-number font-orbitron">{timeLeft.seconds}</span>
                                        <span className="countdown-label font-inter">{wedding.section_countdown_seconds || 'Seconds'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Location Section */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <h2 className="section-title font-bebas">
                            {wedding.section_location || 'Wedding Events'}
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                            {wedding.is_show_ceremony && wedding.ceremony_place_name && (
                                <div className="location-card">
                                    <img
                                        src="/themes/assets/unique/date-icon.svg"
                                        alt="Date"
                                        className="location-icon"
                                    />
                                    <h3 className="location-title font-orbitron">
                                        {wedding.ceremony_type || 'Wedding Ceremony'}
                                    </h3>
                                    <p className="location-date font-inter">
                                        {formatDate(wedding.ceremony_date)}
                                    </p>
                                    <p className="location-venue font-inter">
                                        {wedding.ceremony_place_name}
                                    </p>
                                    <p className="location-address font-inter">
                                        {wedding.ceremony_location}
                                    </p>
                                    {wedding.is_navigation_enabled && wedding.ceremony_latitude && wedding.ceremony_longitude && (
                                        <Button
                                            onClick={() => {
                                                const url = `https://www.google.com/maps/dir/?api=1&destination=${wedding.ceremony_latitude},${wedding.ceremony_longitude}&dir_action=navigate`;
                                                window.open(url, '_blank');
                                            }}
                                            className="btn-outline-neon"
                                        >
                                            <MapPin className="w-4 h-4 mr-2" />
                                            {wedding.section_navigate_to || 'OPEN MAP'}
                                        </Button>
                                    )}
                                </div>
                            )}

                            {wedding.is_show_reception && wedding.reception_place_name && (
                                <div className="location-card">
                                    <img
                                        src="/themes/assets/unique/location-icon.svg"
                                        alt="Location"
                                        className="location-icon"
                                    />
                                    <h3 className="location-title font-orbitron">
                                        {wedding.reception_type || 'Wedding Reception'}
                                    </h3>
                                    <p className="location-date font-inter">
                                        {formatDate(wedding.reception_date)}
                                    </p>
                                    <p className="location-venue font-inter">
                                        {wedding.reception_place_name}
                                    </p>
                                    <p className="location-address font-inter">
                                        {wedding.reception_location}
                                    </p>
                                    {wedding.is_navigation_enabled && wedding.reception_latitude && wedding.reception_longitude && (
                                        <Button
                                            onClick={() => {
                                                const url = `https://www.google.com/maps/dir/?api=1&destination=${wedding.reception_latitude},${wedding.reception_longitude}&dir_action=navigate`;
                                                window.open(url, '_blank');
                                            }}
                                            className="btn-outline-neon"
                                        >
                                            <MapPin className="w-4 h-4 mr-2" />
                                            {wedding.section_navigate_to || 'OPEN MAP'}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Live Streaming Section */}
                {wedding.youtube_url && (
                    <section className="py-20 bg-background">
                        <div className="container mx-auto px-4">
                            <div className="max-w-3xl mx-auto">
                                <Card className="card-futuristic">
                                    <CardContent className="p-8 text-center">
                                        <h3 className="font-orbitron text-4xl font-bold text-neon mb-4">
                                            {wedding.livestream_title || 'LIVE STREAMING'}
                                        </h3>
                                        <p className="font-inter text-lg text-light mb-6">
                                            {wedding.livestream_description || 'Watch our wedding virtually on IG Live OR YOUTUBE. Click link below to join with us.'}
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <Button
                                                onClick={() => window.open(wedding.youtube_url, '_blank')}
                                                className="btn-neon"
                                            >
                                                <Youtube className="w-5 h-5 mr-2" />
                                                {wedding.livestream_button || 'YOUTUBE LIVE'}
                                            </Button>
                                            <Button
                                                onClick={() => window.open(wedding.youtube_url, '_blank')}
                                                className="btn-outline-neon"
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
                            <h2 className="section-title font-bebas">
                                {wedding.section_gallery || 'Our Moments'}
                            </h2>
                            <div className="max-w-5xl mx-auto text-center mb-12">
                                <p className="font-pacifico text-3xl italic text-light">
                                    "A happy marriage is a long conversation which always seems too short"
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                                {wedding.galleries.map((gallery, index) => (
                                    <div key={gallery.id} className="gallery-item" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <img
                                            src={gallery.filename}
                                            alt={gallery.alt_text}
                                            className="w-full h-96 object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* COVID Protocol Section */}
                {wedding.show_covid_protocol && (
                    <section className="py-20 bg-background">
                        <div className="container mx-auto px-4">
                            <div className="max-w-5xl mx-auto">
                                <div className="covid-protocol">
                                    <h3 className="covid-title font-orbitron">
                                        {wedding.information_title || 'Protokol Kesehatan'}
                                    </h3>
                                    <p className="covid-description font-inter">
                                        Untuk mematuhi himbauan pemerintah dalam penegakan kesehatan bersama maka diharapkan Bapak/Ibu/Saudara/i tamu undangan untuk :
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            'Mencuci Tangan',
                                            'Menggunakan Sabun',
                                            'Pakai Hand Sanitizer',
                                            'Memakai Masker',
                                            'Jaga Jarak',
                                            'Tidak Berjabat Tangan'
                                        ].map((item, index) => (
                                            <div key={index} className="covid-item" style={{ animationDelay: `${index * 0.1}s` }}>
                                                <div className="covid-item-icon">{index + 1}</div>
                                                <span className="covid-item-text">{item}</span>
                                            </div>
                                        ))}
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
                            <h2 className="section-title font-bebas">
                                {wedding.section_donation || 'Doa Untuk Pengantin'}
                            </h2>
                            <div className="max-w-3xl mx-auto text-center">
                                <p className="font-inter text-lg text-light mb-8">
                                    {wedding.section_donation_sub || 'Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.'}
                                </p>
                                <Button
                                    onClick={onDonationClick || (() => {})}
                                    className="btn-neon"
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
                    <section className="py-20 bg-background">
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
                <footer className="footer-gradient">
                    <div className="container mx-auto px-4">
                        <div className="footer-content">
                            <h3 className="footer-title font-pacifico">
                                Atas kehadiran dan Doa Restunya kami ucapkan terimakasih.
                            </h3>
                            <h4 className="footer-subtitle font-inter">
                                Kami Yang Berbahagia, Keluarga Besar Kedua Mempelai
                            </h4>
                            <h5 className="footer-couple font-orbitron">
                                {getCoupleName()}
                            </h5>

                            <div className="footer-families">
                                <div className="footer-family">
                                    <h6 className="footer-family-title font-inter">
                                        Keluarga Besar {wedding.groom_name}
                                    </h6>
                                    <p className="footer-family-names font-inter">
                                        Bpk. {wedding.groom_father_name} & Ibu {wedding.groom_mother_name}
                                    </p>
                                </div>
                                <div className="footer-family">
                                    <h6 className="footer-family-title font-inter">
                                        Keluarga Besar {wedding.bride_name}
                                    </h6>
                                    <p className="footer-family-names font-inter">
                                        Bpk. {wedding.bride_father_name} & Ibu {wedding.bride_mother_name}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <p className="font-inter text-sm opacity-80">
                                    Digital Invitation Created by Inveet
                                </p>
                                <p className="font-inter text-sm opacity-80 mt-2">
                                    Copyright 2024 @ Inveet - All Rights Reserved
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>

                {/* Music Player */}
                {wedding.is_music_enabled && wedding.wedding_music && (
                    <div className="music-player">
                        <button
                            onClick={handleMusicToggle}
                            className="music-toggle"
                        >
                            {isMusicPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default UniqueModernTheme;
