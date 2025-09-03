import { Download, Edit, Heart, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AudioPlayer } from './AudioPlayer';

export interface MusicItem {
  id: string | number;
  title: string;
  artist?: string;
  duration?: number;
  category?: string;
  src: string;
  isPredefined?: boolean;
  isFavorite?: boolean;
  thumbnail?: string;
  description?: string;
}

interface MusicCardProps {
  music: MusicItem;
  onSelect?: (music: MusicItem) => void;
  onFavorite?: (music: MusicItem) => void;
  onDownload?: (music: MusicItem) => void;
  onDelete?: (music: MusicItem) => void;
  onEdit?: (music: MusicItem) => void;
  isSelected?: boolean;
  showActions?: boolean;
  className?: string;
}

export function MusicCard({
  music,
  onSelect,
  onFavorite,
  onDownload,
  onDelete,
  onEdit,
  isSelected = false,
  showActions = true,
  className
}: MusicCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        isSelected && "ring-2 ring-primary rounded-lg",
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold truncate">
              {music.title}
            </CardTitle>
            {music.artist && (
              <p className="text-sm text-muted-foreground mt-1">
                by {music.artist}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-1 ml-2">
            {music.category && (
              <Badge variant="secondary" className="text-xs">
                {music.category}
              </Badge>
            )}
            {music.isPredefined && (
              <Badge variant="outline" className="text-xs">
                Predefined
              </Badge>
            )}
          </div>
        </div>

        {music.description && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {music.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Audio Player */}
        <AudioPlayer
          src={music.src}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
        />

        {/* Music Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{formatDuration(music.duration)}</span>
          {music.isPredefined ? (
            <span className="text-xs">Free to use</span>
          ) : (
            <span className="text-xs">Your upload</span>
          )}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelect?.(music)}
                className="text-primary hover:text-primary"
              >
                Select
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFavorite?.(music)}
                className={cn(
                  "h-8 w-8",
                  music.isFavorite ? "text-red-500" : "text-muted-foreground"
                )}
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    music.isFavorite && "fill-current"
                  )}
                />
              </Button>
            </div>

            <div className="flex items-center space-x-1">
              {onDownload && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDownload(music)}
                  className="h-8 w-8 text-muted-foreground"
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}

              {onEdit && !music.isPredefined && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(music)}
                  className="h-8 w-8 text-muted-foreground"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}

              {onDelete && !music.isPredefined && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(music)}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
