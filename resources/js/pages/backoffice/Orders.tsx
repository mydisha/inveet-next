import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
    CheckCircle,
    Eye,
    MoreHorizontal,
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
  payment_type: string;
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  const getStatusBadge = (order: Order) => {
    if (order.is_void) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Void
        </span>
      );
    }

    if (order.is_paid) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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

  const getPaymentTypeBadge = (paymentType: string) => {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        {paymentType}
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
            <h1 className="text-3xl font-bold text-gray-900">Orders ({orders.total})</h1>
            <p className="text-gray-600">Manage and track all orders</p>
          </div>
        </div>

        {/* Simple Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
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
              <div className="flex gap-2">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="void">Void</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleSearch} className="w-full sm:w-auto">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Wedding</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.data.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        <div className="max-w-xs truncate">
                          {order.invoice_number}
                        </div>
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
                      <TableCell>
                        {getPaymentTypeBadge(order.payment_type)}
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/backoffice/orders/${order.id}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            {!order.is_paid && !order.is_void && (
                              <DropdownMenuItem onClick={() => handleMarkAsPaid(order.id)}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Mark as Paid
                              </DropdownMenuItem>
                            )}
                            {!order.is_void && (
                              <DropdownMenuItem
                                onClick={() => handleMarkAsVoid(order.id)}
                                className="text-red-600"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Mark as Void
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {orders.last_page > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t">
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
