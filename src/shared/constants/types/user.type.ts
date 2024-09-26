export type UserStoreType = {
  id: string;
  username: string;
  accessToken: string;
  refreshToken: string;
  avatar: string;
  address: string;
  phoneNumber: string;
  fullName: string
};

export type ProfileUserType = {
  address: string;
  avatar: string;
  email: string;
  fullName: string;
  id: string;
  phoneNumber: string;
  username: string;
};

export type UpdateUserType = {
  id: string
  address: string;
  avatar: string;
  email: string;
  fullName: string;
  phoneNumber: string;
}

export type UpdatePasswordType = {
  id: string;
  currentPassword: string;
  newPassword: string;
}
