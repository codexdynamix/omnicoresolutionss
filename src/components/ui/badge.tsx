import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        muted: "bg-secondary text-secondary-foreground",
        outline: "shadow-[0_0_0_1px_rgba(0,0,0,0.1)] text-foreground",
        accent: "bg-accent/10 text-accent",
      },
    },
    defaultVariants: { variant: "muted" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
