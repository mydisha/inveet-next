import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Package {
  id: number;
  name: string;
  price: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface CouponFormData {
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  minimum_amount: number;
  maximum_discount: number;
  usage_limit: number;
  user_limit: number;
  starts_at: string;
  expires_at: string;
  is_active: boolean;
  applicable_packages: number[];
  applicable_users: number[];
}

interface CouponFormProps {
  coupon?: {
    id: number;
    code: string;
    name: string;
    description?: string;
    type: 'percentage' | 'fixed';
    value: number;
    minimum_amount?: number;
    maximum_discount?: number;
    usage_limit?: number;
    user_limit?: number;
    starts_at?: string;
    expires_at?: string;
    is_active: boolean;
    applicable_packages?: number[];
    applicable_users?: number[];
  };
  packages: Package[];
  users: User[];
}

export default function CouponForm({ coupon, packages, users }: CouponFormProps) {
  const isEdit = !!coupon;
  const title = isEdit ? 'Edit Coupon' : 'Create Coupon';

  const { data, setData, post, put, processing, errors, reset } = useForm<CouponFormData>({
    code: coupon?.code || '',
    name: coupon?.name || '',
    description: coupon?.description || '',
    type: coupon?.type || 'percentage',
    value: coupon?.value || 0,
    minimum_amount: coupon?.minimum_amount || 0,
    maximum_discount: coupon?.maximum_discount || 0,
    usage_limit: coupon?.usage_limit || 0,
    user_limit: coupon?.user_limit || 0,
    starts_at: coupon?.starts_at ? coupon.starts_at.split('T')[0] : '',
    expires_at: coupon?.expires_at ? coupon.expires_at.split('T')[0] : '',
    is_active: coupon?.is_active ?? true,
    applicable_packages: coupon?.applicable_packages || [],
    applicable_users: coupon?.applicable_users || [],
  });

  const [selectedPackages, setSelectedPackages] = useState<number[]>(data.applicable_packages);
  const [selectedUsers, setSelectedUsers] = useState<number[]>(data.applicable_users);

  useEffect(() => {
    setSelectedPackages(data.applicable_packages);
    setSelectedUsers(data.applicable_users);
  }, [data.applicable_packages, data.applicable_users]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      ...data,
      applicable_packages: selectedPackages,
      applicable_users: selectedUsers,
    };

    if (isEdit) {
      put(`/backoffice/coupons/${coupon.id}`, {
        onSuccess: () => {
          toast.success('Coupon updated successfully');
        },
        onError: () => {
          toast.error('Failed to update coupon');
        },
      });
    } else {
      post('/backoffice/coupons', {
        onSuccess: () => {
          toast.success('Coupon created successfully');
        },
        onError: () => {
          toast.error('Failed to create coupon');
        },
      });
    }
  };

  const handlePackageToggle = (packageId: number) => {
    const newSelection = selectedPackages.includes(packageId)
      ? selectedPackages.filter(id => id !== packageId)
      : [...selectedPackages, packageId];
    setSelectedPackages(newSelection);
    setData('applicable_packages', newSelection);
  };

  const handleUserToggle = (userId: number) => {
    const newSelection = selectedUsers.includes(userId)
      ? selectedUsers.filter(id => id !== userId)
      : [...selectedUsers, userId];
    setSelectedUsers(newSelection);
    setData('applicable_users', newSelection);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <BackofficeLayout>
      <Head title={title} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/backoffice/coupons">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Coupons
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground">
              {isEdit ? 'Update coupon details' : 'Create a new discount coupon'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Coupon Code *</Label>
                  <Input
                    id="code"
                    value={data.code}
                    onChange={(e) => setData('code', e.target.value.toUpperCase())}
                    placeholder="e.g., WELCOME10"
                    className={errors.code ? 'border-destructive' : ''}
                  />
                  {errors.code && <p className="text-sm text-destructive">{errors.code}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="e.g., Welcome Discount"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Optional description for this coupon"
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_active"
                    checked={data.is_active}
                    onCheckedChange={(checked) => setData('is_active', !!checked)}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </CardContent>
            </Card>

            {/* Discount Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Discount Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Discount Type *</Label>
                  <Select
                    value={data.type}
                    onValueChange={(value: 'percentage' | 'fixed') => setData('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="value">
                    {data.type === 'percentage' ? 'Percentage (%)' : 'Amount (IDR)'} *
                  </Label>
                  <Input
                    id="value"
                    type="number"
                    value={data.value}
                    onChange={(e) => setData('value', parseInt(e.target.value) || 0)}
                    placeholder={data.type === 'percentage' ? '10' : '50000'}
                    min="1"
                    max={data.type === 'percentage' ? '100' : undefined}
                    className={errors.value ? 'border-destructive' : ''}
                  />
                  {errors.value && <p className="text-sm text-destructive">{errors.value}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minimum_amount">Minimum Order Amount (IDR)</Label>
                  <Input
                    id="minimum_amount"
                    type="number"
                    value={data.minimum_amount}
                    onChange={(e) => setData('minimum_amount', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    min="0"
                  />
                </div>

                {data.type === 'percentage' && (
                  <div className="space-y-2">
                    <Label htmlFor="maximum_discount">Maximum Discount (IDR)</Label>
                    <Input
                      id="maximum_discount"
                      type="number"
                      value={data.maximum_discount}
                      onChange={(e) => setData('maximum_discount', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Usage Limits */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Limits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="usage_limit">Total Usage Limit</Label>
                  <Input
                    id="usage_limit"
                    type="number"
                    value={data.usage_limit}
                    onChange={(e) => setData('usage_limit', parseInt(e.target.value) || 0)}
                    placeholder="0 = unlimited"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user_limit">Per User Limit</Label>
                  <Input
                    id="user_limit"
                    type="number"
                    value={data.user_limit}
                    onChange={(e) => setData('user_limit', parseInt(e.target.value) || 0)}
                    placeholder="0 = unlimited"
                    min="0"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Validity Period */}
            <Card>
              <CardHeader>
                <CardTitle>Validity Period</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="starts_at">Start Date</Label>
                  <Input
                    id="starts_at"
                    type="date"
                    value={data.starts_at}
                    onChange={(e) => setData('starts_at', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expires_at">Expiry Date</Label>
                  <Input
                    id="expires_at"
                    type="date"
                    value={data.expires_at}
                    onChange={(e) => setData('expires_at', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Applicable Packages */}
          <Card>
            <CardHeader>
              <CardTitle>Applicable Packages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Select packages this coupon can be applied to. Leave empty to apply to all packages.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`package-${pkg.id}`}
                        checked={selectedPackages.includes(pkg.id)}
                        onCheckedChange={() => handlePackageToggle(pkg.id)}
                      />
                      <Label htmlFor={`package-${pkg.id}`} className="flex-1">
                        <div className="font-medium">{pkg.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatCurrency(pkg.price)}
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applicable Users */}
          <Card>
            <CardHeader>
              <CardTitle>Applicable Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Select users this coupon can be used by. Leave empty to allow all users.
                  {users.length >= 1000 && (
                    <span className="block text-orange-600 mt-1">
                      Showing the 1000 most recent users. Use the search to find specific users.
                    </span>
                  )}
                </p>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`user-${user.id}`}
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => handleUserToggle(user.id)}
                      />
                      <Label htmlFor={`user-${user.id}`} className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </Label>
                    </div>
                  ))}
                </div>
                {users.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No users found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Link href="/backoffice/coupons">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={processing}>
              <Save className="h-4 w-4 mr-2" />
              {isEdit ? 'Update Coupon' : 'Create Coupon'}
            </Button>
          </div>
        </form>
      </div>
    </BackofficeLayout>
  );
}
