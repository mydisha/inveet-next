import { DashboardPage } from '@/components/dashboard';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Check, CreditCard, Heart, Star, Tag, Zap } from 'lucide-react';
import { useState } from 'react';

interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  is_recommended: boolean;
  is_active: boolean;
  discounted_price?: number;
  discount_amount?: number;
}

interface CheckoutProps {
  packages: Package[];
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export default function Checkout({ packages, user }: CheckoutProps) {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handlePackageSelect = (packageId: number) => {
    const pkg = packages.find(p => p.id === packageId);
    if (pkg) {
      setSelectedPackage(pkg);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim() || !selectedPackage) return;

    setIsApplyingCoupon(true);

    // Simulate coupon validation (replace with actual API call)
    setTimeout(() => {
      // Mock coupon validation
      if (couponCode.toLowerCase() === 'welcome10') {
        setCouponDiscount(selectedPackage.price * 0.1); // 10% discount
      } else if (couponCode.toLowerCase() === 'save20') {
        setCouponDiscount(selectedPackage.price * 0.2); // 20% discount
      } else {
        setCouponDiscount(0);
        alert('Invalid coupon code');
      }
      setIsApplyingCoupon(false);
    }, 1000);
  };

  const calculateTotal = () => {
    if (!selectedPackage) return 0;
    const packagePrice = selectedPackage.discounted_price || selectedPackage.price;
    return Math.max(0, packagePrice - couponDiscount);
  };

  const handleCheckout = () => {
    if (selectedPackage) {
      // Redirect to payment method selection page with coupon data
      const params = new URLSearchParams({
        package_id: selectedPackage.id.toString(),
        ...(couponCode && { coupon: couponCode }),
        ...(couponDiscount > 0 && { coupon_discount: couponDiscount.toString() })
      });
      window.location.href = `/checkout/payment?${params.toString()}`;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <DashboardPage
      title="Checkout"
      user={user}
      currentPath="/checkout"
    >
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/packages" className="flex items-center text-gray-600 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Packages
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Order</h1>
        <p className="text-gray-600">Select your package and proceed to secure payment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Package Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Package Selection */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose Your Package</h2>
            <div className="space-y-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                    selectedPackage?.id === pkg.id
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                  onClick={() => handlePackageSelect(pkg.id)}
                >
                  {/* Package Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                      {pkg.is_recommended && (
                        <div className="flex items-center bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          <Star className="w-3 h-3 mr-1" />
                          Recommended
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4">{pkg.description}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>Unlimited invitations</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>Custom themes</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>RSVP management</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>24/7 support</span>
                    </div>
                  </div>

                  {/* Pricing Section - Bottom of card */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">Total Price</div>
                      <div className="text-right">
                        {pkg.discount > 0 && (
                          <div className="text-sm text-green-600 font-medium mb-1">
                            {pkg.discount}% OFF
                          </div>
                        )}
                        <div className="text-2xl font-bold text-gray-900">
                          {formatPrice(pkg.discounted_price || pkg.price)}
                        </div>
                        {pkg.discount > 0 && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatPrice(pkg.price)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {selectedPackage?.id === pkg.id && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center justify-center text-primary font-medium bg-white px-3 py-1 rounded-full shadow-sm">
                        <Check className="w-4 h-4 mr-1" />
                        Selected
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Coupon Section */}
          {selectedPackage && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-primary" />
                Promo Code
              </h3>
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={!couponCode.trim() || isApplyingCoupon}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isApplyingCoupon ? 'Applying...' : 'Apply'}
                </button>
              </div>
              {couponDiscount > 0 && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center text-green-700">
                    <Check className="w-4 h-4 mr-2" />
                    <span className="font-medium">Coupon applied! You saved {formatPrice(couponDiscount)}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-rose-500" />
              Order Summary
            </h3>

            {selectedPackage ? (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{selectedPackage.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{selectedPackage.description}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatPrice(selectedPackage.price)}</span>
                  </div>
                  {selectedPackage.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Package Discount ({selectedPackage.discount}%)</span>
                      <span className="text-green-600">-{formatPrice(selectedPackage.discount_amount || 0)}</span>
                    </div>
                  )}
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Coupon Discount</span>
                      <span className="text-green-600">-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span>Included</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-primary text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Payment
                </button>

                {/* Security Features */}
                <div className="pt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span>SSL Encrypted & Secure</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span>30-day money back guarantee</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Zap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Select a package to see order details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardPage>
  );
}
