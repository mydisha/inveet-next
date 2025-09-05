import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Head, Link } from '@inertiajs/react';
import {
  ArrowLeft,
  Calendar,
  Edit,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface CouponUsage {
  id: number;
  discount_amount: number;
  order_amount: number;
  used_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  order: {
    id: number;
    invoice_number: string;
    total_price: number;
  };
}

interface CouponDetailProps {
  user: {
    id: number;
    name: string;
    email: string;
    roles: Array<{
      id: number;
      name: string;
    }>;
  } | null;
  coupon: {
    id: number;
    code: string;
    name: string;
    description?: string;
    type: 'percentage' | 'fixed';
    value: number;
    minimum_amount?: number;
    maximum_discount?: number;
    usage_limit?: number;
    usage_count: number;
    user_limit?: number;
    starts_at?: string;
    expires_at?: string;
    is_active: boolean;
    status_text: string;
    formatted_value: string;
    applicable_packages?: number[];
    applicable_users?: number[];
    created_at: string;
    updated_at: string;
  };
  usage_stats: {
    total_usages: number;
    total_discount: number;
    unique_users: number;
    usage_limit?: number;
    remaining_uses?: number;
  };
  usages: {
    data: CouponUsage[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export default function CouponDetail({ user, coupon, usage_stats, usages }: CouponDetailProps) {

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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = () => {
    if (!coupon.is_active) {
      return <Badge variant="secondary">Inactive</Badge>;
    }

    if (coupon.status_text === 'Expired') {
      return <Badge variant="destructive">Expired</Badge>;
    }

    if (coupon.status_text === 'Usage Limit Reached') {
      return <Badge variant="outline">Limit Reached</Badge>;
    }

    return <Badge variant="default">Active</Badge>;
  };

  return (
    <BackofficeLayout user={user}>
      <Head title={`Coupon: ${coupon.code}`} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/backoffice/coupons">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Coupons
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-foreground">{coupon.code}</h1>
              {getStatusBadge()}
            </div>
            <p className="text-muted-foreground">{coupon.name}</p>
          </div>
          <Link href={`/backoffice/coupons/${coupon.id}/edit`}>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Coupon
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coupon Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Coupon Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Code</label>
                    <p className="font-mono text-lg">{coupon.code}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Type</label>
                    <p className="capitalize">{coupon.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Value</label>
                    <p className="text-lg font-semibold">{coupon.formatted_value}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div>{getStatusBadge()}</div>
                  </div>
                </div>

                {coupon.description && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                    <p className="mt-1">{coupon.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {coupon.minimum_amount && coupon.minimum_amount > 0 && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Minimum Amount</label>
                      <p>{formatCurrency(coupon.minimum_amount)}</p>
                    </div>
                  )}
                  {coupon.maximum_discount && coupon.maximum_discount > 0 && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Maximum Discount</label>
                      <p>{formatCurrency(coupon.maximum_discount)}</p>
                    </div>
                  )}
                  {coupon.usage_limit && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Usage Limit</label>
                      <p>{coupon.usage_limit}</p>
                    </div>
                  )}
                  {coupon.user_limit && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Per User Limit</label>
                      <p>{coupon.user_limit}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {coupon.starts_at && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Start Date</label>
                      <p className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(coupon.starts_at)}
                      </p>
                    </div>
                  )}
                  {coupon.expires_at && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Expiry Date</label>
                      <p className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(coupon.expires_at)}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Usage History */}
            <Card>
              <CardHeader>
                <CardTitle>Usage History</CardTitle>
              </CardHeader>
              <CardContent>
                {usages.data && usages.data.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Order</TableHead>
                          <TableHead>Discount</TableHead>
                          <TableHead>Used At</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {usages.data.map((usage) => (
                          <TableRow key={usage.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{usage.user.name}</div>
                                <div className="text-sm text-muted-foreground">{usage.user.email}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-mono text-sm">{usage.order.invoice_number}</div>
                                <div className="text-sm text-muted-foreground">
                                  {formatCurrency(usage.order.total_price)}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium text-green-600">
                              -{formatCurrency(usage.discount_amount)}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {formatDate(usage.used_at)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No usage history found
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Uses</span>
                  <span className="text-2xl font-bold">{usage_stats.total_usages}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Unique Users</span>
                  <span className="text-2xl font-bold">{usage_stats.unique_users}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Discount</span>
                  <span className="text-2xl font-bold text-green-600">
                    {formatCurrency(usage_stats.total_discount)}
                  </span>
                </div>
                {usage_stats.usage_limit && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Remaining Uses</span>
                    <span className="text-2xl font-bold">
                      {usage_stats.remaining_uses || 0}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href={`/backoffice/coupons/${coupon.id}/edit`} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Coupon
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  {coupon.is_active ? (
                    <>
                      <ToggleLeft className="h-4 w-4 mr-2" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <ToggleRight className="h-4 w-4 mr-2" />
                      Activate
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BackofficeLayout>
  );
}
