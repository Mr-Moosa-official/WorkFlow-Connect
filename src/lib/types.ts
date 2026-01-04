export interface User {
  id: string;
  name: string;
  avatar: string;
  title: string;
  skills: string[];
  rating: number;
  reviews: number;
  isClient: boolean;
  about: string;
  portfolio: { id: string; title: string; image: string; description: string }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  budget: number;
  deadline: string;
  clientId: string;
  image: string;
  bids: Bid[];
}

export interface Bid {
  id: string;
  freelancerId: string;
  amount: number;
  proposal: string;
  timestamp: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  userId: string;
  messages: Message[];
}
