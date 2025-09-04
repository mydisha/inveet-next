import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import { ONBOARDING_STEPS } from '@/components/onboarding/OnboardingProgress';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { TimePicker } from '@/components/ui/time-picker';
import { Calendar, Clock, Globe, Heart, MapPin, Plus, X } from 'lucide-react';
import { useState } from 'react';

interface Event {
  id: string;
  type: string;
  name: string;
  date: Date | undefined;
  time: string;
  timezone: string;
  venue: string;
  address: string;
  description: string;
}

export default function WeddingDetails() {
  const [formData, setFormData] = useState({
    mainDate: undefined as Date | undefined,
    mainTime: '',
    mainTimezone: 'WIB',
    venue: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    description: ''
  });

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      type: 'akad',
      name: 'Akad Nikah',
      date: undefined,
      time: '',
      timezone: 'WIB',
      venue: '',
      address: '',
      description: 'Islamic marriage ceremony'
    },
    {
      id: '2',
      type: 'resepsi',
      name: 'Resepsi',
      date: undefined,
      time: '',
      timezone: 'WIB',
      venue: '',
      address: '',
      description: 'Wedding reception'
    }
  ]);

  const timezones = [
    { value: 'WIB', label: 'WIB (Western Indonesian Time)', offset: '+7' },
    { value: 'WITA', label: 'WITA (Central Indonesian Time)', offset: '+8' },
    { value: 'WIT', label: 'WIT (Eastern Indonesian Time)', offset: '+9' }
  ];

  const eventTypes = [
    { value: 'akad', label: 'Akad Nikah', icon: '💒' },
    { value: 'resepsi', label: 'Resepsi', icon: '🎉' },
    { value: 'unduh-mantu', label: 'Unduh Mantu', icon: '🎁' },
    { value: 'engagement', label: 'Engagement', icon: '💍' },
    { value: 'pre-wedding', label: 'Pre-Wedding', icon: '📸' },
    { value: 'custom', label: 'Custom Event', icon: '✨' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEventChange = (eventId: string, field: string, value: string) => {
    setEvents(prev => prev.map(event =>
      event.id === eventId ? { ...event, [field]: value } : event
    ));
  };

  const addEvent = () => {
    const newEvent: Event = {
      id: Date.now().toString(),
      type: 'custom',
      name: '',
      date: undefined,
      time: '',
      timezone: 'WIB',
      venue: '',
      address: '',
      description: ''
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const removeEvent = (eventId: string) => {
    if (events.length > 2) { // Keep at least Akad and Resepsi
      setEvents(prev => prev.filter(event => event.id !== eventId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', { ...formData, events });
  };

  return (
    <OnboardingLayout
      title="Wedding Details & Venue"
      description="Share the details of your special day - when and where your celebration will take place."
      icon={Heart}
      steps={ONBOARDING_STEPS.alternative}
      currentStep="wedding-details"
      user={null}
      onSubmit={handleSubmit}
      submitLabel="Continue to Custom URL"
      showBackButton={true}
      onBackClick={() => window.location.href = '/onboarding/couple-info'}
      maxWidth="4xl"
    >
      <form onSubmit={handleSubmit}>
          <div className="grid gap-8">
            {/* Main Wedding Date & Time */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                  <Calendar className="w-6 h-6 text-rose-gold" />
                  <span>Main Wedding Date & Time</span>
                </h3>
                <p className="text-gray-600">
                  Set the primary date and time for your wedding celebration
                </p>
              </div>
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="mainDate" className="text-gray-700 font-medium">
                      Wedding Date *
                    </Label>
                    <DatePicker
                      value={formData.mainDate}
                      onChange={(date) => handleInputChange('mainDate', date)}
                      placeholder="Pilih tanggal pernikahan"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mainTime" className="text-gray-700 font-medium">
                      Wedding Time *
                    </Label>
                    <TimePicker
                      value={formData.mainTime}
                      onChange={(time) => handleInputChange('mainTime', time)}
                      placeholder="Pilih waktu pernikahan"
                      showUntilEnd={true}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mainTimezone" className="text-gray-700 font-medium">
                      Timezone *
                    </Label>
                    <Select value={formData.mainTimezone} onValueChange={(value) => handleInputChange('mainTimezone', value)}>
                      <SelectTrigger className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timezones.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>
                            <div className="flex items-center space-x-2">
                              <Globe className="w-4 h-4" />
                              <span>{tz.value} ({tz.offset})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Venue Information */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                  <MapPin className="w-6 h-6 text-rose-gold" />
                  <span>Venue & Location</span>
                </h3>
                <p className="text-gray-600">
                  Provide the venue details and address for your wedding
                </p>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="venue" className="text-gray-700 font-medium">
                    Venue Name *
                  </Label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) => handleInputChange('venue', e.target.value)}
                    placeholder="e.g., Grand Ballroom Hotel Indonesia"
                    className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-700 font-medium">
                    Full Address *
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter the complete address"
                    rows={3}
                    className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20 resize-none"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-gray-700 font-medium">
                      City *
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="e.g., Jakarta"
                      className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="province" className="text-gray-700 font-medium">
                      Province *
                    </Label>
                    <Input
                      id="province"
                      value={formData.province}
                      onChange={(e) => handleInputChange('province', e.target.value)}
                      placeholder="e.g., DKI Jakarta"
                      className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postalCode" className="text-gray-700 font-medium">
                      Postal Code
                    </Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      placeholder="e.g., 10310"
                      className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700 font-medium">
                    Venue Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Any additional details about the venue, parking, dress code, etc."
                    rows={3}
                    className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Events Schedule */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                    <Clock className="w-6 h-6 text-rose-gold" />
                    <span>Events Schedule</span>
                  </h3>
                  <p className="text-gray-600">
                    Manage different events and their specific details
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={addEvent}
                  variant="outline"
                  className="border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </div>
              <div className="space-y-6">
                {events.map((event, index) => (
                  <div key={event.id} className="border-2 border-gray-100 rounded-lg p-6 bg-gray-50/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">
                          {eventTypes.find(et => et.value === event.type)?.icon || '✨'}
                        </span>
                        <h4 className="text-lg font-semibold text-gray-800">{event.name || 'New Event'}</h4>
                      </div>
                      {events.length > 2 && (
                        <Button
                          type="button"
                          onClick={() => removeEvent(event.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Event Type</Label>
                        <Select value={event.type} onValueChange={(value) => handleEventChange(event.id, 'type', value)}>
                          <SelectTrigger className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {eventTypes.map((et) => (
                              <SelectItem key={et.value} value={et.value}>
                                <div className="flex items-center space-x-2">
                                  <span>{et.icon}</span>
                                  <span>{et.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Event Name</Label>
                        <Input
                          value={event.name}
                          onChange={(e) => handleEventChange(event.id, 'name', e.target.value)}
                          placeholder="e.g., Akad Nikah, Resepsi"
                          className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Date</Label>
                        <DatePicker
                          value={event.date}
                          onChange={(date) => handleEventChange(event.id, 'date', date)}
                          placeholder="Pilih tanggal acara"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Time</Label>
                        <TimePicker
                          value={event.time}
                          onChange={(time) => handleEventChange(event.id, 'time', time)}
                          placeholder="Pilih waktu acara"
                          showUntilEnd={true}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Timezone</Label>
                        <Select value={event.timezone} onValueChange={(value) => handleEventChange(event.id, 'timezone', value)}>
                          <SelectTrigger className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {timezones.map((tz) => (
                              <SelectItem key={tz.value} value={tz.value}>
                                {tz.value} ({tz.offset})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Venue</Label>
                        <Input
                          value={event.venue}
                          onChange={(e) => handleEventChange(event.id, 'venue', e.target.value)}
                          placeholder="Event-specific venue (optional)"
                          className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20"
                        />
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <Label className="text-gray-700 font-medium">Description</Label>
                      <Textarea
                        value={event.description}
                        onChange={(e) => handleEventChange(event.id, 'description', e.target.value)}
                        placeholder="Additional details about this event"
                        rows={2}
                        className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20 resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
    </OnboardingLayout>
  );
}
