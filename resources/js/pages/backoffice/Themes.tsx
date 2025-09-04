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
import { apiGet } from '@/lib/api';
import { getCsrfToken } from '@/lib/auth';
import { Head, Link } from '@inertiajs/react';
import {
    Edit,
    Eye,
    MoreHorizontal,
    Palette,
    Plus,
    Search,
    ToggleLeft,
    ToggleRight,
    Trash2
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface Theme {
  id: number;
  name: string;
  description?: string;
  slug: string;
  is_active: boolean;
  is_public: boolean;
  preview_image?: string;
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
}

export default function ThemesPage({ user }: ThemesPageProps) {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchThemes = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: '15',
        ...(search && { search }),
        ...(statusFilter && statusFilter !== 'all' && { status: statusFilter }),
        ...(visibilityFilter && visibilityFilter !== 'all' && { visibility: visibilityFilter }),
      });

      const response: ThemesResponse = await apiGet(`/backoffice/api/themes?${params}`);

      setThemes(response.data.data);
      setTotalPages(response.data.last_page);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Failed to fetch themes:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, statusFilter, visibilityFilter]);

  useEffect(() => {
    fetchThemes();
  }, [fetchThemes]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleToggleActive = async (themeId: number) => {
    try {
      const csrfToken = getCsrfToken();
      if (!csrfToken) {
        console.error('CSRF token not available');
        return;
      }

      const response = await fetch(`/api/backoffice/themes/${themeId}/toggle-active`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
      });

      if (response.ok) {
        fetchThemes(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to toggle theme status:', error);
    }
  };

  const handleTogglePublic = async (themeId: number) => {
    try {
      const csrfToken = getCsrfToken();
      if (!csrfToken) {
        console.error('CSRF token not available');
        return;
      }

      const response = await fetch(`/api/backoffice/themes/${themeId}/toggle-public`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
      });

      if (response.ok) {
        fetchThemes(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to toggle theme visibility:', error);
    }
  };

  const handleDelete = async (themeId: number) => {
    if (confirm('Are you sure you want to delete this theme? This action cannot be undone.')) {
      try {
        const csrfToken = getCsrfToken();
        if (!csrfToken) {
          console.error('CSRF token not available');
          return;
        }

        const response = await fetch(`/api/backoffice/themes/${themeId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          credentials: 'include',
        });

        if (response.ok) {
          fetchThemes(); // Refresh the list
        }
      } catch (error) {
        console.error('Failed to delete theme:', error);
      }
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
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={visibilityFilter} onValueChange={setVisibilityFilter}>
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
              <CardTitle>Themes ({total})</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
                      {themes.map((theme) => (
                        <TableRow key={theme.id}>
                          <TableCell>
                            {theme.preview_image ? (
                              <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
                                <img
                                  src={theme.preview_image}
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
                              {theme.is_public ? 'Public' : 'Private'}
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
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    Showing {((currentPage - 1) * 15) + 1} to {Math.min(currentPage * 15, total)} of {total} results
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
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
