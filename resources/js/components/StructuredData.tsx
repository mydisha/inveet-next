import { useEffect } from 'react';

interface StructuredDataProps {
  type?: 'website' | 'organization' | 'service';
  data?: any;
}

const StructuredData = ({ type = 'website', data }: StructuredDataProps) => {
  useEffect(() => {
    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Create new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    let structuredData;
    
    switch (type) {
      case 'organization':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Inveet",
          "alternateName": "Inveet Wedding Platform",
          "url": "https://inveet.id",
          "logo": "https://inveet.id/logo.png",
          "description": "Digital wedding invitations and event management platform",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Jakarta",
            "addressCountry": "ID"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+62-21-1234-5678",
            "contactType": "customer service",
            "email": "hello@inveet.com"
          },
          "sameAs": [
            "https://facebook.com/inveet",
            "https://instagram.com/inveet",
            "https://twitter.com/inveet"
          ]
        };
        break;
        
      case 'service':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Digital Wedding Invitations",
          "description": "Create beautiful digital wedding invitations and manage RSVPs",
          "provider": {
            "@type": "Organization",
            "name": "Inveet"
          },
          "serviceType": "Wedding Planning",
          "areaServed": "Worldwide",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Wedding Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Digital Wedding Invitations"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "RSVP Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Wedding Website Creation"
                }
              }
            ]
          }
        };
        break;
        
      default: // website
        structuredData = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Inveet",
          "description": "Digital wedding invitations and event management platform",
          "url": "https://inveet.id",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://inveet.id/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        };
    }
    
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [type, data]);

  return null; // This component doesn't render anything
};

export default StructuredData;
