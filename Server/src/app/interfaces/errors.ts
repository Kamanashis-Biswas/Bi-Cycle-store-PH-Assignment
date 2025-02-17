export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  error: TErrorSources;
};

export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  phone?: string;
  address?: string;
  city?: string;
  createdAt: Date;
  updatedAt: Date;
};
