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
import { getCsrfToken } from '@/lib/auth';
import { Head, Link } from '@inertiajs/react';
import {
    CheckCircle,
    Eye,
    MoreHorizontal,
    Search,
    XCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';

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
}

export default function OrdersPage({ user }: OrdersPageProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentTypeFilter, setPaymentTypeFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: '15',
        ...(search && { search }),
        ...(statusFilter && statusFilter !== 'all' && { status: statusFilter }),
        ...(paymentTypeFilter && paymentTypeFilter !== 'all' && { payment_type: paymentTypeFilter }),
        ...(dateFrom && { date_from: dateFrom }),
        ...(dateTo && { date_to: dateTo }),
      });

      const csrfToken = getCsrfToken();
      if (!csrfToken) {

        return;
      }

      const response = await fetch(`/api/backoffice/orders?${params}`, {
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

          // Redirect to login or refresh the page
          window.location.href = '/login';
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OrdersResponse = await response.json();

      if (data && data.data && data.data.data) {
        setOrders(data.data.data);
        setTotalPages(data.data.last_page);
        setTotal(data.data.total);
      } else {

        setOrders([]);
        setTotalPages(1);
        setTotal(0);
      }
    } catch (error) {

      setOrders([]);
      setTotalPages(1);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, search, statusFilter, paymentTypeFilter, dateFrom, dateTo]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleMarkAsPaid = async (orderId: number) => {
    try {
      const csrfToken = getCsrfToken();
      if (!csrfToken) {

        return;
      }

      const response = await fetch(`/api/backoffice/orders/${orderId}/mark-paid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
        body: JSON.stringify({
          external_transaction_id: `MANUAL_${Date.now()}`,
        }),
      });

      if (response.ok) {
        fetchOrders(); // Refresh the list
      } else {

      }
    } catch (error) {

    }
  };

  const handleMarkAsVoid = async (orderId: number) => {
    try {
      const csrfToken = getCsrfToken();
      if (!csrfToken) {

        return;
      }

      const response = await fetch(`/api/backoffice/orders/${orderId}/mark-void`, {
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
        fetchOrders(); // Refresh the list
      } else {

      }
    } catch (error) {

    }
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search orders..."
                      value={search}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="void">Void</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={paymentTypeFilter} onValueChange={setPaymentTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Payment Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="e_wallet">E-Wallet</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    placeholder="From Date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                  <Input
                    type="date"
                    placeholder="To Date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>Orders ({total})</CardTitle>
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
                      {orders.map((order) => (
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
                                {formatCurrency(order.total_price + order.unique_price)}
                              </div>
                              {order.unique_price > 0 && (
                                <div className="text-sm text-gray-500">
                                  +{formatCurrency(order.unique_price)} unique
                                </div>
                              )}
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
