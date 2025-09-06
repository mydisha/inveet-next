import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Calendar,
    Clock,
    ExternalLink,
    Gift,
    Heart,
    Instagram,
    MapPin,
    MessageCircle,
    Pause,
    Play,
    Users
} from 'lucide-react';
import React from 'react';
import {
    CountdownProps,
    CoupleInfoProps,
    DonationProps,
    GalleryProps,
    GuestbookProps,
    LocationCardProps,
    MusicPlayerProps
} from '../types';

// Music Player Component
export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isPlaying,
  onToggle,
  musicUrl
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onToggle}
        size="lg"
        className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary/20"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-primary" />
        ) : (
          <Play className="w-6 h-6 text-primary" />
        )}
      </Button>
    </div>
  );
};

// Countdown Component
export const Countdown: React.FC<CountdownProps> = ({
  targetDate,
  labels
}) => {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
      <div className="text-center">
        <div className="text-4xl font-bold text-primary mb-2">
          {timeLeft.days.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-muted-foreground">{labels.days}</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-primary mb-2">
          {timeLeft.hours.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-muted-foreground">{labels.hours}</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-primary mb-2">
          {timeLeft.minutes.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-muted-foreground">{labels.minutes}</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-primary mb-2">
          {timeLeft.seconds.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-muted-foreground">{labels.seconds}</div>
      </div>
    </div>
  );
};

// Location Card Component
export const LocationCard: React.FC<LocationCardProps> = ({
  type,
  placeName,
  location,
  date,
  time,
  timezone,
  latitude,
  longitude,
  onNavigate,
  showMap = false
}) => {
  const handleNavigate = () => {
    if (latitude && longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&dir_action=navigate`;
      window.open(url, '_blank');
    }
    onNavigate?.();
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {showMap && latitude && longitude && (
        <div className="h-48 w-full">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${latitude},${longitude}&language=id`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{type}</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground">{placeName}</p>
              <p className="text-sm text-muted-foreground">{location}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="w-5 h-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground">{date}</p>
              <p className="text-sm text-muted-foreground">{time} {timezone}</p>
            </div>
          </div>
        </div>

        {onNavigate && (
          <Button
            onClick={handleNavigate}
            className="w-full mt-4 bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Navigate to Location
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

// Couple Info Component
export const CoupleInfo: React.FC<CoupleInfoProps> = ({
  groom,
  bride,
  quotes,
  namePosition,
  showPhotos
}) => {
  const groomData = namePosition === 'male' ? groom : bride;
  const brideData = namePosition === 'male' ? bride : groom;

  return (
    <div className="text-center py-16">
      <h2 className="text-4xl font-bold text-foreground mb-12">The Happy Couple</h2>

      {quotes && (
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-lg italic text-muted-foreground leading-relaxed">
            {quotes}
          </p>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-4xl mx-auto">
        {/* Groom */}
        <div className="flex flex-col items-center">
          {showPhotos && groomData.photo && (
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 shadow-lg">
              <img
                src={groomData.photo}
                alt={groomData.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <h3 className="text-2xl font-bold text-foreground mb-2">{groomData.name}</h3>
          {groomData.fatherName && groomData.motherName && (
            <p className="text-sm text-muted-foreground mb-2">
              Son of {groomData.fatherName} & {groomData.motherName}
            </p>
          )}
          {groomData.instagram && (
            <a
              href={`https://instagram.com/${groomData.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Heart Icon */}
        <div className="text-4xl text-primary">
          <Heart className="w-12 h-12" />
        </div>

        {/* Bride */}
        <div className="flex flex-col items-center">
          {showPhotos && brideData.photo && (
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 shadow-lg">
              <img
                src={brideData.photo}
                alt={brideData.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <h3 className="text-2xl font-bold text-foreground mb-2">{brideData.name}</h3>
          {brideData.fatherName && brideData.motherName && (
            <p className="text-sm text-muted-foreground mb-2">
              Daughter of {brideData.fatherName} & {brideData.motherName}
            </p>
          )}
          {brideData.instagram && (
            <a
              href={`https://instagram.com/${brideData.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Gallery Component
export const Gallery: React.FC<GalleryProps> = ({
  galleries,
  youtubeUrl,
  onImageClick
}) => {
  const [selectedImage, setSelectedImage] = React.useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    onImageClick?.(index);
  };

  return (
    <div className="py-16">
      <h2 className="text-4xl font-bold text-center text-foreground mb-12">Gallery</h2>

      {youtubeUrl && (
        <div className="max-w-4xl mx-auto mb-12">
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={youtubeUrl}
              title="Wedding Video"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {galleries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {galleries.map((gallery, index) => (
            <div
              key={gallery.id}
              className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={gallery.filename}
                alt={gallery.alt_text || `Gallery image ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}

      {/* Image Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl max-h-full">
            <img
              src={galleries[selectedImage]?.filename}
              alt={galleries[selectedImage]?.alt_text || `Gallery image ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
          <Button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
            size="sm"
          >
            ×
          </Button>
        </div>
      )}
    </div>
  );
};

// Guestbook Component
export const Guestbook: React.FC<GuestbookProps> = ({
  comments,
  onSubmit,
  maxRsvp = 5,
  isInvitationEnabled = true,
  labels
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    comment: '',
    is_present: true,
    guest_count: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', comment: '', is_present: true, guest_count: 1 });
    setIsOpen(false);
  };

  return (
    <div className="py-16">
      <h2 className="text-4xl font-bold text-center text-foreground mb-12">{labels.title}</h2>

      {/* Comments Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
        {comments.map((comment) => (
          <Card key={comment.id} className="p-6 shadow-lg">
            <p className="text-foreground mb-4 leading-relaxed">{comment.comment}</p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{comment.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(comment.created_at).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Comment Button */}
      <div className="text-center">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          {labels.button}
        </Button>
      </div>

      {/* Comment Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-center mb-6">{labels.title}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder={labels.name}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder={labels.content}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent h-24 resize-none"
                    required
                  />
                </div>
                {isInvitationEnabled && (
                  <>
                    <div>
                      <select
                        value={formData.is_present ? '1' : '0'}
                        onChange={(e) => setFormData({ ...formData, is_present: e.target.value === '1' })}
                        className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="1">{labels.present}</option>
                        <option value="0">{labels.notPresent}</option>
                      </select>
                    </div>
                    <div>
                      <select
                        value={formData.guest_count}
                        onChange={(e) => setFormData({ ...formData, guest_count: parseInt(e.target.value) })}
                        className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {Array.from({ length: maxRsvp }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {labels.person}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90"
                  >
                    {labels.send}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// Donation Component
export const Donation: React.FC<DonationProps> = ({
  type,
  defaultWallet,
  onSubmit,
  labels
}) => {
  return (
    <div className="py-16 text-center">
      <h2 className="text-4xl font-bold text-foreground mb-4">{labels.title}</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        {labels.subtitle}
      </p>

      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-lg p-8 mb-6">
          <Gift className="w-16 h-16 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground mb-6">
            Your presence is the greatest gift, but if you wish to give something more,
            we would be honored to receive your blessing.
          </p>
        </div>

        <Button
          onClick={onSubmit}
          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90"
        >
          <Gift className="w-4 h-4 mr-2" />
          {labels.button}
        </Button>
      </div>
    </div>
  );
};
