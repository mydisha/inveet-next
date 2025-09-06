import React from 'react';
import { elegantClassicTheme } from '../themes/elegant-classic';
import { InvitationData } from '../types';

interface ElegantClassicInvitationProps {
  data: InvitationData;
  className?: string;
}

const ElegantClassicInvitation: React.FC<ElegantClassicInvitationProps> = ({
  data,
  className = ''
}) => {
  const theme = elegantClassicTheme;

  return (
    <div className={`elegant-classic-theme ${className}`}>
      <div className="card" style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto' }}>
        {/* Header Section */}
        <header style={theme.components.header}>
          <div style={theme.components.coupleNames}>
            {data.groomName} & {data.brideName}
          </div>

          <div style={theme.components.weddingDate}>
            {new Date(data.weddingDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>

          <div className="decorative-line"></div>
        </header>

        {/* Main Content */}
        <main style={theme.components.content}>
          <div style={theme.components.invitationText}>
            Together with their families
            <br />
            {data.groomName} & {data.brideName}
            <br />
            request the pleasure of your company
            <br />
            as they celebrate their union
          </div>

          {/* Venue Details */}
          <div className="venue-details">
            <div style={theme.components.venue}>
              <strong>{data.venueName}</strong>
              {data.venueAddress && (
                <div style={{ marginTop: '0.5rem', fontSize: '1rem' }}>
                  {data.venueAddress}
                </div>
              )}
            </div>

            <div className="date-time">
              <div className="date" style={theme.typography.body}>
                {new Date(data.weddingDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <div className="time" style={theme.typography.caption}>
                {data.weddingTime || '6:00 PM'}
              </div>
            </div>
          </div>

          {/* Special Message */}
          {data.specialMessage && (
            <div style={theme.components.quote}>
              "{data.specialMessage}"
            </div>
          )}

          {/* RSVP Section */}
          {data.rsvpRequired && (
            <div style={theme.components.rsvp}>
              <h3 style={{
                ...theme.typography.subheading,
                textAlign: 'center',
                marginBottom: '1rem',
                color: theme.colors.text
              }}>
                Kindly Respond
              </h3>

              <p style={{
                ...theme.typography.body,
                textAlign: 'center',
                marginBottom: '1.5rem',
                color: theme.colors.textSecondary
              }}>
                Please let us know if you'll be joining us for our special day
              </p>

              <div style={{ textAlign: 'center' }}>
                <button
                  style={theme.components.rsvpButton}
                  onClick={() => {
                    // Handle RSVP click
                    if (data.rsvpUrl) {
                      window.open(data.rsvpUrl, '_blank');
                    }
                  }}
                >
                  RSVP Here
                </button>
              </div>

              {data.rsvpDeadline && (
                <p style={{
                  ...theme.typography.caption,
                  textAlign: 'center',
                  marginTop: '1rem',
                  color: theme.colors.textSecondary
                }}>
                  Please respond by {new Date(data.rsvpDeadline).toLocaleDateString()}
                </p>
              )}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer style={theme.components.footer}>
          <div style={theme.components.quote}>
            "Two souls, one heart"
          </div>

          {data.websiteUrl && (
            <div style={{
              ...theme.typography.caption,
              marginTop: '1rem',
              color: theme.colors.textSecondary
            }}>
              For more information, visit: {data.websiteUrl}
            </div>
          )}
        </footer>
      </div>

      {/* Custom CSS */}
      <style dangerouslySetInnerHTML={{ __html: theme.customCSS }} />
    </div>
  );
};

export default ElegantClassicInvitation;
