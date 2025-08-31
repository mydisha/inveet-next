import { ArrowRight, CheckCircle, Palette, Users, Send, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StepByStep = () => {
  const steps = [
    {
      number: '01',
      title: 'Pilih Template',
      description: 'Browse dan pilih template undangan digital yang sesuai dengan tema pernikahanmu',
      icon: Palette,
      details: [
        'Ratusan template premium',
        'Preview real-time',
        'Kategori beragam tema',
        'Mobile responsive'
      ],
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop'
    },
    {
      number: '02',
      title: 'Customize Design',
      description: 'Personalisasi undanganmu dengan foto, warna, font, dan informasi pernikahan',
      icon: Smartphone,
      details: [
        'Upload foto couple',
        'Pilih color scheme',
        'Edit informasi acara',
        'Preview semua device'
      ],
      image: 'https://images.unsplash.com/photo-1586474932600-222974bf4de2?w=600&h=400&fit=crop'
    },
    {
      number: '03',
      title: 'Kelola Tamu',
      description: 'Import daftar tamu dan atur pengiriman undangan secara otomatis',
      icon: Users,
      details: [
        'Import dari Excel/CSV',
        'Kelola data tamu',
        'Grouping & kategorisasi',
        'RSVP management'
      ],
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop'
    },
    {
      number: '04',
      title: 'Kirim & Tracking',
      description: 'Kirim undangan via WhatsApp, email, atau social media dan monitor responsenya',
      icon: Send,
      details: [
        'Auto-send WhatsApp',
        'Email blast campaign',
        'Social media sharing',
        'Real-time analytics'
      ],
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-primary-light/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
            <span className="text-primary text-sm font-medium">How It Works</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Cara membuat undangan
            <br />
            <span className="text-gradient-primary">dalam 4 langkah mudah</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Proses yang simple dan intuitif, dari pilih template sampai undangan terkirim hanya dalam hitungan menit.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-20">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 1;
            
            return (
              <div
                key={step.number}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className={`space-y-6 ${isEven ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-6xl font-bold text-primary/20">{step.number}</div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        <span className="text-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button className="group mt-6" size="lg">
                    {index === 0 ? 'Lihat Template' : 
                     index === 1 ? 'Coba Customize' :
                     index === 2 ? 'Kelola Tamu' : 'Mulai Kirim'}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Visual */}
                <div className={`relative ${isEven ? 'lg:order-1' : ''}`}>
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-60"></div>
                    
                    {/* Image Container */}
                    <div className="relative bg-gradient-to-br from-background/80 to-primary-light/20 backdrop-blur-sm rounded-3xl p-8 border border-primary/10">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full rounded-2xl shadow-lg"
                      />
                      
                      {/* Floating Elements */}
                      <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium animate-bounce">
                        Step {step.number}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 space-y-6">
          <h3 className="text-3xl font-bold">Ready to create your perfect invitation?</h3>
          <p className="text-muted-foreground text-lg">
            Join thousands of happy couples who chose WeddingPro
          </p>
          <Button size="lg" className="text-lg px-8 py-4">
            Mulai Buat Undangan
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StepByStep;