import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Search, Filter, Calendar, User } from 'lucide-react';
import universityLogo from '@/assets/SVIET.png'; // Your PNG logo
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
  const [events, setEvents] = useState(initialMockEvents); // Stateful events

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const handleRegister = (eventId: string) => {
    if (registeredEvents.includes(eventId)) return; // Prevent double registration

    // Add to registered events
    setRegisteredEvents(prev => [...prev, eventId]);

    // Update participants count
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
                      src={user?.profileImage || ''}
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

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Welcome back, {user?.name.split(' ')[0]}!
          </h2>
          <p className="text-muted-foreground">
            Discover and register for exciting events happening at your university.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-university-navy">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-university-gold" />
                Available Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{upcomingEventsCount}</div>
              <p className="text-sm text-muted-foreground">Events you can join</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-university-gold">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-university-navy" />
                My Registrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-university-gold">{registeredEventsCount}</div>
              <p className="text-sm text-muted-foreground">Events registered</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Student Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="font-medium">{user?.year}</div>
                <div className="text-sm text-muted-foreground">{user?.department}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Find Events
            </CardTitle>
            <CardDescription>
              Search and filter events based on your interests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search events by title, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-primary">
              {searchTerm || categoryFilter !== 'all' ? 'Search Results' : 'Upcoming Events'}
            </h3>
            <Badge variant="secondary" className="text-sm">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
            </Badge>
          </div>

          {filteredEvents.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No events found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || categoryFilter !== 'all' 
                    ? 'Try adjusting your search criteria' 
                    : 'Check back later for new events'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  isRegistered={registeredEvents.includes(event.id)}
                  onRegister={handleRegister}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
