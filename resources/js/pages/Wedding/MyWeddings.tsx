import { WeddingCard } from '@/components/dashboard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/ui/page-header';
import { Head } from '@inertiajs/react';
import { Grid, Heart, List, Plus, Search } from 'lucide-react';
import { useState } from 'react';

interface MyWeddingsProps {
  user: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
  weddings: any[];
}

interface Wedding {
  id: number;
  title?: string;
  slug?: string;
  status: 'published' | 'draft' | 'inactive';
  wedding_start?: string;
  wedding_end?: string;
  view_count?: number;
  is_published?: boolean;
  is_draft?: boolean;
  // Couple information
  couple_name_1?: string;
  couple_name_2?: string;
  wedding_location?: string;
  wedding_venue?: string;
  theme?: {
    id: number;
    name: string;
    slug: string;
    preview_image?: string;
  };
  package?: {
    id: number;
    name: string;
  };
  created_at?: string;
  updated_at?: string;
}

export default function MyWeddings({ user, weddings }: MyWeddingsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter weddings based on search and status
  const filteredWeddings = weddings.filter((wedding: Wedding) => {
    const matchesSearch = !searchTerm ||
      wedding.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wedding.theme?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wedding.couple_name_1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wedding.couple_name_2?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wedding.wedding_location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wedding.wedding_venue?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || wedding.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleWeddingView = (wedding: Wedding) => {
    // Navigate to wedding view page
    window.open(`/wedding/${wedding.slug}`, '_blank');
  };

  const handleWeddingEdit = (wedding: Wedding) => {
    // Navigate to wedding edit page
    window.location.href = `/wedding/${wedding.id}/edit`;
  };

  const handleWeddingDelete = (wedding: Wedding) => {
    // Handle wedding deletion
    if (confirm(`Are you sure you want to delete "${wedding.title || 'this wedding'}"?`)) {
      // Implement deletion logic
      console.log('Delete wedding:', wedding.id);
    }
  };

  const handleDesignConfiguration = (wedding: Wedding) => {
    // Navigate to design configuration page
    window.location.href = `/weddings/${wedding.id}/design-configuration`;
  };

  return (
    <>
      <Head title="My Weddings" />

      <DashboardLayout user={user} currentPath="/my-weddings">
        <PageHeader
          icon={Heart}
          title="My Weddings"
          description="Manage and organize your wedding invitations"
        >
          <Button className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Create New Wedding
          </Button>
        </PageHeader>

        {/* Search and Filter Bar */}
        <div className="bg-gradient-to-r from-white to-gray-50/50 border border-gray-200/60 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by couple names, location, or theme..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200/60 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white/80 text-sm transition-all duration-200 placeholder:text-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none px-4 py-3 pr-8 border border-gray-200/60 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white/80 text-sm transition-all duration-200 min-w-[140px] cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="inactive">Inactive</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-white/80 border border-gray-200/60 rounded-xl p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 px-3 text-xs font-medium transition-all duration-200"
                >
                  <Grid className="w-4 h-4 mr-1.5" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 px-3 text-xs font-medium transition-all duration-200"
                >
                  <List className="w-4 h-4 mr-1.5" />
                  List
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">
              {filteredWeddings.length} Wedding{filteredWeddings.length !== 1 ? 's' : ''}
            </h2>
            {weddings.length !== filteredWeddings.length && (
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                of {weddings.length} total
              </span>
            )}
          </div>
          {(searchTerm || statusFilter !== 'all') && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
              className="text-gray-600 hover:text-gray-800 hover:bg-gray-50 text-sm font-medium"
            >
              Clear filters
            </Button>
          )}
        </div>

        {/* Weddings Grid/List */}
        {filteredWeddings.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredWeddings.map((wedding: Wedding) => (
              <WeddingCard
                key={wedding.id}
                wedding={wedding}
                onView={handleWeddingView}
                onEdit={handleWeddingEdit}
                onDelete={handleWeddingDelete}
                onDesignConfig={handleDesignConfiguration}
                className={viewMode === 'list' ? 'flex flex-col sm:flex-row h-auto sm:h-48' : ''}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="max-w-lg mx-auto">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-primary/10 to-primary/20 rounded-3xl flex items-center justify-center shadow-lg">
                <Heart className="w-16 h-16 text-primary/60" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {searchTerm || statusFilter !== 'all' ? 'No weddings found' : 'Start your journey'}
              </h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search terms or clear the filters to see all weddings.'
                  : 'Create beautiful wedding invitations that your guests will love. Choose from our stunning themes and customize every detail.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {searchTerm || statusFilter !== 'all' ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                    }}
                    className="px-6 py-3"
                  >
                    Clear filters
                  </Button>
                ) : (
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-base"
                    onClick={() => window.location.href = '/onboarding'}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Wedding
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
}
