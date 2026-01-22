import ProfilePage from '@/components/profile-page/page'
import { createFileRoute } from '@tanstack/react-router'
import { RequireAuth } from '@/components/auth/require-auth'

export const Route = createFileRoute ('/profile')({
  component: Profile,
})

function Profile() {
  return (
    <RequireAuth>
      <ProfilePage />
    </RequireAuth>
  );
}