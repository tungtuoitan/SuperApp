/**
 * useDialog Hook
 * Reusable hook for managing dialog state
 */

import { useState } from 'react';

interface UseDialogReturn<T = any> {
  open: boolean;
  data: T | null;
  openDialog: (data?: T) => void;
  closeDialog: () => void;
  setData: (data: T | null) => void;
}

export const useDialog = <T = any>(initialData: T | null = null): UseDialogReturn<T> => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(initialData);

  const openDialog = (dialogData?: T) => {
    if (dialogData !== undefined) {
      setData(dialogData);
    }
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return {
    open,
    data,
    openDialog,
    closeDialog,
    setData,
  };
};
