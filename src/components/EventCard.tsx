import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, User, ArrowRight } from 'lucide-react';
import { Event } from '@/types/Event';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import techSummitPoster from '@/assets/events/tech-summit-poster.jpg';
import culturalFestivalPoster from '@/assets/events/cultural-festival-poster.jpg';
import careerFairPoster from '@/assets/events/career-fair-poster.jpg';

interface EventCardProps {
  event: Event;
  isRegistered?: boolean;
  onRegister?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, isRegistered = false, onRegister }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleRegister = async () => {
    if (!user || !onRegister) return;
    
    setIsRegistering(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onRegister(event.id);
    
    toast({
      title: "Registration Successful!",
      description: `You have been registered for ${event.title}`,
    });
    
    setIsRegistering(false);
  };

  const getEventImage = (eventId: string) => {
    switch (eventId) {
      case '1': return techSummitPoster;
      case '2': return culturalFestivalPoster;
      case '3': return careerFairPoster;
      default: return '';
    }
  };

  const availableSpots = event.maxParticipants - event.currentParticipants;
  const isFullyBooked = availableSpots <= 0;

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
      {/* Event Image */}
      {getEventImage(event.id) && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={getEventImage(event.id)} 
            alt={`${event.title} poster`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" className="text-xs font-medium">
            {event.category}
          </Badge>
          {isRegistered && (
            <Badge variant="default" className="text-xs bg-green-600">
              Registered
            </Badge>
          )}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{event.currentParticipants}/{event.maxParticipants}</span>
          </div>
        </div>
        <CardTitle className="text-lg font-bold text-primary leading-tight">
          {event.title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {event.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Calendar className="w-4 h-4 text-university-gold" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Clock className="w-4 h-4 text-university-gold" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <MapPin className="w-4 h-4 text-university-gold" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <User className="w-4 h-4 text-university-gold" />
            <span>{event.organizer}</span>
          </div>
        </div>

        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {event.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {event.requirements && event.requirements.length > 0 && (
          <div className="text-xs text-muted-foreground">
            <strong>Requirements:</strong> {event.requirements.join(', ')}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 flex gap-2">
        {isRegistered ? (
          <Button disabled className="flex-1" variant="secondary">
            Already Registered
          </Button>
        ) : isFullyBooked ? (
          <Button disabled className="flex-1" variant="outline">
            Event Full
          </Button>
        ) : (
          <Button 
            onClick={handleRegister}
            disabled={isRegistering}
            className="flex-1 bg-gradient-to-r from-university-navy to-university-gold hover:shadow-lg transition-all duration-300"
          >
            {isRegistering ? 'Registering...' : 'Register Now'}
          </Button>
        )}
        
        <Button asChild variant="ghost" size="sm" className="text-university-gold hover:text-university-navy">
          <Link to={`/event/${event.id}`}>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;