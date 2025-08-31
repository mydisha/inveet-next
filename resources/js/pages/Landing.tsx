import { Link } from '@inertiajs/react';
import { Heart, Sparkles, Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-wedding-gradient">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-rose-gold rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-rose-gold">Inveet</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-rose-gold transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-rose-gold transition-colors">How it Works</a>
            <a href="#pricing" className="text-gray-700 hover:text-rose-gold transition-colors">Pricing</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-rose-gold border border-rose-gold rounded-full hover:bg-rose-gold hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 bg-rose-gold text-white rounded-full hover:bg-rose-gold/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-soft-pink/20 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-rose-gold" />
              <span className="text-rose-gold font-medium">Digital Wedding Invitations</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Create Beautiful
            <span className="block text-rose-gold">Digital Invitations</span>
            <span className="block text-3xl md:text-4xl font-normal text-gray-600 mt-4">
              for Your Special Day
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Design elegant, personalized wedding invitations that your guests will love. 
            Easy to create, beautiful to share, and perfect for modern couples.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Link
              href="/register"
              className="px-8 py-4 bg-rose-gold text-white rounded-full text-lg font-semibold hover:bg-rose-gold/90 transition-colors flex items-center space-x-2"
            >
              <span>Start Creating</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 border-2 border-rose-gold text-rose-gold rounded-full text-lg font-semibold hover:bg-rose-gold hover:text-white transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-soft-pink/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-sage/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-lavender/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From beautiful designs to easy customization, we've got you covered for your perfect wedding invitation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-soft-pink rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-rose-gold" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Beautiful Designs</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose from our curated collection of elegant, wedding-themed designs that capture the romance of your special day.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-sage" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Easy Customization</h3>
              <p className="text-gray-600 leading-relaxed">
                Personalize every detail - from colors and fonts to photos and text. Make it uniquely yours in minutes.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-lavender rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-lavender" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Smart Features</h3>
              <p className="text-gray-600 leading-relaxed">
                Countdown timers, RSVP tracking, and interactive elements that make your invitation engaging and memorable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-6 py-20 bg-cream/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create your perfect wedding invitation in just a few simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Choose Design", description: "Select from our beautiful wedding invitation templates" },
              { step: "2", title: "Customize", description: "Add your details, photos, and personal touches" },
              { step: "3", title: "Preview", description: "See exactly how your invitation will look to guests" },
              { step: "4", title: "Share", description: "Send your beautiful digital invitation to family and friends" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-rose-gold rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-rose-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Your Wedding Invitation?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of happy couples who have created beautiful digital invitations with Inveet.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-rose-gold rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <span>Start Your Free Trial</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-rose-gold rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Inveet</span>
              </div>
              <p className="text-gray-400">
                Creating beautiful digital wedding invitations for modern couples.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Inveet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
