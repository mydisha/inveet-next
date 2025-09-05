import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  href: string;
  label: string;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showLabelOnMobile?: boolean;
}

export default function BackButton({
  href,
  label,
  variant = 'outline',
  size = 'sm',
  className = '',
  showLabelOnMobile = false
}: BackButtonProps) {
  return (
    <Link href={href}>
      <Button
        variant={variant}
        size={size}
        className={`flex items-center gap-2 ${className}`}
        title={label} // Tooltip for icon-only mode
      >
        <ArrowLeft className="h-4 w-4" />
        <span className={`${showLabelOnMobile ? 'block' : 'hidden sm:inline'}`}>
          {label}
        </span>
      </Button>
    </Link>
  );
}
