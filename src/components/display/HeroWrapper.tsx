import { cn } from "@/lib/utils";

type HeroHeight = "sm" | "md" | "lg" | "full";
type HeroOverlay = "none" | "gradient" | "solid";
type HeroAlign = "left" | "center" | "right";

interface HeroWrapperProps {
  children: React.ReactNode;
  height?: HeroHeight;
  overlay?: HeroOverlay;
  background?: string;
  align?: HeroAlign;
  className?: string;
}

const heightClasses: Record<HeroHeight, string> = {
  sm: "min-h-[40vh]",
  md: "min-h-[60vh]",
  lg: "min-h-[80vh]",
  full: "min-h-screen",
};

const alignClasses: Record<HeroAlign, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

export function HeroWrapper({
  children,
  height = "md",
  overlay = "none",
  background,
  align = "center",
  className,
}: HeroWrapperProps) {
  return (
    <section
      className={cn(
        "relative flex",
        heightClasses[height],
        alignClasses[align],
        className,
      )}
    >
      {background && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        />
      )}

      {overlay === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
      )}
      {overlay === "solid" && (
        <div className="absolute inset-0 bg-black/70" />
      )}

      <div className="container-site relative z-10 py-20">
        <div className="mb-6 h-1 w-20 rounded-full bg-brand-500" />
        <div className="font-serif">{children}</div>
      </div>
    </section>
  );
}
