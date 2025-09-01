import { CheckCircle, ArrowRight } from 'lucide-react';

const StepByStep = () => {
  const steps = [
    {
      number: '01',
      title: 'Pilih Template',
      description: 'Pilih dari ratusan template undangan yang sudah tersedia atau customize sesuai keinginanmu.',
      features: ['Template Premium', 'Customizable Design', 'Mobile Responsive']
    },
    {
      number: '02',
      title: 'Isi Informasi',
      description: 'Masukkan detail pernikahan, foto, dan informasi penting lainnya dengan mudah.',
      features: ['Form yang Mudah', 'Auto Save', 'Preview Real-time']
    },
    {
      number: '03',
      title: 'Kirim Undangan',
      description: 'Kirim undangan digital ke semua tamu dengan sekali klik via WhatsApp, email, atau social media.',
      features: ['Auto Send', 'Personalized Message', 'Bulk Sending']
    },
    {
      number: '04',
      title: 'Track RSVP',
      description: 'Pantau response tamu secara real-time dan kelola daftar tamu dengan mudah.',
      features: ['Real-time Updates', 'Analytics Dashboard', 'Guest Management']
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary-light/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
            <span className="text-primary text-sm font-medium">How It Works</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Hanya dalam
            <br />
            <span className="text-gradient-primary">4 Langkah Sederhana</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Proses pembuatan undangan digital yang super mudah dan cepat, selesai dalam hitungan menit.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Step Number */}
                <div className="absolute -left-4 top-0 w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {step.number}
                </div>

                {/* Content */}
                <div className="ml-8 space-y-4">
                  <h3 className="text-2xl font-bold text-card-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow (except for last step) */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-primary to-transparent"></div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="sticky top-24">
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 border border-primary/20">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-card-foreground mb-2">
                      Siap Digunakan
                    </h3>
                    <p className="text-muted-foreground">
                      Undangan digitalmu siap dikirim ke semua tamu dalam waktu singkat!
                    </p>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary-glow rounded-full animate-pulse"></div>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-primary/10">
                  <div className="text-2xl font-bold text-primary">5 Menit</div>
                  <div className="text-sm text-muted-foreground">Setup Time</div>
                </div>
                <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-primary/10">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full px-8 py-4 border border-primary/20">
            <span className="text-lg font-medium">Ready to get started?</span>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary-glow transition-colors duration-300 flex items-center space-x-2">
              <span>Start Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepByStep;
