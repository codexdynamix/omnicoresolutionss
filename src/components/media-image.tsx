import { cn } from "@/lib/utils";

type MediaImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  framed?: boolean;
};

export function MediaImage({ className, framed = true, alt, ...props }: MediaImageProps) {
  return (
    <img
      alt={alt ?? ""}
      referrerPolicy="no-referrer"
      className={cn(
        "h-full w-full object-cover",
        framed && "outline outline-1 -outline-offset-1 outline-foreground/10",
        className,
      )}
      {...props}
    />
  );
}
