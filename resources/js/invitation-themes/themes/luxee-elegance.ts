import { ThemeConfig } from '../types';

export const luxeeEleganceTheme: ThemeConfig = {
  id: 'luxee-elegance',
  name: 'Luxee Elegance',
  description: 'An elegant and sophisticated theme inspired by modern wedding design with clean typography and refined aesthetics',
  colors: {
    primary: '#2C3E50',
    secondary: '#E8F4FD',
    accent: '#F39C12',
    background: '#FFFFFF',
    text: '#2C3E50',
    textLight: '#7F8C8D'
  },
  fonts: {
    heading: 'Playfair Display, serif',
    body: 'Source Sans Pro, sans-serif',
    script: 'Dancing Script, cursive'
  },
  assets: {
    coverBackground: '/themes/luxee-elegance/cover-bg.jpg',
    decorativeElements: [
      '/themes/luxee-elegance/ornament-1.png',
      '/themes/luxee-elegance/ornament-2.png',
      '/themes/luxee-elegance/pattern.png'
    ],
    icons: {
      date: '/themes/luxee-elegance/date.png',
      location: '/themes/luxee-elegance/location.png',
      heart: '/themes/luxee-elegance/heart.png',
      facebook: '/themes/luxee-elegance/facebook.svg',
      twitter: '/themes/luxee-elegance/twitter.svg',
      youtube: '/themes/luxee-elegance/youtube.svg',
      instagram: '/themes/luxee-elegance/instagram.svg',
      whatsapp: '/themes/luxee-elegance/whatsapp.svg'
    }
  },
  layout: {
    coverHeight: 'full',
    coupleLayout: 'side-by-side',
    locationLayout: 'cards',
    galleryLayout: 'grid'
  }
};

export const luxeeEleganceStyles = `
  .luxee-elegance-theme {
    --primary-color: #2C3E50;
    --secondary-color: #E8F4FD;
    --accent-color: #F39C12;
    --background-color: #FFFFFF;
    --text-color: #2C3E50;
    --text-light: #7F8C8D;
    --gold-color: #D4AF37;
    --light-gray: #F8F9FA;
  }

  .luxee-elegance-theme .font-playfair {
    font-family: 'Playfair Display', serif;
  }

  .luxee-elegance-theme .font-source {
    font-family: 'Source Sans Pro', sans-serif;
  }

  .luxee-elegance-theme .font-script {
    font-family: 'Dancing Script', cursive;
  }

  .luxee-elegance-theme .btn-elegant {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    border: none;
    border-radius: 8px;
    color: white;
    padding: 16px 32px;
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(44, 62, 80, 0.3);
  }

  .luxee-elegance-theme .btn-elegant:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(44, 62, 80, 0.4);
  }

  .luxee-elegance-theme .btn-outline {
    background: transparent;
    border: 2px solid var(--primary-color);
    border-radius: 8px;
    color: var(--primary-color);
    padding: 14px 30px;
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
  }

  .luxee-elegance-theme .btn-outline:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-2px);
  }

  .luxee-elegance-theme .card-elegant {
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 1px solid rgba(44, 62, 80, 0.1);
    overflow: hidden;
  }

  .luxee-elegance-theme .card-elegant:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }

  .luxee-elegance-theme .text-gradient {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .luxee-elegance-theme .hero-section {
    position: relative;
    height: 100vh;
    background: linear-gradient(135deg, var(--secondary-color), white);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .luxee-elegance-theme .hero-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/themes/luxee-elegance/pattern.png');
    background-repeat: repeat;
    background-size: 200px 200px;
    opacity: 0.05;
  }

  .luxee-elegance-theme .couple-photo {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 6px solid white;
    box-shadow: 0 15px 40px rgba(44, 62, 80, 0.2);
    transition: all 0.3s ease;
    position: relative;
  }

  .luxee-elegance-theme .couple-photo::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 50%;
    background: linear-gradient(45deg, var(--accent-color), var(--gold-color));
    z-index: -1;
    opacity: 0.3;
  }

  .luxee-elegance-theme .couple-photo:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 50px rgba(44, 62, 80, 0.3);
  }

  .luxee-elegance-theme .location-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border-top: 6px solid var(--accent-color);
    transition: all 0.3s ease;
    overflow: hidden;
    position: relative;
  }

  .luxee-elegance-theme .location-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--accent-color), var(--gold-color));
  }

  .luxee-elegance-theme .location-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
  }

  .luxee-elegance-theme .gallery-item {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: relative;
  }

  .luxee-elegance-theme .gallery-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(44, 62, 80, 0.1), rgba(243, 156, 18, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  .luxee-elegance-theme .gallery-item:hover::before {
    opacity: 1;
  }

  .luxee-elegance-theme .gallery-item:hover {
    transform: scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }

  .luxee-elegance-theme .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--text-color);
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
  }

  .luxee-elegance-theme .section-title::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(135deg, var(--accent-color), var(--gold-color));
    border-radius: 2px;
  }

  .luxee-elegance-theme .countdown-item {
    text-align: center;
    padding: 2rem 1rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 1px solid rgba(44, 62, 80, 0.1);
  }

  .luxee-elegance-theme .countdown-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  .luxee-elegance-theme .countdown-number {
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
    font-family: 'Playfair Display', serif;
  }

  .luxee-elegance-theme .countdown-label {
    font-size: 1.1rem;
    color: var(--text-light);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .luxee-elegance-theme .social-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--light-gray);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    margin: 0 8px;
  }

  .luxee-elegance-theme .social-icon:hover {
    background: var(--accent-color);
    transform: translateY(-2px);
  }

  .luxee-elegance-theme .social-icon svg {
    width: 20px;
    height: 20px;
    color: var(--text-color);
  }

  .luxee-elegance-theme .social-icon:hover svg {
    color: white;
  }

  .luxee-elegance-theme .quote-section {
    background: var(--light-gray);
    padding: 4rem 2rem;
    text-align: center;
    position: relative;
  }

  .luxee-elegance-theme .quote-section::before {
    content: '"';
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 6rem;
    color: var(--accent-color);
    opacity: 0.3;
    font-family: 'Playfair Display', serif;
  }

  .luxee-elegance-theme .footer-gradient {
    background: linear-gradient(135deg, var(--primary-color), var(--text-color));
    color: white;
    position: relative;
  }

  .luxee-elegance-theme .footer-gradient::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(135deg, var(--accent-color), var(--gold-color));
    clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
  }

  .luxee-elegance-theme .invitation-popup {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    padding: 3rem;
    text-align: center;
    max-width: 500px;
    margin: 0 auto;
  }

  .luxee-elegance-theme .invitation-popup h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  .luxee-elegance-theme .invitation-popup h2 {
    font-family: 'Dancing Script', cursive;
    font-size: 3rem;
    color: var(--accent-color);
    margin-bottom: 2rem;
  }

  .luxee-elegance-theme .covid-protocol {
    background: var(--light-gray);
    border-radius: 12px;
    padding: 2rem;
    margin: 2rem 0;
  }

  .luxee-elegance-theme .covid-protocol h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-family: 'Playfair Display', serif;
  }

  .luxee-elegance-theme .covid-item {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    padding: 0.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .luxee-elegance-theme .covid-item-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--accent-color);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    color: white;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    .luxee-elegance-theme .couple-photo {
      width: 150px;
      height: 150px;
    }

    .luxee-elegance-theme .section-title {
      font-size: 2.5rem;
    }

    .luxee-elegance-theme .countdown-number {
      font-size: 2.5rem;
    }

    .luxee-elegance-theme .invitation-popup h1 {
      font-size: 2rem;
    }

    .luxee-elegance-theme .invitation-popup h2 {
      font-size: 2.5rem;
    }
  }
`;
