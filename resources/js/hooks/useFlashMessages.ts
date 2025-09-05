import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface FlashMessages {
  success?: string;
  error?: string;
  message?: string;
  warning?: string;
  info?: string;
}

export function useFlashMessages() {
  const { flash } = usePage().props as any;
  const [processedMessages, setProcessedMessages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const currentMessages = Object.values(flash || {}).filter(Boolean) as string[];
    const newMessages = currentMessages.filter(msg => !processedMessages.has(msg));

    newMessages.forEach((message, index) => {
      // Add a small delay to prevent multiple toasts from appearing at once
      setTimeout(() => {
        if (flash?.success === message) {
          toast.success(message);
        } else if (flash?.error === message) {
          toast.error(message);
        } else if (flash?.warning === message) {
          toast.warning(message);
        } else if (flash?.info === message) {
          toast.info(message);
        } else if (flash?.message === message) {
          toast.info(message);
        }

        setProcessedMessages(prev => new Set([...prev, message]));
      }, index * 100);
    });
  }, [flash, processedMessages]);

  return {
    flash: flash as FlashMessages,
    hasMessages: Object.values(flash || {}).some(Boolean),
  };
}
