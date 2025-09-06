import { ThemeConfig } from '../types';

export const darkFlowerTheme: ThemeConfig = {
  id: 'dark-flower',
  name: 'Dark Flower',
  description: 'A mysterious and elegant theme with dark tones and floral accents',
  colors: {
    primary: '#7C3AED',
    secondary: '#EC4899',
    accent: '#F59E0B',
    background: '#0F172A',
    text: '#F1F5F9',
    textLight: '#94A3B8'
  },
  fonts: {
    heading: 'Crimson Text, serif',
    body: 'Source Sans Pro, sans-serif',
    script: 'Dancing Script, cursive'
  },
  assets: {
    coverBackground: '/themes/dark-flower/backdrop.jpg',
    decorativeElements: [
      '/themes/dark-flower/flower-1.png',
      '/themes/dark-flower/flower-2.png',
      '/themes/dark-flower/ornament.png'
    ],
    icons: {
      date: '/themes/dark-flower/date.png',
      location: '/themes/dark-flower/location.png',
      heart: '/themes/dark-flower/heart.png'
    }
  },
  layout: {
    coverHeight: 'full',
    coupleLayout: 'side-by-side',
    locationLayout: 'cards',
    galleryLayout: 'grid'
  }
};

export const darkFlowerStyles = `
  .dark-flower-theme {
    --primary-color: #7C3AED;
    --secondary-color: #EC4899;
    --accent-color: #F59E0B;
    --background-color: #0F172A;
    --text-color: #F1F5F9;
    --text-light: #94A3B8;
  }

  .dark-flower-theme .font-crimson {
    font-family: 'Crimson Text', serif;
  }

  .dark-flower-theme .font-source {
    font-family: 'Source Sans Pro', sans-serif;
  }

  .dark-flower-theme .btn-mystic {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    border: none;
    border-radius: 12px;
    color: white;
    padding: 16px 32px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
    position: relative;
    overflow: hidden;
  }

  .dark-flower-theme .btn-mystic::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  .dark-flower-theme .btn-mystic:hover::before {
    left: 100%;
  }

  .dark-flower-theme .btn-mystic:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(124, 58, 237, 0.5);
  }

  .dark-flower-theme .card-dark {
    background: linear-gradient(135deg, #1E293B, #334155);
    border-radius: 20px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    border: 1px solid rgba(124, 58, 237, 0.2);
  }

  .dark-flower-theme .card-dark:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4);
    border-color: var(--primary-color);
  }

  .dark-flower-theme .text-gradient {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .dark-flower-theme .bg-pattern {
    background-image: url('/themes/dark-flower/pattern.png');
    background-repeat: repeat;
    background-size: 300px 300px;
    opacity: 0.05;
  }

  .dark-flower-theme .hero-section {
    position: relative;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .dark-flower-theme .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(124, 58, 237, 0.6));
  }

  .dark-flower-theme .couple-photo {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 6px solid var(--primary-color);
    box-shadow: 0 15px 40px rgba(124, 58, 237, 0.4);
    transition: all 0.3s ease;
    position: relative;
  }

  .dark-flower-theme .couple-photo::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 50%;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    z-index: -1;
    opacity: 0.3;
  }

  .dark-flower-theme .couple-photo:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 50px rgba(124, 58, 237, 0.5);
  }

  .dark-flower-theme .location-card {
    background: linear-gradient(135deg, #1E293B, #334155);
    border-radius: 20px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
    border-left: 6px solid var(--primary-color);
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .dark-flower-theme .location-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4);
  }

  .dark-flower-theme .gallery-item {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    position: relative;
  }

  .dark-flower-theme .gallery-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(236, 72, 153, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  .dark-flower-theme .gallery-item:hover::before {
    opacity: 1;
  }

  .dark-flower-theme .gallery-item:hover {
    transform: scale(1.03);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  }

  .dark-flower-theme .section-title {
    font-family: 'Crimson Text', serif;
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--text-color);
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
  }

  .dark-flower-theme .section-title::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    border-radius: 2px;
  }

  .dark-flower-theme .countdown-item {
    text-align: center;
    padding: 2rem 1rem;
    background: linear-gradient(135deg, #1E293B, #334155);
    border-radius: 20px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    border: 1px solid rgba(124, 58, 237, 0.2);
  }

  .dark-flower-theme .countdown-item:hover {
    transform: translateY(-6px);
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4);
    border-color: var(--primary-color);
  }

  .dark-flower-theme .countdown-number {
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
    font-family: 'Crimson Text', serif;
    text-shadow: 0 0 20px rgba(124, 58, 237, 0.5);
  }

  .dark-flower-theme .countdown-label {
    font-size: 1.1rem;
    color: var(--text-light);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .dark-flower-theme .footer-gradient {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    position: relative;
  }

  .dark-flower-theme .footer-gradient::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
  }

  .dark-flower-theme .particle-bg {
    position: relative;
    overflow: hidden;
  }

  .dark-flower-theme .particle-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/themes/dark-flower/particles.json');
    background-size: cover;
    background-position: center;
    opacity: 0.2;
    z-index: 1;
  }

  @media (max-width: 768px) {
    .dark-flower-theme .couple-photo {
      width: 160px;
      height: 160px;
    }

    .dark-flower-theme .section-title {
      font-size: 2.5rem;
    }

    .dark-flower-theme .countdown-number {
      font-size: 2.5rem;
    }
  }
`;
