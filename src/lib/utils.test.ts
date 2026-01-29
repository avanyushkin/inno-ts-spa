import { cn } from '../lib/utils';

describe('cn utility function', () => {
  test('should merge class names correctly', () => {
    const result = cn('bg-red-500', 'text-white', 'p-4');
    expect(result).toBe('bg-red-500 text-white p-4');
  });

  test('should handle conditional classes', () => {
    const result = cn('base-class', true && 'conditional-class', false && 'hidden-class');
    expect(result).toBe('base-class conditional-class');
  });

  test('should handle empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('')).toBe('');
  });

  test('should handle conflicting tailwind classes', () => {
    const result = cn('bg-red-500', 'bg-blue-500');
    expect(result).toBe('bg-blue-500');
  });

  test('should handle arrays and objects', () => {
    const result = cn(['class1', 'class2'], { class3: true, class4: false });
    expect(result).toBe('class1 class2 class3');
  });
});
