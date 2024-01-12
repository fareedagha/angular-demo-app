export interface Register {
  name: string;
  email: string;
  password: string;
}
export interface Login {
  email: string;
  password: string;
}
export interface Forgotpassword {
  email: string;
}

export interface ErrorDetail {
  message: string;
}

export interface User {
  createdAt: string;
  email: string;
  name: string;
  _id: string;
  token: string;
}
