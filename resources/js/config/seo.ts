export const seoConfig = {
  // Site Information
  site: {
    name: 'Inveet',
    url: 'https://inveet.id',
    description: 'Create beautiful digital wedding invitations, manage RSVPs, and organize your special day with Inveet. Modern, elegant, and easy-to-use wedding planning platform.',
    keywords: [
      'digital wedding invitations',
      'wedding RSVP',
      'wedding planning',
      'online wedding invites',
      'wedding website',
      'wedding management',
      'digital invites',
      'wedding organization',
      'wedding platform',
      'wedding technology',
      'Indonesia wedding',
      'Jakarta wedding',
      'wedding app',
      'wedding software'
    ],
    author: 'Inveet Team',
    language: 'en',
    locale: 'en_US',
    themeColor: '#8B5CF6',
    msTileColor: '#8B5CF6',
  },

  // Social Media
  social: {
    facebook: {
      appId: 'your-facebook-app-id',
      pageId: 'your-facebook-page-id',
    },
    twitter: {
      handle: '@inveet',
      creator: '@inveet',
    },
    instagram: '@inveet',
    linkedin: 'inveet',
  },

  // Contact Information
  contact: {
    email: 'hello@inveet.com',
    phone: '+62 21 1234 5678',
    address: {
      street: 'Jl. Sudirman No. 123',
      city: 'Jakarta',
      state: 'DKI Jakarta',
      country: 'Indonesia',
      postalCode: '12345',
    },
  },

  // Business Information
  business: {
    type: 'Technology Company',
    industry: 'Wedding Planning & Technology',
    founded: '2024',
    employees: '10-50',
    services: [
      'Digital Wedding Invitations',
      'RSVP Management',
      'Wedding Website Creation',
      'Guest List Management',
      'Wedding Planning Tools',
    ],
  },

  // SEO Settings
  seo: {
    robots: 'index, follow',
    revisitAfter: '7 days',
    googleAnalytics: 'GA_MEASUREMENT_ID',
    googleTagManager: 'GTM_CONTAINER_ID',
    facebookPixel: 'FACEBOOK_PIXEL_ID',
    twitterPixel: 'TWITTER_PIXEL_ID',
  },

  // Page-specific SEO
  pages: {
    home: {
      title: 'Inveet - Digital Wedding Invitations & Event Management Platform',
      description: 'Create beautiful digital wedding invitations, manage RSVPs, and organize your special day with Inveet. Modern, elegant, and easy-to-use wedding planning platform.',
      keywords: 'digital wedding invitations, wedding RSVP, wedding planning, online wedding invites',
    },
    about: {
      title: 'About Inveet - Leading Digital Wedding Platform',
      description: 'Learn about Inveet, the leading digital wedding invitation platform helping couples create beautiful moments with modern technology.',
      keywords: 'about Inveet, wedding platform company, digital wedding technology',
    },
    services: {
      title: 'Wedding Services - Digital Invitations & Planning Tools',
      description: 'Discover our comprehensive wedding services including digital invitations, RSVP management, and wedding planning tools.',
      keywords: 'wedding services, digital invitations, wedding planning tools, RSVP management',
    },
    contact: {
      title: 'Contact Inveet - Get in Touch for Wedding Solutions',
      description: 'Contact Inveet for all your digital wedding invitation needs. Our team is here to help you create the perfect wedding experience.',
      keywords: 'contact Inveet, wedding support, customer service, wedding consultation',
    },
  },

  // Open Graph defaults
  openGraph: {
    type: 'website',
    siteName: 'Inveet',
    locale: 'en_US',
    image: '/images/og-image.jpg',
    imageWidth: 1200,
    imageHeight: 630,
  },

  // Twitter Card defaults
  twitter: {
    card: 'summary_large_image',
    site: '@inveet',
    creator: '@inveet',
  },
};

export default seoConfig;
