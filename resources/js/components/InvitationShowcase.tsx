import { ArrowRight, Heart, Star, Users, Eye } from 'lucide-react';
import { Button } from './ui/button';

const InvitationShowcase = () => {
  const showcases = [
    {
      id: 1,
      title: 'Elegant Classic',
      category: 'Traditional',
      image: '/images/showcase-1.jpg',
      rating: 4.9,
      reviews: 128,
      views: '2.4k',
      featured: true
    },
    {
      id: 2,
      title: 'Modern Minimalist',
      category: 'Contemporary',
      image: '/images/showcase-2.jpg',
      rating: 4.8,
      reviews: 95,
      views: '1.8k'
    },
    {
      id: 3,
      title: 'Romantic Garden',
      category: 'Nature',
      image: '/images/showcase-3.jpg',
      rating: 4.7,
      reviews: 156,
      views: '3.1k'
    },
    {
      id: 4,
      title: 'Luxury Premium',
      category: 'Premium',
      image: '/images/showcase-4.jpg',
      rating: 4.9,
      reviews: 89,
      views: '1.5k'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 rounded-full px-4 py-2 mb-6">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Design Showcase</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Beautiful Invitations
            <br />
            <span className="text-yellow-600">That Tell Your Story</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our curated collection of stunning wedding invitation designs. 
            Each template is crafted with love and attention to detail.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {showcases.map((showcase) => (
            <div 
              key={showcase.id}
              className="group relative overflow-hidden rounded-3xl bg-white border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Featured Badge */}
              {showcase.featured && (
                <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-medium z-10">
                  ✨ Featured
                </div>
              )}

              {/* Image Placeholder */}
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-yellow-100 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Heart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Design Preview</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full mb-2">
                    {showcase.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {showcase.title}
                  </h3>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span>{showcase.rating}</span>
                    <span>({showcase.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{showcase.views}</span>
                  </div>
                </div>

                {/* CTA */}
                <Button 
                  variant="outline" 
                  className="w-full group-hover:border-blue-600 group-hover:text-blue-600 transition-all duration-300"
                >
                  View Design
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-100 to-blue-100 rounded-3xl p-8 border border-yellow-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find the Perfect Design?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our design team can create a custom invitation that perfectly matches your vision and wedding theme.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 text-lg px-8 py-4">
                Browse All Designs
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-blue-600 text-blue-600 bg-transparent px-8 py-4 rounded-xl font-medium text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 text-lg px-8 py-4"
              >
                Request Custom Design
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvitationShowcase;