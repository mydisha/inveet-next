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
import { Textarea } from '@/components/ui/textarea';
import { getCsrfToken } from '@/lib/auth';
import { Head, Link } from '@inertiajs/react';
import {
    Edit,
    Eye,
    EyeOff,
    Globe,
    MoreHorizontal,
    Plus,
    RefreshCw,
    Save,
    Search,
    Settings,
    Trash2,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Configuration {
  id: number;
  key: string;
  value: string;
  type: string;
  group: string;
  description?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

interface ConfigurationsResponse {
  data: {
    data: Configuration[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

const configurationGroups = [
  { key: 'general', label: 'General Settings', icon: Settings },
  { key: 'seo', label: 'SEO Settings', icon: Globe },
  { key: 'social', label: 'Social Media', icon: Globe },
  { key: 'maintenance', label: 'Maintenance', icon: Settings },
];

interface ConfigurationsPageProps {
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

export default function ConfigurationsPage({ user }: ConfigurationsPageProps) {
  const [configurations, setConfigurations] = useState<Configuration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [groupFilter, setGroupFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [editingConfig, setEditingConfig] = useState<Configuration | null>(null);
  const [editValue, setEditValue] = useState('');

  const fetchConfigurations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: '50',
        ...(search && { search }),
        ...(groupFilter && groupFilter !== 'all' && { group: groupFilter }),
        ...(typeFilter && typeFilter !== 'all' && { type: typeFilter }),
      });

      const csrfToken = getCsrfToken();
      if (!csrfToken) {

        return;
      }

      const response = await fetch(`/api/backoffice/configurations?${params}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {

          window.location.href = '/login';
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ConfigurationsResponse = await response.json();

      if (data && data.data && data.data.data) {
        setConfigurations(data.data.data);
        setTotalPages(data.data.last_page);
        setTotal(data.data.total);
      } else {

        setConfigurations([]);
        setTotalPages(1);
        setTotal(0);
      }
    } catch (error) {

      setConfigurations([]);
      setTotalPages(1);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigurations();
  }, [currentPage, search, groupFilter, typeFilter]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleEdit = (config: Configuration) => {
    setEditingConfig(config);
    setEditValue(config.value);
  };

  const handleSave = async () => {
    if (!editingConfig) return;

    try {
      const csrfToken = getCsrfToken();
      if (!csrfToken) {

        return;
      }

      const response = await fetch(`/api/backoffice/configurations/${editingConfig.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
        body: JSON.stringify({
          value: editValue,
        }),
      });

      if (response.ok) {
        setEditingConfig(null);
        setEditValue('');
        fetchConfigurations(); // Refresh the list
      }
    } catch (error) {

    }
  };

  const handleDelete = async (configId: number) => {
    if (confirm('Are you sure you want to delete this configuration?')) {
      try {
        const csrfToken = getCsrfToken();
        if (!csrfToken) {

          return;
        }

        const response = await fetch(`/api/backoffice/configurations/${configId}`, {
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
          fetchConfigurations(); // Refresh the list
        }
      } catch (error) {

      }
    }
  };

  const handleInitializeDefaults = async () => {
    try {
      const csrfToken = getCsrfToken();
      if (!csrfToken) {

        return;
      }

      const response = await fetch('/api/backoffice/configurations/initialize-defaults', {
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
        fetchConfigurations(); // Refresh the list
      } else {

      }
    } catch (error) {

    }
  };

  const getTypeBadgeColor = (type: string) => {
    const colors = {
      'string': 'bg-blue-100 text-blue-800',
      'integer': 'bg-green-100 text-green-800',
      'boolean': 'bg-purple-100 text-purple-800',
      'array': 'bg-orange-100 text-orange-800',
      'json': 'bg-pink-100 text-pink-800',
    };

    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const renderValue = (config: Configuration) => {
    if (editingConfig?.id === config.id) {
      return (
        <div className="flex items-center space-x-2">
          {config.type === 'boolean' ? (
            <Select value={editValue} onValueChange={setEditValue}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
          ) : config.type === 'array' || config.type === 'json' ? (
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="min-h-[60px]"
            />
          ) : (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-64"
            />
          )}
          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => setEditingConfig(null)}>
            Cancel
          </Button>
        </div>
      );
    }

    if (config.type === 'boolean') {
      return (
        <Badge className={config.value === 'true' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
          {config.value === 'true' ? 'True' : 'False'}
        </Badge>
      );
    }

    if (config.type === 'array' || config.type === 'json') {
      try {
        const parsed = JSON.parse(config.value);
        return (
          <div className="max-w-xs">
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
              {JSON.stringify(parsed, null, 2)}
            </pre>
          </div>
        );
      } catch {
        return <span className="text-sm">{config.value}</span>;
      }
    }

    return <span className="text-sm">{config.value}</span>;
  };

  return (
    <>
      <Head title="Website Configuration - Backoffice" />
      <BackofficeLayout user={user} title="Website Configuration" description="Manage website settings">
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Configuration</h2>
              <p className="text-sm text-gray-500">Manage website settings and preferences</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleInitializeDefaults}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Initialize Defaults
              </Button>
              <Button asChild>
                <Link href="/backoffice/configurations/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Configuration
                </Link>
              </Button>
            </div>
          </div>

          {/* Group Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {configurationGroups.map((group) => (
              <Card
                key={group.key}
                className={`cursor-pointer transition-colors ${
                  groupFilter === group.key ? 'ring-2 ring-indigo-500' : ''
                }`}
                onClick={() => setGroupFilter(groupFilter === group.key ? '' : group.key)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <group.icon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">{group.label}</p>
                      <p className="text-xs text-gray-500">
                        {configurations.filter(c => c.group === group.key).length} settings
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search configurations..."
                      value={search}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={groupFilter} onValueChange={setGroupFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Groups" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Groups</SelectItem>
                      {configurationGroups.map((group) => (
                        <SelectItem key={group.key} value={group.key}>
                          {group.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="string">String</SelectItem>
                      <SelectItem value="integer">Integer</SelectItem>
                      <SelectItem value="boolean">Boolean</SelectItem>
                      <SelectItem value="array">Array</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configurations Table */}
          <Card>
            <CardHeader>
              <CardTitle>Configurations ({total})</CardTitle>
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
                        <TableHead>Key</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Group</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Visibility</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {configurations.map((config) => (
                        <TableRow key={config.id}>
                          <TableCell>
                            <div className="font-mono text-sm">{config.key}</div>
                          </TableCell>
                          <TableCell>
                            {renderValue(config)}
                          </TableCell>
                          <TableCell>
                            <Badge className={getTypeBadgeColor(config.type)}>
                              {config.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {config.group}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs">
                              {config.description ? (
                                <p className="text-sm truncate">{config.description}</p>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={config.is_public ? 'default' : 'secondary'}
                              className={config.is_public ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                            >
                              {config.is_public ? (
                                <>
                                  <Eye className="h-3 w-3 mr-1" />
                                  Public
                                </>
                              ) : (
                                <>
                                  <EyeOff className="h-3 w-3 mr-1" />
                                  Private
                                </>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleEdit(config)}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(config.id)}
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
                    Showing {((currentPage - 1) * 50) + 1} to {Math.min(currentPage * 50, total)} of {total} results
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
