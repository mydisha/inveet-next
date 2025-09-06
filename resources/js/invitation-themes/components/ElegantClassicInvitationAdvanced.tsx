import React, { useState } from 'react';
import { elegantClassicTheme } from '../themes/elegant-classic';
import { InvitationData } from '../types';

interface ElegantClassicInvitationAdvancedProps {
  data: InvitationData;
  className?: string;
  onRsvpClick?: () => void;
  onShareClick?: () => void;
}

// Reusable components for the elegant theme
const DecorativeDivider: React.FC<{ theme: any }> = ({ theme }) => (
  <div className="decorative-line" style={{ margin: '2rem 0' }}></div>
);

const VenueCard: React.FC<{
  venueName: string;
  venueAddress?: string;
  theme: any
}> = ({ venueName, venueAddress, theme }) => (
  <div className="venue-details">
    <div style={theme.components.venue}>
      <strong>{venueName}</strong>
      {venueAddress && (
        <div style={{ marginTop: '0.5rem', fontSize: '1rem' }}>
          {venueAddress}
        </div>
      )}
    </div>
  </div>
);

const DateTimeDisplay: React.FC<{
  date: string;
  time?: string;
  theme: any
}> = ({ date, time, theme }) => (
  <div className="date-time">
    <div className="date" style={theme.typography.body}>
      {new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })}
    </div>
    <div className="time" style={theme.typography.caption}>
      {time || '6:00 PM'}
    </div>
  </div>
);

const RsvpSection: React.FC<{
  data: InvitationData;
  theme: any;
  onRsvpClick?: () => void
}> = ({ data, theme, onRsvpClick }) => {
  if (!data.rsvpRequired) return null;

  return (
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
          onClick={onRsvpClick || (() => {
            if (data.rsvpUrl) {
              window.open(data.rsvpUrl, '_blank');
            }
          })}
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
  );
};

const ActionButtons: React.FC<{
  onRsvpClick?: () => void;
  onShareClick?: () => void;
  theme: any;
}> = ({ onRsvpClick, onShareClick, theme }) => (
  <div style={{
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '2rem',
    flexWrap: 'wrap'
  }}>
    {onRsvpClick && (
      <button
        style={{
          ...theme.components.rsvpButton,
          backgroundColor: theme.colors.accent,
          padding: '0.5rem 1.5rem',
          fontSize: '0.9rem'
        }}
        onClick={onRsvpClick}
      >
        RSVP
      </button>
    )}

    {onShareClick && (
      <button
        style={{
          ...theme.components.rsvpButton,
          backgroundColor: 'transparent',
          color: theme.colors.text,
          border: `1px solid ${theme.colors.border}`,
          padding: '0.5rem 1.5rem',
          fontSize: '0.9rem'
        }}
        onClick={onShareClick}
      >
        Share
      </button>
    )}
  </div>
);

const ElegantClassicInvitationAdvanced: React.FC<ElegantClassicInvitationAdvancedProps> = ({
  data,
  className = '',
  onRsvpClick,
  onShareClick
}) => {
  const theme = elegantClassicTheme;
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    // Trigger fade-in animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`elegant-classic-theme ${className}`}
      style={{
        ...theme.animations.fadeIn,
        ...(isLoaded ? theme.animations.fadeInVisible : {})
      }}
    >
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

          <DecorativeDivider theme={theme} />
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

          {/* Venue and Date Information */}
          <VenueCard
            venueName={data.venueName}
            venueAddress={data.venueAddress}
            theme={theme}
          />

          <DateTimeDisplay
            date={data.weddingDate}
            time={data.weddingTime}
            theme={theme}
          />

          {/* Special Message */}
          {data.specialMessage && (
            <div style={theme.components.quote}>
              "{data.specialMessage}"
            </div>
          )}

          {/* Action Buttons */}
          <ActionButtons
            onRsvpClick={onRsvpClick}
            onShareClick={onShareClick}
            theme={theme}
          />

          {/* RSVP Section */}
          <RsvpSection
            data={data}
            theme={theme}
            onRsvpClick={onRsvpClick}
          />
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

export default ElegantClassicInvitationAdvanced;
