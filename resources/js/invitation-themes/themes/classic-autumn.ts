import { ThemeConfig } from '../types';

export const classicAutumnTheme: ThemeConfig = {
  id: 'classic-autumn',
  name: 'Classic Autumn',
  description: 'A faithful recreation of the original autumn template with warm colors and elegant typography',
  colors: {
    primary: '#C07D37',
    secondary: '#ffbc9d',
    accent: '#C07D37',
    background: '#f7f7f7',
    text: '#333333',
    textLight: '#666666'
  },
  fonts: {
    heading: 'Satisfy, cursive',
    body: 'Poppins, sans-serif',
    script: 'Satisfy, cursive'
  },
  assets: {
    coverBackground: '/themes/assets/images/img-3.png',
    decorativeElements: [
      '/themes/assets/images/date.png',
      '/themes/assets/images/location.png'
    ],
    icons: {
      date: '/themes/assets/images/date.png',
      location: '/themes/assets/images/location.png',
      heart: '/themes/assets/images/no-image.png',
      facebook: '/themes/assets/images/no-image.png',
      twitter: '/themes/assets/images/no-image.png',
      youtube: '/themes/assets/images/no-image.png',
      instagram: '/themes/assets/images/icon-ig.svg',
      whatsapp: '/themes/assets/images/no-image.png'
    }
  },
  layout: {
    coverHeight: 'full',
    coupleLayout: 'side-by-side',
    locationLayout: 'cards',
    galleryLayout: 'grid'
  }
};

export const classicAutumnStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap');

  .classic-autumn-theme {
    --primary-color: #C07D37;
    --secondary-color: #ffbc9d;
    --accent-color: #C07D37;
    --background-color: #f7f7f7;
    --text-color: #333333;
    --text-light: #666666;
    --white: #ffffff;
  }

  .classic-autumn-theme * {
    box-sizing: border-box;
  }

  .classic-autumn-theme body {
    background-color: var(--background-color);
    font-family: 'Poppins', sans-serif;
  }

  .classic-autumn-theme .img-cover {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100%;
  }

  .classic-autumn-theme .font-poppins {
    font-family: 'Poppins', sans-serif;
  }

  .classic-autumn-theme .font-satisfy {
    font-family: 'Satisfy', cursive;
    color: var(--primary-color);
  }

  .classic-autumn-theme .letter-spacing-font {
    letter-spacing: 5px;
  }

  .classic-autumn-theme .caption-hero {
    font-size: 14px;
  }

  .classic-autumn-theme .mt-section2 {
    margin-top: 10rem;
  }

  .classic-autumn-theme .icon {
    max-width: 4vw;
    height: 5vh;
  }

  .classic-autumn-theme .position-title {
    text-align: left;
  }

  .classic-autumn-theme .img-85 {
    width: 85%;
  }

  .classic-autumn-theme .mx-invitationS2 {
    margin-left: 3rem;
    margin-right: 3rem;
  }

  .classic-autumn-theme .mx-invitationS1 {
    margin-left: 0rem;
    margin-right: 0rem;
  }

  .classic-autumn-theme .btn-gm {
    background: var(--primary-color);
    border-radius: 8px;
    color: white;
    border: none;
    padding: 12px 24px;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .classic-autumn-theme .btn-gm:hover {
    background: #a66b2e;
    transform: translateY(-2px);
  }

  .classic-autumn-theme .btn-send {
    background: var(--secondary-color);
    box-shadow: 0px 4px 10px 3px rgba(215, 175, 157, 0.5);
    border-radius: 12px;
    color: white;
    border: none;
    padding: 12px 24px;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .classic-autumn-theme .btn-send:hover {
    background: #ffa366;
    transform: translateY(-2px);
  }

  .classic-autumn-theme .flex-column-mobile {
    flex-direction: none;
  }

  .classic-autumn-theme .img-footers {
    max-width: 100vw;
    height: 60vh;
    background-color: var(--primary-color);
  }

  .classic-autumn-theme hr.line {
    border-top: 2px solid white;
    width: 70px;
    margin: 0 auto;
  }

  .classic-autumn-theme .fontW300 {
    font-weight: 300;
  }

  .classic-autumn-theme .fontW400 {
    font-weight: 400;
  }

  .classic-autumn-theme .fontW500 {
    font-weight: 500;
  }

  .classic-autumn-theme .mt-modal {
    margin-top: 4rem;
  }

  .classic-autumn-theme .font13px {
    font-size: 13px;
  }

  .classic-autumn-theme .font14 {
    font-size: 14px;
  }

  .classic-autumn-theme .px-captionModal {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  .classic-autumn-theme .mt-modal-2 {
    margin-top: 3rem;
  }

  .classic-autumn-theme .couple-section {
    text-align: center;
    padding-bottom: 98px;
  }

  .classic-autumn-theme .hero-section {
    position: relative;
    height: 100vh;
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
                url('/themes/assets/images/img-3.png');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .classic-autumn-theme .hero-content {
    text-align: center;
    z-index: 2;
  }

  .classic-autumn-theme .hero-title {
    font-family: 'Satisfy', cursive;
    font-size: 4rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .classic-autumn-theme .hero-subtitle {
    font-family: 'Poppins', sans-serif;
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: 5px;
    margin-bottom: 2rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  .classic-autumn-theme .hero-caption {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 2rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  .classic-autumn-theme .couple-photo {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 8px solid var(--primary-color);
    margin: 0 auto 2rem;
    object-fit: cover;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .classic-autumn-theme .couple-name {
    font-family: 'Poppins', sans-serif;
    font-size: 2.5rem;
    font-weight: 500;
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }

  .classic-autumn-theme .couple-parents {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    color: var(--text-light);
    margin-bottom: 1rem;
  }

  .classic-autumn-theme .section-title {
    font-family: 'Satisfy', cursive;
    font-size: 3rem;
    color: var(--primary-color);
    text-align: center;
    margin-bottom: 3rem;
  }

  .classic-autumn-theme .location-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .classic-autumn-theme .location-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 1rem;
    display: block;
  }

  .classic-autumn-theme .location-title {
    font-family: 'Poppins', sans-serif;
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--text-color);
    margin-bottom: 1rem;
  }

  .classic-autumn-theme .location-date {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }

  .classic-autumn-theme .location-venue {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    color: var(--text-color);
    margin-bottom: 0.5rem;
  }

  .classic-autumn-theme .location-address {
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    color: var(--text-light);
    margin-bottom: 1.5rem;
  }

  .classic-autumn-theme .countdown-container {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    margin: 2rem 0;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .classic-autumn-theme .countdown-item {
    display: inline-block;
    margin: 0 1rem;
    text-align: center;
  }

  .classic-autumn-theme .countdown-number {
    font-family: 'Poppins', sans-serif;
    font-size: 3rem;
    font-weight: 500;
    color: var(--primary-color);
    display: block;
  }

  .classic-autumn-theme .countdown-label {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    color: var(--text-light);
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .classic-autumn-theme .gallery-item {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .classic-autumn-theme .gallery-item:hover {
    transform: scale(1.05);
  }

  .classic-autumn-theme .gallery-item img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  .classic-autumn-theme .footer-section {
    background: var(--primary-color);
    color: white;
    padding: 3rem 0;
    text-align: center;
  }

  .classic-autumn-theme .footer-title {
    font-family: 'Satisfy', cursive;
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .classic-autumn-theme .footer-subtitle {
    font-family: 'Poppins', sans-serif;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  .classic-autumn-theme .footer-couple {
    font-family: 'Poppins', sans-serif;
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 2rem;
  }

  .classic-autumn-theme .footer-families {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .classic-autumn-theme .footer-family {
    text-align: center;
  }

  .classic-autumn-theme .footer-family-title {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .classic-autumn-theme .footer-family-names {
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    opacity: 0.9;
  }

  .classic-autumn-theme .invitation-popup {
    background: white;
    border-radius: 20px;
    padding: 3rem;
    text-align: center;
    max-width: 500px;
    margin: 0 auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .classic-autumn-theme .invitation-popup h1 {
    font-family: 'Satisfy', cursive;
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  .classic-autumn-theme .invitation-popup h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    color: var(--text-color);
    margin-bottom: 2rem;
  }

  .classic-autumn-theme .social-icons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
  }

  .classic-autumn-theme .social-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .classic-autumn-theme .social-icon:hover {
    background: #a66b2e;
    transform: translateY(-2px);
  }

  .classic-autumn-theme .music-player {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }

  .classic-autumn-theme .music-toggle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--primary-color);
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  }

  .classic-autumn-theme .music-toggle:hover {
    background: #a66b2e;
    transform: scale(1.1);
  }

  @media screen and (max-width: 1000px) {
    .classic-autumn-theme .mt-modal {
      margin-top: 2rem;
    }

    .classic-autumn-theme .mt-modal-2 {
      margin-top: 2rem;
    }

    .classic-autumn-theme .px-captionModal {
      padding-left: 0.3rem;
      padding-right: 0.3rem;
    }

    .classic-autumn-theme .flex-column-mobile {
      flex-direction: column-reverse !important;
    }

    .classic-autumn-theme .mx-invitationS2 {
      margin-left: 3rem;
      margin-right: 3rem;
    }

    .classic-autumn-theme .mx-invitationS1 {
      margin-left: 3rem;
      margin-right: 3rem;
    }

    .classic-autumn-theme .mt-mobile {
      margin-top: 1rem;
    }

    .classic-autumn-theme .position-title {
      text-align: center;
    }

    .classic-autumn-theme .position-caption {
      text-align: left;
    }

    .classic-autumn-theme .icon {
      max-width: 7vw;
      height: 4vh;
    }

    .classic-autumn-theme .mt-section2 {
      margin-top: 5rem;
    }

    .classic-autumn-theme .img-cover {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      max-width: 100vw;
      height: auto;
    }

    .classic-autumn-theme .hero-title {
      font-size: 2.5rem;
    }

    .classic-autumn-theme .hero-subtitle {
      font-size: 1.2rem;
    }

    .classic-autumn-theme .couple-photo {
      width: 150px;
      height: 150px;
    }

    .classic-autumn-theme .couple-name {
      font-size: 2rem;
    }

    .classic-autumn-theme .section-title {
      font-size: 2.5rem;
    }

    .classic-autumn-theme .countdown-number {
      font-size: 2rem;
    }

    .classic-autumn-theme .footer-families {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .classic-autumn-theme .invitation-popup h1 {
      font-size: 2rem;
    }

    .classic-autumn-theme .invitation-popup h2 {
      font-size: 1.5rem;
    }
  }
`;
