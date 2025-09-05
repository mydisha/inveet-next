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
    CheckCircle,
    Eye,
    MoreHorizontal,
    Search,
    XCircle
} from 'lucide-react';
import { useState } from 'react';

interface Order {
  id: number;
  invoice_number: string;
  total_price: number;
  unique_price: number;
  payment_type: string | null;
  is_paid: boolean;
  is_void: boolean;
  status: string;
  created_at: string;
  paid_at?: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  package: {
    id: number;
    name: string;
  };
  wedding?: {
    id: number;
    slug: string;
    theme: {
      name: string;
    };
  };
}

interface OrdersResponse {
  data: {
    data: Order[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

interface OrdersPageProps {
  user: {
    id: number;
    name: string;
    email: string;
    roles: Array<{
      id: number;
      name: string;
    }>;
  } | null;
  orders: {
    data: Order[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  filters: {
    search?: string;
    status?: string;
    date_from?: string;
    date_to?: string;
  };
}

export default function OrdersPage({ user, orders, filters: initialFilters }: OrdersPageProps) {
  const [search, setSearch] = useState(initialFilters.search || '');
  const [statusFilter, setStatusFilter] = useState(initialFilters.status || 'all');
  const [dateFrom, setDateFrom] = useState(initialFilters.date_from || '');
  const [dateTo, setDateTo] = useState(initialFilters.date_to || '');

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
    // Trigger search when filter changes
    setTimeout(() => handleSearch(), 100);
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
      }
    });
  };

  const handleMarkAsVoid = (orderId: number) => {
    router.post(`/backoffice/api/orders/${orderId}/mark-void`, {}, {
      onSuccess: () => {
        router.reload();
      },
      onError: () => {
        console.error('Error marking order as void');
      }
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (order: Order) => {
    if (order.is_void) {
      return <Badge className="bg-red-100 text-red-800">Void</Badge>;
    }
    if (order.is_paid) {
      return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
    }
    return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
  };

  const getPaymentTypeBadge = (paymentType: string | null | undefined) => {
    const colors = {
      'bank_transfer': 'bg-blue-100 text-blue-800',
      'credit_card': 'bg-purple-100 text-purple-800',
      'e_wallet': 'bg-green-100 text-green-800',
      'manual': 'bg-gray-100 text-gray-800',
    };

    // Handle null/undefined paymentType
    if (!paymentType) {
      return (
        <Badge className="bg-gray-100 text-gray-800">
          UNKNOWN
        </Badge>
      );
    }

    return (
      <Badge className={colors[paymentType as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {paymentType.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  return (
    <>
      <Head title="Order Management - Backoffice" />
      <BackofficeLayout user={user} title="Order Management" description="Manage customer orders">
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search orders..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="pl-10"
                    />
                    <Button onClick={handleSearch} size="sm" className="ml-2">
                      Search
                    </Button>
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={(value) => handleFilterChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="void">Void</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    placeholder="From Date"
                    value={dateFrom}
                    onChange={(e) => handleFilterChange('date_from', e.target.value)}
                  />
                  <Input
                    type="date"
                    placeholder="To Date"
                    value={dateTo}
                    onChange={(e) => handleFilterChange('date_to', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>Orders ({orders.total})</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.data.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No orders found
                </div>
              ) : (
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
                          <TableCell>
                            <div className="font-mono text-sm">{order.invoice_number}</div>
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
                                <div className="font-medium">{order.wedding.theme.name}</div>
                                <div className="text-sm text-gray-500">/{order.wedding.slug}</div>
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="text-right">
                              <div className="font-medium">
                                {formatCurrency(order.total_price)}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getPaymentTypeBadge(order.payment_type)}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(order)}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="text-sm">{new Date(order.created_at).toLocaleDateString()}</div>
                              {order.paid_at && (
                                <div className="text-xs text-gray-500">
                                  Paid: {new Date(order.paid_at).toLocaleDateString()}
                                </div>
                              )}
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
                                  <Link href={`/backoffice/orders/${order.id}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                {!order.is_paid && !order.is_void && (
                                  <DropdownMenuItem
                                    onClick={() => handleMarkAsPaid(order.id)}
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Mark as Paid
                                  </DropdownMenuItem>
                                )}
                                {!order.is_void && (
                                  <DropdownMenuItem
                                    onClick={() => handleMarkAsVoid(order.id)}
                                    className="text-red-600"
                                  >
                                    <XCircle className="mr-2 h-4 w-4" />
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
              )}

              {/* Pagination */}
              {orders.last_page > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    Showing {((orders.current_page - 1) * orders.per_page) + 1} to {Math.min(orders.current_page * orders.per_page, orders.total)} of {orders.total} results
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={orders.current_page === 1}
                      onClick={() => {
                        const params = new URLSearchParams();
                        if (search) params.append('search', search);
                        if (statusFilter && statusFilter !== 'all') params.append('status', statusFilter);
                        if (dateFrom) params.append('date_from', dateFrom);
                        if (dateTo) params.append('date_to', dateTo);
                        params.append('page', (orders.current_page - 1).toString());
                        router.get(`/backoffice/orders?${params.toString()}`);
                      }}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={orders.current_page === orders.last_page}
                      onClick={() => {
                        const params = new URLSearchParams();
                        if (search) params.append('search', search);
                        if (statusFilter && statusFilter !== 'all') params.append('status', statusFilter);
                        if (dateFrom) params.append('date_from', dateFrom);
                        if (dateTo) params.append('date_to', dateTo);
                        params.append('page', (orders.current_page + 1).toString());
                        router.get(`/backoffice/orders?${params.toString()}`);
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
