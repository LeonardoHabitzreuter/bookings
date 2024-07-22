import Button from './Button';
import { render } from '@testing-library/react';

describe('components/ui/Button', () => {
  it.each([
    { size: 'default', classes: 'h-10 px-4' },
    { size: 'sm', classes: 'h-9' },
    { size: 'lg', classes: 'h-12' },
  ])('renders Button with a $size size', ({ size, classes }) => {
    const { container } = render(<Button size={size as "default" | "sm" | "lg"}>Click me</Button>);
    expect(container.firstChild).toHaveClass(classes);
  });

  it.each([
    { variant: 'default', classes: 'bg-primary text-white' },
    { variant: 'destructive', classes: 'bg-red-500 text-zinc-50 hover:bg-red-500/90' },
  ])('renders Button with a $variant variant', ({ variant, classes }) => {
    const { container } = render(<Button variant={variant as "default" | "destructive"}>Click me</Button>);
    expect(container.firstChild).toHaveClass(classes);
  });
});
