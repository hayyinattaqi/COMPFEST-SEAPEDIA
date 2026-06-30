export type Role = "admin" | "seller" | "buyer" | "driver";

export interface User {
  id: string;
  username: string;
  email: string;
  // NOTE: Level 1 only — plaintext is NEVER stored in a real backend.
  // Here we simulate password hashing client-side for demo purposes only.
  passwordHash: string;
  roles: Role[]; // a non-admin username may own multiple roles at once
}

export interface SessionState {
  userId: string | null;
  activeRole: Role | null;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  storeId: string;
  storeName: string;
  image: string; // emoji/placeholder for dummy data
}

export interface AppReview {
  id: string;
  reviewerName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string; // ISO timestamp
}
