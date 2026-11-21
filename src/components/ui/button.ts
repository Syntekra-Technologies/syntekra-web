/**
 * Shared button styles, used by <ButtonLink> and by native <button> elements
 * (e.g. the contact form submit) so both stay visually identical.
 */

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'md' | 'lg'

const base =
  'group/button inline-flex items-center justify-center gap-2.5 rounded-xs font-medium ' +
  'whitespace-nowrap select-none transition-[background-color,border-color,color] ' +
  'duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-hover active:bg-brand-deep',
  secondary: 'border border-line-strong text-ink hover:border-ink active:bg-raised',
}

const sizes: Record<ButtonSize, string> = {
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-[0.9375rem]',
}

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'lg') {
  return [base, variants[variant], sizes[size]].join(' ')
}
