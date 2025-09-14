import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, MapPin, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { mockEvents } from '@/data/mockEvents';
import { Event } from '@/types/Event';
import { useToast } from '@/hooks/use-toast';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [event, setEvent] = useState<Event | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const foundEvent = mockEvents.find(e => e.id === id);
    setEvent(foundEvent || null);
  }, [id]);

  const handleRegister = () => {
    if (!event) return;
    setIsRegistered(true);
    toast({
      title: "Registration Successful!",
      description: `You have been registered for ${event.title}`,
    });
  };

  const handleUnregister = () => {
    if (!event) return;
    setIsRegistered(false);
    toast({
      title: "Registration Cancelled",
      description: `You have been unregistered from ${event.title}`,
      variant: "destructive",
    });
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-university-light via-background to-university-light flex items-center justify-center">
        <Card className="text-center max-w-md">
          <CardContent className="pt-6">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Event Not Found</h2>
            <p className="text-muted-foreground mb-4">The event you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const availableSpots = event.maxParticipants - event.currentParticipants;
  const isEventFull = availableSpots <= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-university-light via-background to-university-light">
      <header className="bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-primary">Event Details</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardContent className="p-0">
              {event.imageUrl && (
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <img 
                    src={event.imageUrl} 
                    alt={`${event.title} poster`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">{event.title}</h1>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{event.category}</Badge>
                      {isRegistered && (
                        <Badge variant="default" className="bg-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Registered
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">Organized by {event.organizer}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-university-gold" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-university-gold" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-university-gold" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-university-gold" />
                    <span>{event.currentParticipants}/{event.maxParticipants}</span>
                  </div>
                </div>

                {event.description && (
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold mb-2">About This Event</h3>
                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {event.requirements && event.requirements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Requirements & Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {event.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Registration</CardTitle>
              <CardDescription>
                {isEventFull ? 'This event is currently full' : `${availableSpots} spots available`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Current Participants:</span>
                <Badge variant="outline">{event.currentParticipants}/{event.maxParticipants}</Badge>
              </div>

              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-university-gold h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((event.currentParticipants / event.maxParticipants) * 100, 100)}%` }}
                />
              </div>

              {isRegistered ? (
                <Button onClick={handleUnregister} variant="destructive" className="w-full">
                  Unregister from Event
                </Button>
              ) : (
                <Button onClick={handleRegister} disabled={isEventFull} className="w-full">
                  {isEventFull ? 'Event Full' : 'Register for Event'}
                </Button>
              )}

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Event Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {event.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
