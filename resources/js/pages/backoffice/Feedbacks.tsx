import BackofficeLayout from '@/components/backoffice/BackofficeLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { apiGet } from '@/lib/api';
import { getCsrfToken } from '@/lib/auth';
import { Head } from '@inertiajs/react';
import {
  Eye,
  EyeOff,
  MoreHorizontal,
  Search,
  Star,
  ThumbsUp,
  Trash2
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Feedback {
  id: number;
  score: number;
  content?: string;
  critics?: string;
  is_recommended: boolean;
  show_on_landing: boolean;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface FeedbacksResponse {
  data: {
    data: Feedback[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

interface FeedbacksPageProps {
  user: {
    id: number;
    name: string;
    email: string;
    roles: Array<{
      id: number;
      name: string;
    }>;
  } | null;
}

export default function FeedbacksPage({ user }: FeedbacksPageProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [scoreMin, setScoreMin] = useState('');
  const [scoreMax, setScoreMax] = useState('');
  const [recommendedFilter, setRecommendedFilter] = useState('all');
  const [showOnLandingFilter, setShowOnLandingFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: '15',
        ...(search && { search }),
        ...(scoreMin && { score_min: scoreMin }),
        ...(scoreMax && { score_max: scoreMax }),
        ...(recommendedFilter && recommendedFilter !== 'all' && { is_recommended: recommendedFilter }),
        ...(showOnLandingFilter && showOnLandingFilter !== 'all' && { show_on_landing: showOnLandingFilter }),
        ...(dateFrom && { date_from: dateFrom }),
        ...(dateTo && { date_to: dateTo }),
      });

      const data: FeedbacksResponse = await apiGet(`/backoffice/api/feedbacks?${params}`);

      setFeedbacks(data.data.data);
      setTotalPages(data.data.last_page);
      setTotal(data.data.total);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [currentPage, search, scoreMin, scoreMax, recommendedFilter, showOnLandingFilter, dateFrom, dateTo]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleToggleRecommendation = async (feedbackId: number) => {
    try {
      const csrfToken = getCsrfToken();
      if (!csrfToken) {

        return;
      }

      const response = await fetch(`/backoffice/api/feedbacks/${feedbackId}/toggle-recommendation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
      });

      if (response.ok) {
        fetchFeedbacks(); // Refresh the list
      }
    } catch (error) {

    }
  };

  const handleToggleShowOnLanding = async (feedbackId: number) => {
    try {
      const csrfToken = getCsrfToken();
      if (!csrfToken) {

        return;
      }

      const response = await fetch(`/backoffice/api/feedbacks/${feedbackId}/toggle-show-landing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
      });

      if (response.ok) {
        fetchFeedbacks(); // Refresh the list
      }
    } catch (error) {

    }
  };

  const handleDelete = async (feedbackId: number) => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      try {
        const csrfToken = getCsrfToken();
        if (!csrfToken) {

          return;
        }

        const response = await fetch(`/backoffice/api/feedbacks/${feedbackId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          credentials: 'include',
        });

        if (response.ok) {
          fetchFeedbacks(); // Refresh the list
        }
      } catch (error) {

      }
    }
  };

  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < score ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 4) return 'bg-green-100 text-green-800';
    if (score >= 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <>
      <Head title="Feedback Management - Backoffice" />
      <BackofficeLayout user={user} title="Feedback Management" description="Manage user feedbacks">
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search feedbacks..."
                      value={search}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min Score"
                    min="1"
                    max="5"
                    value={scoreMin}
                    onChange={(e) => setScoreMin(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max Score"
                    min="1"
                    max="5"
                    value={scoreMax}
                    onChange={(e) => setScoreMax(e.target.value)}
                  />
                </div>
                <Select value={recommendedFilter} onValueChange={setRecommendedFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Recommended" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="true">Recommended</SelectItem>
                    <SelectItem value="false">Not Recommended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={showOnLandingFilter} onValueChange={setShowOnLandingFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Show on Landing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="true">Show on Landing</SelectItem>
                    <SelectItem value="false">Hide from Landing</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    placeholder="From Date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                  <Input
                    type="date"
                    placeholder="To Date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedbacks Table */}
          <Card>
            <CardHeader>
              <CardTitle>Feedbacks ({total})</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead>Critics</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feedbacks.map((feedback) => (
                        <TableRow key={feedback.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{feedback.user.name}</div>
                              <div className="text-sm text-gray-500">{feedback.user.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              {renderStars(feedback.score)}
                              <Badge className={`ml-2 ${getScoreBadgeColor(feedback.score)}`}>
                                {feedback.score}/5
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs">
                              {feedback.content ? (
                                <p className="text-sm truncate">{feedback.content}</p>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs">
                              {feedback.critics ? (
                                <p className="text-sm truncate">{feedback.critics}</p>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {feedback.is_recommended && (
                                <Badge className="bg-green-100 text-green-800">
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  Recommended
                                </Badge>
                              )}
                              {feedback.show_on_landing && (
                                <Badge className="bg-blue-100 text-blue-800">
                                  <Eye className="h-3 w-3 mr-1" />
                                  Show on Landing
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(feedback.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Button variant="ghost" size="sm" className="w-full justify-start">
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleToggleRecommendation(feedback.id)}
                                >
                                  <ThumbsUp className="mr-2 h-4 w-4" />
                                  {feedback.is_recommended ? 'Remove Recommendation' : 'Mark as Recommended'}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleToggleShowOnLanding(feedback.id)}
                                >
                                  {feedback.show_on_landing ? (
                                    <>
                                      <EyeOff className="mr-2 h-4 w-4" />
                                      Hide from Landing
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="mr-2 h-4 w-4" />
                                      Show on Landing
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(feedback.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    Showing {((currentPage - 1) * 15) + 1} to {Math.min(currentPage * 15, total)} of {total} results
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </BackofficeLayout>
    </>
  );
}
