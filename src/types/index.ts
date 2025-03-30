
export interface Event {
  id: string;
  name: string;
  date: string;
  address: string;
  description: string;
  price: number;
  image: string;
  tag: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
