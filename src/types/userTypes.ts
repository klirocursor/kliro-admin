export type GetUserProfileType = {
  id: number;
  email: string;
  phone: string;
  region_id: number;
  name: string;
  role: string;
  category_id: number;
};

export type UpdateContactBodyType = {
  email?: string;
  phone?: string;
};

export type ConfirmUpdateContactBodyType = {
  otp: string;
};

export type ChangePasswordBodyType = {
  old_password: string;
  new_password: string;
};

export type ChangeRegionBodyType = {
  region_id: number;
};

export type AddContactBodyType = {
  email?: string;
  phone?: string;
};

export type ApiStatusResponseType = {
  status: string;
};

export type ApiErrorResponseType = {
  error: string;
};

export type LogoutResponseType = {
  status: string;
};
