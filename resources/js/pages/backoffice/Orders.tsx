import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    CheckCircle,
    Eye,
    Search,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

interface Order {
  id: number;
  invoice_number: string;
  external_transaction_id: string | null;
  total_price: number;
  status: string;
  is_paid: boolean;
  is_void: boolean;
  created_at: string;
  paid_at: string | null;
  user: {
    id: number;
    name: string;
    email: string;
  };
  package: {
    id: number;
    name: string;
  };
  wedding: {
    id: number;
    title: string;
    theme: {
      id: number;
      name: string;
    };
  } | null;
}

interface OrdersData {
  data: Order[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

interface OrdersPageProps {
  user: any;
  orders: OrdersData;
  filters: {
    search?: string;
    status?: string;
    date_from?: string;
    date_to?: string;
  };
}

export default function OrdersPage({ user, orders, filters }: OrdersPageProps) {
  const [search, setSearch] = useState(filters.search || '');
  const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
  const [dateFrom, setDateFrom] = useState(filters.date_from || '');
  const [dateTo, setDateTo] = useState(filters.date_to || '');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (order: Order) => {
    if (order.is_void) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" />
          Void
        </span>
      );
    }

    if (order.is_paid) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Paid
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        Pending
      </span>
    );
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (statusFilter && statusFilter !== 'all') params.append('status', statusFilter);
    if (dateFrom) params.append('date_from', dateFrom);
    if (dateTo) params.append('date_to', dateTo);

    router.get(`/backoffice/orders?${params.toString()}`, {}, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === 'status') {
      setStatusFilter(value);
    } else if (filterType === 'date_from') {
      setDateFrom(value);
    } else if (filterType === 'date_to') {
      setDateTo(value);
    }
  };

  const handleMarkAsPaid = (orderId: number) => {
    router.post(`/backoffice/api/orders/${orderId}/mark-paid`, {
      external_transaction_id: `MANUAL_${Date.now()}`,
    }, {
      onSuccess: () => {
        router.reload();
      },
      onError: () => {
        console.error('Error marking order as paid');
      },
    });
  };

  const handleMarkAsVoid = (orderId: number) => {
    router.post(`/backoffice/api/orders/${orderId}/mark-void`, {}, {
      onSuccess: () => {
        router.reload();
      },
      onError: () => {
        console.error('Error marking order as void');
      },
    });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (statusFilter && statusFilter !== 'all') params.append('status', statusFilter);
    if (dateFrom) params.append('date_from', dateFrom);
    if (dateTo) params.append('date_to', dateTo);
    params.append('page', page.toString());

    router.get(`/backoffice/orders?${params.toString()}`);
  };

  return (
    <BackofficeLayout user={user}>
      <Head title="Orders" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-600">Manage and track all orders</p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by invoice, transaction ID, or user..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <Select
                  value={statusFilter}
                  onValueChange={(value) => handleFilterChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="void">Void</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date From
                </label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => handleFilterChange('date_from', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date To
                </label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => handleFilterChange('date_to', e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4">
              <Button onClick={handleSearch} className="w-full md:w-auto">
                <Search className="w-4 h-4 mr-2" />
                Search Orders
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders ({orders.total})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Wedding</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.data.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.invoice_number}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.user.name}</div>
                          <div className="text-sm text-gray-500">{order.user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{order.package.name}</TableCell>
                      <TableCell>
                        {order.wedding ? (
                          <div>
                            <div className="font-medium">{order.wedding.title}</div>
                            <div className="text-sm text-gray-500">
                              {order.wedding.theme.name}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">No wedding</span>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(order.total_price)}
                      </TableCell>
                      <TableCell>{getStatusBadge(order)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">
                            {formatDate(order.created_at)}
                          </div>
                          {order.paid_at && (
                            <div className="text-xs text-gray-500">
                              Paid: {formatDate(order.paid_at)}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Link href={`/backoffice/orders/${order.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </Link>
                          {!order.is_paid && !order.is_void && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkAsPaid(order.id)}
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Mark Paid
                            </Button>
                          )}
                          {!order.is_void && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkAsVoid(order.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Mark Void
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {orders.last_page > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  Showing {orders.from} to {orders.to} of {orders.total} results
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={orders.current_page === 1}
                    onClick={() => handlePageChange(orders.current_page - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={orders.current_page === orders.last_page}
                    onClick={() => handlePageChange(orders.current_page + 1)}
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
  );
}
