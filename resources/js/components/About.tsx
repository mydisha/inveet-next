import { Users, Award, Globe, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    {
      icon: Users,
      number: '10,000+',
      label: 'Happy Couples',
      description: 'Trusted by couples worldwide'
    },
    {
      icon: Award,
      number: '50+',
      label: 'Awards Won',
      description: 'Industry recognition & excellence'
    },
    {
      icon: Globe,
      number: '25+',
      label: 'Countries',
      description: 'Serving couples globally'
    },
    {
      icon: Heart,
      number: '99.9%',
      label: 'Satisfaction',
      description: 'Customer satisfaction rate'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-primary-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
            <span className="text-primary text-sm font-medium">About Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Mengapa Memilih
            <br />
            <span className="text-gradient-primary">Inveet?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Kami adalah platform undangan digital terdepan yang membantu ribuan pasangan menciptakan momen spesial mereka.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center space-y-4"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-card-foreground mb-1">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-card-foreground mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-card-foreground">
              Cerita Kami
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Inveet dimulai dari pengalaman pribadi founder kami yang mengalami kesulitan dalam mengirim undangan pernikahan tradisional.
                Kami menyadari bahwa di era digital ini, pasangan membutuhkan solusi yang lebih praktis, hemat, dan ramah lingkungan.
              </p>
              <p>
                Dengan tim yang terdiri dari wedding planner berpengalaman, developer handal, dan designer kreatif, kami menciptakan platform
                yang menggabungkan keindahan desain dengan kemudahan teknologi.
              </p>
              <p>
                Misi kami adalah membantu setiap pasangan menciptakan undangan digital yang indah dan berkesan, sambil menghemat waktu,
                biaya, dan memberikan pengalaman yang menyenangkan bagi tamu mereka.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 to-primary-light/20 rounded-3xl p-8 border border-primary/20">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-card-foreground">
                  Made with Love
                </h4>
                <p className="text-muted-foreground">
                  Setiap fitur dirancang dengan cinta dan perhatian terhadap detail,
                  memastikan pengalaman terbaik untuk pasangan dan tamu mereka.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
