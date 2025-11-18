import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "year" | "status";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-inset",
        {
          "bg-gray-50 text-gray-600 ring-gray-500/10": variant === "default",
          "bg-netflix-red/10 text-netflix-red ring-netflix-red/20":
            variant === "year",
          "bg-green-50 text-green-700 ring-green-600/20": variant === "status",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
