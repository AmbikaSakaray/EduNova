import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-primary to-primary-600 text-white shadow-[0_16px_40px_-18px_rgba(30,58,138,0.6)] hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-16px_rgba(30,58,138,0.65)]',
  secondary:
    'bg-gradient-to-r from-secondary to-emerald-500 text-white shadow-[0_16px_40px_-18px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-16px_rgba(16,185,129,0.55)]',
  ghost: 'bg-white/10 text-white hover:bg-white/15',
  outline:
    'border border-white/30 bg-white/5 text-white hover:bg-white/15',
}

const sizeClasses: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

interface BaseProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  icon?: ReactNode
}

interface LinkButtonProps extends BaseProps {
  to: string
  href?: undefined;
  onClick?: undefined;
}
interface ExternalButtonProps extends BaseProps {
  href: string
  to?: undefined;
  onClick?: undefined;
}
interface ClickButtonProps extends BaseProps {
  onClick: () => void
  to?: undefined;
  href?: undefined;
}

type ButtonProps = LinkButtonProps | ExternalButtonProps | ClickButtonProps

export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    icon,
  } = props

  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-sub font-semibold transition-all duration-300 active:scale-[0.98] ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
        {icon}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    return (
      <a href={props.href} className={classes} target="_blank" rel="noreferrer">
        {children}
        {icon}
      </a>
    )
  }

  return (
    <button onClick={'onClick' in props ? props.onClick : undefined} className={classes}>
      {children}
      {icon}
    </button>
  )
}
