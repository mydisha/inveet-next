import { InvitationTheme } from '../types';

export const elegantClassicTheme: InvitationTheme = {
  id: 'elegant-classic',
  name: 'Elegant Classic',
  description: 'A timeless, elegant wedding invitation with clean typography and sophisticated design',
  category: 'classic',
  preview: '/themes/elegant-classic-preview.jpg',

  // Color palette - elegant and sophisticated
  colors: {
    primary: '#2C3E50',      // Deep navy blue
    secondary: '#E8E8E8',    // Light gray
    accent: '#D4AF37',       // Gold accent
    background: '#FFFFFF',   // Pure white
    text: '#2C3E50',         // Dark navy for text
    textSecondary: '#6C757D', // Medium gray for secondary text
    border: '#E8E8E8',       // Light border
  },

  // Typography - elegant and readable
  typography: {
    heading: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '2.5rem',
      fontWeight: '400',
      lineHeight: '1.2',
      letterSpacing: '0.02em',
    },
    subheading: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.5rem',
      fontWeight: '300',
      lineHeight: '1.3',
      letterSpacing: '0.01em',
    },
    body: {
      fontFamily: "'Source Sans Pro', sans-serif",
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.6',
      letterSpacing: '0.01em',
    },
    caption: {
      fontFamily: "'Source Sans Pro', sans-serif",
      fontSize: '0.875rem',
      fontWeight: '300',
      lineHeight: '1.5',
      letterSpacing: '0.02em',
    },
    script: {
      fontFamily: "'Dancing Script', cursive",
      fontSize: '1.25rem',
      fontWeight: '400',
      lineHeight: '1.4',
      letterSpacing: '0.01em',
    }
  },

  // Layout configuration
  layout: {
    maxWidth: '600px',
    padding: '2rem',
    spacing: {
      small: '0.5rem',
      medium: '1rem',
      large: '2rem',
      xlarge: '3rem',
    },
    borderRadius: '8px',
    shadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },

  // Component styles
  components: {
    // Header section
    header: {
      textAlign: 'center' as const,
      marginBottom: '2rem',
      padding: '2rem 0',
      borderBottom: '1px solid #E8E8E8',
    },

    // Couple names
    coupleNames: {
      fontSize: '3rem',
      fontWeight: '400',
      color: '#2C3E50',
      fontFamily: "'Playfair Display', serif",
      lineHeight: '1.1',
      marginBottom: '0.5rem',
      letterSpacing: '0.02em',
    },

    // Wedding date
    weddingDate: {
      fontSize: '1.25rem',
      fontWeight: '300',
      color: '#6C757D',
      fontFamily: "'Source Sans Pro', sans-serif",
      marginBottom: '0.5rem',
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
    },

    // Venue information
    venue: {
      fontSize: '1.125rem',
      fontWeight: '400',
      color: '#2C3E50',
      fontFamily: "'Source Sans Pro', sans-serif",
      lineHeight: '1.5',
      marginBottom: '1rem',
    },

    // Main content area
    content: {
      padding: '2rem 0',
      textAlign: 'center' as const,
    },

    // Invitation text
    invitationText: {
      fontSize: '1.125rem',
      fontWeight: '300',
      color: '#2C3E50',
      fontFamily: "'Source Sans Pro', sans-serif",
      lineHeight: '1.6',
      marginBottom: '2rem',
      fontStyle: 'italic',
    },

    // RSVP section
    rsvp: {
      backgroundColor: '#F8F9FA',
      padding: '2rem',
      borderRadius: '8px',
      marginTop: '2rem',
      border: '1px solid #E8E8E8',
    },

    // RSVP button
    rsvpButton: {
      backgroundColor: '#2C3E50',
      color: '#FFFFFF',
      padding: '0.75rem 2rem',
      borderRadius: '4px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      fontFamily: "'Source Sans Pro', sans-serif",
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },

    // Footer
    footer: {
      textAlign: 'center' as const,
      padding: '2rem 0',
      borderTop: '1px solid #E8E8E8',
      marginTop: '2rem',
    },

    // Decorative elements
    divider: {
      height: '1px',
      backgroundColor: '#D4AF37',
      margin: '2rem 0',
      width: '100px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },

    // Quote or special message
    quote: {
      fontSize: '1rem',
      fontWeight: '300',
      color: '#6C757D',
      fontFamily: "'Source Sans Pro', sans-serif",
      fontStyle: 'italic',
      lineHeight: '1.6',
      margin: '1.5rem 0',
    },
  },

  // Responsive design
  responsive: {
    mobile: {
      layout: {
        padding: '1rem',
        spacing: {
          small: '0.25rem',
          medium: '0.5rem',
          large: '1rem',
          xlarge: '1.5rem',
        },
      },
      typography: {
        heading: {
          fontSize: '2rem',
        },
        subheading: {
          fontSize: '1.25rem',
        },
        body: {
          fontSize: '0.9rem',
        },
      },
      components: {
        coupleNames: {
          fontSize: '2.25rem',
        },
        weddingDate: {
          fontSize: '1rem',
        },
        venue: {
          fontSize: '1rem',
        },
      },
    },
  },

  // Animation and transitions
  animations: {
    fadeIn: {
      opacity: '0',
      transform: 'translateY(20px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
    },
    fadeInVisible: {
      opacity: '1',
      transform: 'translateY(0)',
    },
  },

  // Custom CSS for additional styling
  customCSS: `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600&family=Source+Sans+Pro:wght@300;400;500;600&family=Dancing+Script:wght@400;500;600&display=swap');

    .elegant-classic-theme {
      font-family: 'Source Sans Pro', sans-serif;
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      min-height: 100vh;
    }

    .elegant-classic-theme .couple-names {
      background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .elegant-classic-theme .decorative-line {
      position: relative;
      height: 2px;
      background: linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%);
      margin: 2rem 0;
    }

    .elegant-classic-theme .decorative-line::before,
    .elegant-classic-theme .decorative-line::after {
      content: '❦';
      position: absolute;
      top: -8px;
      color: #D4AF37;
      font-size: 1.2rem;
    }

    .elegant-classic-theme .decorative-line::before {
      left: 50%;
      transform: translateX(-50%);
    }

    .elegant-classic-theme .rsvp-button:hover {
      background-color: #34495E;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
    }

    .elegant-classic-theme .card {
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      position: relative;
    }

    .elegant-classic-theme .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #D4AF37 0%, #F4D03F 50%, #D4AF37 100%);
    }

    .elegant-classic-theme .venue-details {
      background: #F8F9FA;
      padding: 1.5rem;
      border-radius: 8px;
      margin: 1.5rem 0;
      border-left: 4px solid #D4AF37;
    }

    .elegant-classic-theme .date-time {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1rem 0;
      padding: 1rem;
      background: #ffffff;
      border-radius: 6px;
      border: 1px solid #E8E8E8;
    }

    .elegant-classic-theme .date-time .date {
      font-weight: 500;
      color: #2C3E50;
    }

    .elegant-classic-theme .date-time .time {
      color: #6C757D;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .elegant-classic-theme .date-time {
        flex-direction: column;
        text-align: center;
        gap: 0.5rem;
      }
    }
  `,
};

export default elegantClassicTheme;
