import { renderHook, act } from '@testing-library/react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import type { User } from '../hooks/useCurrentUser';

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

describe('useCurrentUser hook', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  test('should return null user when no user in localStorage', () => {
    const { result } = renderHook(() => useCurrentUser());
    expect(result.current.user).toBeNull();
    expect(localStorageMock.getItem).toHaveBeenCalledWith('user');
  });

  test('should return user data when user exists in localStorage', () => {
    const mockUser: User = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      image: 'avatar.jpg',
      phone: '1234567890',
      address: { city: 'Test City' }
    };
    localStorageMock.setItem('user', JSON.stringify(mockUser));
    const { result } = renderHook(() => useCurrentUser());
    expect(result.current.user).toEqual(mockUser);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('user');
  });

  test('should handle invalid JSON in localStorage', () => {
    localStorageMock.setItem('user', 'invalid-json');
    const { result } = renderHook(() => useCurrentUser());
    expect(result.current.user).toBeNull();
  });

  test('should update user when setUser is called', () => {
    const { result } = renderHook(() => useCurrentUser());
    const newUser: User = {
      id: 2,
      username: 'newuser',
      email: 'new@example.com',
      firstName: 'New',
      lastName: 'User',
      image: 'new-avatar.jpg'
    };
    act(() => {
      result.current.setUser(newUser);
    });
    expect(result.current.user).toEqual(newUser);
  });
});
