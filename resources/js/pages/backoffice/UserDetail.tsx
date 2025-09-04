import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Mail, Phone, ShoppingCart, User, Users } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  phone_number?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  roles: Array<{ name: string }>;
  weddings_count: number;
  orders_count: number;
  weddings?: Array<{
    id: number;
    title: string;
    slug: string;
    is_published: boolean;
    created_at: string;
  }>;
  orders?: Array<{
    id: number;
    invoice_number: string;
    status: string;
    total_amount: number;
    created_at: string;
  }>;
  feedback?: Array<{
    id: number;
    rating: number;
    comment: string;
    created_at: string;
  }>;
}

interface UserDetailProps {
  user: User;
  currentUser: {
    id: number;
    name: string;
    email: string;
    roles: Array<{
      id: number;
      name: string;
    }>;
  } | null;
}

export default function UserDetailPage({ user, currentUser }: UserDetailProps) {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super-admin':
        return 'bg-red-100 text-red-800';
      case 'admin':
        return 'bg-orange-100 text-orange-800';
      case 'moderator':
        return 'bg-blue-100 text-blue-800';
      case 'customer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <Head title={`User Details - ${user.name}`} />
      <BackofficeLayout user={currentUser} title="User Details" description={`Viewing details for ${user.name}`}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/backoffice/users">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Users
                </Button>
              </Link>
            </div>
            <div className="flex space-x-2">
              <Link href={`/backoffice/users/${user.id}/edit`}>
                <Button>Edit User</Button>
              </Link>
            </div>
          </div>

          {/* User Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{user.name}</CardTitle>
                    <p className="text-muted-foreground">ID: {user.id}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge className={getStatusBadgeColor(user.is_active)}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  {user.phone_number && (
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{user.phone_number}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Joined</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Roles</p>
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role) => (
                        <Badge
                          key={role.name}
                          className={getRoleBadgeColor(role.name)}
                        >
                          {role.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{user.weddings_count}</p>
                    <p className="text-sm text-muted-foreground">Weddings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{user.orders_count}</p>
                    <p className="text-sm text-muted-foreground">Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {user.feedback?.length || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Feedbacks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Weddings */}
          {user.weddings && user.weddings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Weddings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.weddings.slice(0, 5).map((wedding) => (
                    <div key={wedding.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{wedding.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Created: {new Date(wedding.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={wedding.is_published ? 'default' : 'secondary'}>
                          {wedding.is_published ? 'Published' : 'Draft'}
                        </Badge>
                        <Link href={`/wedding/${wedding.slug}`}>
                          <Button variant="outline" size="sm">View</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Orders */}
          {user.orders && user.orders.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">#{order.invoice_number}</p>
                        <p className="text-sm text-muted-foreground">
                          ${order.total_amount} • {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline">{order.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </BackofficeLayout>
    </>
  );
}
