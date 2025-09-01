import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const appName = (import.meta as any).env.VITE_APP_NAME || 'WeddingPro';

const CTA = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-primary via-primary-glow to-accent relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 shape-circle opacity-30"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 shape-blob opacity-40"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 shape-circle opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full px-6 py-3 border border-primary-foreground/30">
            <span className="text-primary-foreground text-sm font-medium">
              Ready to Start Your Journey?
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
              Mulai rencanakan pernikahan
              <br />
              <span className="text-accent">impian kamu</span>
            </h2>
            <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Bergabunglah dengan ribuan pasangan yang telah mempercayakan momen spesial mereka kepada kami.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-4 group">
              Buat Undangan Sekarang
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-4 group backdrop-blur-sm"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Konsultasi Gratis
            </Button>
          </div>

          {/* Contact Info */}
          <div className="pt-12 space-y-6">
            <div className="text-primary-foreground/70 text-lg">
              Punya pertanyaan? Hubungi kami
            </div>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-primary-foreground">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-foreground/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-primary-foreground/80">+62 812-3456-7890</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-foreground/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-lg">@</span>
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-primary-foreground/80">hello@{appName.toLowerCase()}.id</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 border-t border-primary-foreground/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">24/7</div>
                <div className="text-primary-foreground/70 text-sm">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">100%</div>
                <div className="text-primary-foreground/70 text-sm">Secure</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">30-Day</div>
                <div className="text-primary-foreground/70 text-sm">Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">Free</div>
                <div className="text-primary-foreground/70 text-sm">Updates</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;