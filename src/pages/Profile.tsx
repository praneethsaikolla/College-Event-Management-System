import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, GraduationCap, BookOpen, Trophy } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-university-light via-background to-university-light">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-university-navy to-university-gold">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-primary">Student Profile</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-l-4 border-l-university-navy">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage 
                      src={user.profileImage || ''} 
                      alt={`${user.name} profile picture`}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-university-navy text-white text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription className="text-lg">
                  {user.year} • {user.department}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-university-gold" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <BookOpen className="w-4 h-4 text-university-gold" />
                  <span>{user.major}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Trophy className="w-4 h-4 text-university-gold" />
                  <span>GPA - {user.gpa}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-university-gold" />
                  About Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {user.bio}
                </p>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-university-gold" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Academic Year</h4>
                    <Badge variant="secondary" className="text-sm">
                      {user.year}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Department</h4>
                    <Badge variant="outline" className="text-sm">
                      {user.department}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Major</h4>
                    <p className="text-sm text-muted-foreground">{user.major}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Current GPA</h4>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-university-gold" />
                      <span className="font-medium text-university-gold">{user.gpa}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
