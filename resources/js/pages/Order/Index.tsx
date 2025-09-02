import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { FileText } from 'lucide-react';

interface OrdersProps {
  user: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
  orders: any[];
}

export default function Orders({ user, orders }: OrdersProps) {
  return (
    <>
      <Head title="Orders" />

      <DashboardLayout user={user} currentPath="/orders">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Orders
          </h1>
          <p className="text-muted-foreground">
            View your order history and status
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="card-elegant hover:shadow-2xl transition-all duration-300 cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="icon-container icon-gradient-5 group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <CardDescription>{order.package.name} - {order.wedding.title}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <span className="text-sm font-medium text-green-600">{order.status}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Date:</span>
                      <span className="text-sm font-medium">{new Date(order.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="group-hover:border-primary group-hover:text-primary transition-all duration-300">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardLayout>
    </>
  );
}
