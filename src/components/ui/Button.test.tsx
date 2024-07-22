import Button from './Button';
import { render } from '@testing-library/react';

describe('components/ui/Button', () => {
  it.each([
    { size: 'default', classes: 'h-10 px-4' },
    { size: 'sm', classes: 'h-9' },
    { size: 'lg', classes: 'h-12' },
  ])('renders Button with a $p size', ({ size, classes }) => {
    const { container } = render(<Button size={size as "default" | "sm" | "lg"}>Click me</Button>);
    expect(container.firstChild).toHaveClass(classes);
  });
});
