import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Calendar, Mail, MapPin } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { LogoutButton } from "@/components/LogoutButton";

export default function ProfileHeader() {
  const { user } = useCurrentUser ();
  if (!user) return null;
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.image} alt="Profile" />
              <AvatarFallback className="text-2xl">{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full">
              <Camera />
            </Button>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
            </div>
              <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {user.email}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                {user.address?.city || "None"}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                Joined March 2023
              </div>
            </div>
          </div>
          <LogoutButton />
        </div>
      </CardContent>
    </Card>
  );
}
