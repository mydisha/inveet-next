import { ArrowRight, Heart, Sparkles, Star } from 'lucide-react';
import heroCouple from '../assets/hero-couple.jpg';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroCouple}
          alt="Elegant couple in wedding attire"
          className="w-full h-full object-cover animate-parallax-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary-glow/80"></div>
      </div>

      {/* Enhanced Geometric Shapes with sophisticated animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="shape-float-1 top-20 right-20 w-32 h-32" style={{ animationDelay: '0s' }}></div>
        <div className="shape-float-2 bottom-32 left-16 w-24 h-24" style={{ animationDelay: '2s' }}></div>
        <div className="shape-float-3 top-1/2 right-1/4 w-16 h-16" style={{ animationDelay: '4s' }}></div>
        <div className="shape-float-4 top-1/3 left-1/4 w-20 h-20" style={{ animationDelay: '1s' }}></div>
        <div className="shape-float-1 bottom-1/4 right-1/3 w-12 h-12" style={{ animationDelay: '3s' }}></div>
        <div className="shape-float-2 top-3/4 left-1/3 w-28 h-28" style={{ animationDelay: '5s' }}></div>

        {/* Glow Orbs for atmospheric effect */}
        <div className="glow-orb top-1/4 right-1/3 w-64 h-64" style={{ animationDelay: '1s' }}></div>
        <div className="glow-orb bottom-1/4 left-1/3 w-48 h-48" style={{ animationDelay: '3s' }}></div>

        {/* Particle Effects */}
        <div className="particle top-1/4 left-1/4" style={{ animationDelay: '0s' }}></div>
        <div className="particle top-1/3 right-1/3" style={{ animationDelay: '1s' }}></div>
        <div className="particle top-1/2 left-1/2" style={{ animationDelay: '2s' }}></div>
        <div className="particle bottom-1/3 right-1/4" style={{ animationDelay: '0.5s' }}></div>
        <div className="particle bottom-1/4 left-1/2" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content with staggered animations */}
          <div className="space-y-8">
            {/* Badge with enhanced animation */}
            <div className="hero-badge inline-flex items-center space-x-2 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-foreground/20 hover:bg-background/30 transition-all duration-300">
              <Star className="w-4 h-4 text-accent fill-current animate-spin" style={{ animationDuration: '3s' }} />
              <span className="text-primary-foreground/90 text-sm font-medium">
                Undangan Pernikahan Online
              </span>
            </div>

            {/* Main Heading with staggered line animations */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
                <div className="hero-text-line overflow-hidden">
                  <span className="inline-block animate-text-reveal" style={{ animationDelay: '0.2s' }}>
                    Undangan
                  </span>
                </div>
                <div className="hero-text-line overflow-hidden">
                  <span className="inline-block animate-text-reveal text-accent" style={{ animationDelay: '0.4s' }}>
                    Pernikahan
                  </span>
                </div>
                <div className="hero-text-line overflow-hidden">
                  <span className="inline-block animate-text-reveal" style={{ animationDelay: '0.6s' }}>
                    Online
                  </span>
                </div>
              </h1>
                          <p className="hero-description text-xl md:text-2xl text-primary-foreground/80 max-w-lg leading-relaxed">
              Simple, 5 menit undangan selesai 😉
            </p>
            </div>

            {/* CTA Buttons with enhanced interactions */}
            <div className="hero-cta flex flex-col sm:flex-row gap-4">
              <Button className="btn-hero group text-lg px-8 py-4 hero-interactive">
                Buat Undangan
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </div>

            {/* Stats with staggered reveal */}
            <div className="hero-stats flex items-center space-x-8 pt-8">
              <div className="text-center hero-interactive">
                <div className="text-2xl font-bold text-primary-foreground flex items-center justify-center">
                  <Heart className="w-5 h-5 mr-2 text-accent animate-pulse" />
                  441K+
                </div>
                <div className="text-primary-foreground/70 text-sm">Pengguna</div>
              </div>
              <div className="text-center hero-interactive">
                <div className="text-2xl font-bold text-primary-foreground flex items-center justify-center">
                  <Star className="w-4 h-4 mr-2 text-accent animate-spin" style={{ animationDuration: '4s' }} />
                  11.9M+
                </div>
                <div className="text-primary-foreground/70 text-sm">Tamu Terkirim</div>
              </div>
              <div className="text-center hero-interactive">
                <div className="text-2xl font-bold text-primary-foreground flex items-center justify-center">
                  <Sparkles className="w-4 h-4 mr-2 text-accent animate-pulse" />
                  Rp 47.7M
                </div>
                <div className="text-primary-foreground/70 text-sm">Biaya Dihemat</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/20 to-transparent"></div>
    </section>
  );
};

export default Hero;
