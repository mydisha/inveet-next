import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { Heart, Plus } from 'lucide-react';

interface MyWeddingsProps {
  user: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
  weddings: any[];
}

export default function MyWeddings({ user, weddings }: MyWeddingsProps) {
  return (
    <>
      <Head title="My Weddings" />

      <DashboardLayout user={user} currentPath="/my-weddings">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Weddings
          </h1>
          <p className="text-muted-foreground">
            Manage your wedding invitations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {weddings.map((wedding) => (
            <Card key={wedding.id} className="card-elegant hover:shadow-2xl transition-all duration-300 cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="icon-container icon-gradient-1 group-hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{wedding.title}</CardTitle>
                    <CardDescription>{wedding.package.name}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <span className="text-sm font-medium text-green-600">{wedding.status}</span>
                  </div>
                  <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-all duration-300">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button className="btn-hero">
            <Plus className="w-4 h-4 mr-2" />
            Create New Wedding
          </Button>
        </div>
      </DashboardLayout>
    </>
  );
}
