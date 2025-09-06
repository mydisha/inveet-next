import { ThemeConfig } from '../types';

export const classyGoldBlueTheme: ThemeConfig = {
  id: 'classy-gold-blue',
  name: 'Classy Gold Blue',
  description: 'A sophisticated theme with gold and blue accents, perfect for elegant celebrations',
  colors: {
    primary: '#1E3A8A',
    secondary: '#D97706',
    accent: '#F59E0B',
    background: '#F8FAFC',
    text: '#1F2937',
    textLight: '#6B7280'
  },
  fonts: {
    heading: 'Playfair Display, serif',
    body: 'Inter, sans-serif',
    script: 'Dancing Script, cursive'
  },
  assets: {
    coverBackground: '/themes/classy-gold-blue/cover-bg.jpg',
    decorativeElements: [
      '/themes/classy-gold-blue/ornament-1.png',
      '/themes/classy-gold-blue/ornament-2.png',
      '/themes/classy-gold-blue/pattern.png'
    ],
    icons: {
      date: '/themes/classy-gold-blue/date.png',
      location: '/themes/classy-gold-blue/location.png',
      heart: '/themes/classy-gold-blue/heart.png'
    }
  },
  layout: {
    coverHeight: 'full',
    coupleLayout: 'side-by-side',
    locationLayout: 'cards',
    galleryLayout: 'grid'
  }
};

export const classyGoldBlueStyles = `
  .classy-gold-blue-theme {
    --primary-color: #1E3A8A;
    --secondary-color: #D97706;
    --accent-color: #F59E0B;
    --background-color: #F8FAFC;
    --text-color: #1F2937;
    --text-light: #6B7280;
  }

  .classy-gold-blue-theme .font-playfair {
    font-family: 'Playfair Display', serif;
  }

  .classy-gold-blue-theme .font-inter {
    font-family: 'Inter', sans-serif;
  }

  .classy-gold-blue-theme .btn-elegant {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    border: none;
    border-radius: 8px;
    color: white;
    padding: 14px 28px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
  }

  .classy-gold-blue-theme .btn-elegant:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(30, 58, 138, 0.4);
  }

  .classy-gold-blue-theme .card-luxury {
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 1px solid rgba(30, 58, 138, 0.1);
  }

  .classy-gold-blue-theme .card-luxury:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }

  .classy-gold-blue-theme .text-gradient {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .classy-gold-blue-theme .bg-pattern {
    background-image: url('/themes/classy-gold-blue/pattern.png');
    background-repeat: repeat;
    background-size: 400px 400px;
    opacity: 0.03;
  }

  .classy-gold-blue-theme .hero-section {
    position: relative;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .classy-gold-blue-theme .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(30, 58, 138, 0.7), rgba(217, 119, 6, 0.5));
  }

  .classy-gold-blue-theme .couple-photo {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    border: 8px solid var(--accent-color);
    box-shadow: 0 15px 40px rgba(245, 158, 11, 0.3);
    transition: all 0.3s ease;
  }

  .classy-gold-blue-theme .couple-photo:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 50px rgba(245, 158, 11, 0.4);
  }

  .classy-gold-blue-theme .location-card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border-top: 6px solid var(--primary-color);
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .classy-gold-blue-theme .location-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
  }

  .classy-gold-blue-theme .gallery-item {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .classy-gold-blue-theme .gallery-item:hover {
    transform: scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }

  .classy-gold-blue-theme .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--text-color);
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
  }

  .classy-gold-blue-theme .section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    border-radius: 2px;
  }

  .classy-gold-blue-theme .countdown-item {
    text-align: center;
    padding: 2rem 1rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .classy-gold-blue-theme .countdown-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  .classy-gold-blue-theme .countdown-number {
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
    font-family: 'Playfair Display', serif;
  }

  .classy-gold-blue-theme .countdown-label {
    font-size: 1.1rem;
    color: var(--text-light);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .classy-gold-blue-theme .footer-gradient {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    position: relative;
  }

  .classy-gold-blue-theme .footer-gradient::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
  }

  @media (max-width: 768px) {
    .classy-gold-blue-theme .couple-photo {
      width: 180px;
      height: 180px;
    }

    .classy-gold-blue-theme .section-title {
      font-size: 2.5rem;
    }

    .classy-gold-blue-theme .countdown-number {
      font-size: 2.5rem;
    }
  }
`;
