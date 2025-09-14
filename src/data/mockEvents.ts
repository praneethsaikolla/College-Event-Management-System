import { Event } from '../types/Event';

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
    imageUrl: '/assets/events/eday.jpg',
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
    imageUrl: '/assets/events/dasara.jpg',
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
    imageUrl: '/assets/events/deepavali.jpg',
    requirements: ['Open to all students', 'Bring your ID card'],
    tags: ['Festival', 'Deepavali', 'Cultural', 'Food']
  },
  {
    id: '4',
    title: 'College Day 2025',
    description: 'A grand celebration of our college achievements with awards, student performances, and alumni interactions.',
    date: '2025-12-10',
    time: '10:00 AM - 05:00 PM',
    location: 'College Auditorium',
    category: 'Institutional',
    maxParticipants: 400,
    currentParticipants: 180,
    organizer: 'College Administration',
    imageUrl: '/assets/events/collegeday.jpg',
    requirements: ['Student/Staff ID required', 'Formal attire preferred'],
    tags: ['College', 'Celebration', 'Awards', 'Performances']
  },
  {
    id: '5',
    title: 'Christmas & New Year Bash 2025',
    description: 'Ring in the holiday season with our festive bash including music, dance, gift exchange, and fun games.',
    date: '2025-12-24',
    time: '06:00 PM - 11:00 PM',
    location: 'Student Recreation Hall',
    category: 'Festival',
    maxParticipants: 350,
    currentParticipants: 150,
    organizer: 'Event Committee',
    imageUrl: '/assets/events/christmas.jpg',
    requirements: ['RSVP required', 'Festive attire encouraged'],
    tags: ['Christmas', 'New Year', 'Festival', 'Celebration']
  }
];
