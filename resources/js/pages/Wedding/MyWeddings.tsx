import { WeddingCard } from '@/components/dashboard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';
import { Grid, List, Plus, Search } from 'lucide-react';
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

  return (
    <>
      <Head title="My Weddings" />

      <DashboardLayout user={user} currentPath="/my-weddings">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Weddings
              </h1>
              <p className="text-gray-600">
                Manage and organize your wedding invitations
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create New Wedding
            </Button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-4 shadow-sm">
            <div className="flex flex-1 items-center space-x-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search weddings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white/50"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white/50"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="p-2"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="p-2"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredWeddings.length} of {weddings.length} weddings
            {searchTerm && ` matching "${searchTerm}"`}
            {statusFilter !== 'all' && ` with status "${statusFilter}"`}
          </p>
        </div>

        {/* Weddings Grid/List */}
        {filteredWeddings.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {filteredWeddings.map((wedding: Wedding) => (
              <WeddingCard
                key={wedding.id}
                wedding={wedding}
                onView={handleWeddingView}
                onEdit={handleWeddingEdit}
                onDelete={handleWeddingDelete}
                className={viewMode === 'list' ? 'flex flex-row h-48' : ''}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center">
                <Plus className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || statusFilter !== 'all' ? 'No weddings found' : 'No weddings yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Create your first wedding invitation to get started.'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Wedding
                </Button>
              )}
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
}
