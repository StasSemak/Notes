import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import React from "react"

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none',
    {
        variants: {
            variant: {
                default: 'bg-amber-500 hover:bg-amber-400 text-zinc-900 dark:text-zinc-100',
                ghost: 'bg-transparent text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-800',
            },
            size: {
                default: 'h-10 py-2 px-4',
                sm: 'h-9 px-2',
                xs: 'h-8 w-8 rounded-sm',
                lg: 'h-11 px-8',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants>{
    isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
    ({ className, children, variant, isLoading, size, ...props }, ref) => {
        return(
            <button
                className={cn(buttonVariants({variant, size, className}))}
                ref={ref}
                disabled={isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                {children}
            </button>
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }