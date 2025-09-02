import { ArrowRight, Star, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

const CTA = () => {
  const benefits = [
    'Setup dalam 5 menit',
    'Template premium gratis',
    'Support 24/7',
    'Tidak ada biaya tersembunyi'
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary-glow to-accent relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary/10 rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
            <Star className="w-5 h-5 text-white fill-current" />
            <span className="text-white text-sm font-medium">
              Undangan pernikahan online
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Inveet.id adalah layanan untuk membuat undangan pernikahan secara online gratis dengan mudah. Undangan yang dibuat akan berbentuk sebuah website yang dapat di akses dan dibagikan kapanpun.
            </h2>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                <span className="text-white font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 rounded-full font-semibold group"
            >
              Buat Undangan Sekarang
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4 rounded-full font-semibold bg-transparent"
            >
              Lihat Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8">
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">10,000+ Happy Couples</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* No Credit Card Required */}
          <div className="text-center">
            <p className="text-white/70 text-sm">
              ✨ Tidak perlu kartu kredit • Setup dalam 5 menit • Gratis selamanya
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
