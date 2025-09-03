import DashboardPage from '@/components/dashboard/DashboardPage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Heart, Users } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  hasWedding: boolean;
}

interface CoupleInfoTestProps {
  user: User | null;
  wedding: {
    id: number;
    couple_name_1: string;
    couple_name_2: string;
    slug: string;
  };
}

export default function CoupleInfoTest({ user, wedding }: CoupleInfoTestProps) {
  return (
    <DashboardPage
      title={`${wedding.couple_name_1} & ${wedding.couple_name_2} - Informasi Mempelai`}
      user={user}
      currentPath={`/wedding/${wedding.id}/couple`}
    >
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Link href={`/wedding/${wedding.id}`}>
              <Button variant="outline" size="sm" className="mb-4 flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Informasi Mempelai
            </h1>
            <p className="text-xl text-muted-foreground">
              Kelola informasi pasangan dan keluarga untuk undangan pernikahan
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl">Informasi Pasangan</h2>
                  <p className="text-muted-foreground">Lengkapi informasi mempelai pria dan wanita</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {wedding.couple_name_1} & {wedding.couple_name_2}
                </h3>
                <p className="text-muted-foreground">
                  Wedding ID: {wedding.id}
                </p>
                <p className="text-muted-foreground">
                  Slug: {wedding.slug}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPage>
  );
}
