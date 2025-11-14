// Type declarations for modules that TypeScript might not recognize
declare module '@radix-ui/react-slot' {
  import * as React from 'react'
  export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode
  }
  export const Slot: React.ForwardRefExoticComponent<
    SlotProps & React.RefAttributes<HTMLElement>
  >
}

declare module 'class-variance-authority' {
  export function cva(
    base: string,
    config?: {
      variants?: Record<string, Record<string, string>>
      defaultVariants?: Record<string, string>
    }
  ): (props?: Record<string, string>) => string
  
  export type VariantProps<T> = T extends (props?: infer P) => string
    ? P extends Record<string, string>
      ? P
      : never
    : never
}


