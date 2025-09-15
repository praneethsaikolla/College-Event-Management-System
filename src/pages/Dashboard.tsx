import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Search, Filter, Calendar, User } from 'lucide-react';
import universityLogo from '@/assets/SVIET.png';
import { useAuth } from '@/contexts/AuthContext';
import { mockEvents as initialMockEvents } from '@/data/mockEvents';
import EventCard from '@/components/EventCard';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [events, setEvents] = useState(initialMockEvents);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const handleRegister = (eventId: string) => {
    if (registeredEvents.includes(eventId)) return;

    setRegisteredEvents(prev => [...prev, eventId]);

    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, currentParticipants: event.currentParticipants + 1 }
          : event
      )
    );

    toast({
      title: "Registered!",
      description: "You have successfully registered for this event.",
    });
  };

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [events, searchTerm, categoryFilter]);

  const upcomingEventsCount = filteredEvents.length;
  const registeredEventsCount = registeredEvents.length;
  const categories = [...new Set(initialMockEvents.map(event => event.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-university-light via-background to-university-light">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-white/0">
                <img
                  src={universityLogo}
                  alt="University Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">SVIET Events</h1>
                <p className="text-sm text-muted-foreground">College Event Management</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 cursor-pointer">
                <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.profilePicture || '/assets/profiles/default.jpg'} // ✅ static public path
                      alt={`${user?.name} profile picture`}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-university-navy text-white text-sm">
                      {user?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.department}</p>
                  </div>
                </Link>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Rest of Dashboard (stats, search, events grid) */}
      {/* ... keep your existing code unchanged ... */}

    </div>
  );
};

export default Dashboard;
