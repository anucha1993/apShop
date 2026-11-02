export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  /** ISO date */
  createdAt: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export type ProfileUpdate = Pick<User, "name" | "phone">;
