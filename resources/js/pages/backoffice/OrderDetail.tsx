import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    CreditCard,
    Mail,
    Package,
    User,
    XCircle
} from 'lucide-react';

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

interface OrderDetailProps {
  user: {
    id: number;
    name: string;
    email: string;
    roles: Array<{
      id: number;
      name: string;
    }>;
  } | null;
  order: Order;
}

export default function OrderDetailPage({ user, order }: OrderDetailProps) {
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

  const handleMarkAsPaid = async () => {
    if (confirm('Are you sure you want to mark this order as paid?')) {
      try {
        const response = await fetch(`/api/backoffice/orders/${order.id}/mark-paid`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          credentials: 'include',
          body: JSON.stringify({
            external_transaction_id: `MANUAL_${Date.now()}`,
          }),
        });

        if (response.ok) {
          router.reload();
        } else {
          console.error('Failed to mark order as paid:', response.status);
        }
      } catch (error) {
        console.error('Failed to mark order as paid:', error);
      }
    }
  };

  const handleMarkAsVoid = async () => {
    if (confirm('Are you sure you want to mark this order as void? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/backoffice/orders/${order.id}/mark-void`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          credentials: 'include',
        });

        if (response.ok) {
          router.reload();
        } else {
          console.error('Failed to mark order as void:', response.status);
        }
      } catch (error) {
        console.error('Failed to mark order as void:', error);
      }
    }
  };

  return (
    <>
      <Head title={`Order ${order.invoice_number} - Backoffice`} />
      <BackofficeLayout user={user} title="Order Details" description="View order details and manage order status">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/backoffice/orders">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Orders
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Order {order.invoice_number}</h1>
                <p className="text-gray-500">Order ID: {order.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusBadge(order)}
              {getPaymentTypeBadge(order.payment_type)}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Name</label>
                      <p className="text-lg">{order.user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-lg flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {order.user.email}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Order Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Package</label>
                      <p className="text-lg">{order.package.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Wedding</label>
                      {order.wedding ? (
                        <div>
                          <p className="text-lg">{order.wedding.theme.name}</p>
                          <p className="text-sm text-gray-500">/{order.wedding.slug}</p>
                        </div>
                      ) : (
                        <p className="text-gray-400">No wedding associated</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Payment Type</label>
                      <div className="mt-1">
                        {getPaymentTypeBadge(order.payment_type)}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <div className="mt-1">
                        {getStatusBadge(order)}
                      </div>
                    </div>
                  </div>
                  {order.paid_at && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Paid At</label>
                      <p className="text-lg">{new Date(order.paid_at).toLocaleString()}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Package Price</span>
                    <span>{formatCurrency(order.total_price)}</span>
                  </div>
                  {order.unique_price > 0 && (
                    <div className="flex justify-between">
                      <span>Unique Price</span>
                      <span>{formatCurrency(order.unique_price)}</span>
                    </div>
                  )}
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatCurrency(order.total_price + order.unique_price)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {!order.is_paid && !order.is_void && (
                    <Button
                      onClick={handleMarkAsPaid}
                      className="w-full"
                      variant="default"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Paid
                    </Button>
                  )}
                  {!order.is_void && (
                    <Button
                      onClick={handleMarkAsVoid}
                      className="w-full"
                      variant="destructive"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Mark as Void
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Order Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Created</label>
                    <p className="text-sm">{new Date(order.created_at).toLocaleString()}</p>
                  </div>
                  {order.paid_at && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Paid</label>
                      <p className="text-sm">{new Date(order.paid_at).toLocaleString()}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </BackofficeLayout>
    </>
  );
}
