import ProfileHeader from "./components/ProfileHeader";
import ProfileContent from "./components/ProfileContent";

export default function ProfilePage() {
  return (
    <div className="container mx-auto space-y-6 px-4 py-10">
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
}
