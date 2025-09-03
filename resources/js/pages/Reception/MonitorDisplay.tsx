import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle,
    Clock,
    Gift,
    Heart,
    Sparkles,
    Users
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface GuestData {
  id: number;
  name: string;
  wedding: {
    id: number;
    slug: string;
    wedding_start: string;
    wedding_end: string;
    theme: {
      name: string;
    };
    user: {
      name: string;
    };
  };
  invitation: {
    name: string;
    description: string;
  };
  isVip?: boolean;
  tableNumber?: string;
  seatNumber?: string;
  scannedAt: string;
}

interface MonitorDisplayProps {
  initialGuests?: GuestData[];
}

export default function MonitorDisplay({ initialGuests = [] }: MonitorDisplayProps) {
  const [guests, setGuests] = useState<GuestData[]>(initialGuests);
  const [currentGuest, setCurrentGuest] = useState<GuestData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Fetch recent scans and simulate real-time updates
  useEffect(() => {
    const fetchRecentScans = async () => {
      try {
        const response = await fetch('/api/reception/recent-scans');
        const result = await response.json();

        if (result.success && result.guests.length > 0) {
          setGuests(result.guests);
        }
      } catch (error) {
        console.error('Failed to fetch recent scans:', error);
      }
    };

    // Fetch initial data
    fetchRecentScans();

    // Set up polling for real-time updates
    const interval = setInterval(fetchRecentScans, 3000);

    return () => clearInterval(interval);
  }, []);

  const addGuest = (guest: GuestData) => {
    setGuests(prev => [guest, ...prev.slice(0, 9)]); // Keep last 10 guests
    setCurrentGuest(guest);
    setIsVisible(true);
    setShowConfetti(true);

    // Hide confetti after animation
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    // Hide current guest after 10 seconds
    setTimeout(() => {
      setIsVisible(false);
      setCurrentGuest(null);
    }, 10000);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Head title="Guest Reception Monitor" />

              <div className="min-h-screen relative overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Elegant couple in wedding attire"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/15 to-accent/20"></div>
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="shape-float-1 top-20 right-20 w-32 h-32 opacity-10" style={{ animationDelay: '0s' }}></div>
            <div className="shape-float-2 bottom-32 left-16 w-24 h-24 opacity-10" style={{ animationDelay: '2s' }}></div>
            <div className="shape-float-3 top-1/2 right-1/4 w-16 h-16 opacity-10" style={{ animationDelay: '4s' }}></div>
          </div>

        {/* Confetti Animation */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <Sparkles className="w-4 h-4 text-accent opacity-70" />
              </div>
            ))}
          </div>
        )}

        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-white/90 text-xl font-medium drop-shadow-lg">
              Welcome guests as they arrive
            </p>
          </div>

          {/* Current Guest Display */}
          {currentGuest && (
            <div className={`mb-8 transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
            }`}>
              <Card className="bg-white/95 backdrop-blur-sm border-primary/30 shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-lg">
                      <Heart className="w-12 h-12 text-white" />
                    </div>

                    <h2 className="text-6xl font-bold text-primary mb-4 drop-shadow-lg">
                      {currentGuest.name}
                    </h2>
                    <h3 className="text-3xl font-semibold text-primary/80 mb-2 drop-shadow-md">
                      Welcome! 🎉
                    </h3>

                    <p className="text-muted-foreground text-xl mb-4">
                      Thank you for joining us on this special day
                    </p>

                    {currentGuest.isVip && (
                      <Badge className="bg-gradient-to-r from-accent to-warm text-white text-lg px-6 py-2 mb-4">
                        <Sparkles className="w-4 h-4 mr-2" />
                        VIP Guest
                      </Badge>
                    )}

                    <div className="flex items-center justify-center space-x-2 text-green-600 text-lg">
                      <CheckCircle className="w-6 h-6" />
                      <span className="font-medium">Successfully Checked In</span>
                    </div>
                  </div>

                  {/* Wedding Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="font-semibold text-primary">{currentGuest.wedding.user.name}</p>
                      <p className="text-sm text-muted-foreground">Wedding Couple</p>
                    </div>

                    <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="font-semibold text-primary">{formatDate(currentGuest.wedding.wedding_start)}</p>
                      <p className="text-sm text-muted-foreground">Wedding Date</p>
                    </div>

                    <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="font-semibold text-primary">
                        {formatTime(currentGuest.wedding.wedding_start)} - {formatTime(currentGuest.wedding.wedding_end)}
                      </p>
                      <p className="text-sm text-muted-foreground">Ceremony Time</p>
                    </div>
                  </div>

                  {/* Seating Information */}
                  {(currentGuest.tableNumber || currentGuest.seatNumber) && (
                    <div className="mt-6 grid grid-cols-2 gap-4 max-w-md mx-auto">
                      {currentGuest.tableNumber && (
                        <div className="text-center p-4 bg-primary/10 rounded-lg">
                          <p className="text-3xl font-bold text-primary">{currentGuest.tableNumber}</p>
                          <p className="text-sm text-muted-foreground">Table</p>
                        </div>
                      )}

                      {currentGuest.seatNumber && (
                        <div className="text-center p-4 bg-primary/10 rounded-lg">
                          <p className="text-3xl font-bold text-primary">{currentGuest.seatNumber}</p>
                          <p className="text-sm text-muted-foreground">Seat</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Recent Guests */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">Recent Arrivals</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {guests.map((guest, index) => (
                <Card
                  key={guest.id}
                  className={`bg-white/90 backdrop-blur-sm border-primary/30 hover:shadow-lg transition-all duration-300 ${
                    index === 0 ? 'ring-2 ring-primary/50 shadow-lg' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary">{guest.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {formatTime(guest.scannedAt)}
                        </p>
                      </div>
                      {guest.isVip && (
                        <Badge className="bg-gradient-to-r from-accent to-warm text-white text-xs">
                          VIP
                        </Badge>
                      )}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p className="flex items-center space-x-1">
                        <Gift className="w-3 h-3" />
                        <span>{guest.invitation.name}</span>
                      </p>
                      {(guest.tableNumber || guest.seatNumber) && (
                        <p className="mt-1">
                          {guest.tableNumber && `Table ${guest.tableNumber}`}
                          {guest.tableNumber && guest.seatNumber && ' • '}
                          {guest.seatNumber && `Seat ${guest.seatNumber}`}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {guests.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2 drop-shadow-lg">Waiting for Guests</h4>
                <p className="text-white/80 drop-shadow-md">
                  Guest information will appear here when QR codes are scanned
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
