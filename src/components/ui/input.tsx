import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputControlClass =
  "rounded-lg border border-input bg-transparent transition-colors dark:bg-input/30"

/** Applied on the control itself — pass disabled and aria-invalid as normal HTML props. */
const inputStateClass =
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 dark:disabled:bg-input/80 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"

const inputVariants = cva(
  cn(
    "h-8 w-full min-w-0 px-2.5 py-1 text-base outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm",
    inputControlClass,
    inputStateClass,
  ),
)

/**
 * Wrapper for composite fields (phone, prefix/suffix).
 * Border and state styles react to the inner input via :has() — same props as Input.
 */
const inputGroupVariants = cva(
  cn(
    "flex items-center overflow-hidden focus-within:ring-3 focus-within:ring-ring/50",
    "has-[:disabled]:pointer-events-none has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-input/50 has-[:disabled]:opacity-50 dark:has-[:disabled]:bg-input/80",
    "has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:ring-3 has-[[aria-invalid=true]]:ring-destructive/20 dark:has-[[aria-invalid=true]]:border-destructive/50 dark:has-[[aria-invalid=true]]:ring-destructive/40",
    inputControlClass,
  ),
  {
    variants: {
      size: {
        default: "h-8",
        lg: "h-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

const inputGroupFieldClass =
  "h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants(), className)}
      {...props}
    />
  )
}

export { Input, inputGroupFieldClass, inputGroupVariants, inputVariants }
