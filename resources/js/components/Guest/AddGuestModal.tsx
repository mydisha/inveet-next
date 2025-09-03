import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface AddGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (guest: { name: string; isVip: boolean; sessionTime: string }) => void;
}

export default function AddGuestModal({ isOpen, onClose, onSave }: AddGuestModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    isVip: false,
    sessionTime: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(formData);
      setFormData({ name: '', isVip: false, sessionTime: '' });
      onClose();
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Tamu Baru</DialogTitle>
          <DialogDescription>
            Masukkan informasi tamu yang akan diundang ke pernikahan Anda.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Tamu</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Masukkan nama tamu"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sessionTime">Waktu Sesi</Label>
            <Input
              id="sessionTime"
              value={formData.sessionTime}
              onChange={(e) => handleInputChange('sessionTime', e.target.value)}
              placeholder="Contoh: 10:00-12:00"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isVip"
              checked={formData.isVip}
              onChange={(e) => handleInputChange('isVip', e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="isVip">Tamu VIP</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
