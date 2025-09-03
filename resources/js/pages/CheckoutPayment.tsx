import { DashboardCard, DashboardGrid, DashboardPage, DashboardSection } from '@/components/dashboard';
import { Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Building2,
    CheckCircle,
    CreditCard,
    QrCode,
    Shield,
    Smartphone,
    Wallet
} from 'lucide-react';
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

interface CheckoutPaymentProps {
  package: Package;
  coupon?: string;
  coupon_discount?: number;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: any;
  group: string;
  description?: string;
  isPopular?: boolean;
}

const paymentMethods: PaymentMethod[] = [
  // Bank Transfer Group
  {
    id: 'bjb',
    name: 'Bank BJB',
    icon: Building2,
    group: 'Bank Transfer',
    description: 'Transfer via Bank BJB',
  },
  {
    id: 'permata',
    name: 'Bank Permata',
    icon: Building2,
    group: 'Bank Transfer',
    description: 'Transfer via Bank Permata',
  },
  {
    id: 'mandiri',
    name: 'Bank Mandiri',
    icon: Building2,
    group: 'Bank Transfer',
    description: 'Transfer via Bank Mandiri',
  },

  // E-wallet Group
  {
    id: 'gopay',
    name: 'GoPay',
    icon: Smartphone,
    group: 'E-wallet',
    description: 'Pay with GoPay wallet',
    isPopular: true,
  },
  {
    id: 'shopeepay',
    name: 'ShopeePay',
    icon: Wallet,
    group: 'E-wallet',
    description: 'Pay with ShopeePay',
  },
  {
    id: 'ovo',
    name: 'OVO',
    icon: Smartphone,
    group: 'E-wallet',
    description: 'Pay with OVO wallet',
  },

  // QR Code Group
  {
    id: 'qris',
    name: 'QRIS',
    icon: QrCode,
    group: 'QR Code',
    description: 'Scan QR code to pay',
    isPopular: true,
  },
];

export default function CheckoutPayment({ package: selectedPackage, coupon, coupon_discount = 0, user }: CheckoutPaymentProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { post, processing } = useForm({
    package_id: selectedPackage.id,
    payment_method: '',
  });

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };

  const handlePayment = () => {
    if (!selectedPaymentMethod) return;

    setIsProcessing(true);

    post('/api/orders', {
      data: {
        package_id: selectedPackage.id,
        payment_method: selectedPaymentMethod.id,
      },
      onSuccess: (page) => {
        // Redirect to success page with order details
        window.location.href = `/checkout/success?order_id=${page.props.order?.id}`;
      },
      onError: () => {
        setIsProcessing(false);
      }
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateTotal = () => {
    const packagePrice = selectedPackage.discounted_price || selectedPackage.price;
    return Math.max(0, packagePrice - coupon_discount);
  };

  const groupedPaymentMethods = paymentMethods.reduce((acc, method) => {
    if (!acc[method.group]) {
      acc[method.group] = [];
    }
    acc[method.group].push(method);
    return acc;
  }, {} as Record<string, PaymentMethod[]>);

  return (
    <DashboardPage
      title="Select Payment Method"
      user={user}
      currentPath="/checkout/payment"
    >
      {/* Header Section */}
      <DashboardSection
        title="Choose Payment Method 💳"
        description="Select your preferred payment method to complete your purchase"
        className="mb-8"
      >
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/checkout" className="flex items-center text-gray-600 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Package Selection
          </Link>
        </div>
      </DashboardSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2">
          <DashboardSection title="Available Payment Methods">
            <div className="space-y-8">
              {Object.entries(groupedPaymentMethods).map(([groupName, methods]) => (
                <div key={groupName}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    {groupName === 'Bank Transfer' && <Building2 className="w-5 h-5 mr-2 text-blue-600" />}
                    {groupName === 'E-wallet' && <Smartphone className="w-5 h-5 mr-2 text-green-600" />}
                    {groupName === 'QR Code' && <QrCode className="w-5 h-5 mr-2 text-purple-600" />}
                    {groupName}
                  </h3>

                  <DashboardGrid columns={1} gap="md">
                    {methods.map((method) => (
                      <DashboardCard
                        key={method.id}
                        title={method.name}
                        description={method.description}
                        icon={method.icon}
                        iconVariant={groupName === 'Bank Transfer' ? 'info' : groupName === 'E-wallet' ? 'success' : 'accent'}
                        className={`cursor-pointer transition-all duration-300 ${
                          selectedPaymentMethod?.id === method.id
                            ? 'ring-2 ring-primary shadow-2xl scale-105'
                            : 'hover:scale-102'
                        }`}
                        onClick={() => handlePaymentMethodSelect(method)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              {method.isPopular && (
                                <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                  Popular
                                </div>
                              )}
                              <div className="flex items-center text-sm text-gray-600">
                                <Shield className="w-4 h-4 text-green-500 mr-1" />
                                <span>Secure</span>
                              </div>
                            </div>
                          </div>

                          {selectedPaymentMethod?.id === method.id && (
                            <div className="flex items-center text-primary font-medium">
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Selected
                            </div>
                          )}
                        </div>
                      </DashboardCard>
                    ))}
                  </DashboardGrid>
                </div>
              ))}
            </div>
          </DashboardSection>

          {/* Payment Button */}
          {selectedPaymentMethod && (
            <div className="mt-8">
              <DashboardCard
                title="Ready to Pay?"
                description={`You've selected ${selectedPaymentMethod.name}. Click below to complete your payment.`}
                icon={CreditCard}
                iconVariant="success"
                buttonText={processing || isProcessing ? "Processing..." : "Complete Payment"}
                buttonVariant="default"
                onClick={handlePayment}
                loading={processing || isProcessing}
                disabled={processing || isProcessing}
              />
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">{selectedPackage.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{selectedPackage.description}</p>
              </div>

              <div className="space-y-2">
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
                {coupon && coupon_discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Coupon Discount ({coupon})</span>
                    <span className="text-green-600">-{formatPrice(coupon_discount)}</span>
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

              {selectedPaymentMethod && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Payment Method</span>
                    <span className="text-sm font-medium text-gray-900">{selectedPaymentMethod.name}</span>
                  </div>
                </div>
              )}

              <div className="pt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-500 mr-2" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>30-day money back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardPage>
  );
}
