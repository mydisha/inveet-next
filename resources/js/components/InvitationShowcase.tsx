import { Eye, Heart } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

const InvitationShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const invitationDesigns = [
    {
      id: 1,
      title: 'Happy Peach',
      category: 'Classic',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=600&fit=crop',
      description: 'Beautiful peach design with elegant accents',
      popular: true,
      colors: ['#B68973', '#EADBC8', '#F9F5F0']
    },
    {
      id: 2,
      title: 'Elegant Green',
      category: 'Contemporary',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop',
      description: 'Clean lines with elegant green typography',
      popular: false,
      colors: ['#2C3E50', '#ECF0F1', '#95A5A6']
    },
    {
      id: 3,
      title: 'Dark Flower',
      category: 'Vintage',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop',
      description: 'Classic dark style with romantic flower elements',
      popular: true,
      colors: ['#8D6E63', '#D7CCC8', '#BCAAA4']
    },
    {
      id: 4,
      title: 'Pastel Floral',
      category: 'Themed',
      image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=600&fit=crop',
      description: 'Perfect for romantic pastel weddings',
      popular: false,
      colors: ['#4CAF50', '#81C784', '#C8E6C9']
    },
    {
      id: 5,
      title: 'Modern Elegant',
      category: 'Premium',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=600&fit=crop',
      description: 'Luxurious modern design with premium elements',
      popular: true,
      colors: ['#C9A227', '#F9E79F', '#FDEBD0']
    },
    {
      id: 6,
      title: 'Sparkling Flowers',
      category: 'Boho',
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&h=600&fit=crop',
      description: 'Free-spirited design with sparkling flower elements',
      popular: false,
      colors: ['#6D4C41', '#A1887F', '#D7CCC8']
    }
  ];

  const categories = ['All', 'Classic', 'Contemporary', 'Vintage', 'Themed', 'Premium', 'Boho'];

  const filteredDesigns = activeCategory === 'All'
    ? invitationDesigns
    : invitationDesigns.filter(design => design.category === activeCategory);

  return (
    <section id="showcase" className="py-24 bg-gradient-to-b from-primary-light/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
            <span className="text-primary text-sm font-medium">Pilihan Desain</span>
          </div>
                      <h2 className="text-4xl md:text-5xl font-bold">
              Pilih tema undangan yang menarik
            </h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === activeCategory ? 'default' : 'outline'}
              className="rounded-full px-6 py-2 text-sm font-medium"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Designs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigns.map((design, index) => (
            <div
              key={design.id}
              className="stagger-animation comfort-card group relative bg-card rounded-2xl overflow-hidden shadow-md"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {design.popular && (
                <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2.5 py-1 rounded-full text-[10px] font-medium z-10 flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-current" />
                  Popular
                </div>
              )}

              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={design.image}
                  alt={design.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Content */}
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {design.category}
                  </div>
                  {/* Color dots */}
                  <div className="flex items-center gap-1">
                    {design.colors.map((c, i) => (
                      <span key={i} className="w-3 h-3 rounded-full border border-white" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
                <h3 className="text-base font-bold text-card-foreground">
                  {design.title}
                </h3>
                <p className="text-muted-foreground text-xs line-clamp-1">
                  {design.description}
                </p>

                <div className="pt-1">
                  <Button size="sm" className="comfort-button rounded-full bg-primary hover:bg-primary-glow text-xs px-3 py-1">
                    <Eye className="w-3 h-3 mr-1" />
                    Lihat Desain
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="sm" className="rounded-full px-6">
            Lihat Desain Lainnya
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InvitationShowcase;
