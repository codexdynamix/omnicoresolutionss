import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full rounded-xl bg-card px-3.5 py-3 text-sm text-foreground shadow-[0_0_0_1px_rgba(0,0,0,0.08)] transition-[box-shadow] duration-150 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-background),0_0_0_4px_var(--color-ring)] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
