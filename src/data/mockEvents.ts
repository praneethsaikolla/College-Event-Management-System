import { Event } from '../types/Event';

// ✅ Import images from src/assets
import edayPoster from '@/assets/events/eday.jpg';
import dasaraPoster from '@/assets/events/dasara.jpg';
import deepavaliPoster from '@/assets/events/deepavali.jpg';
import christmasPoster from '@/assets/events/christmas.jpg';
import newyearPoster from '@/assets/events/newyear.jpg'; // <-- add this image

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Engineering Day 2025',
    description: 'Celebrate the achievements of our engineering students with project exhibitions, competitions, and guest lectures from industry experts.',
    date: '2025-09-15',
    time: '10:00 AM - 04:00 PM',
    location: 'Engineering Block Auditorium',
    category: 'Engineering',
    maxParticipants: 300,
    currentParticipants: 120,
    organizer: 'Engineering Department',
    imageUrl: edayPoster,
    requirements: ['Student ID required', 'Pre-registration recommended'],
    tags: ['Engineering', 'Innovation', 'Projects', 'Competitions']
  },
  {
    id: '2',
    title: 'Dasara Celebration 2025',
    description: 'Join us for traditional Dasara festivities including cultural programs, performances, and special rituals honoring the festival of victory.',
    date: '2025-10-02',
    time: '09:00 AM - 06:00 PM',
    location: 'College Cultural Hall',
    category: 'Cultural',
    maxParticipants: 500,
    currentParticipants: 230,
    organizer: 'Cultural Committee',
    imageUrl: dasaraPoster,
    requirements: ['Traditional attire encouraged'],
    tags: ['Festival', 'Cultural', 'Celebration', 'Performance']
  },
  {
    id: '3',
    title: 'Deepavali Fest 2025',
    description: 'Celebrate the festival of lights with our vibrant Deepavali fest, including food stalls, lamp lighting ceremony, and cultural performances.',
    date: '2025-11-01',
    time: '11:00 AM - 07:00 PM',
    location: 'Main College Ground',
    category: 'Festival',
    maxParticipants: 600,
    currentParticipants: 310,
    organizer: 'Student Union',
    imageUrl: deepavaliPoster,
    requirements: ['Open to all students', 'Bring your ID card'],
    tags: ['Festival', 'Deepavali', 'Cultural', 'Food']
  },
  {
    id: '4',
    title: 'Christmas Celebration 2025',
    description: 'Celebrate Christmas with carols, decorations, and festive cheer including music, dance, and gift exchange.',
    date: '2025-12-24',
    time: '06:00 PM - 11:00 PM',
    location: 'Student Recreation Hall',
    category: 'Festival',
    maxParticipants: 350,
    currentParticipants: 150,
    organizer: 'Event Committee',
    imageUrl: christmasPoster,
    requirements: ['RSVP required', 'Festive attire encouraged'],
    tags: ['Christmas', 'Festival', 'Celebration']
  },
  {
    id: '5',
    title: 'New Year 2025',
    description: 'Ring in the New Year with a grand celebration featuring live music, dance, games, and a midnight countdown.',
    date: '2025-12-31',
    time: '08:00 PM - 01:00 AM',
    location: 'College Main Lawn',
    category: 'Festival',
    maxParticipants: 400,
    currentParticipants: 200,
    organizer: 'Event Committee',
    imageUrl: newyearPoster,
    requirements: ['RSVP required', 'Party attire encouraged'],
    tags: ['New Year', 'Festival', 'Celebration']
  }
];
