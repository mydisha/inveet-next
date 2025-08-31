import { Link } from '@inertiajs/react';
import { Heart, Sparkles, Calendar, Users, ArrowRight, Plus, Settings, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Dashboard() {
  // Mock data - in real app this would come from props
  const user = {
    name: 'Sarah & Michael',
    email: 'sarah.michael@example.com',
    hasWedding: false
  };

  const stats = [
    { label: 'Total Views', value: '0', icon: Eye, color: 'text-blue-600' },
    { label: 'RSVPs', value: '0', icon: Users, color: 'text-green-600' },
    { label: 'Days Left', value: '--', icon: Calendar, color: 'text-rose-gold' }
  ];

  return (
    <div className="min-h-screen bg-cream/30">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-rose-gold rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-rose-gold">Inveet</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-soft-pink rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-rose-gold">
                  {user.name.split(' ')[0][0]}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-soft-pink/20 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-rose-gold" />
            <span className="text-rose-gold font-medium">Welcome back!</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Hello, {user.name.split(' ')[0]} & {user.name.split(' ')[2]}! 👰‍♀️🤵‍♂️
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to create your beautiful digital wedding invitation? 
            Let's make your special day unforgettable.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Action Card */}
        {!user.hasWedding ? (
          <Card className="bg-gradient-to-br from-rose-gold/10 to-peach/10 border-0 shadow-xl mb-12">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-rose-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Start Your Wedding Journey
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Create your first digital wedding invitation in just a few minutes. 
                Choose from beautiful templates, customize with your details, and share with your loved ones.
              </p>
              
              <Link href="/onboarding">
                <Button size="lg" className="bg-rose-gold hover:bg-rose-gold/90 text-white px-8 py-4 text-lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Wedding Invitation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <p className="text-sm text-gray-500 mt-4">
                It only takes 5 minutes to get started
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white border-0 shadow-xl mb-12">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Wedding Invitation</h2>
                  <p className="text-gray-600">Manage and customize your invitation</p>
                </div>
                <Button variant="outline" className="border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">URL</span>
                    <span className="font-mono text-sm text-rose-gold">sarah-michael.inveet.id</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Created</span>
                    <span className="text-gray-800">2 days ago</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Views</span>
                    <span className="font-semibold text-gray-800">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">RSVPs</span>
                    <span className="font-semibold text-gray-800">89</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Days Left</span>
                    <span className="font-semibold text-rose-gold">23</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-sage" />
                <span>Wedding Planning Tips</span>
              </CardTitle>
              <CardDescription>
                Get inspired with our curated wedding planning resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Discover beautiful themes, timeline guides, and vendor recommendations to make your wedding perfect.
              </p>
              <Button variant="outline" className="border-sage text-sage hover:bg-sage hover:text-white">
                Explore Tips
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-lavender" />
                <span>Guest Management</span>
              </CardTitle>
              <CardDescription>
                Organize your guest list and track RSVPs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Keep track of your guest list, manage RSVPs, and send reminders all in one place.
              </p>
              <Button variant="outline" className="border-lavender text-lavender hover:bg-lavender hover:text-white">
                Manage Guests
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
