import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
    Calendar,
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
      // Fallback to theme-based gradient using primary color scheme
      const themeSlug = wedding.theme?.slug || 'default';
      const gradients = {
        'classic-elegance': 'bg-gradient-to-br from-primary/20 to-primary-light/40',
        'modern-minimalist': 'bg-gradient-to-br from-gray-100 to-gray-200',
        'rustic-charm': 'bg-gradient-to-br from-primary/15 to-primary-glow/30',
        'tropical-paradise': 'bg-gradient-to-br from-green-100 to-teal-200',
        'vintage-romance': 'bg-gradient-to-br from-purple-100 to-indigo-200',
        'bohemian-bliss': 'bg-gradient-to-br from-primary-light/30 to-primary/20',
        'default': 'bg-gradient-to-br from-primary/20 to-primary-light/40' // Primary blue default
      };
      return gradients[themeSlug as keyof typeof gradients] || gradients.default;
    }
    return '';
  };

  // Check if this is list view
  const isListView = className?.includes('flex flex-row') || className?.includes('flex flex-col sm:flex-row');

  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300",
      "bg-white border border-gray-200/50",
      "rounded-xl shadow-sm hover:shadow-lg hover:border-gray-300/50",
      "cursor-pointer",
      className
    )}>
      {/* Cover Image */}
      <div className={cn(
        "relative overflow-hidden",
        isListView ? "w-full sm:w-48 h-32 sm:h-full" : "h-40"
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
            <Heart className="w-12 h-12 text-primary/30" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge
            variant={getStatusVariant(wedding.status)}
            className={cn(
              "text-xs font-medium px-2 py-1",
              getStatusColor(wedding.status)
            )}
          >
            {wedding.status.charAt(0).toUpperCase() + wedding.status.slice(1)}
          </Badge>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      <CardHeader className={cn(
        "pb-4 pt-5 px-5",
        isListView && "flex-1 sm:flex-1"
      )}>
        <div className={cn(
          "space-y-3",
          isListView && "h-full flex flex-col justify-between"
        )}>
          {/* Couple Names - Most Important Info */}
          <div className={cn(
            isListView ? "text-left" : "text-center"
          )}>
            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
              {wedding.couple_name_1 && wedding.couple_name_2
                ? `${wedding.couple_name_1} & ${wedding.couple_name_2}`
                : wedding.title || 'Untitled Wedding'
              }
            </h3>
            {(wedding.wedding_location || wedding.wedding_venue) && (
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <span className="text-gray-400">📍</span>
                {wedding.wedding_location || wedding.wedding_venue}
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
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span className="text-xs text-gray-500 font-medium">
                {wedding.theme?.name || 'No theme selected'}
              </span>
            </div>

            {wedding.package && (
              <div className={cn(
                "flex items-center space-x-2",
                isListView ? "justify-start" : "justify-center"
              )}>
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <span className="text-xs text-gray-500 font-medium">
                  {wedding.package.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className={cn(
        "px-5 pb-5",
        isListView && "flex-1 flex flex-col justify-end"
      )}>
        <div className="space-y-4">
          {/* Wedding Date and Stats */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="font-medium">{formatDate(wedding.wedding_start)}</span>
            </div>

            {wedding.view_count !== undefined && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Eye className="w-4 h-4" />
                <span>{wedding.view_count} views</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-8 text-xs font-medium hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onView?.(wedding);
              }}
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              View
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-8 text-xs font-medium hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/wedding/${wedding.id}`;
              }}
            >
              <Edit className="w-3.5 h-3.5 mr-1.5" />
              Edit
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-8 text-xs font-medium hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onDesignConfig?.(wedding);
              }}
            >
              <Palette className="w-3.5 h-3.5 mr-1.5" />
              Design
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default WeddingCard;
