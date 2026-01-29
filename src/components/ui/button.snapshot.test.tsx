import { render } from '@testing-library/react';
import { Button } from './button';

describe('Button Component Snapshots', () => {
  test('matches snapshot for default button', () => {
    const { container } = render(<Button>Default Button</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('matches snapshot for different sizes', () => {
    const sizes = ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'] as const;
    
    sizes.forEach(size => {
      const { container } = render(<Button size={size}>{size} Button</Button>);
      expect(container.firstChild).toMatchSnapshot(`Button size ${size}`);
    });
  });
  test('matches snapshot for disabled button', () => {
    const { container } = render(<Button disabled>Disabled Button</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('matches snapshot for button with custom className', () => {
    const { container } = render(<Button className="custom-class another-class">Custom Button</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
