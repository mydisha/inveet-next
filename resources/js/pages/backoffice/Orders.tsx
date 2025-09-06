import BackButton from '@/components/backoffice/BackButton';
import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import PageHeader from '@/components/backoffice/PageHeader';
import { Badge } from '@/components/ui/badge';
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
import { useEffect, useState } from 'react';

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
  user?: {
    id: number;
    name: string;
    email: string;
  };
  package?: {
    id: number;
    name: string;
  };
  wedding: {
    id: number;
    slug: string;
    theme?: {
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
    payment_type?: string;
    date_from?: string;
    date_to?: string;
  };
}

export default function OrdersPage({ user, orders, filters }: OrdersPageProps) {
  const [search, setSearch] = useState(filters.search || '');
  const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
  const [paymentTypeFilter, setPaymentTypeFilter] = useState(filters.payment_type || 'all');
  const [dateFrom, setDateFrom] = useState(filters.date_from || '');
  const [dateTo, setDateTo] = useState(filters.date_to || '');
  const [paymentTypes, setPaymentTypes] = useState<string[]>([]);
  const [loadingPaymentTypes, setLoadingPaymentTypes] = useState(false);

  // Fetch payment types on component mount
  useEffect(() => {
    const fetchPaymentTypes = async () => {
      try {
        setLoadingPaymentTypes(true);
        const response = await fetch('/api/backoffice/orders/payment-types', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          },
          credentials: 'same-origin',
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setPaymentTypes(data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching payment types:', error);
      } finally {
        setLoadingPaymentTypes(false);
      }
    };

    fetchPaymentTypes();
  }, []);

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
      return <Badge variant="error">Void</Badge>;
    }

    if (order.is_paid) {
      return <Badge variant="success">Paid</Badge>;
    }

    return <Badge variant="warning">Pending</Badge>;
  };

  const getPaymentTypeBadge = (paymentType: string) => {
    return <Badge variant="gray">{paymentType}</Badge>;
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (statusFilter && statusFilter !== 'all') params.append('status', statusFilter);
    if (paymentTypeFilter && paymentTypeFilter !== 'all') params.append('payment_type', paymentTypeFilter);
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
    if (paymentTypeFilter && paymentTypeFilter !== 'all') params.append('payment_type', paymentTypeFilter);
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <BackButton href="/backoffice" label="Back to Dashboard" />
          </div>
          <PageHeader
            title="Orders"
            subtitle="Manage and track all orders"
          />
        </div>

        {/* Simple Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
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
                <Select
                  value={paymentTypeFilter}
                  onValueChange={(value) => setPaymentTypeFilter(value)}
                  disabled={loadingPaymentTypes}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder={loadingPaymentTypes ? "Loading..." : "All payment types"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payment Types</SelectItem>
                    {paymentTypes.map((paymentType) => (
                      <SelectItem key={paymentType} value={paymentType}>
                        {paymentType}
                      </SelectItem>
                    ))}
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
                          <div className="font-medium">{order.user?.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{order.user?.email || 'N/A'}</div>
                        </div>
                      </TableCell>
                      <TableCell>{order.package?.name || 'N/A'}</TableCell>
                      <TableCell>
                        {order.wedding ? (
                          <div>
                            <div className="font-medium">
                              {order.wedding.slug || 'Untitled Wedding'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.wedding.theme?.name || 'N/A'}
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
