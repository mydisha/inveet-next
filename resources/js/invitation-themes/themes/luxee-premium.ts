import { ThemeConfig } from '../types';

export const luxeePremiumTheme: ThemeConfig = {
  id: 'luxee-premium',
  name: 'Luxee Premium',
  description: 'An elegant and sophisticated theme inspired by Luxee Premium design with clean typography and refined aesthetics',
  colors: {
    primary: '#2C3E50',
    secondary: '#E8F4FD',
    accent: '#D4AF37',
    background: '#FFFFFF',
    text: '#2C3E50',
    textLight: '#7F8C8D',
    gold: '#D4AF37',
    navy: '#2C3E50',
    lightBlue: '#E8F4FD',
    cream: '#F8F9FA'
  },
  fonts: {
    heading: 'Playfair Display, serif',
    body: 'Source Sans Pro, sans-serif',
    script: 'Dancing Script, cursive',
    elegant: 'Cormorant Garamond, serif'
  },
  assets: {
    coverBackground: '/themes/assets/luxee/hero-bg.jpg',
    decorativeElements: [
      '/themes/assets/luxee/ornament-1.png',
      '/themes/assets/luxee/ornament-2.png',
      '/themes/assets/luxee/pattern.png',
      '/themes/assets/luxee/floral-border.png'
    ],
    icons: {
      date: '/themes/assets/luxee/date-icon.png',
      location: '/themes/assets/luxee/location-icon.png',
      heart: '/themes/assets/luxee/heart-icon.png',
      facebook: '/themes/assets/luxee/facebook.svg',
      twitter: '/themes/assets/luxee/twitter.svg',
      youtube: '/themes/assets/luxee/youtube.svg',
      instagram: '/themes/assets/luxee/instagram.svg',
      whatsapp: '/themes/assets/luxee/whatsapp.svg'
    }
  },
  layout: {
    coverHeight: 'full',
    coupleLayout: 'side-by-side',
    locationLayout: 'cards',
    galleryLayout: 'grid'
  }
};

export const luxeePremiumStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');

  .luxee-premium-theme {
    --primary-color: #2C3E50;
    --secondary-color: #E8F4FD;
    --accent-color: #D4AF37;
    --background-color: #FFFFFF;
    --text-color: #2C3E50;
    --text-light: #7F8C8D;
    --gold-color: #D4AF37;
    --navy-color: #2C3E50;
    --light-blue: #E8F4FD;
    --cream-color: #F8F9FA;
    --gradient-primary: linear-gradient(135deg, #2C3E50, #34495E);
    --gradient-gold: linear-gradient(135deg, #D4AF37, #F4D03F);
    --gradient-light: linear-gradient(135deg, #E8F4FD, #F8F9FA);
  }

  .luxee-premium-theme * {
    box-sizing: border-box;
  }

  .luxee-premium-theme body {
    font-family: 'Source Sans Pro', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
  }

  .luxee-premium-theme .font-playfair {
    font-family: 'Playfair Display', serif;
  }

  .luxee-premium-theme .font-source {
    font-family: 'Source Sans Pro', sans-serif;
  }

  .luxee-premium-theme .font-script {
    font-family: 'Dancing Script', cursive;
  }

  .luxee-premium-theme .font-elegant {
    font-family: 'Cormorant Garamond', serif;
  }

  .luxee-premium-theme .hero-section {
    position: relative;
    height: 100vh;
    background: var(--gradient-light);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .luxee-premium-theme .hero-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/themes/assets/luxee/pattern.png');
    background-repeat: repeat;
    background-size: 200px 200px;
    opacity: 0.03;
  }

  .luxee-premium-theme .hero-content {
    text-align: center;
    z-index: 2;
    max-width: 800px;
    padding: 0 2rem;
  }

  .luxee-premium-theme .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: 4rem;
    font-weight: 700;
    color: var(--navy-color);
    margin-bottom: 1rem;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .luxee-premium-theme .hero-subtitle {
    font-family: 'Dancing Script', cursive;
    font-size: 3.5rem;
    color: var(--gold-color);
    margin-bottom: 2rem;
    font-weight: 600;
  }

  .luxee-premium-theme .hero-caption {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.2rem;
    color: var(--text-light);
    margin-bottom: 3rem;
    font-weight: 300;
    line-height: 1.8;
  }

  .luxee-premium-theme .btn-elegant {
    background: var(--gradient-gold);
    border: none;
    border-radius: 50px;
    color: white;
    padding: 18px 40px;
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
    cursor: pointer;
  }

  .luxee-premium-theme .btn-elegant:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(212, 175, 55, 0.4);
  }

  .luxee-premium-theme .btn-outline {
    background: transparent;
    border: 2px solid var(--navy-color);
    border-radius: 50px;
    color: var(--navy-color);
    padding: 16px 38px;
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .luxee-premium-theme .btn-outline:hover {
    background: var(--navy-color);
    color: white;
    transform: translateY(-2px);
  }

  .luxee-premium-theme .card-elegant {
    background: white;
    border-radius: 20px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid rgba(44, 62, 80, 0.05);
    overflow: hidden;
    position: relative;
  }

  .luxee-premium-theme .card-elegant::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: var(--gradient-gold);
  }

  .luxee-premium-theme .card-elegant:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.12);
  }

  .luxee-premium-theme .couple-photo {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    border: 8px solid white;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    position: relative;
    object-fit: cover;
  }

  .luxee-premium-theme .couple-photo::before {
    content: '';
    position: absolute;
    top: -12px;
    left: -12px;
    right: -12px;
    bottom: -12px;
    border-radius: 50%;
    background: var(--gradient-gold);
    z-index: -1;
    opacity: 0.2;
  }

  .luxee-premium-theme .couple-photo:hover {
    transform: scale(1.05);
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.2);
  }

  .luxee-premium-theme .couple-name {
    font-family: 'Playfair Display', serif;
    font-size: 2.8rem;
    font-weight: 700;
    color: var(--navy-color);
    margin-bottom: 0.5rem;
    letter-spacing: 1px;
  }

  .luxee-premium-theme .couple-parents {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1rem;
    color: var(--text-light);
    margin-bottom: 1.5rem;
    font-weight: 400;
    line-height: 1.6;
  }

  .luxee-premium-theme .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--navy-color);
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
    letter-spacing: 1px;
  }

  .luxee-premium-theme .section-title::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: var(--gradient-gold);
    border-radius: 2px;
  }

  .luxee-premium-theme .location-card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid rgba(44, 62, 80, 0.05);
    overflow: hidden;
    position: relative;
    text-align: center;
    padding: 3rem 2rem;
  }

  .luxee-premium-theme .location-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: var(--gradient-gold);
  }

  .luxee-premium-theme .location-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  }

  .luxee-premium-theme .location-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 2rem;
    display: block;
    opacity: 0.8;
  }

  .luxee-premium-theme .location-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--navy-color);
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .luxee-premium-theme .location-date {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.3rem;
    color: var(--gold-color);
    margin-bottom: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .luxee-premium-theme .location-venue {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.1rem;
    color: var(--navy-color);
    margin-bottom: 0.8rem;
    font-weight: 500;
  }

  .luxee-premium-theme .location-address {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1rem;
    color: var(--text-light);
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .luxee-premium-theme .countdown-container {
    background: white;
    border-radius: 20px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
    padding: 3rem 2rem;
    margin: 2rem 0;
    text-align: center;
    position: relative;
  }

  .luxee-premium-theme .countdown-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: var(--gradient-gold);
    border-radius: 20px 20px 0 0;
  }

  .luxee-premium-theme .countdown-item {
    display: inline-block;
    margin: 0 2rem;
    text-align: center;
    position: relative;
  }

  .luxee-premium-theme .countdown-number {
    font-family: 'Playfair Display', serif;
    font-size: 4rem;
    font-weight: 700;
    color: var(--navy-color);
    display: block;
    margin-bottom: 0.5rem;
  }

  .luxee-premium-theme .countdown-label {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.1rem;
    color: var(--text-light);
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 600;
  }

  .luxee-premium-theme .gallery-item {
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: relative;
  }

  .luxee-premium-theme .gallery-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--gradient-primary);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  .luxee-premium-theme .gallery-item:hover::before {
    opacity: 0.1;
  }

  .luxee-premium-theme .gallery-item:hover {
    transform: scale(1.03);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }

  .luxee-premium-theme .gallery-item img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .luxee-premium-theme .gallery-item:hover img {
    transform: scale(1.05);
  }

  .luxee-premium-theme .quote-section {
    background: var(--light-blue);
    padding: 5rem 2rem;
    text-align: center;
    position: relative;
  }

  .luxee-premium-theme .quote-section::before {
    content: '"';
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 8rem;
    color: var(--gold-color);
    opacity: 0.1;
    font-family: 'Playfair Display', serif;
  }

  .luxee-premium-theme .quote-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem;
    color: var(--navy-color);
    font-style: italic;
    line-height: 1.4;
    position: relative;
    z-index: 2;
  }

  .luxee-premium-theme .social-icons {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .luxee-premium-theme .social-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--cream-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--navy-color);
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .luxee-premium-theme .social-icon:hover {
    background: var(--gold-color);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
  }

  .luxee-premium-theme .covid-protocol {
    background: var(--cream-color);
    border-radius: 20px;
    padding: 3rem;
    margin: 2rem 0;
    position: relative;
  }

  .luxee-premium-theme .covid-protocol::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: var(--gradient-gold);
    border-radius: 20px 20px 0 0;
  }

  .luxee-premium-theme .covid-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    color: var(--navy-color);
    text-align: center;
    margin-bottom: 2rem;
  }

  .luxee-premium-theme .covid-description {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.1rem;
    color: var(--text-light);
    text-align: center;
    margin-bottom: 3rem;
    line-height: 1.8;
  }

  .luxee-premium-theme .covid-item {
    display: flex;
    align-items: center;
    margin: 1.5rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  .luxee-premium-theme .covid-item:hover {
    transform: translateX(10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .luxee-premium-theme .covid-item-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gradient-gold);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.5rem;
    color: white;
    font-weight: 700;
    font-size: 1.2rem;
  }

  .luxee-premium-theme .covid-item-text {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.1rem;
    color: var(--navy-color);
    font-weight: 500;
  }

  .luxee-premium-theme .footer-gradient {
    background: var(--gradient-primary);
    color: white;
    position: relative;
    padding: 4rem 0;
  }

  .luxee-premium-theme .footer-gradient::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: var(--gradient-gold);
    clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
  }

  .luxee-premium-theme .footer-content {
    position: relative;
    z-index: 2;
    text-align: center;
  }

  .luxee-premium-theme .footer-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    font-style: italic;
  }

  .luxee-premium-theme .footer-subtitle {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.3rem;
    margin-bottom: 2rem;
    font-weight: 300;
  }

  .luxee-premium-theme .footer-couple {
    font-family: 'Dancing Script', cursive;
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 3rem;
  }

  .luxee-premium-theme .footer-families {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
  }

  .luxee-premium-theme .footer-family {
    text-align: center;
  }

  .luxee-premium-theme .footer-family-title {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .luxee-premium-theme .footer-family-names {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1rem;
    opacity: 0.9;
    line-height: 1.6;
  }

  .luxee-premium-theme .invitation-popup {
    background: white;
    border-radius: 25px;
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
    padding: 4rem;
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    position: relative;
  }

  .luxee-premium-theme .invitation-popup::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: var(--gradient-gold);
    border-radius: 25px 25px 0 0;
  }

  .luxee-premium-theme .invitation-popup h1 {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    color: var(--navy-color);
    margin-bottom: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .luxee-premium-theme .invitation-popup h2 {
    font-family: 'Dancing Script', cursive;
    font-size: 3.5rem;
    color: var(--gold-color);
    margin-bottom: 2rem;
    font-weight: 600;
  }

  .luxee-premium-theme .music-player {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1000;
  }

  .luxee-premium-theme .music-toggle {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: var(--gradient-gold);
    border: none;
    color: white;
    font-size: 1.8rem;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
    transition: all 0.3s ease;
  }

  .luxee-premium-theme .music-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 15px 40px rgba(212, 175, 55, 0.5);
  }

  @media (max-width: 768px) {
    .luxee-premium-theme .hero-title {
      font-size: 2.5rem;
    }

    .luxee-premium-theme .hero-subtitle {
      font-size: 2.5rem;
    }

    .luxee-premium-theme .couple-photo {
      width: 180px;
      height: 180px;
    }

    .luxee-premium-theme .section-title {
      font-size: 2.5rem;
    }

    .luxee-premium-theme .countdown-number {
      font-size: 3rem;
    }

    .luxee-premium-theme .countdown-item {
      margin: 0 1rem;
    }

    .luxee-premium-theme .invitation-popup h1 {
      font-size: 2.2rem;
    }

    .luxee-premium-theme .invitation-popup h2 {
      font-size: 2.8rem;
    }

    .luxee-premium-theme .footer-families {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .luxee-premium-theme .quote-text {
      font-size: 2rem;
    }
  }
`;
