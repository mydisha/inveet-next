import React, { useState } from 'react';
import { ElegantClassicInvitationAdvanced } from '../../invitation-themes/themes';
import { InvitationData } from '../../invitation-themes/types';

const ElegantInvitationDemo: React.FC = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Sample wedding data
  const sampleData: InvitationData = {
    groomName: 'Alexander',
    brideName: 'Isabella',
    weddingDate: '2024-06-15',
    weddingTime: '4:00 PM',
    venueName: 'The Grand Ballroom',
    venueAddress: '123 Elegant Avenue, Beautiful City, BC 12345',
    specialMessage: 'Love is not about how many days, months, or years you have been together. It\'s all about how much you love each other every single day.',
    rsvpRequired: true,
    rsvpUrl: 'https://example.com/rsvp',
    rsvpDeadline: '2024-05-15',
    websiteUrl: 'https://alexandisabella.com',
    theme: 'elegant-classic'
  };

  const handleRsvpClick = () => {
    alert('RSVP functionality would be implemented here');
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Wedding Invitation',
        text: `You're invited to ${sampleData.groomName} & ${sampleData.brideName}'s wedding!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Invitation link copied to clipboard!');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '2rem 0'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Demo Controls */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            marginBottom: '1rem',
            color: '#2C3E50',
            fontFamily: "'Playfair Display', serif"
          }}>
            Elegant Wedding Invitation Demo
          </h2>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={showAdvanced}
                onChange={(e) => setShowAdvanced(e.target.checked)}
              />
              Show Advanced Version
            </label>

            <div style={{
              fontSize: '0.9rem',
              color: '#6C757D',
              fontStyle: 'italic'
            }}>
              {showAdvanced
                ? 'Advanced version with reusable components'
                : 'Basic elegant invitation'
              }
            </div>
          </div>
        </div>

        {/* Invitation Display */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          {showAdvanced ? (
            <ElegantClassicInvitationAdvanced
              data={sampleData}
              onRsvpClick={handleRsvpClick}
              onShareClick={handleShareClick}
            />
          ) : (
            <ElegantClassicInvitationAdvanced
              data={sampleData}
              onRsvpClick={handleRsvpClick}
              onShareClick={handleShareClick}
            />
          )}
        </div>

        {/* Theme Information */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          marginTop: '2rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            marginBottom: '1rem',
            color: '#2C3E50',
            fontFamily: "'Playfair Display', serif"
          }}>
            Theme Features
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <div>
              <h4 style={{ color: '#2C3E50', marginBottom: '0.5rem' }}>Typography</h4>
              <ul style={{ color: '#6C757D', fontSize: '0.9rem', lineHeight: '1.6' }}>
                <li>Playfair Display for headings</li>
                <li>Source Sans Pro for body text</li>
                <li>Dancing Script for decorative text</li>
                <li>Responsive font sizing</li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#2C3E50', marginBottom: '0.5rem' }}>Design</h4>
              <ul style={{ color: '#6C757D', fontSize: '0.9rem', lineHeight: '1.6' }}>
                <li>Clean, minimal layout</li>
                <li>Elegant color palette</li>
                <li>Subtle animations</li>
                <li>Mobile responsive</li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#2C3E50', marginBottom: '0.5rem' }}>Components</h4>
              <ul style={{ color: '#6C757D', fontSize: '0.9rem', lineHeight: '1.6' }}>
                <li>Reusable venue cards</li>
                <li>Interactive RSVP buttons</li>
                <li>Decorative dividers</li>
                <li>Share functionality</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElegantInvitationDemo;
