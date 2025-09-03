import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Lock, Shield } from 'lucide-react';
import { useState } from 'react';

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
  isProcessing?: boolean;
  errors?: Record<string, string>;
  user?: {
    name: string;
    email: string;
  };
}

export interface PaymentFormData {
  payment_method: string;
  card_number: string;
  expiry_date: string;
  cvv: string;
  cardholder_name: string;
  billing_email: string;
  billing_name: string;
  billing_address: string;
  billing_city: string;
  billing_postal_code: string;
  billing_country: string;
}

export default function PaymentForm({
  onSubmit,
  isProcessing = false,
  errors = {},
  user
}: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [formData, setFormData] = useState<PaymentFormData>({
    payment_method: 'credit_card',
    card_number: '',
    expiry_date: '',
    cvv: '',
    cardholder_name: '',
    billing_email: user?.email || '',
    billing_name: user?.name || '',
    billing_address: '',
    billing_city: '',
    billing_postal_code: '',
    billing_country: 'Indonesia',
  });

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      payment_method: paymentMethod
    });
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add slash after 2 digits
    if (digits.length >= 2) {
      return digits.substring(0, 2) + '/' + digits.substring(2, 4);
    }
    return digits;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Payment Information
        </CardTitle>
        <CardDescription>
          Choose your preferred payment method and enter your details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Method Selection */}
          <div>
            <Label htmlFor="payment_method" className="text-base font-medium">
              Payment Method
            </Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="mt-3 space-y-3"
            >
              <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="credit_card" id="credit_card" />
                <Label htmlFor="credit_card" className="flex items-center cursor-pointer">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Credit Card
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                <Label htmlFor="bank_transfer" className="flex items-center cursor-pointer">
                  <Shield className="w-4 h-4 mr-2" />
                  Bank Transfer
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Credit Card Details */}
          {paymentMethod === 'credit_card' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="card_number">Card Number</Label>
                  <Input
                    id="card_number"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={formData.card_number}
                    onChange={(e) => handleInputChange('card_number', formatCardNumber(e.target.value))}
                    className="mt-1"
                    maxLength={19}
                  />
                  {errors.card_number && (
                    <p className="text-sm text-red-600 mt-1">{errors.card_number}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="expiry_date">Expiry Date</Label>
                  <Input
                    id="expiry_date"
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expiry_date}
                    onChange={(e) => handleInputChange('expiry_date', formatExpiryDate(e.target.value))}
                    className="mt-1"
                    maxLength={5}
                  />
                  {errors.expiry_date && (
                    <p className="text-sm text-red-600 mt-1">{errors.expiry_date}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                    className="mt-1"
                    maxLength={4}
                  />
                  {errors.cvv && (
                    <p className="text-sm text-red-600 mt-1">{errors.cvv}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="cardholder_name">Cardholder Name</Label>
                  <Input
                    id="cardholder_name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.cardholder_name}
                    onChange={(e) => handleInputChange('cardholder_name', e.target.value)}
                    className="mt-1"
                  />
                  {errors.cardholder_name && (
                    <p className="text-sm text-red-600 mt-1">{errors.cardholder_name}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bank Transfer Information */}
          {paymentMethod === 'bank_transfer' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Bank Transfer Details</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Bank:</strong> Bank Central Asia (BCA)</p>
                <p><strong>Account Number:</strong> 1234567890</p>
                <p><strong>Account Name:</strong> PT Inveet Wedding</p>
                <p><strong>Transfer Code:</strong> INV-{Date.now().toString().slice(-6)}</p>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                Please include the transfer code in your payment description.
              </p>
            </div>
          )}

          <Separator />

          {/* Billing Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="billing_name">Full Name *</Label>
                <Input
                  id="billing_name"
                  type="text"
                  value={formData.billing_name}
                  onChange={(e) => handleInputChange('billing_name', e.target.value)}
                  className="mt-1"
                  required
                />
                {errors.billing_name && (
                  <p className="text-sm text-red-600 mt-1">{errors.billing_name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="billing_email">Email *</Label>
                <Input
                  id="billing_email"
                  type="email"
                  value={formData.billing_email}
                  onChange={(e) => handleInputChange('billing_email', e.target.value)}
                  className="mt-1"
                  required
                />
                {errors.billing_email && (
                  <p className="text-sm text-red-600 mt-1">{errors.billing_email}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="billing_address">Address *</Label>
                <Input
                  id="billing_address"
                  type="text"
                  value={formData.billing_address}
                  onChange={(e) => handleInputChange('billing_address', e.target.value)}
                  className="mt-1"
                  required
                />
                {errors.billing_address && (
                  <p className="text-sm text-red-600 mt-1">{errors.billing_address}</p>
                )}
              </div>
              <div>
                <Label htmlFor="billing_city">City *</Label>
                <Input
                  id="billing_city"
                  type="text"
                  value={formData.billing_city}
                  onChange={(e) => handleInputChange('billing_city', e.target.value)}
                  className="mt-1"
                  required
                />
                {errors.billing_city && (
                  <p className="text-sm text-red-600 mt-1">{errors.billing_city}</p>
                )}
              </div>
              <div>
                <Label htmlFor="billing_postal_code">Postal Code *</Label>
                <Input
                  id="billing_postal_code"
                  type="text"
                  value={formData.billing_postal_code}
                  onChange={(e) => handleInputChange('billing_postal_code', e.target.value)}
                  className="mt-1"
                  required
                />
                {errors.billing_postal_code && (
                  <p className="text-sm text-red-600 mt-1">{errors.billing_postal_code}</p>
                )}
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">Secure Payment</h4>
                <p className="text-sm text-green-800 mt-1">
                  Your payment information is encrypted and secure. We use industry-standard SSL encryption
                  to protect your data.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-3 text-lg font-medium"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing Payment...
              </div>
            ) : (
              <div className="flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Complete Payment
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
