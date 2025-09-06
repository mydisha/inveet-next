import React, { useState } from 'react';
import { ElegantClassicInvitationAdvanced } from '../../invitation-themes/themes';
import { InvitationData } from '../../invitation-themes/types';

const TestDataScenarios: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState(0);

  const testScenarios: { name: string; data: InvitationData }[] = [
    {
      name: 'Basic Wedding',
      data: {
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
      }
    },
    {
      name: 'Long Names',
      data: {
        groomName: 'Christopher Alexander',
        brideName: 'Isabella Rose-Marie',
        weddingDate: '2024-09-20',
        weddingTime: '5:30 PM',
        venueName: 'The Grand Ballroom at Chateau Elegance',
        venueAddress: '456 Magnificent Boulevard, Suite 200, Beautiful City, State 54321',
        specialMessage: 'Love is not about how many days, months, or years you have been together. It\'s all about how much you love each other every single day.',
        rsvpRequired: true,
        rsvpUrl: '#',
        rsvpDeadline: '2024-08-20',
        websiteUrl: 'https://christopherandisabella.com',
        theme: 'elegant-classic'
      }
    },
    {
      name: 'Minimal Info',
      data: {
        groomName: 'Mike',
        brideName: 'Lisa',
        weddingDate: '2024-10-05',
        weddingTime: '6:00 PM',
        venueName: 'Beach House',
        rsvpRequired: false,
        theme: 'elegant-classic'
      }
    },
    {
      name: 'No RSVP',
      data: {
        groomName: 'David',
        brideName: 'Emma',
        weddingDate: '2024-11-12',
        weddingTime: '3:00 PM',
        venueName: 'Mountain Lodge',
        venueAddress: '789 Scenic Drive, Mountain View, State 98765',
        specialMessage: 'Join us for an intimate celebration of our love.',
        websiteUrl: 'https://davidandemma.com',
        theme: 'elegant-classic'
      }
    }
  ];

  const currentData = testScenarios[currentScenario].data;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '1rem'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Scenario Selector */}
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
            Test Different Scenarios
          </h2>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {testScenarios.map((scenario, index) => (
              <button
                key={index}
                onClick={() => setCurrentScenario(index)}
                style={{
                  padding: '0.5rem 1rem',
                  border: currentScenario === index ? '2px solid #D4AF37' : '1px solid #E8E8E8',
                  borderRadius: '4px',
                  background: currentScenario === index ? '#F8F9FA' : 'white',
                  color: '#2C3E50',
                  cursor: 'pointer',
                  fontFamily: "'Source Sans Pro', sans-serif"
                }}
              >
                {scenario.name}
              </button>
            ))}
          </div>

          <div style={{
            fontSize: '0.9rem',
            color: '#6C757D',
            fontStyle: 'italic'
          }}>
            Currently testing: <strong>{testScenarios[currentScenario].name}</strong>
          </div>
        </div>

        {/* Invitation Display */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <ElegantClassicInvitationAdvanced
            data={currentData}
            onRsvpClick={() => alert('RSVP clicked!')}
            onShareClick={() => alert('Share clicked!')}
          />
        </div>

        {/* Test Instructions */}
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
            Testing Checklist
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            fontSize: '0.9rem',
            color: '#6C757D'
          }}>
            <div>
              <h4 style={{ color: '#2C3E50', marginBottom: '0.5rem' }}>Visual Tests</h4>
              <ul style={{ lineHeight: '1.6' }}>
                <li>✓ Typography looks good</li>
                <li>✓ Colors are consistent</li>
                <li>✓ Spacing is proper</li>
                <li>✓ Responsive on mobile</li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#2C3E50', marginBottom: '0.5rem' }}>Functionality</h4>
              <ul style={{ lineHeight: '1.6' }}>
                <li>✓ RSVP button works</li>
                <li>✓ Share button works</li>
                <li>✓ All data displays correctly</li>
                <li>✓ Handles missing data</li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#2C3E50', marginBottom: '0.5rem' }}>Different Scenarios</h4>
              <ul style={{ lineHeight: '1.6' }}>
                <li>✓ Long names fit well</li>
                <li>✓ Long addresses wrap properly</li>
                <li>✓ Missing fields handled</li>
                <li>✓ Different date formats</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDataScenarios;
