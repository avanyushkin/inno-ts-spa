import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

const mockNavigate = jest.fn();
jest.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
}));
jest.mock('@apollo/client/react', () => ({
  useMutation: () => [
    jest.fn().mockResolvedValue({
      data: {
        login: {
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          image: '',
          token: 'test-token'
        }
      }
    }),
    { loading: false, error: null }
  ]
}));

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('LoginForm Component', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });
  test('renders login form correctly', () => {
    render(<LoginForm />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Enter your username below to login to your account.')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Register' })).toBeInTheDocument();
  });
  test('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    const submitButton = screen.getByRole('button', { name: 'Sign in' });
    await user.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('username should be at least 3 characters.')).toBeInTheDocument();
      expect(screen.getByText('Password must be at least 8 characters.')).toBeInTheDocument();
    });
  });
  test('shows validation error for short username', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    const usernameInput = screen.getByLabelText('Username');
    const submitButton = screen.getByRole('button', { name: 'Sign in' });
    await user.type(usernameInput, 'ab');
    await user.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('username should be at least 3 characters.')).toBeInTheDocument();
    });
  });
  test('has register link', () => {
    render(<LoginForm />);
    const registerLink = screen.getByRole('link', { name: 'Register' });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});
