import { SmallSpinner } from "@/components/shared";

type ConsentGrantRedirectingProps = {
  companyName: string;
};

const ConsentGrantRedirecting = ({ companyName }: ConsentGrantRedirectingProps) => (
  <div className="w-full max-w-md">
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card p-8 text-center shadow-xl shadow-brand/5 ring-1 ring-foreground/5">
      <div className="mx-auto mb-4 flex size-12 items-center justify-center">
        <SmallSpinner />
      </div>
      <h1 className="text-xl font-semibold tracking-tight">Returning to {companyName}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Please wait while we redirect you back to the application.
      </p>
    </div>
  </div>
);

export default ConsentGrantRedirecting;
