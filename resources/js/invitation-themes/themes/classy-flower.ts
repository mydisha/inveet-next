import { ThemeConfig } from '../types';

export const classyFlowerTheme: ThemeConfig = {
  id: 'classy-flower',
  name: 'Classy Flower',
  description: 'An elegant floral theme with soft pastels and romantic typography',
  colors: {
    primary: '#A6C5B6',
    secondary: '#8B7D6B',
    accent: '#D4AF37',
    background: '#FFF2EE',
    text: '#2C3E50',
    textLight: '#6C757D'
  },
  fonts: {
    heading: 'Merienda, cursive',
    body: 'Montserrat, sans-serif',
    script: 'Great Vibes, cursive'
  },
  assets: {
    coverBackground: '/themes/classy-flower/backdrop.jpg',
    decorativeElements: [
      '/themes/classy-flower/orn-hero.png',
      '/themes/classy-flower/leaf-1.png',
      '/themes/classy-flower/leaf-2.png'
    ],
    icons: {
      date: '/themes/classy-flower/Icon-date.png',
      location: '/themes/classy-flower/location.png',
      heart: '/themes/classy-flower/heart.png',
      instagram: '/themes/classy-flower/icon-ig.svg',
      play: '/themes/classy-flower/play.svg',
      pause: '/themes/classy-flower/pause.svg'
    }
  },
  layout: {
    coverHeight: 'full',
    coupleLayout: 'side-by-side',
    locationLayout: 'cards',
    galleryLayout: 'grid'
  }
};

export const classyFlowerStyles = `
  .classy-flower-theme {
    --primary-color: #A6C5B6;
    --secondary-color: #8B7D6B;
    --accent-color: #D4AF37;
    --background-color: #FFF2EE;
    --text-color: #2C3E50;
    --text-light: #6C757D;
  }

  .classy-flower-theme .font-merienda {
    font-family: 'Merienda', cursive;
  }

  .classy-flower-theme .font-montserrat {
    font-family: 'Montserrat', sans-serif;
  }

  .classy-flower-theme .btn-theme-v1 {
    background: var(--primary-color);
    border: none;
    border-radius: 8px;
    color: white;
    padding: 12px 24px;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .classy-flower-theme .btn-theme-v1:hover {
    background: var(--secondary-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(166, 197, 182, 0.3);
  }

  .classy-flower-theme .btn-theme-v2 {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    border: none;
    border-radius: 8px;
    color: white;
    padding: 12px 24px;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .classy-flower-theme .btn-theme-v2:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(166, 197, 182, 0.3);
  }

  .classy-flower-theme .card-elegant {
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 1px solid rgba(166, 197, 182, 0.2);
  }

  .classy-flower-theme .card-elegant:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .classy-flower-theme .text-gradient {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .classy-flower-theme .bg-pattern {
    background-image: url('/themes/classy-flower/pattern.png');
    background-repeat: repeat;
    background-size: 300px 300px;
    opacity: 0.05;
  }

  .classy-flower-theme .hero-section {
    position: relative;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .classy-flower-theme .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
  }

  .classy-flower-theme .ornament-hero {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    opacity: 0.8;
    z-index: 1;
  }

  .classy-flower-theme .couple-photo {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 6px solid var(--primary-color);
    box-shadow: 0 12px 30px rgba(166, 197, 182, 0.3);
    transition: all 0.3s ease;
  }

  .classy-flower-theme .couple-photo:hover {
    transform: scale(1.05);
    box-shadow: 0 16px 40px rgba(166, 197, 182, 0.4);
  }

  .classy-flower-theme .location-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border-top: 4px solid var(--primary-color);
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .classy-flower-theme .location-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .classy-flower-theme .gallery-item {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .classy-flower-theme .gallery-item:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
  }

  .classy-flower-theme .schedule-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .classy-flower-theme .schedule-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .classy-flower-theme .guest-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border-left: 4px solid var(--primary-color);
  }

  .classy-flower-theme .guest-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  .classy-flower-theme .music-button {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border: 2px solid var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 50;
  }

  .classy-flower-theme .music-button:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
  }

  .classy-flower-theme .section-title {
    font-family: 'Merienda', cursive;
    font-size: 3rem;
    font-weight: 700;
    color: var(--text-color);
    text-align: center;
    margin-bottom: 3rem;
  }

  .classy-flower-theme .section-subtitle {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.1rem;
    color: var(--text-light);
    text-align: center;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .classy-flower-theme .countdown-item {
    text-align: center;
    padding: 1rem;
  }

  .classy-flower-theme .countdown-number {
    font-size: 3rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }

  .classy-flower-theme .countdown-label {
    font-size: 1rem;
    color: var(--text-light);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .classy-flower-theme .couple-photo {
      width: 150px;
      height: 150px;
    }

    .classy-flower-theme .section-title {
      font-size: 2rem;
    }

    .classy-flower-theme .countdown-number {
      font-size: 2rem;
    }
  }
`;
