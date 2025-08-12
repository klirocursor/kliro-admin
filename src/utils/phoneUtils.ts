export const phoneRegex = /^998[0-9]{9}$/;

export const formatPhoneNumber = (phone: string): string | null => {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("998") && digits.length === 12) {
    return `+${digits}`;
  }

  if (digits.startsWith("90") && digits.length === 9) {
    return `+998${digits}`;
  }

  if (digits.length === 9 && !digits.startsWith("998")) {
    return `+998${digits}`;
  }

  if (digits.length === 12 && !phoneRegex.test(digits)) {
    return null;
  }

  return null;
};

export const isValidPhoneNumber = (phone: string): boolean => {
  return phoneRegex.test(phone);
};

export const transformPhoneForAPI = (phone: string): string => {
  const formatted = formatPhoneNumber(phone);
  return formatted || phone;
};
