import AddGuestModal from '@/components/Guest/AddGuestModal';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import PageHeader from '@/components/ui/page-header';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Head } from '@inertiajs/react';
import {
    Copy,
    Download,
    Plus,
    Search,
    Trash2,
    Users
} from 'lucide-react';
import { useState } from 'react';

interface Guest {
  id: number;
  name: string;
  isVip: boolean;
  sessionTime: string;
}

interface GuestListProps {
  user?: {
    id: number;
    name: string;
    email: string;
    hasWedding: boolean;
  } | null;
  weddingId?: string;
  invitationLink?: string;
}

export default function GuestList({ user, weddingId, invitationLink }: GuestListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([
    { id: 1, name: 'Dias', isVip: true, sessionTime: '-' },
    { id: 2, name: 'Robby', isVip: true, sessionTime: '-' },
    { id: 3, name: 'Om Deden', isVip: true, sessionTime: '-' },
    { id: 4, name: 'Nama daftar tamu', isVip: true, sessionTime: '-' },
    { id: 5, name: 'Zera Putri', isVip: true, sessionTime: '-' },
  ]);

  const defaultInvitationLink = invitationLink || 'https://inveet.id/invitation/429dbdda-35ae-4f9e-863b-f60987ade6c9/dias-azalia/share';

  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(defaultInvitationLink);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleDeleteGuest = (guestId: number) => {
    setGuests(guests.filter(guest => guest.id !== guestId));
  };

  const handleDeleteAllGuests = () => {
    if (confirm('Apakah Anda yakin ingin menghapus semua tamu?')) {
      setGuests([]);
    }
  };

  const handleExportData = () => {
    const csvContent = [
      ['#', 'NAMA TAMU', 'TAMU VIP', 'WAKTU SESI'],
      ...guests.map((guest, index) => [
        index + 1,
        guest.name,
        guest.isVip ? 'Ya' : 'Tidak',
        guest.sessionTime
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'daftar-tamu.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddGuest = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveGuest = (guestData: { name: string; isVip: boolean; sessionTime: string }) => {
    const newGuest: Guest = {
      id: Math.max(...guests.map(g => g.id), 0) + 1,
      name: guestData.name,
      isVip: guestData.isVip,
      sessionTime: guestData.sessionTime || '-'
    };
    setGuests([...guests, newGuest]);
  };

  return (
    <DashboardLayout user={user}>
      <Head title="Daftar Tamu" />

      <div className="space-y-6">
        {/* Header with user info */}
        <PageHeader
          icon={Users}
          title="Daftar Tamu"
          description="Kelola daftar tamu undangan pernikahan Anda"
        />

        {/* Invitation Link Section */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Tambahkan tamu dan bagikan undangan bersama pasangan Kamu melalui link dibawah ini.
            </p>
            <div className="flex items-center space-x-3">
              <Input
                value={defaultInvitationLink}
                readOnly
                className="flex-1 bg-white border-gray-300"
              />
              <Button
                onClick={handleCopyLink}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Copy className="w-4 h-4 mr-2" />
                Salin
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Guest Management Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="destructive"
              onClick={handleDeleteAllGuests}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Hapus Semua Tamu
            </Button>
            <Button
              onClick={handleExportData}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data Tamu
            </Button>
            <Button
              onClick={handleAddGuest}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              + Tambah Tamu
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Input
              placeholder="Cari tamu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
            <Button
              variant="outline"
              className="bg-gray-100 border-gray-300 hover:bg-gray-200"
            >
              <Search className="w-4 h-4 mr-2" />
              Q Cari
            </Button>
          </div>
        </div>

        {/* Guest List Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-700">#</TableHead>
                  <TableHead className="font-semibold text-gray-700">NAMA TAMU</TableHead>
                  <TableHead className="font-semibold text-gray-700">TAMU VIP</TableHead>
                  <TableHead className="font-semibold text-gray-700">WAKTU SESI</TableHead>
                  <TableHead className="font-semibold text-gray-700">AKSI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      {searchQuery ? 'Tidak ada tamu yang sesuai dengan pencarian' : 'Belum ada tamu yang ditambahkan'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredGuests.map((guest, index) => (
                    <TableRow key={guest.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                          {guest.name}
                        </span>
                      </TableCell>
                      <TableCell>
                        {guest.isVip ? (
                          <span className="text-red-600 font-bold">X</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {guest.sessionTime}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteGuest(guest.id)}
                          className="w-8 h-8 bg-red-600 hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add Guest Modal */}
        <AddGuestModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveGuest}
        />
      </div>
    </DashboardLayout>
  );
}
