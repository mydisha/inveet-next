import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface FontOption {
  value: string;
  label: string;
  category: string;
  preview: string;
}

interface FontPickerProps {
  value: string;
  onChange: (font: string) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
  showPreview?: boolean;
}

const fontOptions: FontOption[] = [
  // Serif Fonts
  { value: 'Playfair Display', label: 'Playfair Display', category: 'Serif', preview: 'Playfair Display' },
  { value: 'Cormorant Garamond', label: 'Cormorant Garamond', category: 'Serif', preview: 'Cormorant Garamond' },
  { value: 'Lora', label: 'Lora', category: 'Serif', preview: 'Lora' },
  { value: 'Merriweather', label: 'Merriweather', category: 'Serif', preview: 'Merriweather' },
  { value: 'PT Serif', label: 'PT Serif', category: 'Serif', preview: 'PT Serif' },
  { value: 'Libre Baskerville', label: 'Libre Baskerville', category: 'Serif', preview: 'Libre Baskerville' },

  // Sans Serif Fonts
  { value: 'Source Sans Pro', label: 'Source Sans Pro', category: 'Sans Serif', preview: 'Source Sans Pro' },
  { value: 'Inter', label: 'Inter', category: 'Sans Serif', preview: 'Inter' },
  { value: 'Open Sans', label: 'Open Sans', category: 'Sans Serif', preview: 'Open Sans' },
  { value: 'Roboto', label: 'Roboto', category: 'Sans Serif', preview: 'Roboto' },
  { value: 'Poppins', label: 'Poppins', category: 'Sans Serif', preview: 'Poppins' },
  { value: 'Montserrat', label: 'Montserrat', category: 'Sans Serif', preview: 'Montserrat' },
  { value: 'Nunito', label: 'Nunito', category: 'Sans Serif', preview: 'Nunito' },
  { value: 'Work Sans', label: 'Work Sans', category: 'Sans Serif', preview: 'Work Sans' },

  // Script Fonts
  { value: 'Dancing Script', label: 'Dancing Script', category: 'Script', preview: 'Dancing Script' },
  { value: 'Great Vibes', label: 'Great Vibes', category: 'Script', preview: 'Great Vibes' },
  { value: 'Allura', label: 'Allura', category: 'Script', preview: 'Allura' },
  { value: 'Alex Brush', label: 'Alex Brush', category: 'Script', preview: 'Alex Brush' },
  { value: 'Satisfy', label: 'Satisfy', category: 'Script', preview: 'Satisfy' },
  { value: 'Pacifico', label: 'Pacifico', category: 'Script', preview: 'Pacifico' },

  // Display Fonts
  { value: 'Oswald', label: 'Oswald', category: 'Display', preview: 'Oswald' },
  { value: 'Bebas Neue', label: 'Bebas Neue', category: 'Display', preview: 'Bebas Neue' },
  { value: 'Anton', label: 'Anton', category: 'Display', preview: 'Anton' },
  { value: 'Righteous', label: 'Righteous', category: 'Display', preview: 'Righteous' },
  { value: 'Fredoka One', label: 'Fredoka One', category: 'Display', preview: 'Fredoka One' },
  { value: 'Bangers', label: 'Bangers', category: 'Display', preview: 'Bangers' }
];

const groupedFonts = fontOptions.reduce((acc, font) => {
  if (!acc[font.category]) {
    acc[font.category] = [];
  }
  acc[font.category].push(font);
  return acc;
}, {} as Record<string, FontOption[]>);

export function FontPicker({
  value,
  onChange,
  label,
  className,
  disabled = false,
  showPreview = true
}: FontPickerProps) {
  const selectedFont = fontOptions.find(font => font.value === value);

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label className="text-sm font-medium">{label}</Label>}

      <div className="space-y-2">
        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a font">
              {selectedFont && (
                <div className="flex items-center space-x-2">
                  <span
                    className="text-sm"
                    style={{ fontFamily: selectedFont.value }}
                  >
                    {selectedFont.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({selectedFont.category})
                  </span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {Object.entries(groupedFonts).map(([category, fonts]) => (
              <div key={category}>
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground bg-muted/50">
                  {category}
                </div>
                {fonts.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <div className="flex items-center space-x-2">
                      <span
                        className="text-sm"
                        style={{ fontFamily: font.value }}
                      >
                        {font.label}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </div>
            ))}
          </SelectContent>
        </Select>

        {/* Font Preview */}
        {showPreview && selectedFont && (
          <div className="p-3 bg-muted/30 rounded-md border">
            <div className="text-xs text-muted-foreground mb-2">Preview:</div>
            <div
              className="text-lg font-medium"
              style={{ fontFamily: selectedFont.value }}
            >
              The quick brown fox jumps over the lazy dog
            </div>
            <div
              className="text-sm text-muted-foreground mt-1"
              style={{ fontFamily: selectedFont.value }}
            >
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FontPicker;
