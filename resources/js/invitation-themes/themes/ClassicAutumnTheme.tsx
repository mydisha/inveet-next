import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';
import {
    Facebook,
    Gift,
    Heart,
    Instagram,
    MapPin,
    Pause,
    Play,
    Twitter,
    MessageCircle as WhatsApp,
    Youtube
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
    Guestbook
} from '../components/BaseComponents';
import { InvitationThemeProps } from '../types';
import { classicAutumnStyles } from './classic-autumn';

const ClassicAutumnTheme: React.FC<InvitationThemeProps> = ({
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
            <style dangerouslySetInnerHTML={{ __html: classicAutumnStyles }} />

            <div className="classic-autumn-theme min-h-screen bg-background">
                {/* Invitation Popup */}
                {!showInvitation && (
                    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                        <div className="invitation-popup">
                            <h1 className="font-satisfy text-4xl mb-4">
                                {wedding.cover_title || 'Undangan Pernikahan'}
                            </h1>
                            <h2 className="font-poppins text-2xl mb-8">
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
                                            <span className="ml-2 text-sm bg-primary text-white px-2 py-1 rounded">
                                                VIP
                                            </span>
                                        )}
                                    </h3>
                                </div>
                            )}

                            <p className="text-lg text-muted-foreground mb-8">
                                {wedding.popup_footer || 'Tanpa mengurangi rasa hormat, kami bermaksud mengundang bapak / ibu / saudara/i untuk berhadir pada acara kami.'}
                            </p>

                            <Button
                                onClick={handleOpenInvitation}
                                className="btn-send"
                            >
                                {wedding.popup_button || 'Buka Undangan'}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Hero Section */}
                <div className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title font-satisfy">
                            {wedding.cover_title || 'Undangan Pernikahan'}
                        </h1>
                        <h2 className="hero-subtitle font-poppins letter-spacing-font">
                            {getCoupleName()}
                        </h2>
                        <p className="hero-caption font-poppins">
                            {wedding.popup_footer || 'Tanpa mengurangi rasa hormat, kami bermaksud mengundang bapak / ibu / saudara/i untuk berhadir pada acara kami.'}
                        </p>
                    </div>
                </div>

                {/* Quote Section */}
                {wedding.wedding_quotes && (
                    <section className="py-20 bg-white">
                        <div className="container mx-auto px-4 text-center">
                            <div className="max-w-4xl mx-auto">
                                <p className="font-satisfy text-3xl text-primary italic leading-relaxed">
                                    "{wedding.wedding_quotes}"
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* Couple Section */}
                <section className="couple-section bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="section-title font-satisfy">
                            {wedding.section_couple || 'Mempelai'}
                        </h2>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-16 max-w-6xl mx-auto">
                            {/* Groom */}
                            <div className="flex flex-col items-center text-center">
                                {wedding.is_enable_photo && wedding.groom_photo && (
                                    <img
                                        src={wedding.groom_photo}
                                        alt={wedding.groom_name}
                                        className="couple-photo"
                                    />
                                )}
                                <h3 className="couple-name font-poppins">
                                    {wedding.groom_name}
                                </h3>
                                {wedding.groom_father_name && wedding.groom_mother_name && (
                                    <p className="couple-parents font-poppins">
                                        Putra dari Bapak {wedding.groom_father_name} & Ibu {wedding.groom_mother_name}
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
                            <div className="text-6xl text-primary">
                                <Heart className="w-16 h-16" />
                            </div>

                            {/* Bride */}
                            <div className="flex flex-col items-center text-center">
                                {wedding.is_enable_photo && wedding.bride_photo && (
                                    <img
                                        src={wedding.bride_photo}
                                        alt={wedding.bride_name}
                                        className="couple-photo"
                                    />
                                )}
                                <h3 className="couple-name font-poppins">
                                    {wedding.bride_name}
                                </h3>
                                {wedding.bride_father_name && wedding.bride_mother_name && (
                                    <p className="couple-parents font-poppins">
                                        Putri dari Bapak {wedding.bride_father_name} & Ibu {wedding.bride_mother_name}
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
                    <section className="py-20 bg-background">
                        <div className="container mx-auto px-4">
                            <div className="countdown-container">
                                <h2 className="section-title font-satisfy mb-8">
                                    {wedding.section_countdown || 'Hitung Mundur'}
                                </h2>
                                <div className="flex flex-wrap justify-center gap-8">
                                    <div className="countdown-item">
                                        <span className="countdown-number font-poppins">{timeLeft.days}</span>
                                        <span className="countdown-label font-poppins">{wedding.section_countdown_days || 'Hari'}</span>
                                    </div>
                                    <div className="countdown-item">
                                        <span className="countdown-number font-poppins">{timeLeft.hours}</span>
                                        <span className="countdown-label font-poppins">{wedding.section_countdown_hours || 'Jam'}</span>
                                    </div>
                                    <div className="countdown-item">
                                        <span className="countdown-number font-poppins">{timeLeft.minutes}</span>
                                        <span className="countdown-label font-poppins">{wedding.section_countdown_minutes || 'Menit'}</span>
                                    </div>
                                    <div className="countdown-item">
                                        <span className="countdown-number font-poppins">{timeLeft.seconds}</span>
                                        <span className="countdown-label font-poppins">{wedding.section_countdown_seconds || 'Detik'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Location Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="section-title font-satisfy">
                            {wedding.section_location || 'Acara Pernikahan'}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {wedding.is_show_ceremony && wedding.ceremony_place_name && (
                                <div className="location-card">
                                    <img
                                        src="/themes/assets/images/date.png"
                                        alt="Date"
                                        className="location-icon"
                                    />
                                    <h3 className="location-title font-poppins">
                                        {wedding.ceremony_type || 'Akad Nikah'}
                                    </h3>
                                    <p className="location-date font-poppins">
                                        {formatDate(wedding.ceremony_date)}
                                    </p>
                                    <p className="location-venue font-poppins">
                                        {wedding.ceremony_place_name}
                                    </p>
                                    <p className="location-address font-poppins">
                                        {wedding.ceremony_location}
                                    </p>
                                    {wedding.is_navigation_enabled && wedding.ceremony_latitude && wedding.ceremony_longitude && (
                                        <Button
                                            onClick={() => {
                                                const url = `https://www.google.com/maps/dir/?api=1&destination=${wedding.ceremony_latitude},${wedding.ceremony_longitude}&dir_action=navigate`;
                                                window.open(url, '_blank');
                                            }}
                                            className="btn-gm"
                                        >
                                            <MapPin className="w-4 h-4 mr-2" />
                                            {wedding.section_navigate_to || 'Buka Peta'}
                                        </Button>
                                    )}
                                </div>
                            )}

                            {wedding.is_show_reception && wedding.reception_place_name && (
                                <div className="location-card">
                                    <img
                                        src="/themes/assets/images/location.png"
                                        alt="Location"
                                        className="location-icon"
                                    />
                                    <h3 className="location-title font-poppins">
                                        {wedding.reception_type || 'Resepsi Pernikahan'}
                                    </h3>
                                    <p className="location-date font-poppins">
                                        {formatDate(wedding.reception_date)}
                                    </p>
                                    <p className="location-venue font-poppins">
                                        {wedding.reception_place_name}
                                    </p>
                                    <p className="location-address font-poppins">
                                        {wedding.reception_location}
                                    </p>
                                    {wedding.is_navigation_enabled && wedding.reception_latitude && wedding.reception_longitude && (
                                        <Button
                                            onClick={() => {
                                                const url = `https://www.google.com/maps/dir/?api=1&destination=${wedding.reception_latitude},${wedding.reception_longitude}&dir_action=navigate`;
                                                window.open(url, '_blank');
                                            }}
                                            className="btn-gm"
                                        >
                                            <MapPin className="w-4 h-4 mr-2" />
                                            {wedding.section_navigate_to || 'Buka Peta'}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                {wedding.galleries && wedding.galleries.length > 0 && (
                    <section className="py-20 bg-background">
                        <div className="container mx-auto px-4">
                            <h2 className="section-title font-satisfy">
                                {wedding.section_gallery || 'Galeri'}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                                {wedding.galleries.map((gallery) => (
                                    <div key={gallery.id} className="gallery-item">
                                        <img
                                            src={gallery.filename}
                                            alt={gallery.alt_text}
                                            className="w-full h-64 object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* COVID Protocol Section */}
                {wedding.show_covid_protocol && (
                    <section className="py-20 bg-white">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="section-title font-satisfy">
                                    {wedding.information_title || 'Protokol Kesehatan'}
                                </h2>
                                <div className="bg-background rounded-lg p-8">
                                    <p className="font-poppins text-lg text-muted-foreground mb-8">
                                        Untuk mematuhi himbauan pemerintah dalam penegakan kesehatan bersama maka diharapkan Bapak/Ibu/Saudara/i tamu undangan untuk :
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                                            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mr-4 font-bold">1</div>
                                            <span className="font-poppins">Mencuci Tangan</span>
                                        </div>
                                        <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                                            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mr-4 font-bold">2</div>
                                            <span className="font-poppins">Menggunakan Sabun</span>
                                        </div>
                                        <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                                            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mr-4 font-bold">3</div>
                                            <span className="font-poppins">Pakai Hand Sanitizer</span>
                                        </div>
                                        <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                                            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mr-4 font-bold">4</div>
                                            <span className="font-poppins">Memakai Masker</span>
                                        </div>
                                        <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                                            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mr-4 font-bold">5</div>
                                            <span className="font-poppins">Jaga Jarak</span>
                                        </div>
                                        <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                                            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mr-4 font-bold">6</div>
                                            <span className="font-poppins">Tidak Berjabat Tangan</span>
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
                            <h2 className="section-title font-satisfy">
                                {wedding.section_donation || 'Doa Untuk Pengantin'}
                            </h2>
                            <div className="max-w-2xl mx-auto text-center">
                                <p className="font-poppins text-lg text-muted-foreground mb-8">
                                    {wedding.section_donation_sub || 'Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.'}
                                </p>
                                <Button
                                    onClick={onDonationClick || (() => {})}
                                    className="btn-send"
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
                    <section className="py-20 bg-white">
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
                <footer className="footer-section">
                    <div className="container mx-auto px-4">
                        <h3 className="footer-title font-satisfy">
                            Atas kehadiran dan Doa Restunya kami ucapkan terimakasih.
                        </h3>
                        <h4 className="footer-subtitle font-poppins">
                            Kami Yang Berbahagia,
                        </h4>
                        <h5 className="footer-couple font-poppins">
                            {getCoupleName()}
                        </h5>

                        <div className="footer-families">
                            <div className="footer-family">
                                <h6 className="footer-family-title font-poppins">
                                    Keluarga Besar {wedding.groom_name}
                                </h6>
                                <p className="footer-family-names font-poppins">
                                    Bpk. {wedding.groom_father_name} & Ibu {wedding.groom_mother_name}
                                </p>
                            </div>
                            <div className="footer-family">
                                <h6 className="footer-family-title font-poppins">
                                    Keluarga Besar {wedding.bride_name}
                                </h6>
                                <p className="footer-family-names font-poppins">
                                    Bpk. {wedding.bride_father_name} & Ibu {wedding.bride_mother_name}
                                </p>
                            </div>
                        </div>

                        <hr className="line" />

                        <div className="mt-8">
                            <p className="font-poppins text-sm opacity-80">
                                Digital Invitation Created by Inveet
                            </p>
                            <p className="font-poppins text-sm opacity-80 mt-2">
                                Copyright 2024 @ Inveet - All Rights Reserved
                            </p>
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
                            {isMusicPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ClassicAutumnTheme;
