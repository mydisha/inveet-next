import BackButton from '@/components/backoffice/BackButton';
import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Head, useForm } from '@inertiajs/react';
import { Save, User } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone_number?: string;
  is_active: boolean;
  roles: Array<{ name: string }>;
}

interface UserEditProps {
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

const availableRoles = [
  { value: 'super-admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'moderator', label: 'Moderator' },
  { value: 'customer', label: 'Customer' },
];

export default function UserEditPage({ user, currentUser }: UserEditProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    user.roles.map(role => role.name)
  );

  const { data, setData, put, processing, errors } = useForm({
    name: user.name,
    email: user.email,
    phone_number: user.phone_number || '',
    is_active: user.is_active,
    roles: selectedRoles,
  });

  const handleRoleChange = (roleValue: string, checked: boolean) => {
    if (checked) {
      setSelectedRoles([...selectedRoles, roleValue]);
    } else {
      setSelectedRoles(selectedRoles.filter(role => role !== roleValue));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/backoffice/api/users/${user.id}`, {
      onSuccess: () => {
        // Redirect to user detail page after successful update
        window.location.href = `/backoffice/users/${user.id}`;
      },
    });
  };

  return (
    <>
      <Head title={`Edit User - ${user.name}`} />
      <BackofficeLayout user={currentUser} title="Edit User" description={`Editing ${user.name}`}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BackButton href={`/backoffice/users/${user.id}`} label="Back to User Details" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    value={data.phone_number}
                    onChange={(e) => setData('phone_number', e.target.value)}
                    className={errors.phone_number ? 'border-red-500' : ''}
                  />
                  {errors.phone_number && (
                    <p className="text-sm text-red-500">{errors.phone_number}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Status and Roles */}
            <Card>
              <CardHeader>
                <CardTitle>Status and Roles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="is_active">Active Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Whether this user can log in and use the system
                    </p>
                  </div>
                  <Switch
                    id="is_active"
                    checked={data.is_active}
                    onCheckedChange={(checked) => setData('is_active', checked)}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Roles</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Select the roles for this user
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {availableRoles.map((role) => (
                        <div key={role.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={role.value}
                            checked={selectedRoles.includes(role.value)}
                            onCheckedChange={(checked) =>
                              handleRoleChange(role.value, checked as boolean)
                            }
                          />
                          <Label htmlFor={role.value} className="text-sm">
                            {role.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.roles && (
                      <p className="text-sm text-red-500">{errors.roles}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4">
              <Link href={`/backoffice/users/${user.id}`}>
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={processing}>
                <Save className="h-4 w-4 mr-2" />
                {processing ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </BackofficeLayout>
    </>
  );
}
