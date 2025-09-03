import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
    Calendar,
    Clock,
    Edit,
    ExternalLink,
    Eye,
    Heart,
    Palette
} from 'lucide-react';
import { useState } from 'react';

interface WeddingCardProps {
  wedding: {
    id: number;
    title?: string;
    slug?: string;
    status: 'published' | 'draft' | 'inactive';
    wedding_start?: string;
    wedding_end?: string;
    view_count?: number;
    is_published?: boolean;
    is_draft?: boolean;
    // Couple information
    couple_name_1?: string;
    couple_name_2?: string;
    wedding_location?: string;
    wedding_venue?: string;
    theme?: {
      id: number;
      name: string;
      slug: string;
      preview_image?: string;
    };
    package?: {
      id: number;
      name: string;
    };
    created_at?: string;
    updated_at?: string;
  };
  onEdit?: (wedding: any) => void;
  onView?: (wedding: any) => void;
  onDelete?: (wedding: any) => void;
  onDesignConfig?: (wedding: any) => void;
  className?: string;
}

export function WeddingCard({
  wedding,
  onEdit,
  onView,
  onDelete,
  onDesignConfig,
  className
}: WeddingCardProps) {
  const [imageError, setImageError] = useState(false);

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'published':
        return 'default';
      case 'draft':
        return 'secondary';
      case 'inactive':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'draft':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'inactive':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'TBD';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get cover image
  const getCoverImage = () => {
    if (imageError || !wedding.theme?.preview_image) {
      // Fallback to theme-based gradient
      const themeSlug = wedding.theme?.slug || 'default';
      const gradients = {
        'classic-elegance': 'bg-gradient-to-br from-amber-100 to-yellow-200', // Rose gold theme
        'modern-minimalist': 'bg-gradient-to-br from-gray-100 to-gray-200',
        'rustic-charm': 'bg-gradient-to-br from-amber-100 to-orange-200',
        'tropical-paradise': 'bg-gradient-to-br from-green-100 to-teal-200',
        'vintage-romance': 'bg-gradient-to-br from-purple-100 to-indigo-200',
        'bohemian-bliss': 'bg-gradient-to-br from-yellow-100 to-orange-200',
        'default': 'bg-gradient-to-br from-amber-100 to-yellow-200' // Rose gold default
      };
      return gradients[themeSlug as keyof typeof gradients] || gradients.default;
    }
    return '';
  };

  // Check if this is list view
  const isListView = className?.includes('flex flex-row');

  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300",
      "bg-white/90 backdrop-blur-sm border border-gray-200/60",
      "rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02]",
      "cursor-pointer",
      className
    )}>
      {/* Cover Image */}
      <div className={cn(
        "relative overflow-hidden",
        isListView ? "w-48 h-full" : "h-48"
      )}>
        {wedding.theme?.preview_image && !imageError ? (
          <img
            src={wedding.theme.preview_image}
            alt={`${wedding.title || 'Wedding'} cover`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={cn(
            "w-full h-full flex items-center justify-center",
            getCoverImage()
          )}>
            <Heart className="w-16 h-16 text-white/60" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <Badge
            variant={getStatusVariant(wedding.status)}
            className={cn(
              "backdrop-blur-sm border",
              getStatusColor(wedding.status)
            )}
          >
            {wedding.status.charAt(0).toUpperCase() + wedding.status.slice(1)}
          </Badge>
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      <CardHeader className={cn(
        "pb-3 pt-6 px-6",
        isListView && "flex-1"
      )}>
        <div className={cn(
          "space-y-3",
          isListView && "h-full flex flex-col justify-between"
        )}>
          {/* Couple Names - Most Important Info */}
          <div className={cn(
            isListView ? "text-left" : "text-center"
          )}>
            <h3 className="font-bold text-xl text-gray-900 mb-1">
              {wedding.couple_name_1 && wedding.couple_name_2
                ? `${wedding.couple_name_1} & ${wedding.couple_name_2}`
                : wedding.title || 'Untitled Wedding'
              }
            </h3>
            {wedding.wedding_location && (
              <p className="text-sm text-gray-600 font-medium">
                📍 {wedding.wedding_location}
              </p>
            )}
            {wedding.wedding_venue && !wedding.wedding_location && (
              <p className="text-sm text-gray-600 font-medium">
                📍 {wedding.wedding_venue}
              </p>
            )}
          </div>

          {/* Theme and Package info */}
          <div className={cn(
            "space-y-2",
            isListView && "flex flex-col space-y-1"
          )}>
            <div className={cn(
              "flex items-center space-x-2",
              isListView ? "justify-start" : "justify-center"
            )}>
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-sm text-gray-600">
                {wedding.theme?.name || 'No theme selected'}
              </span>
            </div>

            {wedding.package && (
              <div className={cn(
                "flex items-center space-x-2",
                isListView ? "justify-start" : "justify-center"
              )}>
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  {wedding.package.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className={cn(
        "px-6 pb-6",
        isListView && "flex-1 flex flex-col justify-end"
      )}>
        <div className="space-y-4">
          {/* Wedding Date */}
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{formatDate(wedding.wedding_start)}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              {wedding.view_count !== undefined && (
                <div className="flex items-center space-x-1 text-gray-600">
                  <Eye className="w-4 h-4" />
                  <span>{wedding.view_count} views</span>
                </div>
              )}
            </div>

            {wedding.updated_at && (
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Updated {new Date(wedding.updated_at).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 group-hover:border-primary/30 group-hover:text-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onView?.(wedding);
              }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex-1 group-hover:border-primary/30 group-hover:text-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/wedding/${wedding.id}`;
              }}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex-1 group-hover:border-primary/30 group-hover:text-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onDesignConfig?.(wedding);
              }}
            >
              <Palette className="w-4 h-4 mr-2" />
              Design
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default WeddingCard;
