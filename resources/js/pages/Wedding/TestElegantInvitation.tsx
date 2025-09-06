import React from 'react';
import { ElegantClassicInvitationAdvanced } from '../../invitation-themes/themes';
import { InvitationData } from '../../invitation-themes/types';

const TestElegantInvitation: React.FC = () => {
  // Simple test data
  const testData: InvitationData = {
    groomName: 'John',
    brideName: 'Sarah',
    weddingDate: '2024-08-15',
    weddingTime: '4:00 PM',
    venueName: 'Garden Manor',
    venueAddress: '123 Beautiful Street, City, State 12345',
    specialMessage: 'Two hearts, one love, forever together.',
    rsvpRequired: true,
    rsvpUrl: '#',
    rsvpDeadline: '2024-07-15',
    websiteUrl: 'https://johnandsarah.com',
    theme: 'elegant-classic'
  };

  const handleRsvpClick = () => {
    alert('RSVP clicked! This would open the RSVP form.');
  };

  const handleShareClick = () => {
    alert('Share clicked! This would open share options.');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '1rem'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{
          textAlign: 'center',
          color: '#2C3E50',
          marginBottom: '2rem',
          fontFamily: "'Playfair Display', serif"
        }}>
          Elegant Wedding Invitation Test
        </h1>

        <ElegantClassicInvitationAdvanced
          data={testData}
          onRsvpClick={handleRsvpClick}
          onShareClick={handleShareClick}
        />
      </div>
    </div>
  );
};

export default TestElegantInvitation;
