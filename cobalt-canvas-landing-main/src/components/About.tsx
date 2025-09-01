import { CheckCircle, Award, Users2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const appName = (import.meta as any).env.VITE_APP_NAME || 'WeddingPro';

const About = () => {
  const features = [
    {
      icon: CheckCircle,
      title: 'Proven Success',
      description: 'Over 10,000 successful weddings planned with our platform'
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized as the best digital wedding platform in Indonesia'
    },
    {
      icon: Users2,
      title: 'Expert Team',
      description: 'Professional wedding planners and tech experts at your service'
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Cutting-edge technology meets traditional wedding planning'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Couples' },
    { number: '50,000+', label: 'Guests Invited' },
    { number: '500+', label: 'Vendors Connected' },
    { number: '4.9', label: 'Average Rating' }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-primary-light/10 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
                <span className="text-primary text-sm font-medium">About {appName}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                Transforming Wedding
                <br />
                <span className="text-gradient-primary">Experiences</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We believe every couple deserves a stress-free, beautiful wedding experience. 
                Our platform combines traditional elegance with modern technology to create 
                unforgettable moments for you and your guests.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="flex items-start space-x-4 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button className="btn-hero">
                Learn More About Us
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="card-elegant text-center animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Quote Card */}
            <div className="card-elegant bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <div className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg font-medium text-foreground/90 italic">
                  "{appName} made our wedding planning journey so much easier. 
                  The digital invitations were beautiful and the guest management 
                  system saved us countless hours."
                </blockquote>
                <div className="text-right">
                  <div className="font-semibold text-primary">Sarah & John</div>
                  <div className="text-muted-foreground text-sm">Married in 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;