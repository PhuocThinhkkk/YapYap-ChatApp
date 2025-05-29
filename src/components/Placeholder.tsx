import { type LucideIcon, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlaceholderProps {
  className?: string
  width?: number | string
  height?: number | string
  icon?: LucideIcon
  iconSize?: number
  text?: string
  variant?: "default" | "dashed" | "solid"
}

export function Placeholder({
  className,
  width = "100%",
  height = 200,
  icon: Icon = ImageIcon,
  iconSize = 48,
  text,
  variant = "default",
}: PlaceholderProps) {
  const baseStyles = "flex flex-col items-center justify-center bg-muted/50 text-muted-foreground"

  const variantStyles = {
    default: "border-2 border-dashed border-muted-foreground/25",
    dashed: "border-2 border-dashed border-muted-foreground/50",
    solid: "border border-muted-foreground/25",
  }

  const style = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  }

  return (
    <div className={cn(baseStyles, variantStyles[variant], className)} style={style}>
      <Icon size={iconSize} className="mb-2" />
      {text && <span className="text-sm font-medium">{text}</span>}
    </div>
  )
}
