import { ThemeConfig } from '../types';

export const uniqueModernTheme: ThemeConfig = {
  id: 'unique-modern',
  name: 'Unique Modern',
  description: 'A distinctive and creative theme with unique design elements, asymmetrical layouts, and modern aesthetics',
  colors: {
    primary: '#1A1A2E',
    secondary: '#16213E',
    accent: '#E94560',
    background: '#0F0F23',
    text: '#FFFFFF',
    textLight: '#B8B8CC',
    neon: '#00D4FF',
    gradient1: '#FF6B6B',
    gradient2: '#4ECDC4',
    gradient3: '#45B7D1',
    dark: '#0A0A0A',
    light: '#F8F9FA'
  },
  fonts: {
    heading: 'Orbitron, monospace',
    body: 'Inter, sans-serif',
    script: 'Pacifico, cursive',
    display: 'Bebas Neue, cursive',
    mono: 'JetBrains Mono, monospace'
  },
  assets: {
    coverBackground: '/themes/assets/unique/hero-bg.jpg',
    decorativeElements: [
      '/themes/assets/unique/geometric-1.png',
      '/themes/assets/unique/geometric-2.png',
      '/themes/assets/unique/pattern.png',
      '/themes/assets/unique/glow.png'
    ],
    icons: {
      date: '/themes/assets/unique/date-icon.svg',
      location: '/themes/assets/unique/location-icon.svg',
      heart: '/themes/assets/unique/heart-icon.svg',
      facebook: '/themes/assets/unique/facebook.svg',
      twitter: '/themes/assets/unique/twitter.svg',
      youtube: '/themes/assets/unique/youtube.svg',
      instagram: '/themes/assets/unique/instagram.svg',
      whatsapp: '/themes/assets/unique/whatsapp.svg'
    }
  },
  layout: {
    coverHeight: 'full',
    coupleLayout: 'asymmetric',
    locationLayout: 'timeline',
    galleryLayout: 'masonry'
  }
};

export const uniqueModernStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&display=swap');

  .unique-modern-theme {
    --primary-color: #1A1A2E;
    --secondary-color: #16213E;
    --accent-color: #E94560;
    --background-color: #0F0F23;
    --text-color: #FFFFFF;
    --text-light: #B8B8CC;
    --neon-color: #00D4FF;
    --gradient-1: #FF6B6B;
    --gradient-2: #4ECDC4;
    --gradient-3: #45B7D1;
    --dark-color: #0A0A0A;
    --light-color: #F8F9FA;
    --glow-primary: 0 0 20px rgba(0, 212, 255, 0.3);
    --glow-accent: 0 0 20px rgba(233, 69, 96, 0.3);
    --glow-gradient: 0 0 30px rgba(255, 107, 107, 0.2);
  }

  .unique-modern-theme * {
    box-sizing: border-box;
  }

  .unique-modern-theme body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background: var(--background-color);
    overflow-x: hidden;
  }

  .unique-modern-theme .font-orbitron {
    font-family: 'Orbitron', monospace;
  }

  .unique-modern-theme .font-inter {
    font-family: 'Inter', sans-serif;
  }

  .unique-modern-theme .font-pacifico {
    font-family: 'Pacifico', cursive;
  }

  .unique-modern-theme .font-bebas {
    font-family: 'Bebas Neue', cursive;
  }

  .unique-modern-theme .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }

  .unique-modern-theme .hero-section {
    position: relative;
    height: 100vh;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .unique-modern-theme .hero-bg-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(233, 69, 96, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255, 107, 107, 0.05) 0%, transparent 50%);
    animation: float 20s ease-in-out infinite;
  }

  .unique-modern-theme .hero-content {
    text-align: center;
    z-index: 2;
    max-width: 900px;
    padding: 0 2rem;
    position: relative;
  }

  .unique-modern-theme .hero-title {
    font-family: 'Orbitron', monospace;
    font-size: 5rem;
    font-weight: 900;
    color: var(--neon-color);
    margin-bottom: 1rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    text-shadow: var(--glow-primary);
    animation: glow 2s ease-in-out infinite alternate;
  }

  .unique-modern-theme .hero-subtitle {
    font-family: 'Pacifico', cursive;
    font-size: 4rem;
    color: var(--accent-color);
    margin-bottom: 2rem;
    font-weight: 400;
    text-shadow: var(--glow-accent);
    animation: float 3s ease-in-out infinite;
  }

  .unique-modern-theme .hero-caption {
    font-family: 'Inter', sans-serif;
    font-size: 1.3rem;
    color: var(--text-light);
    margin-bottom: 3rem;
    font-weight: 300;
    line-height: 1.8;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .unique-modern-theme .btn-neon {
    background: linear-gradient(45deg, var(--neon-color), var(--gradient-3));
    border: 2px solid var(--neon-color);
    border-radius: 50px;
    color: var(--background-color);
    padding: 20px 50px;
    font-weight: 700;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.3s ease;
    box-shadow: var(--glow-primary);
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .unique-modern-theme .btn-neon::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  .unique-modern-theme .btn-neon:hover::before {
    left: 100%;
  }

  .unique-modern-theme .btn-neon:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0, 212, 255, 0.4);
  }

  .unique-modern-theme .btn-outline-neon {
    background: transparent;
    border: 2px solid var(--accent-color);
    border-radius: 50px;
    color: var(--accent-color);
    padding: 18px 48px;
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .unique-modern-theme .btn-outline-neon:hover {
    background: var(--accent-color);
    color: var(--background-color);
    transform: translateY(-2px);
    box-shadow: var(--glow-accent);
  }

  .unique-modern-theme .card-futuristic {
    background: linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(22, 33, 62, 0.8));
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 212, 255, 0.2);
    overflow: hidden;
    position: relative;
    backdrop-filter: blur(10px);
  }

  .unique-modern-theme .card-futuristic::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--neon-color), var(--accent-color), var(--gradient-1));
  }

  .unique-modern-theme .card-futuristic:hover {
    transform: translateY(-8px);
    box-shadow: 0 30px 80px rgba(0, 212, 255, 0.2);
    border-color: var(--neon-color);
  }

  .unique-modern-theme .couple-photo {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    border: 4px solid var(--neon-color);
    margin: 0 auto 2rem;
    object-fit: cover;
    box-shadow: var(--glow-primary);
    transition: all 0.3s ease;
    position: relative;
  }

  .unique-modern-theme .couple-photo::before {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 50%;
    background: conic-gradient(var(--neon-color), var(--accent-color), var(--gradient-1), var(--gradient-2));
    z-index: -1;
    animation: rotate 3s linear infinite;
  }

  .unique-modern-theme .couple-photo:hover {
    transform: scale(1.05);
    box-shadow: 0 25px 70px rgba(0, 212, 255, 0.4);
  }

  .unique-modern-theme .couple-name {
    font-family: 'Orbitron', monospace;
    font-size: 3rem;
    font-weight: 700;
    color: var(--neon-color);
    margin-bottom: 0.5rem;
    letter-spacing: 2px;
    text-shadow: var(--glow-primary);
  }

  .unique-modern-theme .couple-parents {
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    color: var(--text-light);
    margin-bottom: 1.5rem;
    font-weight: 400;
    line-height: 1.6;
  }

  .unique-modern-theme .section-title {
    font-family: 'Bebas Neue', cursive;
    font-size: 4rem;
    font-weight: 400;
    color: var(--neon-color);
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
    letter-spacing: 3px;
    text-shadow: var(--glow-primary);
  }

  .unique-modern-theme .section-title::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 4px;
    background: linear-gradient(90deg, var(--neon-color), var(--accent-color));
    border-radius: 2px;
    box-shadow: var(--glow-primary);
  }

  .unique-modern-theme .location-card {
    background: linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(22, 33, 62, 0.9));
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 212, 255, 0.3);
    overflow: hidden;
    position: relative;
    text-align: center;
    padding: 3rem 2rem;
    backdrop-filter: blur(10px);
  }

  .unique-modern-theme .location-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--neon-color), var(--accent-color));
  }

  .unique-modern-theme .location-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 30px 80px rgba(0, 212, 255, 0.2);
    border-color: var(--neon-color);
  }

  .unique-modern-theme .location-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 2rem;
    display: block;
    filter: drop-shadow(var(--glow-primary));
  }

  .unique-modern-theme .location-title {
    font-family: 'Orbitron', monospace;
    font-size: 2rem;
    font-weight: 600;
    color: var(--neon-color);
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: var(--glow-primary);
  }

  .unique-modern-theme .location-date {
    font-family: 'Inter', sans-serif;
    font-size: 1.4rem;
    color: var(--accent-color);
    margin-bottom: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .unique-modern-theme .location-venue {
    font-family: 'Inter', sans-serif;
    font-size: 1.2rem;
    color: var(--text-color);
    margin-bottom: 0.8rem;
    font-weight: 500;
  }

  .unique-modern-theme .location-address {
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    color: var(--text-light);
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .unique-modern-theme .countdown-container {
    background: linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(22, 33, 62, 0.9));
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    padding: 3rem 2rem;
    margin: 2rem 0;
    text-align: center;
    position: relative;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 212, 255, 0.3);
  }

  .unique-modern-theme .countdown-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--neon-color), var(--accent-color));
    border-radius: 20px 20px 0 0;
  }

  .unique-modern-theme .countdown-item {
    display: inline-block;
    margin: 0 2rem;
    text-align: center;
    position: relative;
  }

  .unique-modern-theme .countdown-number {
    font-family: 'Orbitron', monospace;
    font-size: 5rem;
    font-weight: 900;
    color: var(--neon-color);
    display: block;
    margin-bottom: 0.5rem;
    text-shadow: var(--glow-primary);
    animation: pulse 2s ease-in-out infinite;
  }

  .unique-modern-theme .countdown-label {
    font-family: 'Inter', sans-serif;
    font-size: 1.2rem;
    color: var(--text-light);
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 600;
  }

  .unique-modern-theme .gallery-item {
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    position: relative;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  }

  .unique-modern-theme .gallery-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(233, 69, 96, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  .unique-modern-theme .gallery-item:hover::before {
    opacity: 1;
  }

  .unique-modern-theme .gallery-item:hover {
    transform: scale(1.05) rotate(2deg);
    box-shadow: 0 25px 70px rgba(0, 212, 255, 0.2);
  }

  .unique-modern-theme .gallery-item img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .unique-modern-theme .gallery-item:hover img {
    transform: scale(1.1);
  }

  .unique-modern-theme .quote-section {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    padding: 6rem 2rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .unique-modern-theme .quote-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 30% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(233, 69, 96, 0.1) 0%, transparent 50%);
    animation: float 15s ease-in-out infinite;
  }

  .unique-modern-theme .quote-text {
    font-family: 'Pacifico', cursive;
    font-size: 3rem;
    color: var(--neon-color);
    font-style: italic;
    line-height: 1.4;
    position: relative;
    z-index: 2;
    text-shadow: var(--glow-primary);
    animation: glow 3s ease-in-out infinite alternate;
  }

  .unique-modern-theme .social-icons {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  }

  .unique-modern-theme .social-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--neon-color);
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border: 2px solid var(--neon-color);
    position: relative;
    overflow: hidden;
  }

  .unique-modern-theme .social-icon::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, var(--neon-color), var(--accent-color));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .unique-modern-theme .social-icon:hover::before {
    opacity: 1;
  }

  .unique-modern-theme .social-icon:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 20px 40px rgba(0, 212, 255, 0.4);
    color: var(--background-color);
  }

  .unique-modern-theme .social-icon svg {
    position: relative;
    z-index: 1;
  }

  .unique-modern-theme .covid-protocol {
    background: linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(22, 33, 62, 0.9));
    border-radius: 20px;
    padding: 3rem;
    margin: 2rem 0;
    position: relative;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 212, 255, 0.3);
  }

  .unique-modern-theme .covid-protocol::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--neon-color), var(--accent-color));
    border-radius: 20px 20px 0 0;
  }

  .unique-modern-theme .covid-title {
    font-family: 'Orbitron', monospace;
    font-size: 3rem;
    color: var(--neon-color);
    text-align: center;
    margin-bottom: 2rem;
    text-shadow: var(--glow-primary);
  }

  .unique-modern-theme .covid-description {
    font-family: 'Inter', sans-serif;
    font-size: 1.2rem;
    color: var(--text-light);
    text-align: center;
    margin-bottom: 3rem;
    line-height: 1.8;
  }

  .unique-modern-theme .covid-item {
    display: flex;
    align-items: center;
    margin: 2rem 0;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(233, 69, 96, 0.1));
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 212, 255, 0.2);
  }

  .unique-modern-theme .covid-item:hover {
    transform: translateX(15px);
    box-shadow: 0 15px 40px rgba(0, 212, 255, 0.2);
    border-color: var(--neon-color);
  }

  .unique-modern-theme .covid-item-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--neon-color), var(--accent-color));
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2rem;
    color: var(--background-color);
    font-weight: 700;
    font-size: 1.5rem;
    box-shadow: var(--glow-primary);
  }

  .unique-modern-theme .covid-item-text {
    font-family: 'Inter', sans-serif;
    font-size: 1.2rem;
    color: var(--text-color);
    font-weight: 500;
  }

  .unique-modern-theme .footer-gradient {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: var(--text-color);
    position: relative;
    padding: 5rem 0;
    overflow: hidden;
  }

  .unique-modern-theme .footer-gradient::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(233, 69, 96, 0.1) 0%, transparent 50%);
    animation: float 20s ease-in-out infinite;
  }

  .unique-modern-theme .footer-content {
    position: relative;
    z-index: 2;
    text-align: center;
  }

  .unique-modern-theme .footer-title {
    font-family: 'Pacifico', cursive;
    font-size: 3rem;
    font-weight: 400;
    margin-bottom: 2rem;
    color: var(--neon-color);
    text-shadow: var(--glow-primary);
  }

  .unique-modern-theme .footer-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 1.4rem;
    margin-bottom: 2rem;
    font-weight: 300;
    color: var(--text-light);
  }

  .unique-modern-theme .footer-couple {
    font-family: 'Orbitron', monospace;
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 3rem;
    color: var(--accent-color);
    text-shadow: var(--glow-accent);
    letter-spacing: 2px;
  }

  .unique-modern-theme .footer-families {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
  }

  .unique-modern-theme .footer-family {
    text-align: center;
  }

  .unique-modern-theme .footer-family-title {
    font-family: 'Inter', sans-serif;
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--neon-color);
  }

  .unique-modern-theme .footer-family-names {
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    opacity: 0.9;
    line-height: 1.6;
    color: var(--text-light);
  }

  .unique-modern-theme .invitation-popup {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    border-radius: 25px;
    box-shadow: 0 30px 100px rgba(0, 0, 0, 0.5);
    padding: 4rem;
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
    position: relative;
    backdrop-filter: blur(20px);
    border: 2px solid var(--neon-color);
  }

  .unique-modern-theme .invitation-popup::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, var(--neon-color), var(--accent-color), var(--gradient-1));
    border-radius: 25px 25px 0 0;
  }

  .unique-modern-theme .invitation-popup h1 {
    font-family: 'Orbitron', monospace;
    font-size: 3.5rem;
    color: var(--neon-color);
    margin-bottom: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-shadow: var(--glow-primary);
  }

  .unique-modern-theme .invitation-popup h2 {
    font-family: 'Pacifico', cursive;
    font-size: 4rem;
    color: var(--accent-color);
    margin-bottom: 2rem;
    font-weight: 400;
    text-shadow: var(--glow-accent);
  }

  .unique-modern-theme .music-player {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1000;
  }

  .unique-modern-theme .music-toggle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--neon-color), var(--accent-color));
    border: 3px solid var(--neon-color);
    color: var(--background-color);
    font-size: 2rem;
    cursor: pointer;
    box-shadow: var(--glow-primary);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .unique-modern-theme .music-toggle::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, var(--accent-color), var(--gradient-1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .unique-modern-theme .music-toggle:hover::before {
    opacity: 1;
  }

  .unique-modern-theme .music-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 20px 50px rgba(0, 212, 255, 0.5);
  }

  .unique-modern-theme .music-toggle svg {
    position: relative;
    z-index: 1;
  }

  /* Animations */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  @keyframes glow {
    0%, 100% { text-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }
    50% { text-shadow: 0 0 30px rgba(0, 212, 255, 0.6); }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .unique-modern-theme .hero-title {
      font-size: 3rem;
    }

    .unique-modern-theme .hero-subtitle {
      font-size: 2.5rem;
    }

    .unique-modern-theme .couple-photo {
      width: 200px;
      height: 200px;
    }

    .unique-modern-theme .section-title {
      font-size: 3rem;
    }

    .unique-modern-theme .countdown-number {
      font-size: 3.5rem;
    }

    .unique-modern-theme .countdown-item {
      margin: 0 1rem;
    }

    .unique-modern-theme .invitation-popup h1 {
      font-size: 2.5rem;
    }

    .unique-modern-theme .invitation-popup h2 {
      font-size: 3rem;
    }

    .unique-modern-theme .footer-families {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .unique-modern-theme .quote-text {
      font-size: 2.5rem;
    }

    .unique-modern-theme .social-icons {
      gap: 1rem;
    }

    .unique-modern-theme .social-icon {
      width: 50px;
      height: 50px;
    }
  }
`;
