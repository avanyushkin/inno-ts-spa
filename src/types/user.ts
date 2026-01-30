export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  phone?: string;
  address?: { city?: string };
  token?: string;
};

export type LoginResponse = {
  login: User & { token: string };
};

export type LoginVariables = {
  username: string;
  password: string;
};