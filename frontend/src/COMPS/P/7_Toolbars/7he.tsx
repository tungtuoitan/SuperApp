export const CheckStringIsNullOrEmpty = (value: string | null | undefined): boolean => {
    return !(value === "" || value?.length === 0 || value === null || value === undefined);
  };