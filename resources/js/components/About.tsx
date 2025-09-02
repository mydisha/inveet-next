import { Award, CheckCircle, Globe, Heart, Star, TrendingUp, Users } from 'lucide-react';

const About = () => {
  const stats = [
    {
      icon: Users,
      number: '441,666+',
      label: 'Pengguna Aktif',
      description: 'Telah dipercaya oleh ribuan pasangan',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Award,
      number: '11,938,912+',
      label: 'Undangan Terkirim',
      description: 'Tersebar ke jutaan tamu undangan',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Globe,
      number: 'Rp 47.7M+',
      label: 'Biaya Dihemat',
      description: 'Total penghematan biaya percetakan',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Heart,
      number: '99.9%',
      label: 'Tingkat Kepuasan',
      description: 'Pengguna puas dengan layanan kami',
      gradient: 'from-pink-500 to-pink-600'
    }
  ];

  const testimonials = [
    {
      name: 'Fajar Cakrawinata',
      role: 'Pengguna Inveet',
      content: 'Undangan digital dengan desain yang keren-keren, fitur lengkap, mudah digunakan, kecepatan akses sangat baik',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Eka Putra',
      role: 'Pengguna Inveet',
      content: 'Terlengkap dan Termurah. Recommended',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Evelina Setiawan',
      role: 'Pengguna Inveet',
      content: 'Untuk harga yang dibayarkan, fitur dan kemudahan semua sangat memuaskan, bahkan benar-benar jauh di atas ekspektasi',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-primary-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm font-semibold">Mereka yang Mempercayai Kami</span>
          </div>
                        <h2 className="text-4xl md:text-5xl font-bold">
                Inveet telah dipercaya oleh{' '}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">441,666 pengguna</span>
              </h2>
        </div>

        {/* Stats Grid with Enhanced Design */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                className="stagger-animation comfort-card group relative bg-card rounded-2xl p-8 border border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon with Gradient Background */}
                <div className={`relative w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500 ease-out`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="relative text-center space-y-3">
                  <div className="text-3xl md:text-4xl font-bold text-card-foreground">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-card-foreground">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {stat.description}
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-colors duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-card-foreground mb-4">
              Apa Kata Mereka?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Testimoni dari pengguna yang sudah merasakan kemudahan undangan digital
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="stagger-animation comfort-card group bg-card rounded-2xl p-8 border border-border"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-bounce-gentle" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>

                {/* Testimonial Content */}
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <div className="font-semibold text-card-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl px-8 py-6 border border-primary/20">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="font-semibold text-card-foreground">100% Aman & Terpercaya</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <span className="font-semibold text-card-foreground">Pertumbuhan Pesat</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-pink-500" />
              <span className="font-semibold text-card-foreground">Dibuat dengan Cinta</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
