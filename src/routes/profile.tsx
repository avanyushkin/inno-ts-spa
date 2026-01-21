import ProfilePage from '@/components/profile-page/page'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/profile')({
  component: Profile,
})
function Profile() {
  return (
    <>
      <ProfilePage />
    </>
  );
}
