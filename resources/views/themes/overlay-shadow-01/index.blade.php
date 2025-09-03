<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $wedding->title ?? 'Wedding Invitation' }}</title>
    <meta name="description" content="Wedding invitation for {{ $wedding->groom_name ?? 'Groom' }} & {{ $wedding->bride_name ?? 'Bride' }}">

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="{{ $wedding->title ?? 'Wedding Invitation' }}">
    <meta property="og:description" content="Wedding invitation for {{ $wedding->groom_name ?? 'Groom' }} & {{ $wedding->bride_name ?? 'Bride' }}">
    <meta property="og:image" content="{{ asset('themes/overlay-shadow-01/assets/og-image.jpg') }}">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:type" content="website">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }

        .container {
            max-width: 100%;
            margin: 0 auto;
            position: relative;
        }

        /* Hero Section */
        .hero-section {
            min-height: 100vh;
            background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('{{ asset("themes/overlay-shadow-01/assets/hero-bg.jpg") }}');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            position: relative;
        }

        .hero-content {
            max-width: 600px;
            padding: 2rem;
            z-index: 2;
        }

        .hero-title {
            font-family: 'Playfair Display', serif;
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        .hero-subtitle {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }

        .hero-names {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #f8f8f8;
        }

        .hero-ampersand {
            font-size: 2rem;
            margin: 0 1rem;
            color: #ffd700;
        }

        .invitation-text {
            font-size: 1.1rem;
            margin-bottom: 2rem;
            font-style: italic;
        }

        .open-invitation-btn {
            background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
        }

        .open-invitation-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
        }

        /* Quote Section */
        .quote-section {
            padding: 4rem 2rem;
            background: white;
            text-align: center;
        }

        .quote-text {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            font-style: italic;
            color: #555;
            max-width: 800px;
            margin: 0 auto 1rem;
            line-height: 1.8;
        }

        .quote-reference {
            font-size: 0.9rem;
            color: #888;
            margin-top: 1rem;
        }

        /* Couple Section */
        .couple-section {
            padding: 4rem 2rem;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .couple-container {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }

        .couple-card {
            text-align: center;
            background: white;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }

        .couple-card:hover {
            transform: translateY(-5px);
        }

        .couple-image {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            object-fit: cover;
            margin: 0 auto 1.5rem;
            border: 5px solid #ffd700;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .couple-name {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 0.5rem;
        }

        .couple-title {
            font-size: 1.1rem;
            color: #666;
            margin-bottom: 1rem;
        }

        .couple-parents {
            font-size: 0.9rem;
            color: #888;
            line-height: 1.5;
        }

        .social-links {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 1.5rem;
        }

        .social-link {
            width: 40px;
            height: 40px;
            background: #f0f0f0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: #666;
            transition: all 0.3s ease;
        }

        .social-link:hover {
            background: #ffd700;
            color: white;
            transform: scale(1.1);
        }

        /* Event Section */
        .event-section {
            padding: 4rem 2rem;
            background: white;
        }

        .event-container {
            max-width: 1000px;
            margin: 0 auto;
        }

        .event-title {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            text-align: center;
            margin-bottom: 3rem;
            color: #333;
        }

        .events-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
        }

        .event-card {
            text-align: center;
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .event-type {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }

        .event-date {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
        }

        .event-time {
            font-size: 1.1rem;
            margin-bottom: 1rem;
        }

        .event-location {
            font-size: 1rem;
            margin-bottom: 1.5rem;
            opacity: 0.9;
        }

        .maps-btn {
            background: rgba(255,255,255,0.2);
            color: white;
            padding: 0.8rem 1.5rem;
            border: 2px solid white;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .maps-btn:hover {
            background: white;
            color: #667eea;
        }

        /* Gallery Section */
        .gallery-section {
            padding: 4rem 2rem;
            background: #f8f9fa;
        }

        .gallery-container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .gallery-title {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            text-align: center;
            margin-bottom: 3rem;
            color: #333;
        }

        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .gallery-item {
            position: relative;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }

        .gallery-item:hover {
            transform: scale(1.05);
        }

        .gallery-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
        }

        /* RSVP Section */
        .rsvp-section {
            padding: 4rem 2rem;
            background: white;
        }

        .rsvp-container {
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
        }

        .rsvp-title {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            margin-bottom: 2rem;
            color: #333;
        }

        .rsvp-form {
            background: #f8f9fa;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .form-group {
            margin-bottom: 1.5rem;
            text-align: left;
        }

        .form-label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
        }

        .form-input {
            width: 100%;
            padding: 1rem;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }

        .form-input:focus {
            outline: none;
            border-color: #667eea;
        }

        .form-select {
            width: 100%;
            padding: 1rem;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 1rem;
            background: white;
        }

        .submit-btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
        }

        .submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        /* Digital Envelope Section */
        .envelope-section {
            padding: 4rem 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
        }

        .envelope-container {
            max-width: 800px;
            margin: 0 auto;
        }

        .envelope-title {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            margin-bottom: 2rem;
        }

        .envelope-description {
            font-size: 1.1rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }

        .bank-accounts {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .bank-account {
            background: rgba(255,255,255,0.1);
            padding: 1.5rem;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }

        .bank-name {
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .bank-number {
            font-family: monospace;
            font-size: 1.1rem;
            margin-bottom: 1rem;
        }

        .copy-btn {
            background: rgba(255,255,255,0.2);
            color: white;
            padding: 0.5rem 1rem;
            border: 1px solid white;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .copy-btn:hover {
            background: white;
            color: #667eea;
        }

        /* Footer */
        .footer {
            padding: 3rem 2rem;
            background: #333;
            color: white;
            text-align: center;
        }

        .footer-content {
            max-width: 800px;
            margin: 0 auto;
        }

        .footer-title {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            margin-bottom: 1rem;
        }

        .footer-text {
            font-size: 1rem;
            margin-bottom: 2rem;
            opacity: 0.8;
        }

        .family-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .family-card {
            background: rgba(255,255,255,0.1);
            padding: 1.5rem;
            border-radius: 15px;
        }

        .family-name {
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .family-parents {
            font-size: 0.9rem;
            opacity: 0.8;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .hero-title {
                font-size: 2.5rem;
            }

            .hero-names {
                font-size: 2rem;
            }

            .couple-container {
                grid-template-columns: 1fr;
                gap: 2rem;
            }

            .events-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }

            .bank-accounts {
                grid-template-columns: 1fr;
            }

            .family-info {
                grid-template-columns: 1fr;
            }
        }

        /* Animation */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .fade-in-up {
            animation: fadeInUp 0.8s ease-out;
        }

        /* Countdown Timer */
        .countdown-section {
            padding: 2rem;
            background: rgba(0,0,0,0.8);
            color: white;
            text-align: center;
        }

        .countdown-container {
            max-width: 600px;
            margin: 0 auto;
        }

        .countdown-title {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            margin-bottom: 2rem;
        }

        .countdown-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
        }

        .countdown-item {
            background: rgba(255,255,255,0.1);
            padding: 1rem;
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }

        .countdown-number {
            font-size: 2rem;
            font-weight: 700;
            color: #ffd700;
        }

        .countdown-label {
            font-size: 0.9rem;
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="hero-content fade-in-up">
            <h1 class="hero-title">Wedding Invitation</h1>
            <div class="hero-names">
                {{ $wedding->groom_name ?? 'Levi' }}
                <span class="hero-ampersand">&</span>
                {{ $wedding->bride_name ?? 'Dio' }}
            </div>
            <p class="hero-subtitle">Dear,</p>
            <p class="hero-subtitle">Tamu Undangan</p>
            <p class="invitation-text">you're invited to our wedding ceremony</p>
            <a href="#invitation" class="open-invitation-btn">Open Invitation</a>
        </div>
    </section>

    <!-- Quote Section -->
    <section class="quote-section">
        <div class="container">
            <p class="quote-text">
                "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
            </p>
            <p class="quote-reference">QS Ar-rum 21</p>
        </div>
    </section>

    <!-- Couple Section -->
    <section class="couple-section">
        <div class="couple-container">
            <!-- Bride -->
            <div class="couple-card fade-in-up">
                <img src="{{ asset('themes/overlay-shadow-01/assets/bride.jpg') }}" alt="Bride" class="couple-image">
                <h3 class="couple-name">{{ $wedding->bride_name ?? 'Levi' }}</h3>
                <p class="couple-title">The Bride</p>
                <p class="couple-parents">
                    Anak Pertama dari Keluarga<br>
                    Bapak {{ $wedding->bride_father_name ?? 'Lorem' }} & Ibu {{ $wedding->bride_mother_name ?? 'Ipsum' }}
                </p>
                <div class="social-links">
                    <a href="#" class="social-link">📘</a>
                    <a href="#" class="social-link">🐦</a>
                    <a href="#" class="social-link">📺</a>
                    <a href="#" class="social-link">🎵</a>
                    <a href="#" class="social-link">💬</a>
                </div>
            </div>

            <!-- Groom -->
            <div class="couple-card fade-in-up">
                <img src="{{ asset('themes/overlay-shadow-01/assets/groom.jpg') }}" alt="Groom" class="couple-image">
                <h3 class="couple-name">{{ $wedding->groom_name ?? 'Dio' }}</h3>
                <p class="couple-title">The Groom</p>
                <p class="couple-parents">
                    Anak Kedua dari Keluarga<br>
                    Bapak {{ $wedding->groom_father_name ?? 'Lorem' }} & Ibu {{ $wedding->groom_mother_name ?? 'Ipsum' }}
                </p>
                <div class="social-links">
                    <a href="#" class="social-link">📘</a>
                    <a href="#" class="social-link">🐦</a>
                    <a href="#" class="social-link">📺</a>
                    <a href="#" class="social-link">🎵</a>
                    <a href="#" class="social-link">💬</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Countdown Section -->
    <section class="countdown-section">
        <div class="countdown-container">
            <h2 class="countdown-title">Akad Nikah</h2>
            <div class="countdown-grid">
                <div class="countdown-item">
                    <div class="countdown-number" id="days">00</div>
                    <div class="countdown-label">Hari</div>
                </div>
                <div class="countdown-item">
                    <div class="countdown-number" id="hours">00</div>
                    <div class="countdown-label">Jam</div>
                </div>
                <div class="countdown-item">
                    <div class="countdown-number" id="minutes">00</div>
                    <div class="countdown-label">Menit</div>
                </div>
                <div class="countdown-item">
                    <div class="countdown-number" id="seconds">00</div>
                    <div class="countdown-label">Detik</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Event Section -->
    <section class="event-section">
        <div class="event-container">
            <h2 class="event-title">Wedding Event</h2>
            <div class="events-grid">
                <!-- Akad Nikah -->
                <div class="event-card fade-in-up">
                    <h3 class="event-type">Akad Nikah</h3>
                    <p class="event-date">{{ $wedding->akad_date ?? '12.12.2x' }}</p>
                    <p class="event-time">{{ $wedding->akad_time ?? '08.00 AM' }}</p>
                    <p class="event-location">{{ $wedding->akad_location ?? 'HOUSE OF THE BRIDE' }}</p>
                    <a href="#" class="maps-btn">BUKA MAPS</a>
                </div>

                <!-- Resepsi -->
                <div class="event-card fade-in-up">
                    <h3 class="event-type">Resepsi Pernikahan</h3>
                    <p class="event-date">{{ $wedding->reception_date ?? '13.12.2x' }}</p>
                    <p class="event-time">{{ $wedding->reception_time ?? '02.00 - 05.00 PM' }}</p>
                    <p class="event-location">{{ $wedding->reception_location ?? 'ROOTPIXEL HALL' }}</p>
                    <a href="#" class="maps-btn">BUKA MAPS</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Gallery Section -->
    <section class="gallery-section">
        <div class="gallery-container">
            <h2 class="gallery-title">Our Gallery</h2>
            <p class="quote-text" style="text-align: center; margin-bottom: 3rem;">
                "Doubt thou the stars are fire; Doubt that the sun doth move; Doubt truth to be a liar; But never doubt I love."
            </p>
            <p class="quote-reference" style="text-align: center; margin-bottom: 3rem;">William Shakespeare</p>

            <div class="gallery-grid">
                <div class="gallery-item">
                    <img src="{{ asset('themes/overlay-shadow-01/assets/gallery-1.jpg') }}" alt="Gallery 1" class="gallery-image">
                </div>
                <div class="gallery-item">
                    <img src="{{ asset('themes/overlay-shadow-01/assets/gallery-2.jpg') }}" alt="Gallery 2" class="gallery-image">
                </div>
                <div class="gallery-item">
                    <img src="{{ asset('themes/overlay-shadow-01/assets/gallery-3.jpg') }}" alt="Gallery 3" class="gallery-image">
                </div>
                <div class="gallery-item">
                    <img src="{{ asset('themes/overlay-shadow-01/assets/gallery-4.jpg') }}" alt="Gallery 4" class="gallery-image">
                </div>
            </div>
        </div>
    </section>

    <!-- RSVP Section -->
    <section class="rsvp-section">
        <div class="rsvp-container">
            <h2 class="rsvp-title">Reservation</h2>
            <p style="margin-bottom: 2rem; color: #666;">
                Please kindly help us prepare everything better by confirming your attendance to our wedding event with the following RSVP form
            </p>

            <form class="rsvp-form">
                <div class="form-group">
                    <label class="form-label">Nama Anda</label>
                    <input type="text" class="form-input" placeholder="Masukkan nama lengkap">
                </div>

                <div class="form-group">
                    <label class="form-label">No. HP</label>
                    <input type="tel" class="form-input" placeholder="Masukkan nomor handphone">
                </div>

                <div class="form-group">
                    <label class="form-label">Bersedia Hadir Diacara Kami?</label>
                    <select class="form-select">
                        <option value="">Pilih jawaban</option>
                        <option value="yes">Ya</option>
                        <option value="no">Tidak</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Kirim Ucapan</label>
                    <textarea class="form-input" rows="4" placeholder="Tuliskan ucapan untuk mempelai"></textarea>
                </div>

                <button type="submit" class="submit-btn">Kirim Ucapan</button>
            </form>
        </div>
    </section>

    <!-- Digital Envelope Section -->
    <section class="envelope-section">
        <div class="envelope-container">
            <h2 class="envelope-title">Amplop Digital</h2>
            <p class="envelope-description">
                Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
            </p>

            <div class="bank-accounts">
                <div class="bank-account">
                    <div class="bank-name">Luxee Template 1</div>
                    <div class="bank-number">0147 8523 69xx a.n Luxee</div>
                    <button class="copy-btn">Salin No. Rekening</button>
                </div>
                <div class="bank-account">
                    <div class="bank-name">Luxee Template 2</div>
                    <div class="bank-number">0147 8523 69xx a.n Luxee</div>
                    <button class="copy-btn">Salin No. Rekening</button>
                </div>
                <div class="bank-account">
                    <div class="bank-name">Luxee Template 3</div>
                    <div class="bank-number">0147 8523 69xx a.n Luxee</div>
                    <button class="copy-btn">Salin No. Rekening</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <h2 class="footer-title">TERIMA KASIH</h2>
            <p class="footer-text">Atas Kehadiran & Doa Restunya</p>
            <p class="footer-text">Kami Yang Berbahagia, Keluarga Besar Kedua Mempelai</p>

            <div class="family-info">
                <div class="family-card">
                    <div class="family-name">Keluarga Besar {{ $wedding->groom_name ?? 'Dio Ahmad' }}</div>
                    <div class="family-parents">Bpk. {{ $wedding->groom_father_name ?? 'Ahmad' }} & Ibu {{ $wedding->groom_mother_name ?? 'Dio' }}</div>
                </div>
                <div class="family-card">
                    <div class="family-name">Keluarga Besar {{ $wedding->bride_name ?? 'Levi Ana' }}</div>
                    <div class="family-parents">Bpk. {{ $wedding->bride_father_name ?? 'Levi' }} & Ibu {{ $wedding->bride_mother_name ?? 'Ana' }}</div>
                </div>
            </div>

            <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.2);">
                <p style="font-size: 0.9rem; opacity: 0.7;">
                    Digital Invitation Created by Inveet<br>
                    Copyright 2024 © All rights Reserved.<br>
                    Design by Inveet - {{ $wedding->groom_name ?? 'Groom' }}{{ $wedding->bride_name ?? 'Bride' }}
                </p>
            </div>
        </div>
    </footer>

    <script>
        // Countdown Timer
        function updateCountdown() {
            const weddingDate = new Date('{{ $wedding->akad_date ?? "2024-12-12" }}').getTime();
            const now = new Date().getTime();
            const distance = weddingDate - now;

            if (distance < 0) {
                document.getElementById('days').innerHTML = '00';
                document.getElementById('hours').innerHTML = '00';
                document.getElementById('minutes').innerHTML = '00';
                document.getElementById('seconds').innerHTML = '00';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
            document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
            document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
        }

        // Update countdown every second
        setInterval(updateCountdown, 1000);
        updateCountdown();

        // Copy bank account number
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const accountNumber = this.previousElementSibling.textContent;
                navigator.clipboard.writeText(accountNumber).then(() => {
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = 'Salin No. Rekening';
                    }, 2000);
                });
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission
        document.querySelector('.rsvp-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Terima kasih! RSVP Anda telah dikirim.');
        });
    </script>
</body>
</html>
