import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function FlashMessageHandler() {
  const { flash, errors } = usePage().props as any;

  useEffect(() => {
    // Handle success messages
    if (flash?.success) {
      toast.success(flash.success);
    }

    // Handle error messages
    if (flash?.error) {
      toast.error(flash.error);
    }

    // Handle general messages
    if (flash?.message) {
      toast.info(flash.message);
    }

    // Handle warning messages
    if (flash?.warning) {
      toast.warning(flash.warning);
    }

    // Handle info messages
    if (flash?.info) {
      toast.info(flash.info);
    }

    // Handle validation errors
    if (errors && Object.keys(errors).length > 0) {
      // Show a general error message for validation failures
      toast.error('Please check the form for errors and try again.');
    }
  }, [flash, errors]);

  return null; // This component doesn't render anything
}
