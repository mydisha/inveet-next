import { Filter, Heart, Music, Search, Upload } from 'lucide-react';
import { useMemo, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { MusicListItem, SimpleUploadModal, type MusicItem, type MusicMetadata } from '../../components/music';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import PageHeader from '../../components/ui/page-header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { getMusicByCategory, musicCategories, predefinedMusic, searchMusic } from '../../data/predefinedMusic';

interface MusicIndexProps {
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export default function MusicIndex({ user }: MusicIndexProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMusic, setSelectedMusic] = useState<MusicItem | null>(null);
  const [favorites, setFavorites] = useState<Set<string | number>>(new Set());
  const [userMusic, setUserMusic] = useState<MusicItem[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeTab, setActiveTab] = useState('library');

  // Filter and search music
  const filteredMusic = useMemo(() => {
    let music = selectedCategory === 'All'
      ? [...predefinedMusic, ...userMusic]
      : [...getMusicByCategory(selectedCategory), ...userMusic.filter(m => m.category === selectedCategory)];

    if (searchQuery.trim()) {
      music = searchMusic(searchQuery);
    }

    return music;
  }, [selectedCategory, searchQuery, userMusic]);

  const handleMusicSelect = (music: MusicItem) => {
    setSelectedMusic(music);
  };

  const handleFavorite = (music: MusicItem) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(music.id)) {
      newFavorites.delete(music.id);
    } else {
      newFavorites.add(music.id);
    }
    setFavorites(newFavorites);
  };

  const handleUpload = async (file: File, metadata: MusicMetadata) => {
    // In a real application, this would upload to the server
    // For now, we'll simulate the upload
    const newMusic: MusicItem = {
      id: `user-${Date.now()}`,
      title: metadata.title,
      artist: metadata.artist,
      category: metadata.category,
      description: metadata.description,
      src: URL.createObjectURL(file), // In real app, this would be the server URL
      isPredefined: false,
      duration: 0, // Would be calculated from the actual file
    };

    setUserMusic(prev => [...prev, newMusic]);
  };

  const handleDelete = (music: MusicItem) => {
    if (!music.isPredefined) {
      setUserMusic(prev => prev.filter(m => m.id !== music.id));
    }
  };

  const handleDownload = (music: MusicItem) => {
    // In a real application, this would trigger a download from the server

  };

  const handleEdit = (music: MusicItem) => {
    // In a real application, this would open an edit modal

  };

  return (
    <DashboardLayout user={user || null} currentPath="/music">
      <div className="container mx-auto">
        {/* Header */}
        <PageHeader
          icon={Music}
          title="Music Library"
          description="Choose from our curated collection or upload your own music for your wedding invitation"
        >
          <Button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span>Upload Music</span>
          </Button>
        </PageHeader>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search music by title, artist, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {musicCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Selected Music Display */}
        {selectedMusic && (
          <Card className="mb-6 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Selected Music</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedMusic(null)}
                >
                  Clear Selection
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MusicCard
                music={selectedMusic}
                isSelected={true}
                showActions={false}
              />
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library" className="flex items-center space-x-2">
              <Music className="h-4 w-4" />
              <span>Music Library</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Favorites</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="mt-6">
            {filteredMusic.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Music className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No music found</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {searchQuery
                      ? `No music matches your search "${searchQuery}"`
                      : `No music available in the "${selectedCategory}" category`
                    }
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {filteredMusic.map((music) => (
                  <MusicListItem
                    key={music.id}
                    music={{
                      ...music,
                      isFavorite: favorites.has(music.id)
                    }}
                    onSelect={handleMusicSelect}
                    onFavorite={handleFavorite}
                    onDownload={handleDownload}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    isSelected={selectedMusic?.id === music.id}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            {favorites.size === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground text-center">
                    Click the heart icon on any music to add it to your favorites
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {filteredMusic
                  .filter(music => favorites.has(music.id))
                  .map((music) => (
                    <MusicListItem
                      key={music.id}
                      music={{
                        ...music,
                        isFavorite: true
                      }}
                      onSelect={handleMusicSelect}
                      onFavorite={handleFavorite}
                      onDownload={handleDownload}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      isSelected={selectedMusic?.id === music.id}
                    />
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Simple Upload Modal */}
        <SimpleUploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
    </DashboardLayout>
  );
}
