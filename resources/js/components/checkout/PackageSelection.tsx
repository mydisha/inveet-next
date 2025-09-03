import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, Star } from 'lucide-react';

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

interface PackageSelectionProps {
  packages: Package[];
  selectedPackageId?: number;
  onPackageSelect: (packageId: number) => void;
  className?: string;
}

export default function PackageSelection({
  packages,
  selectedPackageId,
  onPackageSelect,
  className
}: PackageSelectionProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPackageFeatures = (packageName: string) => {
    const baseFeatures = [
      'Unlimited invitations',
      'Custom themes',
      'RSVP management',
      '24/7 support'
    ];

    // Add premium features for higher-tier packages
    if (packageName.toLowerCase().includes('premium') || packageName.toLowerCase().includes('luxury')) {
      return [
        ...baseFeatures,
        'Premium themes',
        'Custom domain',
        'Analytics dashboard',
        'Priority support'
      ];
    }

    if (packageName.toLowerCase().includes('luxury')) {
      return [
        ...baseFeatures,
        'Premium themes',
        'Custom domain',
        'Analytics dashboard',
        'Priority support',
        'White-label options',
        'API access',
        'Dedicated manager'
      ];
    }

    return baseFeatures;
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Package</h2>
        <p className="text-gray-600">Select the perfect wedding package for your special day</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className={cn(
              "relative cursor-pointer transition-all duration-200 hover:shadow-lg",
              selectedPackageId === pkg.id
                ? 'ring-2 ring-rose-500 bg-rose-50/50 shadow-lg'
                : 'hover:shadow-md'
            )}
            onClick={() => onPackageSelect(pkg.id)}
          >
            {pkg.is_recommended && (
              <div className="absolute -top-3 left-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center z-10">
                <Star className="w-3 h-3 mr-1" />
                Recommended
              </div>
            )}

            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl text-gray-900 mb-2">{pkg.name}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {pkg.description}
                  </CardDescription>
                </div>
              </div>

              <div className="mt-4 text-right">
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
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {getPackageFeatures(pkg.name).map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {selectedPackageId === pkg.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center text-rose-600 font-medium">
                    <Check className="w-4 h-4 mr-2" />
                    Selected
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
