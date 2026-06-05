import { cn } from "@/lib/utils";

type RadarMotifProps = {
  className?: string;
};

const RadarMotif = ({ className }: RadarMotifProps) => (
  <div
    aria-hidden
    className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
  >
    <div className="absolute top-1/2 left-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />
    <div className="absolute top-1/2 left-1/2 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15" />
    <div className="absolute top-1/2 left-1/2 size-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/10" />
    <div className="absolute top-1/2 left-1/2 size-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25" />
    <div className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40" />
  </div>
);

export default RadarMotif;
