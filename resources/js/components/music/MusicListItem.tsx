import { Download, Edit, Heart, Pause, Play, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { AudioPlayer } from './AudioPlayer';
import { MusicItem } from './MusicCard';

interface MusicListItemProps {
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

export function MusicListItem({
  music,
  onSelect,
  onFavorite,
  onDownload,
  onDelete,
  onEdit,
  isSelected = false,
  showActions = true,
  className
}: MusicListItemProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

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
    <div
      className={cn(
        "flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200 hover:shadow-sm",
        isSelected && "ring-2 ring-primary bg-primary/5 rounded-lg",
        className
      )}
    >
      {/* Play Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowPlayer(!showPlayer)}
        className="h-10 w-10 flex-shrink-0"
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>

      {/* Music Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-3 mb-1">
          <h3 className="text-sm font-medium text-foreground truncate">
            {music.title}
          </h3>
          {music.category && (
            <Badge variant="secondary" className="text-xs">
              {music.category}
            </Badge>
          )}
          {music.isPredefined && (
            <Badge variant="outline" className="text-xs">
              Free
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          {music.artist && (
            <span>by {music.artist}</span>
          )}
          <span>{formatDuration(music.duration)}</span>
          {music.isPredefined ? (
            <span>Predefined</span>
          ) : (
            <span>Your upload</span>
          )}
        </div>
      </div>

      {/* Actions */}
      {showActions && (
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
      )}

      {/* Expandable Audio Player */}
      {showPlayer && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-background border rounded-lg shadow-lg z-10">
          <AudioPlayer
            src={music.src}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
          />
        </div>
      )}
    </div>
  );
}
