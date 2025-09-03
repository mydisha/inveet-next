import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { Clock } from "lucide-react"
import * as React from "react"

interface TimePickerProps {
  value?: string
  onChange?: (time: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  required?: boolean
  showUntilEnd?: boolean
}

export function TimePicker({
  value,
  onChange,
  placeholder = "Pilih waktu",
  disabled = false,
  className,
  required = false,
  showUntilEnd = true,
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [timeType, setTimeType] = React.useState<'specific' | 'until-end'>(
    value === 'until-end' ? 'until-end' : 'specific'
  )
  const [timeValue, setTimeValue] = React.useState(
    value && value !== 'until-end' ? value : ''
  )

  const handleTimeTypeChange = (type: 'specific' | 'until-end') => {
    setTimeType(type)
    if (type === 'until-end') {
      onChange?.('until-end')
    } else {
      onChange?.(timeValue)
    }
  }

  const handleTimeChange = (time: string) => {
    setTimeValue(time)
    if (timeType === 'specific') {
      onChange?.(time)
    }
  }

  const displayValue = () => {
    if (value === 'until-end') {
      return 'Sampai selesai'
    }
    if (value && value !== 'until-end') {
      return value
    }
    return placeholder
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />
          {displayValue()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Pilih jenis waktu</Label>
            <RadioGroup
              value={timeType}
              onValueChange={handleTimeTypeChange}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="specific" id="specific" />
                <Label htmlFor="specific" className="text-sm">
                  Waktu tertentu
                </Label>
              </div>
              {showUntilEnd && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="until-end" id="until-end" />
                  <Label htmlFor="until-end" className="text-sm">
                    Sampai selesai
                  </Label>
                </div>
              )}
            </RadioGroup>
          </div>

          {timeType === 'specific' && (
            <div className="space-y-2">
              <Label htmlFor="time-input" className="text-sm font-medium">
                Waktu
              </Label>
              <Input
                id="time-input"
                type="time"
                value={timeValue}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="w-full"
              />
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Batal
            </Button>
            <Button
              size="sm"
              onClick={() => setOpen(false)}
              className="bg-rose-gold hover:bg-rose-gold/90"
            >
              Pilih
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
