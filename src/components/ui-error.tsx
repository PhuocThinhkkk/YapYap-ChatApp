"use client"

import * as React from "react"
import { AlertCircle, RefreshCw } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

const errorVariants = cva("", {
  variants: {
    variant: {
      default: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      warning: "border-yellow-500/50 text-yellow-700 dark:text-yellow-500 [&>svg]:text-yellow-600",
      network: "border-orange-500/50 text-orange-700 dark:text-orange-500 [&>svg]:text-orange-600",
    },
    size: {
      default: "",
      sm: "text-sm p-3",
      lg: "text-lg p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface ErrorProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof errorVariants> {
  title?: string
  description?: string
  error?: Error | null
  reset?: () => void
  icon?: React.ReactNode
}

const UIError = React.forwardRef<HTMLDivElement, ErrorProps>(
  ({ className, title, description, error, reset, variant, size, icon, ...props }, ref) => {
    const errorMessage = error?.message || description
    const errorTitle = title || "Something went wrong"
    const errorIcon =
      icon || (variant === "network" ? <RefreshCw className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />)

    return (
      <Alert ref={ref} variant="destructive" className={cn(errorVariants({ variant, size }), className)} {...props}>
        {errorIcon}
        <AlertTitle>{errorTitle}</AlertTitle>
        <AlertDescription className="mt-1">{errorMessage}</AlertDescription>
        {reset && (
          <Button variant="outline" size="sm" onClick={reset} className="mt-3">
            Try again
          </Button>
        )}
      </Alert>
    )
  },
)
UIError.displayName = "UIError"

export { UIError }
