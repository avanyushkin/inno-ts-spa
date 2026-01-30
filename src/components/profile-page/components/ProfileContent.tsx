import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Tasks } from "@/components/Tasks";
import { WebSocketChat } from "@/components/WebSocketChat";

export default function ProfileContent() {
  const { user } = useCurrentUser();
  if (!user) return null;
  
  return (
    <Tabs defaultValue="personal" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="characters">Characters</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details and profile information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue={user.firstName} className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue={user.lastName} className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email} className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue={user.phone || "none"} className="h-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                defaultValue="Passionate product designer with 8+ years of experience creating user-centered digital experiences. I love solving complex problems and turning ideas into beautiful, functional products."
                rows={4}
                className="min-h-[120px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue={user.address?.city || "none"} className="h-10" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="characters" className="space-y-6">
      <Card className="border-2">
        <CardContent className="p-6">
          <Tasks />
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="chat" className="space-y-6">
    <Card className="border-2">
      <CardContent className="p-6">
        <WebSocketChat />
      </CardContent>
    </Card>
  </TabsContent>

      <TabsContent value="completed" className="space-y-6">

      </TabsContent>
    </Tabs>
  );
}