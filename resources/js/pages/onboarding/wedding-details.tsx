import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Heart, ArrowLeft, ArrowRight, MapPin, Calendar, Clock, Plus, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Event {
  id: string;
  type: string;
  name: string;
  date: string;
  time: string;
  timezone: string;
  venue: string;
  address: string;
  description: string;
}

export default function WeddingDetails() {
  const [formData, setFormData] = useState({
    mainDate: '',
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
      date: '',
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
      date: '',
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
      date: '',
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
    <div className="min-h-screen bg-wedding-gradient">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-rose-gold rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-rose-gold">Inveet</span>
          </div>
          
          <Link href="/onboarding">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Onboarding
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-sage/20 px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">🏛️</span>
            <span className="text-sage font-medium">Step 2 of 5</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Wedding Details & Venue
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share the details of your special day - when and where your celebration will take place.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8">
            {/* Main Wedding Date & Time */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                  <Calendar className="w-6 h-6 text-rose-gold" />
                  <span>Main Wedding Date & Time</span>
                </CardTitle>
                <CardDescription>
                  Set the primary date and time for your wedding celebration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="mainDate" className="text-gray-700 font-medium">
                      Wedding Date *
                    </Label>
                    <Input
                      id="mainDate"
                      type="date"
                      value={formData.mainDate}
                      onChange={(e) => handleInputChange('mainDate', e.target.value)}
                      className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mainTime" className="text-gray-700 font-medium">
                      Wedding Time *
                    </Label>
                    <Input
                      id="mainTime"
                      type="time"
                      value={formData.mainTime}
                      onChange={(e) => handleInputChange('mainTime', e.target.value)}
                      className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20"
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
              </CardContent>
            </Card>

            {/* Venue Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                  <MapPin className="w-6 h-6 text-rose-gold" />
                  <span>Venue & Location</span>
                </CardTitle>
                <CardDescription>
                  Provide the venue details and address for your wedding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
              </CardContent>
            </Card>

            {/* Events Schedule */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                      <Clock className="w-6 h-6 text-rose-gold" />
                      <span>Events Schedule</span>
                    </CardTitle>
                    <CardDescription>
                      Manage different events and their specific details
                    </CardDescription>
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
              </CardHeader>
              <CardContent className="space-y-6">
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
                        <Input
                          type="date"
                          value={event.date}
                          onChange={(e) => handleEventChange(event.id, 'date', e.target.value)}
                          className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium">Time</Label>
                        <Input
                          type="time"
                          value={event.time}
                          onChange={(e) => handleEventChange(event.id, 'time', e.target.value)}
                          className="border-2 border-gray-200 focus:border-rose-gold focus:ring-rose-gold/20"
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
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            <Link href="/onboarding/couple-info">
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-600 hover:border-rose-gold hover:text-rose-gold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Couple Info
              </Button>
            </Link>
            
            <Link href="/onboarding/custom-url">
              <Button size="lg" className="bg-rose-gold hover:bg-rose-gold/90 text-white px-8">
                Continue to Custom URL
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
