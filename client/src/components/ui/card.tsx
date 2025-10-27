import { forwardRef, HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

const Card = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden",
      className
    )}
    style={{
      wordWrap: "break-word",
      overflowWrap: "break-word",
      ...style
    }}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5",
      // Responsive padding
      "p-4 sm:p-6",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Responsive font sizes
      "text-xl sm:text-2xl font-semibold leading-tight tracking-tight",
      // Handle overflow
      "break-words",
      className
    )}
    style={{
      wordWrap: "break-word",
      overflowWrap: "break-word",
      ...style
    }}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground",
      // Handle overflow
      "break-words",
      className
    )}
    style={{
      wordWrap: "break-word",
      overflowWrap: "break-word",
      ...style
    }}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      // Responsive padding
      "p-4 sm:p-6 pt-0",
      // Handle overflow
      "overflow-hidden",
      className
    )} 
    style={{
      wordWrap: "break-word",
      overflowWrap: "break-word",
      ...style
    }}
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center",
      // Responsive padding
      "p-4 sm:p-6 pt-0",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
