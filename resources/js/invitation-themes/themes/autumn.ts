import { ThemeConfig } from '../types';

export const autumnTheme: ThemeConfig = {
  id: 'autumn',
  name: 'Autumn Elegance',
  description: 'A warm and elegant theme with autumn colors and sophisticated typography',
  colors: {
    primary: '#C07D37',
    secondary: '#8B4513',
    accent: '#DAA520',
    background: '#F7F7F7',
    text: '#2C3E50',
    textLight: '#6C757D'
  },
  fonts: {
    heading: 'Satisfy, cursive',
    body: 'Poppins, sans-serif',
    script: 'Great Vibes, cursive'
  },
  assets: {
    coverBackground: '/themes/autumn/cover-bg.jpg',
    decorativeElements: [
      '/themes/autumn/leaf-1.png',
      '/themes/autumn/leaf-2.png',
      '/themes/autumn/ornament.png'
    ],
    icons: {
      date: '/themes/autumn/date.png',
      location: '/themes/autumn/location.png',
      heart: '/themes/autumn/heart.png'
    }
  },
  layout: {
    coverHeight: 'full',
    coupleLayout: 'side-by-side',
    locationLayout: 'cards',
    galleryLayout: 'grid'
  }
};

export const autumnStyles = `
  .autumn-theme {
    --primary-color: #C07D37;
    --secondary-color: #8B4513;
    --accent-color: #DAA520;
    --background-color: #F7F7F7;
    --text-color: #2C3E50;
    --text-light: #6C757D;
  }

  .autumn-theme .font-satisfy {
    font-family: 'Satisfy', cursive;
    color: var(--primary-color);
  }

  .autumn-theme .font-poppins {
    font-family: 'Poppins', sans-serif;
  }

  .autumn-theme .btn-primary {
    background: var(--primary-color);
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .autumn-theme .btn-primary:hover {
    background: var(--secondary-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(192, 125, 55, 0.3);
  }

  .autumn-theme .card-elegant {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .autumn-theme .card-elegant:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }

  .autumn-theme .text-gradient {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .autumn-theme .bg-pattern {
    background-image: url('/themes/autumn/pattern.png');
    background-repeat: repeat;
    background-size: 200px 200px;
    opacity: 0.1;
  }

  .autumn-theme .wave-divider {
    position: relative;
    overflow: hidden;
  }

  .autumn-theme .wave-divider::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    clip-path: polygon(0 0, 100% 0, 100% 60%, 0 100%);
  }

  .autumn-theme .particle-bg {
    position: relative;
    overflow: hidden;
  }

  .autumn-theme .particle-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/themes/autumn/particles.json');
    background-size: cover;
    background-position: center;
    opacity: 0.3;
    z-index: 1;
  }

  .autumn-theme .couple-photo {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 4px solid var(--primary-color);
    box-shadow: 0 8px 25px rgba(192, 125, 55, 0.3);
    transition: all 0.3s ease;
  }

  .autumn-theme .couple-photo:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 35px rgba(192, 125, 55, 0.4);
  }

  .autumn-theme .location-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-left: 4px solid var(--primary-color);
    transition: all 0.3s ease;
  }

  .autumn-theme .location-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }

  .autumn-theme .gallery-item {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .autumn-theme .gallery-item:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  .autumn-theme .footer-gradient {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
  }

  .autumn-theme .footer-gradient::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    clip-path: polygon(0 0, 100% 0, 100% 60%, 0 100%);
  }

  @media (max-width: 768px) {
    .autumn-theme .couple-photo {
      width: 150px;
      height: 150px;
    }

    .autumn-theme .font-satisfy {
      font-size: 2rem;
    }
  }
`;
