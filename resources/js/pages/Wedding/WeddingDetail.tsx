import DashboardPage from '@/components/dashboard/DashboardPage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
    Calendar,
    Copy,
    Edit,
    Eye,
    Gift,
    Heart,
    Link,
    MessageCircle,
    Monitor,
    Music,
    Palette,
    RotateCcw,
    Shield,
    Type,
    Users,
    Video
} from 'lucide-react';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  hasWedding: boolean;
}

interface WeddingDetailProps {
  user: User | null;
  wedding: {
    id: number;
    couple_name_1: string;
    couple_name_2: string;
    slug: string;
    package: {
      id: number;
      name: string;
    };
    is_published: boolean;
    view_count: number;
    theme?: {
      id: number;
      name: string;
    };
  };
}

export default function WeddingDetail({ user, wedding }: WeddingDetailProps) {
  const [isPublished, setIsPublished] = useState(wedding.is_published);
  const [copied, setCopied] = useState(false);

  const weddingUrl = `https://inveet.inveet.id/${wedding.slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(weddingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleResetVisitors = () => {
    // TODO: Implement reset visitors functionality
    console.log('Reset visitors');
  };

  const menuItems = [
    {
      id: 'couple',
      title: 'Mempelai',
      icon: Heart,
      description: 'Bride & Groom',
      href: `/wedding/${wedding.id}/couple`,
      badge: null
    },
    {
      id: 'location-time',
      title: 'Lokasi & Waktu',
      icon: Calendar,
      description: 'Location & Time',
      href: `/wedding/${wedding.id}/location-time`,
      badge: 'Baru'
    },
    {
      id: 'design',
      title: 'Desain',
      icon: Monitor,
      description: 'Design',
      href: `/wedding/${wedding.id}/design`,
      badge: null
    },
    {
      id: 'title',
      title: 'Judul',
      icon: Type,
      description: 'Title',
      href: `/wedding/${wedding.id}/title`,
      badge: null
    },
    {
      id: 'music',
      title: 'Musik',
      icon: Music,
      description: 'Music',
      href: `/wedding/${wedding.id}/music`,
      badge: null
    },
    {
      id: 'protocols',
      title: 'Prokes',
      icon: Shield,
      description: 'Health Protocols',
      href: `/wedding/${wedding.id}/protocols`,
      badge: null
    },
    {
      id: 'quotes',
      title: 'Quotes',
      icon: Palette,
      description: 'Quotes',
      href: `/wedding/${wedding.id}/quotes`,
      badge: null
    },
    {
      id: 'streaming',
      title: 'Live Streaming',
      icon: Video,
      description: 'Live Streaming',
      href: `/wedding/${wedding.id}/streaming`,
      badge: null
    }
  ];

  return (
    <DashboardPage
      title={`${wedding.couple_name_1} & ${wedding.couple_name_2} - Wedding Detail`}
      user={user}
      currentPath={`/wedding/${wedding.id}`}
    >
      <div className="space-y-6">
        {/* Merged Wedding Profile & Package Status Card with Primary/Secondary Colors */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary-light/10 border border-primary/20 rounded-2xl shadow-xl">
          {/* Gradient overlay using primary colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5"></div>

          <CardContent className="relative p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Side - Wedding Profile */}
              <div className="space-y-4">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-3">
                    {wedding.couple_name_1} & {wedding.couple_name_2}
                  </h2>

                  <div className="flex items-center justify-center lg:justify-start space-x-2 text-muted-foreground mb-4">
                    <Link className="w-4 h-4" />
                    <span className="font-medium text-sm">{weddingUrl}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <Button
                      variant="default"
                      size="sm"
                      className="flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Ubah</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2 border-primary/30 hover:bg-primary/10"
                      onClick={handleCopyLink}
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copied ? 'Tersalin!' : 'Salin link'}</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Side - Package Status & Settings */}
              <div className="space-y-4">
                {/* Active Package */}
                <div className="flex items-center justify-between p-3 bg-card/60 rounded-xl border border-primary/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                      <Gift className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="font-medium text-foreground text-sm">Paket Aktif</span>
                  </div>
                  <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-primary-glow/10 text-primary border-primary/20 text-xs">
                    {wedding.package.name}
                  </Badge>
                </div>

                {/* Publish Toggle */}
                <div className="flex items-center justify-between p-3 bg-card/60 rounded-xl border border-primary/20">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isPublished
                        ? 'bg-gradient-to-br from-primary to-primary-glow'
                        : 'bg-gradient-to-br from-muted to-muted-foreground/20'
                    }`}>
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-foreground text-sm">Publikasikan</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={isPublished}
                      onCheckedChange={setIsPublished}
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-primary-glow"
                    />
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      isPublished
                        ? 'bg-gradient-to-r from-primary to-primary-glow'
                        : 'bg-gradient-to-r from-muted to-muted-foreground/20'
                    }`}>
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Visitors */}
                <div className="flex items-center justify-between p-3 bg-card/60 rounded-xl border border-primary/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-warm rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <span className="font-medium text-foreground text-sm">Pengunjung</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 border-accent/30 hover:bg-accent/10 text-xs"
                    onClick={handleResetVisitors}
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <Card
              key={item.id}
              className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                      <item.icon className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>

                  {/* Title and Badge */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {item.title}
                      </h3>
                      {item.badge && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </div>
    </DashboardPage>
  );
}
