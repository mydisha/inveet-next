import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/ui/page-header';
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Head } from '@inertiajs/react';
import {
    Download,
    Eye,
    GripVertical,
    Image as ImageIcon,
    Plus,
    Trash2,
    Upload
} from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface User {
  id: number;
  name: string;
  email: string;
  hasWedding: boolean;
}

interface GalleryImage {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: number;
  uploadedAt: Date;
}

interface GalleryProps {
  user: User | null;
}

// Sortable Image Item Component
function SortableImageItem({
  image,
  onDelete,
  onPreview
}: {
  image: GalleryImage;
  onDelete: (id: string) => void;
  onPreview: (image: GalleryImage) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-10 p-1 bg-white/80 rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4 text-gray-500" />
      </div>

      {/* Image Preview */}
      <div className="aspect-square relative">
        <img
          src={image.preview}
          alt={image.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            onClick={() => onPreview(image)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="h-8 w-8 p-0"
            onClick={() => onDelete(image.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Image Info */}
      <div className="p-3">
        <h4 className="font-medium text-sm text-gray-900 truncate mb-1">
          {image.name}
        </h4>
        <p className="text-xs text-gray-500">
          {formatFileSize(image.size)}
        </p>
        <p className="text-xs text-gray-400">
          {image.uploadedAt.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

// Image Preview Modal Component
function ImagePreviewModal({
  image,
  isOpen,
  onClose
}: {
  image: GalleryImage | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white"
          onClick={onClose}
        >
          ×
        </Button>
        <img
          src={image.preview}
          alt={image.name}
          className="w-full h-full object-contain rounded-lg"
        />
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 rounded-lg p-4">
          <h3 className="font-medium text-lg mb-2">{image.name}</h3>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Size: {(image.size / 1024 / 1024).toFixed(2)} MB</span>
            <span>Uploaded: {image.uploadedAt.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Gallery({ user }: GalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [previewImage, setPreviewImage] = useState<GalleryImage | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages: GalleryImage[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      uploadedAt: new Date(),
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true
  });

  const handleDeleteImage = (id: string) => {
    setImages((prevImages) => {
      const imageToDelete = prevImages.find(img => img.id === id);
      if (imageToDelete) {
        URL.revokeObjectURL(imageToDelete.preview);
      }
      return prevImages.filter(img => img.id !== id);
    });
  };

  const handlePreviewImage = (image: GalleryImage) => {
    setPreviewImage(image);
    setIsPreviewOpen(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDownloadAll = () => {
    images.forEach((image) => {
      const link = document.createElement('a');
      link.href = image.preview;
      link.download = image.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <DashboardLayout user={user} currentPath="/gallery">
      <Head title="Gallery" />

      <div className="space-y-6">
        {/* Page Header */}
        <PageHeader
          icon={ImageIcon}
          title="Gallery"
          description="Upload and manage your wedding photos"
        >
          {images.length > 0 && (
            <Button onClick={handleDownloadAll} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
          )}
        </PageHeader>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Images
            </CardTitle>
            <CardDescription>
              Drag and drop your images here, or click to browse files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-300 hover:border-primary hover:bg-gray-50'
                }
              `}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <ImageIcon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {isDragActive ? 'Drop images here' : 'Upload your images'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Supports JPG, PNG, GIF, and WebP formats
                  </p>
                </div>
                <Button variant="outline" className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Browse Files
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images Grid */}
        {images.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Images ({images.length})</CardTitle>
              <CardDescription>
                Drag and drop to reorder your images
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={images.map(img => img.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {images.map((image) => (
                      <SortableImageItem
                        key={image.id}
                        image={image}
                        onDelete={handleDeleteImage}
                        onPreview={handlePreviewImage}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {images.length === 0 && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No images uploaded yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Start by uploading your first image using the upload area above
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        image={previewImage}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </DashboardLayout>
  );
}
