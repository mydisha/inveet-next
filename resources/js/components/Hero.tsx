import { ArrowRight, Play, Star } from 'lucide-react';
import { Button } from './ui/button';
import heroCoupleImage from '../assets/hero-couple.jpg';
import phoneMockupImage from '../assets/phone-mockup.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroCoupleImage}
          alt="Elegant couple in wedding attire"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary-glow/80"></div>
      </div>
      
      {/* Geometric Shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 shape-circle animate-float"></div>
      <div className="absolute bottom-32 left-16 w-24 h-24 shape-blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 shape-circle" style={{ animationDelay: '4s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-white/90 text-sm font-medium">
                #1 Digital Wedding Platform
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
                          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Platform
              <br />
              <span className="text-yellow-400">Pernikahan</span>
              <br />
              Digital
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-lg leading-relaxed">
              Solusi pernikahan lebih hemat, praktis, dan kekinian dengan e-invitation yang disebar otomatis.
            </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 group">
                Buat Sekarang
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-white text-white bg-transparent px-8 py-4 rounded-xl font-medium text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 group backdrop-blur-sm"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-white/70 text-sm">Happy Couples</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-white/70 text-sm">Invitations Sent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9</div>
                <div className="text-white/70 text-sm">Rating</div>
              </div>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 to-primary-glow/30 rounded-3xl blur-xl animate-pulse-glow"></div>
              
              {/* Phone Container */}
              <div className="relative bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <img
                  src={phoneMockupImage}
                  alt="Digital wedding invitation on smartphone"
                  className="w-full max-w-sm mx-auto rounded-2xl shadow-elegant"
                />
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;