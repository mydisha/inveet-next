import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiGet, apiPost } from '@/lib/api';
import { Check, Tag, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CouponInputProps {
  packageId: number;
  orderAmount: number;
  onCouponApplied: (coupon: any, discountAmount: number) => void;
  onCouponRemoved: () => void;
  appliedCoupon?: any;
  disabled?: boolean;
}

export default function CouponInput({
  packageId,
  orderAmount,
  onCouponApplied,
  onCouponRemoved,
  appliedCoupon,
  disabled = false
}: CouponInputProps) {
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState<any[]>([]);
  const [showAvailableCoupons, setShowAvailableCoupons] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    setLoading(true);
    try {
      const response = await apiPost('/api/coupons/validate', {
        code: couponCode.trim(),
        user_id: window.auth?.user?.id,
        package_id: packageId,
        order_amount: orderAmount
      });

      if (response.success) {
        onCouponApplied(response.data.coupon, response.data.discount_amount);
        setCouponCode('');
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to validate coupon');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    onCouponRemoved();
    setCouponCode('');
    toast.success('Coupon removed');
  };

  const loadAvailableCoupons = async () => {
    try {
      const response = await apiGet(`/api/coupons/available?user_id=${window.auth?.user?.id}&package_id=${packageId}&order_amount=${orderAmount}`);
      if (response.success) {
        setAvailableCoupons(response.data);
        setShowAvailableCoupons(true);
      }
    } catch (error) {
      toast.error('Failed to load available coupons');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (appliedCoupon) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-full">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <div className="font-medium text-green-900">
                Coupon Applied: {appliedCoupon.code}
              </div>
              <div className="text-sm text-green-700">
                {appliedCoupon.name} - {appliedCoupon.formatted_value} off
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveCoupon}
            disabled={disabled}
            className="text-green-600 hover:text-green-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="coupon-code">Coupon Code</Label>
        <div className="flex gap-2">
          <Input
            id="coupon-code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            disabled={disabled || loading}
            className="flex-1"
          />
          <Button
            onClick={handleApplyCoupon}
            disabled={disabled || loading || !couponCode.trim()}
            className="px-6"
          >
            {loading ? 'Applying...' : 'Apply'}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={loadAvailableCoupons}
          disabled={disabled}
          className="flex items-center gap-2"
        >
          <Tag className="h-4 w-4" />
          View Available Coupons
        </Button>
      </div>

      {showAvailableCoupons && availableCoupons.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Available Coupons:</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {availableCoupons.map((coupon) => (
              <div
                key={coupon.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setCouponCode(coupon.code);
                  setShowAvailableCoupons(false);
                }}
              >
                <div>
                  <div className="font-medium text-sm">{coupon.code}</div>
                  <div className="text-xs text-gray-600">{coupon.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-sm text-green-600">
                    -{formatCurrency(coupon.discount_amount)}
                  </div>
                  <div className="text-xs text-gray-600">
                    {coupon.formatted_value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAvailableCoupons && availableCoupons.length === 0 && (
        <div className="text-center py-4 text-gray-500 text-sm">
          No available coupons for this package
        </div>
      )}
    </div>
  );
}
