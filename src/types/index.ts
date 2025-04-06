
export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  address: string;
  description: string;
  price: string;
  image: string;
  tag: string;
  created_at?: string;
  updated_at?: string;
}


export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
