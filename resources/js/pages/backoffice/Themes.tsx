import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Head, Link, router } from '@inertiajs/react';
import {
  Edit,
  Eye,
  Lock,
  MoreHorizontal,
  Palette,
  Plus,
  Search,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Users
} from 'lucide-react';
import { useState } from 'react';

interface Theme {
  id: number;
  name: string;
  description?: string;
  slug: string;
  is_active: boolean;
  is_public: boolean;
  preview_image?: string;
  preview_image_url?: string;
  created_at: string;
  user: {
    id: number;
    name: string;
  };
  packages: Array<{
    id: number;
    name: string;
  }>;
  weddings_count?: number;
}

interface ThemesResponse {
  success: boolean;
  data: {
    data: Theme[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

interface ThemesPageProps {
  user: {
    id: number;
    name: string;
    email: string;
    roles: Array<{
      id: number;
      name: string;
    }>;
  } | null;
  themes: {
    data: Theme[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  filters: {
    search?: string;
    status?: string;
    visibility?: string;
  };
}

export default function ThemesPage({ user, themes, filters: initialFilters }: ThemesPageProps) {
  const [search, setSearch] = useState(initialFilters.search || '');
  const [statusFilter, setStatusFilter] = useState(initialFilters.status || 'all');
  const [visibilityFilter, setVisibilityFilter] = useState(initialFilters.visibility || 'all');

  const handleSearchSubmit = () => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (statusFilter && statusFilter !== 'all') params.append('status', statusFilter);
    if (visibilityFilter && visibilityFilter !== 'all') params.append('visibility', visibilityFilter);

    router.get(`/backoffice/themes?${params.toString()}`, {}, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === 'status') {
      setStatusFilter(value);
    } else if (filterType === 'visibility') {
      setVisibilityFilter(value);
    }
    // Trigger search when filter changes
    setTimeout(() => handleSearchSubmit(), 100);
  };

  const handleToggleActive = (themeId: number) => {
    router.post(`/backoffice/api/themes/${themeId}/toggle-active`, {}, {
      onSuccess: () => {
        router.reload();
      },
      onError: () => {
        // Error will be handled by the global flash message system
      }
    });
  };

  const handleTogglePublic = (themeId: number) => {
    router.post(`/backoffice/api/themes/${themeId}/toggle-public`, {}, {
      onSuccess: () => {
        router.reload();
      },
      onError: () => {
        // Error will be handled by the global flash message system
      }
    });
  };

  const handleDelete = (themeId: number) => {
    if (confirm('Are you sure you want to delete this theme? This action cannot be undone.')) {
      router.delete(`/backoffice/api/themes/${themeId}`, {
        onSuccess: () => {
          router.reload();
        },
        onError: () => {
          // Error will be handled by the global flash message system
        }
      });
    }
  };

  return (
    <>
      <Head title="Theme Management - Backoffice" />
      <BackofficeLayout user={user} title="Theme Management" description="Manage wedding themes">
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Themes</h2>
              <p className="text-sm text-gray-500">Manage wedding invitation themes</p>
            </div>
            <Button asChild>
              <Link href="/backoffice/themes/create">
                <Plus className="mr-2 h-4 w-4" />
                Add New Theme
              </Link>
            </Button>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search themes..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button onClick={handleSearchSubmit} className="w-full sm:w-auto">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={(value) => handleFilterChange('status', value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={visibilityFilter} onValueChange={(value) => handleFilterChange('visibility', value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Visibility</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Themes Table */}
          <Card>
            <CardHeader>
              <CardTitle>Themes ({themes.total})</CardTitle>
            </CardHeader>
            <CardContent>
              {themes.data.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No themes found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Preview</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Packages</TableHead>
                        <TableHead>Usage</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Visibility</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {themes.data.map((theme) => (
                        <TableRow key={theme.id}>
                          <TableCell>
                            {theme.preview_image_url ? (
                              <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
                                <img
                                  src={theme.preview_image_url}
                                  alt={theme.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                                <Palette className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{theme.name}</div>
                              <div className="text-sm text-gray-500">/{theme.slug}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs">
                              {theme.description ? (
                                <p className="text-sm truncate">{theme.description}</p>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {(theme.packages || []).slice(0, 2).map((package_) => (
                                <Badge key={package_.id} variant="outline" className="text-xs">
                                  {package_.name}
                                </Badge>
                              ))}
                              {(theme.packages || []).length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{(theme.packages || []).length - 2} more
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {theme.weddings_count || 0} weddings
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={theme.is_active ? 'default' : 'secondary'}
                              className={theme.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                            >
                              {theme.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={theme.is_public ? 'default' : 'secondary'}
                              className={theme.is_public ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}
                            >
                              <div className="flex items-center gap-1">
                                {theme.is_public ? (
                                  <Users className="h-3 w-3" />
                                ) : (
                                  <Lock className="h-3 w-3" />
                                )}
                                {theme.is_public ? 'Public' : 'Private'}
                              </div>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {new Date(theme.created_at).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              by {theme.user?.name || 'Unknown'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/backoffice/themes/${theme.id}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/backoffice/themes/${theme.id}/edit`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Theme
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleToggleActive(theme.id)}
                                >
                                  {theme.is_active ? (
                                    <>
                                      <ToggleLeft className="mr-2 h-4 w-4" />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <ToggleRight className="mr-2 h-4 w-4" />
                                      Activate
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleTogglePublic(theme.id)}
                                >
                                  {theme.is_public ? (
                                    <>
                                      <Eye className="mr-2 h-4 w-4" />
                                      Make Private
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="mr-2 h-4 w-4" />
                                      Make Public
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(theme.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Pagination */}
              {themes.last_page > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    Showing {((themes.current_page - 1) * themes.per_page) + 1} to {Math.min(themes.current_page * themes.per_page, themes.total)} of {themes.total} results
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={themes.current_page === 1}
                      onClick={() => {
                        const params = new URLSearchParams();
                        if (search) params.append('search', search);
                        if (statusFilter && statusFilter !== 'all') params.append('status', statusFilter);
                        if (visibilityFilter && visibilityFilter !== 'all') params.append('visibility', visibilityFilter);
                        params.append('page', (themes.current_page - 1).toString());
                        router.get(`/backoffice/themes?${params.toString()}`);
                      }}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={themes.current_page === themes.last_page}
                      onClick={() => {
                        const params = new URLSearchParams();
                        if (search) params.append('search', search);
                        if (statusFilter && statusFilter !== 'all') params.append('status', statusFilter);
                        if (visibilityFilter && visibilityFilter !== 'all') params.append('visibility', visibilityFilter);
                        params.append('page', (themes.current_page + 1).toString());
                        router.get(`/backoffice/themes?${params.toString()}`);
                      }}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </BackofficeLayout>
    </>
  );
}
