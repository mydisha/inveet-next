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
  LogIn,
  MoreHorizontal,
  Search,
  UserCheck,
  UserX
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone_number?: string;
  is_active: boolean;
  created_at: string;
  roles: Array<{ name: string }>;
  weddings_count: number;
  orders_count: number;
}

interface PaginatedUsers {
  data: User[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface UsersPageProps {
  user: {
    id: number;
    name: string;
    email: string;
    roles: Array<{
      id: number;
      name: string;
    }>;
  } | null;
  users: PaginatedUsers;
  filters: {
    search?: string;
    role?: string;
    status?: string;
    sort_by?: string;
    sort_order?: string;
    per_page?: number;
  };
}

export default function UsersPage({ user, users: initialUsers, filters: initialFilters }: UsersPageProps) {
  const [users, setUsers] = useState<User[]>(initialUsers.data);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(initialFilters.search || '');
  const [roleFilter, setRoleFilter] = useState(initialFilters.role || 'all');
  const [statusFilter, setStatusFilter] = useState(initialFilters.status || 'all');
  const [currentPage, setCurrentPage] = useState(initialUsers.current_page);
  const [totalPages, setTotalPages] = useState(initialUsers.last_page);
  const [total, setTotal] = useState(initialUsers.total);

  // Update local state when props change
  useEffect(() => {
    setUsers(initialUsers.data);
    setCurrentPage(initialUsers.current_page);
    setTotalPages(initialUsers.last_page);
    setTotal(initialUsers.total);
  }, [initialUsers]);

  const fetchUsers = (page?: number) => {
    setLoading(true);
    const params: any = {
      page: page || currentPage,
      per_page: 15,
    };

    if (search) params.search = search;
    if (roleFilter && roleFilter !== 'all') params.role = roleFilter;
    if (statusFilter && statusFilter !== 'all') params.status = statusFilter;

    router.get('/backoffice/users', params, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        setLoading(false);
      },
      onError: (errors) => {

        setLoading(false);
      }
    });
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
    // Trigger search after a short delay to avoid too many requests
    setTimeout(() => {
      fetchUsers(1);
    }, 300);
  };

  const handleAutoLogin = (userId: number) => {
    router.post(`/backoffice/api/users/${userId}/auto-login`, {}, {
      onSuccess: (page: any) => {
        if (page.props.login_url) {
          window.open(page.props.login_url, '_blank');
        }
      },
      onError: () => {
        console.error('Error generating auto-login');
      }
    });
  };

  const handleToggleStatus = (userId: number, isActive: boolean) => {
    const endpoint = isActive ? 'deactivate' : 'activate';
    router.post(`/backoffice/api/users/${userId}/${endpoint}`, {}, {
      onSuccess: () => {
        router.reload();
      },
      onError: () => {
        console.error('Error toggling user status');
      }
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super-admin':
        return 'bg-red-100 text-red-800';
      case 'admin':
        return 'bg-orange-100 text-orange-800';
      case 'moderator':
        return 'bg-blue-100 text-blue-800';
      case 'customer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Head title="User Management - Backoffice" />
      <BackofficeLayout user={user} title="User Management" description="Manage registered users">
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={search}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={roleFilter} onValueChange={(value) => {
                    setRoleFilter(value);
                    setCurrentPage(1);
                    fetchUsers(1);
                  }}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Roles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="super-admin">Super Admin</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={(value) => {
                    setStatusFilter(value);
                    setCurrentPage(1);
                    fetchUsers(1);
                  }}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Users ({total})</CardTitle>
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
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Roles</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Weddings</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-500">ID: {user.id}</div>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phone_number || '-'}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {user.roles.map((role) => (
                                <Badge
                                  key={role.name}
                                  className={getRoleBadgeColor(role.name)}
                                >
                                  {role.name}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={user.is_active ? 'default' : 'secondary'}
                              className={user.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                            >
                              {user.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.weddings_count}</TableCell>
                          <TableCell>{user.orders_count}</TableCell>
                          <TableCell>
                            {new Date(user.created_at).toLocaleDateString()}
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
                                  <Link href={`/backoffice/users/${user.id}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/backoffice/users/${user.id}/edit`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit User
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleAutoLogin(user.id)}
                                >
                                  <LogIn className="mr-2 h-4 w-4" />
                                  Auto Login
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleToggleStatus(user.id, user.is_active)}
                                >
                                  {user.is_active ? (
                                    <>
                                      <UserX className="mr-2 h-4 w-4" />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <UserCheck className="mr-2 h-4 w-4" />
                                      Activate
                                    </>
                                  )}
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
                      onClick={() => {
                        const newPage = currentPage - 1;
                        setCurrentPage(newPage);
                        fetchUsers(newPage);
                      }}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        const newPage = currentPage + 1;
                        setCurrentPage(newPage);
                        fetchUsers(newPage);
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
