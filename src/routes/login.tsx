"use client"
import LoginForm from '@/components/LoginForm';
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/login')({
  component: Login,
})
function Login() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <LoginForm />
      </div>
    </>
  );
}
