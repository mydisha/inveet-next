import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check, Heart, Lock, Shield, Zap } from 'lucide-react';

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

interface OrderSummaryProps {
  selectedPackage: Package | null;
  className?: string;
}

export default function OrderSummary({ selectedPackage, className }: OrderSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateTotal = () => {
    if (!selectedPackage) return 0;
    return selectedPackage.discounted_price || selectedPackage.price;
  };

  return (
    <Card className={`sticky top-24 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Heart className="w-5 h-5 mr-2 text-rose-500" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedPackage ? (
          <>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{selectedPackage.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{selectedPackage.description}</p>
                </div>
                <div className="text-right ml-4">
                  {selectedPackage.discount > 0 && (
                    <div className="text-sm text-green-600 font-medium">
                      -{formatPrice(selectedPackage.discount_amount || 0)}
                    </div>
                  )}
                  <div className="font-bold text-gray-900">
                    {formatPrice(selectedPackage.discounted_price || selectedPackage.price)}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(selectedPackage.price)}</span>
              </div>
              {selectedPackage.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount ({selectedPackage.discount}%)</span>
                  <span className="text-green-600">-{formatPrice(selectedPackage.discount_amount || 0)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span>Included</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>
            </div>

            {/* Package Features */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-3">What's Included:</h5>
              <div className="space-y-2">
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
                {selectedPackage.name.toLowerCase().includes('premium') && (
                  <>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>Premium themes</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>Analytics dashboard</span>
                    </div>
                  </>
                )}
                {selectedPackage.name.toLowerCase().includes('luxury') && (
                  <>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>Custom domain</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>White-label options</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>Dedicated manager</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Zap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Select a package to see order details</p>
          </div>
        )}

        {/* Security Features */}
        <div className="pt-4 space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Shield className="w-4 h-4 text-green-500 mr-2" />
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Lock className="w-4 h-4 text-green-500 mr-2" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500 mr-2" />
            <span>30-day money back guarantee</span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">Trusted by thousands of couples</p>
            <div className="flex justify-center space-x-4 text-xs text-gray-400">
              <span>✓ Secure</span>
              <span>✓ Reliable</span>
              <span>✓ 24/7 Support</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
