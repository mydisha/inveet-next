import {
    ArrowRight,
    CheckCircle,
    Clock,
    Edit3,
    FileText,
    Heart,
    Share2,
    Smartphone,
    Star,
    Users,
    Zap
} from 'lucide-react';
import { Button } from './ui/button';

interface Step {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  subSteps: string[];
  time: string;
  highlight?: boolean;
}

const HowItWorks = () => {
  const steps: Step[] = [
    {
      icon: FileText,
      title: 'Registrasi & Login',
      description: 'Buat akun baru atau login dengan akun Google untuk akses cepat',
      subSteps: [
        'Isi email dan password',
        'Verifikasi email',
        'Login dengan Google (opsional)'
      ],
      time: '2 Menit',
      highlight: true
    },
    {
      icon: Edit3,
      title: 'Isi Informasi & Pilih Desain',
      description: 'Lengkapi data pernikahan dan pilih template yang sesuai',
      subSteps: [
        'Data mempelai pria & wanita',
        'Tanggal & waktu acara',
        'Lokasi acara',
        'Pilih template desain',
        'Upload foto galeri'
      ],
      time: '5 Menit',
      highlight: true
    },
    {
      icon: Share2,
      title: 'Bagikan & Pantau',
      description: 'Sebarkan undangan ke tamu dan pantau kehadiran real-time',
      subSteps: [
        'Preview undangan',
        'Bagikan link via WhatsApp',
        'Pantau RSVP tamu',
        'Lihat analytics'
      ],
      time: '1 Menit',
      highlight: true
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Proses Cepat',
      description: 'Hanya butuh 8 menit dari registrasi hingga undangan siap'
    },
    {
      icon: Smartphone,
      title: 'Responsif',
      description: 'Tampil sempurna di semua device dan browser'
    },
    {
      icon: Users,
      title: 'Kolaborasi',
      description: 'Bisa diedit bersama dengan pasangan'
    },
    {
      icon: Heart,
      title: 'Personal',
      description: 'Setiap undangan unik dan personal'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm font-semibold">Cara Kerja</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Bagaimana{' '}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Inveet Bekerja?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Proses pembuatan undangan digital yang simpel, cepat, dan mudah dipahami
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.title}
                className={`relative group ${
                  step.highlight
                    ? 'lg:scale-105'
                    : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                  {index + 1}
                </div>

                {/* Step Card */}
                <div className={`relative bg-card rounded-2xl p-8 border border-border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  step.highlight
                    ? 'ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl'
                    : 'hover:border-primary/30'
                }`}>
                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mb-6 ${
                    step.highlight ? 'bg-gradient-to-br from-primary/20 to-primary/30' : ''
                  }`}>
                    <IconComponent className="w-10 h-10 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-card-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {/* Sub Steps */}
                    <div className="space-y-2">
                      {step.subSteps.map((subStep, subIndex) => (
                        <div key={subIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{subStep}</span>
                        </div>
                      ))}
                    </div>

                    {/* Time */}
                    <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      <Clock className="w-4 h-4" />
                      <span>{step.time}</span>
                    </div>
                  </div>
                </div>

                {/* Arrow (except for last step) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-card-foreground mb-4">
              Mengapa Pilih Inveet?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Keunggulan yang membuat Inveet berbeda dari platform lainnya
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="text-center group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-card-foreground mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl px-8 py-6 border border-primary/20">
            <div className="flex items-center space-x-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              <span className="font-semibold text-card-foreground">Siap untuk Memulai?</span>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary-glow">
              Buat Undangan Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
