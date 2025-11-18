import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
  className?: string;
}

export function Tag({ children, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-secondary text-secondary-foreground": variant === "default",
          "bg-netflix-red text-white": variant === "primary",
          "bg-muted text-muted-foreground": variant === "secondary",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
