import DashboardLayout from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/ui/page-header';
import { Head } from '@inertiajs/react';
import { BookOpen, Calendar, Download, Filter, Heart, MessageCircle, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Comment {
  id: number;
  name: string;
  comment: string;
  is_attend: boolean | null;
  guest_count: number | null;
  is_approved: boolean;
  created_at: string;
}

interface GuestbookProps {
  wedding: {
    id: number;
    slug: string;
    user: {
      name: string;
    };
  };
  comments: Comment[];
  stats: {
    total: number;
    attending: number;
    not_attending: number;
    uncertain: number;
  };
}

export default function Guestbook({ wedding, comments, stats }: GuestbookProps) {
  const [filter, setFilter] = useState<'all' | 'attending' | 'not_attending' | 'uncertain'>('all');
  const [filteredComments, setFilteredComments] = useState<Comment[]>(comments);

  useEffect(() => {
    let filtered = comments;

    switch (filter) {
      case 'attending':
        filtered = comments.filter(comment => comment.is_attend === true);
        break;
      case 'not_attending':
        filtered = comments.filter(comment => comment.is_attend === false);
        break;
      case 'uncertain':
        filtered = comments.filter(comment => comment.is_attend === null);
        break;
      default:
        filtered = comments;
    }

    setFilteredComments(filtered);
  }, [filter, comments]);

  const getAttendanceBadge = (isAttend: boolean | null, guestCount: number | null) => {
    if (isAttend === true) {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
          AKAN HADIR ({guestCount || 1} Orang)
        </Badge>
      );
    } else if (isAttend === false) {
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-800 border-gray-200">
          TIDAK HADIR ({guestCount || 1} Orang)
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
          BELUM PASTI ({guestCount || 1} Orang)
        </Badge>
      );
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return '— 1 hari yang lalu';
    } else if (diffDays < 30) {
      return `— ${diffDays} hari yang lalu`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `— ${months} bulan yang lalu`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `— ${years} tahun yang lalu`;
    }
  };

  const exportToExcel = () => {
    // TODO: Implement Excel export functionality

  };

  return (
    <DashboardLayout>
      <Head title="Buku Tamu" />

      <div className="space-y-6">
        <PageHeader
          icon={BookOpen}
          title="Buku Tamu"
          description="Komentar dan doa dari tamu undangan"
        >
          <Button onClick={exportToExcel} className="bg-green-600 hover:bg-green-700">
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </PageHeader>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tamu</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">/ ∞</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hadir</CardTitle>
              <Heart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.attending}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.attending / stats.total) * 100) : 0}% dari total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tidak Hadir</CardTitle>
              <Calendar className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{stats.not_attending}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.not_attending / stats.total) * 100) : 0}% dari total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Belum Pasti</CardTitle>
              <MessageCircle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.uncertain}</div>
              <p className="text-xs text-muted-foreground">
                {stats.total > 0 ? Math.round((stats.uncertain / stats.total) * 100) : 0}% dari total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filter:</span>
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              Semua ({comments.length})
            </Button>
            <Button
              variant={filter === 'attending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('attending')}
              className={filter === 'attending' ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              Hadir ({stats.attending})
            </Button>
            <Button
              variant={filter === 'not_attending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('not_attending')}
              className={filter === 'not_attending' ? 'bg-gray-600 hover:bg-gray-700' : ''}
            >
              Tidak Hadir ({stats.not_attending})
            </Button>
            <Button
              variant={filter === 'uncertain' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('uncertain')}
              className={filter === 'uncertain' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
            >
              Belum Pasti ({stats.uncertain})
            </Button>
          </div>
        </div>

        {/* Comments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredComments.map((comment) => (
            <Card key={comment.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-primary">
                      {getInitials(comment.name)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base font-medium truncate">
                      {comment.name}
                    </CardTitle>
                    <div className="mt-1">
                      {getAttendanceBadge(comment.is_attend, comment.guest_count)}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="text-sm text-foreground/80 leading-relaxed">
                  {comment.comment}
                </CardDescription>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-muted-foreground">
                    {formatDate(comment.created_at)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredComments.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {filter === 'all' ? 'Belum ada komentar' : `Tidak ada komentar dengan filter "${filter}"`}
              </h3>
              <p className="text-muted-foreground">
                {filter === 'all'
                  ? 'Komentar dari tamu akan muncul di sini setelah mereka memberikan ucapan.'
                  : 'Coba ubah filter untuk melihat komentar lainnya.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
