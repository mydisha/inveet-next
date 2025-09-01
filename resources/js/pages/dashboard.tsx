import { Link } from '@inertiajs/react';
import { Heart, Sparkles, Calendar, Users, ArrowRight, Plus, Settings, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Dashboard({ user }: { user: any }) {
  // Use demo data if no user or if it's a demo user
  const isDemo = !user || user.isDemo;
  const displayName = user?.name || 'Demo User';
  const displayEmail = user?.email || 'demo@inveet.com';

  const stats = [
    { label: 'Total Views', value: isDemo ? '1,247' : '0', icon: Eye, color: 'text-primary-blue' },
    { label: 'RSVPs', value: isDemo ? '89' : '0', icon: Users, color: 'text-success' },
    { label: 'Days Left', value: isDemo ? '45' : '--', icon: Calendar, color: 'text-primary-blue' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-blue rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary-blue">Inveet</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {isDemo && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Demo Mode
              </Badge>
            )}
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent-blue rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-blue">
                  {displayName.split(' ')[0][0]}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700">{displayName}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent-blue px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-primary-blue" />
            <span className="text-primary-blue font-medium">
              {isDemo ? 'Demo Dashboard' : 'Welcome back!'}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hello, {displayName.split(' ')[0]} & {displayName.split(' ')[2]}! 👰‍♀️🤵‍♂️
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isDemo 
              ? 'This is a demo dashboard showing how Inveet works. All data is simulated for demonstration purposes.'
              : 'Ready to create your beautiful digital wedding invitation? Let\'s make your special day unforgettable.'
            }
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
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
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
        {!user?.hasWedding ? (
          <Card className="bg-gradient-to-br from-accent-blue to-blue-50 border-0 shadow-xl mb-12">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-primary-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isDemo ? 'Experience the Full Journey' : 'Start Your Wedding Journey'}
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {isDemo 
                  ? 'Explore our complete onboarding process to see how easy it is to create beautiful wedding invitations.'
                  : 'Create your first digital wedding invitation and start planning your special day.'
                }
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/onboarding">
                  <Button size="lg" className="bg-primary-blue hover:bg-primary-blue/90 text-white px-8 py-4 text-lg">
                    <Plus className="w-5 h-5 mr-2" />
                    {isDemo ? 'Try Onboarding' : 'Create Wedding Invitation'}
                  </Button>
                </Link>
                
                {isDemo && (
                  <Link href="/packages">
                    <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white">
                      View Packages
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          // Show existing wedding data if user has weddings
          <Card className="bg-white border-0 shadow-xl mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Wedding Invitation</h2>
              <p className="text-gray-600 mb-4">You already have an active wedding invitation.</p>
              <Button variant="outline" className="border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white">
                View Invitation
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Demo Features Section */}
        {isDemo && (
          <Card className="bg-white border-0 shadow-lg mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Demo Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">What You Can Explore:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Complete onboarding process</li>
                    <li>• Design selection and customization</li>
                    <li>• Package comparison</li>
                    <li>• Dashboard analytics</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Next Steps:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Try the onboarding flow</li>
                    <li>• Explore different designs</li>
                    <li>• Check out our packages</li>
                    <li>• See the dashboard in action</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
