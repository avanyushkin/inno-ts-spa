import RegisterForm from '@/components/RegisterForm';
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/register')({
  component: Register,
})
function Register() {
  return (
    <>
      <RegisterForm />
    </>
  );
}
