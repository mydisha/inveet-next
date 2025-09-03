import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { router } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    Clock,
    Gift,
    Heart,
    MapPin,
    Share2,
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
}

interface GuestGreetingProps {
  guestData: GuestData;
  qrCode: string;
}

export default function GuestGreeting({ guestData, qrCode }: GuestGreetingProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Animate entrance
    const timer = setTimeout(() => {
      setIsVisible(true);
      setShowConfetti(true);
    }, 300);

    // Hide confetti after animation
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(confettiTimer);
    };
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBackToScanner = () => {
    router.visit('/reception/scanner');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Wedding Invitation - ${guestData.wedding.user.name}`,
          text: `You're invited to ${guestData.wedding.user.name}'s wedding!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Sparkles className="w-4 h-4 text-pink-400 opacity-70" />
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={handleBackToScanner}
            variant="ghost"
            size="sm"
            className="text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Scanner
          </Button>

          <Button
            onClick={handleShare}
            variant="ghost"
            size="sm"
            className="text-slate-600 hover:text-slate-800"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Welcome Card */}
        <Card className={`mb-6 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">
                Welcome, {guestData.name}! 🎉
              </h1>
              <p className="text-slate-600">
                Thank you for joining us on this special day
              </p>
            </div>

            {guestData.isVip && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                VIP Guest
              </Badge>
            )}

            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Successfully Checked In</span>
            </div>
          </CardContent>
        </Card>

        {/* Wedding Details */}
        <Card className={`mb-6 transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-pink-500" />
              Wedding Details
            </h2>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">{guestData.wedding.user.name}</p>
                  <p className="text-sm text-slate-600">Wedding Couple</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">{formatDate(guestData.wedding.wedding_start)}</p>
                  <p className="text-sm text-slate-600">Wedding Date</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">
                    {formatTime(guestData.wedding.wedding_start)} - {formatTime(guestData.wedding.wedding_end)}
                  </p>
                  <p className="text-sm text-slate-600">Ceremony Time</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Gift className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">{guestData.invitation.name}</p>
                  <p className="text-sm text-slate-600">Invitation Type</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seating Information */}
        {(guestData.tableNumber || guestData.seatNumber) && (
          <Card className={`mb-6 transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
                Seating Information
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {guestData.tableNumber && (
                  <div className="text-center p-4 bg-indigo-50 rounded-lg">
                    <p className="text-2xl font-bold text-indigo-600">{guestData.tableNumber}</p>
                    <p className="text-sm text-slate-600">Table</p>
                  </div>
                )}

                {guestData.seatNumber && (
                  <div className="text-center p-4 bg-indigo-50 rounded-lg">
                    <p className="text-2xl font-bold text-indigo-600">{guestData.seatNumber}</p>
                    <p className="text-sm text-slate-600">Seat</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Special Message */}
        {guestData.invitation.description && (
          <Card className={`transform transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-rose-500" />
                Special Message
              </h2>
              <p className="text-slate-700 leading-relaxed">
                {guestData.invitation.description}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200">
        <div className="text-center">
          <p className="text-sm text-slate-600">
            Enjoy the celebration! 🎊
          </p>
        </div>
      </div>
    </div>
  );
}
