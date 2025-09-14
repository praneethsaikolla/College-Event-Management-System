export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  maxParticipants: number;
  currentParticipants: number;
  organizer: string;
  imageUrl?: string;
  requirements?: string[];
  tags: string[];
}

export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  registeredAt: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}