import { Edit3, FileText, Share2 } from 'lucide-react';

const StepByStep = () => {
  const steps = [
    {
      title: 'Registrasi',
      description: 'Buat akun baru dengan cara mengisikan email dan password atau daftar menggunakan akun Google.',
      stepNumber: 'Langkah 1',
      icon: FileText
    },
    {
      title: 'Isi Informasi',
      description: 'Isi informasi mengenai mempelai, lokasi dan waktu acara, pilih desain undangan dan upload foto ke galeri',
      stepNumber: 'Langkah 2',
      icon: Edit3
    },
    {
      title: 'Bagikan & Pantau',
      description: 'Setelah undangan selesai dibuat, Kamu dapat langsung menyebarkan ke keluarga atau kerabat lalu pantau kehadiran serta ucapan dari tamu',
      stepNumber: 'Langkah 3',
      icon: Share2
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Langkah Pembuatan Undangan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hanya butuh beberapa langkah dan menit saja hingga undangan Kamu siap digunakan
          </p>
        </div>

        {/* Steps Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative bg-card rounded-lg shadow-lg p-8 border border-border">
              {/* Step Title */}
              <h3 className="text-xl font-bold text-card-foreground mb-4">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {step.description}
              </p>

              {/* Step Number Background */}
              <div className="absolute bottom-4 right-4 text-8xl font-bold text-muted-foreground/20 opacity-50">
                {step.stepNumber.split(' ')[1]}
              </div>

              {/* Step Icon */}
              <div className="absolute bottom-6 right-6">
                <step.icon className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepByStep;
