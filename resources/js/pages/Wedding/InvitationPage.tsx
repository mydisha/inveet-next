import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import ThemeRegistry from '../../invitation-themes/ThemeRegistry';
import { InvitationData, WeddingData } from '../../invitation-themes/types';

interface InvitationPageProps {
  wedding: WeddingData;
  invitation?: InvitationData;
  themeId: string;
  isPreview?: boolean;
}

const InvitationPage: React.FC<InvitationPageProps> = ({
  wedding,
  invitation,
  themeId,
  isPreview = false
}) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showInvitation, setShowInvitation] = useState(!invitation);

  // Handle invitation opening
  const handleOpenInvitation = () => {
    setShowInvitation(true);
  };

  // Handle music toggle
  const handleMusicToggle = (isPlaying: boolean) => {
    setIsMusicPlaying(isPlaying);

    if (wedding.wedding_music) {
      const audio = new Audio(wedding.wedding_music);

      if (isPlaying) {
        audio.play().catch(console.error);
      } else {
        audio.pause();
      }
    }
  };

  // Handle RSVP submission
  const handleRSVPSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/weddings/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({
          wedding_id: wedding.id,
          ...data
        })
      });

      if (response.ok) {
        // Handle success
        console.log('RSVP submitted successfully');
      } else {
        console.error('Failed to submit RSVP');
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/weddings/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({
          wedding_id: wedding.id,
          ...data
        })
      });

      if (response.ok) {
        // Handle success
        console.log('Comment submitted successfully');
        // Refresh the page or update the comments list
        window.location.reload();
      } else {
        console.error('Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  // Handle donation click
  const handleDonationClick = () => {
    // Open donation modal or redirect to payment
    console.log('Donation clicked');
  };

  // Countdown effect
  useEffect(() => {
    if (wedding.is_countdown_enabled && wedding.reception_date) {
      const updateCountdown = () => {
        const now = new Date().getTime();
        const target = new Date(wedding.reception_date!).getTime();
        const difference = target - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          const daysEl = document.getElementById('days');
          const hoursEl = document.getElementById('hours');
          const minutesEl = document.getElementById('minutes');
          const secondsEl = document.getElementById('seconds');

          if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
          if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
          if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
          if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        }
      };

      updateCountdown();
      const timer = setInterval(updateCountdown, 1000);

      return () => clearInterval(timer);
    }
  }, [wedding.is_countdown_enabled, wedding.reception_date]);

  return (
    <>
      <Head title={`${wedding.title} - ${wedding.groom_name} & ${wedding.bride_name}`} />

      <ThemeRegistry
        themeId={themeId}
        wedding={wedding}
        invitation={invitation}
        onOpenInvitation={handleOpenInvitation}
        onMusicToggle={handleMusicToggle}
        onRSVPSubmit={handleRSVPSubmit}
        onCommentSubmit={handleCommentSubmit}
        onDonationClick={handleDonationClick}
        isPreview={isPreview}
      />
    </>
  );
};

export default InvitationPage;
