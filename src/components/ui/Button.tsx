import { cn } from '@/utils/styles';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'rounded-md text-sm sm:text-base font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded-3xl disabled:text-neutral-400',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary-600',
        destructive: 'bg-red-500 text-zinc-50 hover:bg-red-500/90',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-9',
        lg: 'h-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type Props = {
  type?: 'submit' | 'button';
  children: React.ReactNode;
  className?: string;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
& VariantProps<typeof buttonVariants>;

export default function Button({
  children,
  className,
  size,
  variant,
  type = 'button',
  disabled,
  ...props
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(buttonVariants({ size, variant, className }))}
      style={{ ...props.style, background: disabled ? '#DCDCDC': undefined }}
      {...props}
    >
      {children}
    </button>
  );
}
