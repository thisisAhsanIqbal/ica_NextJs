import Link from 'next/link';
import clsx from 'clsx';
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

// Define all your styles
const baseStyles = 'uppercase font-semibold tracking-wider border-none relative inline-block cursor-pointer transition-all duration-300 ease-in-out no-underline text-[clamp(16px,2.5vw,18px)] rounded-none leading-[1.2] overflow-hidden text-ellipsis max-w-full active:scale-[0.97] active:duration-100 active:ease-out focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none';
// Font family will be applied via inline style or CSS variable

const responsivePadding = 'py-[0.9rem] px-[1.6rem] max-[510px]:py-[0.75rem] max-[510px]:px-[1.2rem]';

const variants = {
  primary: `text-center py-[0.9rem] px-[1.6rem] max-[510px]:py-[0.75rem] max-[510px]:px-[1.2rem] bg-[var(--ica-green-deep)] text-[var(--ica-bg)] [box-shadow:-6px_6px_0px_1px_rgba(30,49,47,0.45)] hover:bg-[var(--ica-bg)] hover:text-[var(--ica-green-deep)] hover:-translate-y-0.5 active:bg-[var(--ica-bg)] active:text-[var(--ica-green-deep)] focus:[box-shadow:-6px_6px_0px_1px_rgba(30,49,47,0.45)]`,
  lavender: `py-[0.9rem] px-[1.6rem] max-[510px]:py-[0.75rem] max-[510px]:px-[1.2rem] bg-[var(--ica-lavender)] text-[var(--ica-green-deep)] [box-shadow:-6px_6px_0px_1px_rgba(207,173,209,0.45)] hover:bg-[var(--ica-green-deep)] hover:text-[var(--ica-lavender)] hover:[box-shadow:-6px_6px_0px_1px_rgba(30,49,47,0.45)] hover:-translate-y-0.5`,
  white: `py-[0.9rem] px-[1.6rem] max-[510px]:py-[0.75rem] max-[510px]:px-[1.2rem] bg-[var(--ica-bg)] text-[var(--ica-green-deep)] text-center [box-shadow:-6px_6px_0px_1px_rgb(247_255_254/80%)] hover:bg-[var(--ica-green-deep)] hover:text-[var(--ica-bg)] hover:[box-shadow:-6px_6px_0px_1px_rgba(30,49,47,0.45)] hover:-translate-y-0.5`,
  lime: `ml-[5px] py-[0.9rem] px-[1.6rem] max-[510px]:py-[0.75rem] max-[510px]:px-[1.2rem] bg-[var(--ica-lime)] text-[var(--ica-green-deep)] text-center [box-shadow:-6px_6px_0px_1px_rgba(158,164,129,0.8)] hover:bg-[var(--ica-green-deep)] hover:text-[var(--ica-bg)] hover:[box-shadow:-6px_6px_0px_1px_rgba(69,70,66,0.555)] hover:-translate-y-0.5`,
  outline: `py-[0.9rem] px-[1.6rem] max-[510px]:py-[0.75rem] max-[510px]:px-[1.2rem] bg-transparent [box-shadow:-6px_6px_0px_1px_rgba(30,49,47,0.45)] text-[var(--ica-green-deep)] border-2 border-[var(--ica-green-deep)] hover:bg-[var(--ica-green-deep)] hover:text-[var(--ica-bg)] hover:border-[var(--ica-green-deep)] active:bg-[var(--ica-green-deep)] active:text-[var(--ica-bg)] active:border-[var(--ica-green-deep)] focus:[box-shadow:-6px_6px_0px_1px_rgba(30,49,47,0.45)]`,
  tertiary: `bg-[var(--ica-mint)] text-[var(--ica-green-deep)] border-2 border-[var(--ica-green-deep)] [box-shadow:2px_2px_0_#1E312F] py-[0.7rem] px-[1.4rem] font-medium tracking-[0.03em] text-[0.95rem] hover:bg-[var(--ica-green-deep)] hover:text-[var(--ica-bg)] hover:border-[var(--ica-green-deep)] active:bg-[var(--ica-green-deep)] active:text-[var(--ica-bg)] active:border-[var(--ica-green-deep)] focus:[box-shadow:-6px_6px_0px_1px_rgba(30,49,47,0.45)]`,
};

const sizes = {
  small: 'py-[0.6rem] px-[1.2rem] text-sm',
  large: 'py-[1.2rem] px-[2rem] text-lg max-md:py-[1rem] max-md:px-[1.8rem] max-md:text-[clamp(0.9rem,2.3vw,1rem)]',
};

const widths = {
  full: 'w-full text-center',
};

// Button variant type
type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;
type ButtonWidth = keyof typeof widths;

// Base props that can be used for both button and link
interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  width?: ButtonWidth;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}

// Props for when href is provided (Link)
interface LinkButtonProps extends BaseButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'> {
  href: string;
}

// Props for when href is not provided (button)
interface ButtonButtonProps extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  href?: never;
}

// Union type for all Button props
type ButtonProps = LinkButtonProps | ButtonButtonProps;

// Create the component
export default function Button({
  href,
  variant = 'primary',
  size,
  width,
  className,
  children,
  ...props
}: ButtonProps) {
  // Combine classes dynamically
  const classes = clsx(
    baseStyles,
    variants[variant],
    size && sizes[size],
    width && widths[width],
    className
  );

  // Get padding values based on variant and size (inline styles as fallback)
  // Note: Responsive padding is handled by Tailwind classes, this is a fallback
  const getPadding = () => {
    if (size === 'small') {
      return { paddingTop: '0.6rem', paddingBottom: '0.6rem', paddingLeft: '1.2rem', paddingRight: '1.2rem' };
    }
    if (size === 'large') {
      return { paddingTop: '1.2rem', paddingBottom: '1.2rem', paddingLeft: '2rem', paddingRight: '2rem' };
    }
    if (variant === 'tertiary') {
      return { paddingTop: '0.7rem', paddingBottom: '0.7rem', paddingLeft: '1.4rem', paddingRight: '1.4rem' };
    }
    // Default padding for primary and other variants (desktop default)
    // Mobile responsive padding is handled by Tailwind classes
    return { 
      paddingTop: '0.9rem', 
      paddingBottom: '0.9rem', 
      paddingLeft: '1.6rem', 
      paddingRight: '1.6rem'
    };
  };

  // Style object for font family and padding (inline styles ensure padding is always applied)
  const style = { 
    fontFamily: 'var(--font-ui)',
    ...getPadding()
  };

  // Render a Link or a button
  if (href) {
    return (
      <Link href={href} className={classes} style={style} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} style={style} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

