import { Eye, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface Theme {
  id: number;
  name: string;
  description: string;
  slug: string;
  is_active: boolean;
  preview_image?: string;
  preview_image_url?: string;
  is_public?: boolean;
  images?: Array<{
    id: number;
    image_path: string;
    alt_text?: string;
  }>;
  packages?: Array<{
    id: number;
    name: string;
  }>;
}

const InvitationShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch themes from API
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = import.meta.env.VITE_APP_URL || 'http://localhost:8000';
        console.log('Fetching themes from:', `${apiUrl}/api/themes/active?limit=12`);

        const response = await fetch(`${apiUrl}/api/themes/active?limit=12`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          credentials: 'omit',
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        console.log('Response URL:', response.url);
        const data = await response.json();

        if (data.success && data.data) {
          setThemes(data.data);
        } else {
          setError('Failed to load themes');
        }
      } catch (err) {
        setError('Failed to load themes');
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  // Get unique categories from themes
  const categories = ['All', ...Array.from(new Set(themes.map(theme => theme.name.split(' ')[0])))];

  const filteredThemes = activeCategory === 'All'
    ? themes
    : themes.filter(theme => theme.name.split(' ')[0] === activeCategory);

  // Loading state
  if (loading) {
    return (
      <section id="showcase" className="py-24 bg-gradient-to-b from-primary-light/5 to-background w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
              <span className="text-primary text-sm font-medium">Pilihan Desain</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Pilih tema undangan yang menarik
            </h2>
            <div className="mt-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Memuat tema...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="showcase" className="py-24 bg-gradient-to-b from-primary-light/5 to-background w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
              <span className="text-primary text-sm font-medium">Pilihan Desain</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Pilih tema undangan yang menarik
            </h2>
            <div className="mt-8">
              <p className="text-red-500">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4"
                variant="outline"
              >
                Coba Lagi
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="showcase" className="py-24 bg-gradient-to-b from-primary-light/5 to-background w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
        <div className="flex flex-wrap justify-center gap-3 mb-12 w-full overflow-x-auto">
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

        {/* Themes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredThemes.map((theme, index) => (
            <div
              key={theme.id}
              className="stagger-animation comfort-card group relative bg-card rounded-2xl overflow-hidden shadow-md w-full max-w-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Active Badge */}
              {theme.is_active && (
                <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2.5 py-1 rounded-full text-[10px] font-medium z-10 flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-current" />
                  Available
                </div>
              )}

              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden w-full">
                <img
                  src={theme.preview_image_url || '/api/placeholder/400/300'}
                  alt={theme.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out max-w-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                  }}
                  onLoad={() => {
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {theme.name.split(' ')[0]}
                  </div>
                  {/* Package count indicator */}
                  {theme.packages && theme.packages.length > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-muted-foreground">
                        {theme.packages.length} packages
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-base font-bold text-card-foreground">
                  {theme.name}
                </h3>
                <p className="text-muted-foreground text-xs line-clamp-1">
                  {theme.description}
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
