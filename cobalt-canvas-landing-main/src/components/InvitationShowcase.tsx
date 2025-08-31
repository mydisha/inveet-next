import { Eye, Heart, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InvitationShowcase = () => {
  const invitationDesigns = [
    {
      id: 1,
      title: 'Elegant Floral',
      category: 'Classic',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=600&fit=crop',
      description: 'Beautiful floral design with gold accents',
      popular: true
    },
    {
      id: 2,
      title: 'Modern Minimalist',
      category: 'Contemporary',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop',
      description: 'Clean lines with elegant typography',
      popular: false
    },
    {
      id: 3,
      title: 'Vintage Romance',
      category: 'Vintage',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop',
      description: 'Classic vintage style with romantic elements',
      popular: true
    },
    {
      id: 4,
      title: 'Tropical Paradise',
      category: 'Themed',
      image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=600&fit=crop',
      description: 'Perfect for destination weddings',
      popular: false
    },
    {
      id: 5,
      title: 'Royal Luxury',
      category: 'Premium',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=600&fit=crop',
      description: 'Luxurious design with premium elements',
      popular: true
    },
    {
      id: 6,
      title: 'Bohemian Chic',
      category: 'Boho',
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&h=600&fit=crop',
      description: 'Free-spirited design with natural elements',
      popular: false
    }
  ];

  const categories = ['All', 'Classic', 'Contemporary', 'Vintage', 'Themed', 'Premium', 'Boho'];

  return (
    <section id="showcase" className="py-24 bg-gradient-to-b from-primary-light/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
            <span className="text-primary text-sm font-medium">Design Gallery</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Galeri Desain
            <br />
            <span className="text-gradient-primary">Undangan Digital</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pilih dari ratusan template undangan yang stunning, atau customize sesuai keinginanmu.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === 'All' ? 'default' : 'outline'}
              className="rounded-full px-6 py-2 text-sm font-medium"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Designs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {invitationDesigns.map((design, index) => (
            <div
              key={design.id}
              className="group relative bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {design.popular && (
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium z-10 flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-current" />
                  Popular
                </div>
              )}

              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="rounded-full bg-background/20 backdrop-blur-sm border-0 text-white hover:bg-background/30">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="rounded-full bg-background/20 backdrop-blur-sm border-0 text-white hover:bg-background/30">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button size="sm" className="rounded-full bg-primary hover:bg-primary-glow">
                      <Download className="w-4 h-4 mr-1" />
                      Use This
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {design.category}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                  {design.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {design.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="rounded-full px-8">
            Load More Designs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InvitationShowcase;