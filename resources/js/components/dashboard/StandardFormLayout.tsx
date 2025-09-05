import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { router } from '@inertiajs/react';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface StandardFormLayoutProps {
  // Page header
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;

  // Form content
  children: ReactNode;

  // Form actions
  onSubmit?: (e: React.FormEvent) => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  submitDisabled?: boolean;

  // Optional icon for the page
  icon?: LucideIcon;

  // Additional props
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | 'full';
}

/**
 * Standardized form layout for all dashboard pages with input and submit buttons.
 * Provides consistent:
 * - Page header with back button and title
 * - Form structure and spacing
 * - Input field styling
 * - Save/Cancel button positioning and styling
 * - Card layout and shadows
 */
export default function StandardFormLayout({
  title,
  description,
  backHref,
  backLabel = 'Kembali',
  children,
  onSubmit,
  onCancel,
  submitLabel = 'Simpan',
  cancelLabel = 'Batal',
  isSubmitting = false,
  submitDisabled = false,
  icon: Icon,
  className = '',
  maxWidth = '4xl'
}: StandardFormLayoutProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    full: 'max-w-full'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Clean Minimal Header */}
      <div className="flex items-center space-x-4 bg-transparent">
        {backHref && (
          <div
            onClick={() => router.visit(backHref)}
            className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded-lg"
            style={{ backgroundColor: 'transparent' }}
            title={backLabel}
          >
            <ArrowLeft className="w-4 h-4" />
          </div>
        )}
        {backHref && <div className="h-4 w-px bg-border/50" />}
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary" />
            </div>
          )}
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        </div>
      </div>

            {/* Clean Form Container */}
      <div className={`mx-auto ${maxWidthClasses[maxWidth]}`}>
        <div className="bg-card/90 backdrop-blur-sm rounded-xl border border-border shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {children}

            {/* Clean Form Actions */}
            {(onSubmit || onCancel) && (
              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
                {onCancel && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="min-w-[100px]"
                  >
                    {cancelLabel}
                  </Button>
                )}
                {onSubmit && (
                  <Button
                    type="submit"
                    disabled={submitDisabled || isSubmitting}
                    className="min-w-[100px] bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Menyimpan...
                      </>
                    ) : (
                      submitLabel
                    )}
                  </Button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

/**
 * Standardized input field component with consistent styling
 */
export function StandardInput({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className = '',
  ...props
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground/80">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm transition-all duration-200 ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}

/**
 * Standardized textarea component with consistent styling
 */
export function StandardTextarea({
  label,
  id,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  rows = 3,
  className = '',
  ...props
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground/80">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm resize-none transition-all duration-200 ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}

/**
 * Standardized form section component for grouping related fields
 */
export function StandardFormSection({
  title,
  description,
  children,
  className = ''
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-base font-medium text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground/70 mt-1">{description}</p>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
