import { render } from '@testing-library/react';
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

describe('LoginForm Component Snapshots', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  test('matches snapshot for initial render', () => {
    const { container } = render(<LoginForm />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('matches snapshot for form with filled inputs', () => {
    const { container } = render(<LoginForm />);
    const usernameInput = container.querySelector('input[name="username"]') as HTMLInputElement;
    const passwordInput = container.querySelector('input[name="password"]') as HTMLInputElement;
    if (usernameInput) usernameInput.value = 'testuser';
    if (passwordInput) passwordInput.value = 'password123';
    
    expect(container.firstChild).toMatchSnapshot('LoginForm with filled inputs');
  });

  test('matches snapshot for form fields layout', () => {
    const { container } = render(<LoginForm />);
    const formFields = container.querySelectorAll('[data-slot="form-field"]');
    expect(formFields).toHaveLength(2);
    expect(container.firstChild).toMatchSnapshot('LoginForm fields layout');
  });
});
