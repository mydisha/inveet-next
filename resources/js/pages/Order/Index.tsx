import DashboardLayout from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Head } from '@inertiajs/react';
import { ArrowUpDown, Calendar, ChevronLeft, ChevronRight, DollarSign, Eye, FileText, Filter, Package, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

interface OrdersProps {
  user: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
  orders: any[];
}

export default function Orders({ user, orders }: OrdersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getStatusBadge = (status: string, isPaid: boolean, isVoid: boolean) => {
    if (isVoid) {
      return <Badge variant="destructive">Void</Badge>;
    }
    if (isPaid) {
      return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">Paid</Badge>;
    }
    return <Badge variant="secondary">Pending</Badge>;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      const matchesSearch = searchTerm === '' ||
        order.id.toString().includes(searchTerm) ||
        order.package?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.wedding?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'paid' && order.is_paid) ||
        (statusFilter === 'pending' && !order.is_paid && !order.is_void) ||
        (statusFilter === 'void' && order.is_void);

      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'created_at') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (sortField === 'total_price') {
        aValue = aValue || 0;
        bValue = bValue || 0;
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [orders, searchTerm, statusFilter, sortField, sortDirection]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedOrders, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortableHeader = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <TableHead
      className="cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <ArrowUpDown className="w-4 h-4" />
      </div>
    </TableHead>
  );

  return (
    <>
      <Head title="Orders" />

      <DashboardLayout user={user} currentPath="/orders">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Orders
          </h1>
          <p className="text-muted-foreground">
            View your order history and status
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search orders by ID, package, wedding, or invoice..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="void">Void</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {paginatedOrders.length} of {filteredAndSortedOrders.length} orders
            </span>
            {filteredAndSortedOrders.length !== orders.length && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHeader field="id">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Order ID</span>
                  </div>
                </SortableHeader>
                <TableHead>
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4" />
                    <span>Package & Wedding</span>
                  </div>
                </TableHead>
                <SortableHeader field="total_price">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Amount</span>
                  </div>
                </SortableHeader>
                <TableHead>Status</TableHead>
                <SortableHeader field="created_at">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Date</span>
                  </div>
                </SortableHeader>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <FileText className="w-8 h-8 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        {filteredAndSortedOrders.length === 0 && orders.length > 0
                          ? 'No orders match your filters'
                          : 'No orders found'
                        }
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      #{order.id}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{order.package?.name || 'N/A'}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.wedding?.title || 'N/A'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(order.total_price || 0)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(order.status, order.is_paid, order.is_void)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {paginatedOrders.length === 0 ? (
            <div className="rounded-md border bg-card p-8 text-center">
              <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {filteredAndSortedOrders.length === 0 && orders.length > 0
                  ? 'No orders match your filters'
                  : 'No orders found'
                }
              </p>
            </div>
          ) : (
            paginatedOrders.map((order) => (
              <div key={order.id} className="rounded-md border bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Order #{order.id}</span>
                  </div>
                  {getStatusBadge(order.status, order.is_paid, order.is_void)}
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Package</div>
                    <div className="font-medium">{order.package?.name || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Wedding</div>
                    <div className="font-medium">{order.wedding?.title || 'N/A'}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">Amount</div>
                      <div className="font-medium">{formatCurrency(order.total_price || 0)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Date</div>
                      <div className="text-sm">
                        {new Date(order.created_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
}
