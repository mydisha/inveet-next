import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import React, { useState } from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
  presetColors?: string[];
}

const defaultPresetColors = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
  '#FFC0CB', '#A52A2A', '#808080', '#000080', '#008000',
  '#800000', '#808000', '#008080', '#C0C0C0', '#FFD700'
];

export function ColorPicker({
  value,
  onChange,
  label,
  className,
  disabled = false,
  presetColors = defaultPresetColors
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleColorChange = (color: string) => {
    onChange(color);
    setInputValue(color);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setInputValue(color);

    // Validate hex color format
    if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
      onChange(color);
    }
  };

  const handleInputBlur = () => {
    // Ensure valid hex color on blur
    if (!/^#[0-9A-Fa-f]{6}$/.test(inputValue)) {
      setInputValue(value);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label className="text-sm font-medium">{label}</Label>}

      <div className="flex items-center space-x-2">
        {/* Color Preview Button */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={disabled}
              className="w-12 h-10 p-0 border-2 hover:border-primary/50 transition-colors"
              style={{ backgroundColor: value }}
            >
              <span className="sr-only">Pick color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="start">
            <div className="space-y-4">
              {/* Native Color Input */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Choose Color</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={value}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-12 h-10 rounded border border-border cursor-pointer"
                    disabled={disabled}
                  />
                  <Input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="#000000"
                    className="flex-1 font-mono text-sm"
                    disabled={disabled}
                  />
                </div>
              </div>

              {/* Preset Colors */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Preset Colors</Label>
                <div className="grid grid-cols-10 gap-2">
                  {presetColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleColorChange(color)}
                      className={cn(
                        "w-8 h-8 rounded border-2 transition-all hover:scale-110 active:scale-95",
                        value === color
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      )}
                      style={{ backgroundColor: color }}
                      disabled={disabled}
                    >
                      {value === color && (
                        <Check className="w-4 h-4 text-white drop-shadow-sm mx-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleColorChange('#000000')}
                  disabled={disabled}
                  className="flex-1"
                >
                  Black
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleColorChange('#FFFFFF')}
                  disabled={disabled}
                  className="flex-1"
                >
                  White
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  Done
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Color Value Display */}
        <div className="flex-1 min-w-0">
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="#000000"
            className="font-mono text-sm"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}

export default ColorPicker;
