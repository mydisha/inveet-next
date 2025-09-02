import { Gift, Zap, Star, HeartHandshake } from 'lucide-react';
import { GradientCard } from './ui/card';

type CardGradient = 'card-gradient-1' | 'card-gradient-2' | 'card-gradient-3' | 'card-gradient-4';
type IconGradient = 'icon-gradient-1' | 'icon-gradient-2' | 'icon-gradient-3' | 'icon-gradient-4';

interface Benefit {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  cardGradient: CardGradient;
  iconGradient: IconGradient;
  featured?: boolean;
}

const WhyChooseUs = () => {
  const benefits: Benefit[] = [
    {
      icon: Gift,
      title: 'Harga Kompetitif',
      description: 'Buat undangan pernikahan tidak pernah semudah dan semurah ini',
      cardGradient: 'card-gradient-1',
      iconGradient: 'icon-gradient-1'
    },
    {
      icon: Zap,
      title: 'Proses Cepat',
      description: 'Proses pembuatan undangan hanya memerlukan waktu 5 menit serta dapat diubah kapanpun',
      cardGradient: 'card-gradient-2',
      iconGradient: 'icon-gradient-2',
      featured: true
    },
    {
      icon: Star,
      title: 'Fitur Lengkap',
      description: 'Fitur yang dapat diandalkan mulai dari proses pembuatan undangan hingga proses membagikan undangan',
      cardGradient: 'card-gradient-3',
      iconGradient: 'icon-gradient-3',
      featured: true
    },
    {
      icon: HeartHandshake,
      title: 'Support Terbaik',
      description: 'Perlu bantuan ? tenang tim support Kami selalu bisa diandalkan',
      cardGradient: 'card-gradient-4',
      iconGradient: 'icon-gradient-4'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
            <span className="text-primary text-sm font-medium">Mengapa memilih Inveet.id ?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Kami hadir sebagai sebuah solusi untuk membantu calon mempelai yang berbahagia untuk membuat undangan pernikahan online dengan cepat dan mudah.
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <GradientCard
                key={benefit.title}
                gradient={benefit.cardGradient}
                featured={benefit.featured}
                iconGradient={benefit.iconGradient}
                icon={<IconComponent className="w-8 h-8 text-white" />}
                title={benefit.title}
                description={benefit.description}
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
