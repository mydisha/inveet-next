import { DashboardPage, DashboardSection } from '@/components/dashboard';
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
import React, { useState } from 'react';

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

    // Create order with payment method
    post('/api/orders', {
      data: {
        package_id: selectedPackage.id,
        payment_method: selectedPaymentMethod.id,
        payment_type: selectedPaymentMethod.id,
        total_price: calculateTotal(),
        status: 'pending',
        expired_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      },
      onSuccess: (page) => {
        const order = page.props.order || page.props.data;
        if (order) {
          // Generate payment URL based on selected payment method
          const paymentUrl = generatePaymentUrl(order, selectedPaymentMethod);

          // Redirect to payment gateway
          window.location.href = paymentUrl;
        } else {
          setIsProcessing(false);
          alert('Failed to create order. Please try again.');
        }
      },
      onError: (errors) => {
        setIsProcessing(false);

        alert('Failed to create order. Please try again.');
      }
    });
  };

  const generatePaymentUrl = (order: any, paymentMethod: PaymentMethod) => {
    // This would typically integrate with a real payment gateway
    // For now, we'll simulate different payment gateway URLs

    const baseUrl = window.location.origin;
    const orderId = order.id;
    const amount = calculateTotal();

    switch (paymentMethod.id) {
      case 'gopay':
        return `https://gopay.co.id/payment?order_id=${orderId}&amount=${amount}&return_url=${encodeURIComponent(`${baseUrl}/checkout/success`)}`;

      case 'shopeepay':
        return `https://shopeepay.co.id/payment?order_id=${orderId}&amount=${amount}&return_url=${encodeURIComponent(`${baseUrl}/checkout/success`)}`;

      case 'ovo':
        return `https://ovo.id/payment?order_id=${orderId}&amount=${amount}&return_url=${encodeURIComponent(`${baseUrl}/checkout/success`)}`;

      case 'qris':
        return `${baseUrl}/payment/qris?order_id=${orderId}&amount=${amount}`;

      case 'bjb':
      case 'permata':
      case 'mandiri':
        return `${baseUrl}/payment/bank-transfer?order_id=${orderId}&amount=${amount}&bank=${paymentMethod.id}`;

      default:
        return `${baseUrl}/checkout/success?order_id=${orderId}`;
    }
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Payment Method</h2>

            {/* Grouped Payment Methods */}
            <div className="space-y-6">
              {Object.entries(groupedPaymentMethods).map(([groupName, methods]) => (
                <div key={groupName}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    {groupName === 'Bank Transfer' && <Building2 className="w-5 h-5 mr-2 text-blue-600" />}
                    {groupName === 'E-wallet' && <Smartphone className="w-5 h-5 mr-2 text-green-600" />}
                    {groupName === 'QR Code' && <QrCode className="w-5 h-5 mr-2 text-purple-600" />}
                    {groupName}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {methods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <div
                          key={method.id}
                          className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                            selectedPaymentMethod?.id === method.id
                              ? 'border-primary bg-primary/5 shadow-md'
                              : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                          }`}
                          onClick={() => handlePaymentMethodSelect(method)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${
                              method.group === 'Bank Transfer' ? 'bg-blue-100 text-blue-600' :
                              method.group === 'E-wallet' ? 'bg-green-100 text-green-600' :
                              'bg-purple-100 text-purple-600'
                            }`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-medium text-gray-900 truncate">{method.name}</h3>
                                {method.isPopular && (
                                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-medium">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 truncate">{method.description}</p>
                            </div>
                            {selectedPaymentMethod?.id === method.id && (
                              <div className="flex-shrink-0">
                                <CheckCircle className="w-5 h-5 text-primary" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Proceed Button */}
            {selectedPaymentMethod && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handlePayment}
                  disabled={processing || isProcessing}
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {processing || isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Proceed to Payment
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-500 text-center mt-2">
                  You will be redirected to {selectedPaymentMethod.name} payment page
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

            {/* Package Info */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-900">{selectedPackage.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{selectedPackage.description}</p>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 mb-4">
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
              {coupon && coupon_discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Coupon ({coupon})</span>
                  <span className="text-green-600">-{formatPrice(coupon_discount)}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </div>
            </div>

            {/* Selected Payment Method */}
            {selectedPaymentMethod && (
              <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-primary/10 rounded">
                    {React.createElement(selectedPaymentMethod.icon, { className: "w-4 h-4 text-primary" })}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{selectedPaymentMethod.name}</p>
                    <p className="text-xs text-gray-600">Selected payment method</p>
                  </div>
                </div>
              </div>
            )}

            {/* Security Badges */}
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center">
                <Shield className="w-3 h-3 mr-1" />
                <span>Secure</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                <span>Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardPage>
  );
}
