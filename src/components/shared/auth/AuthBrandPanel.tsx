import appIcon from "@/assets/icons/app-icon.webp";
import { APP_NAME } from "@/configs/envoirmentVars";
import RadarMotif from "./RadarMotif";

const AuthBrandPanel = () => (
  <aside className="relative hidden w-[45%] flex-col justify-between overflow-hidden bg-brand p-10 text-brand-foreground lg:flex">
    <RadarMotif />

    <div className="relative z-10">
      <div className="flex items-center gap-3">
        <img
          src={appIcon}
          alt={`${APP_NAME ?? "Consent"} icon`}
          className="size-12 rounded-xl shadow-lg ring-1 ring-primary/30"
        />
        <span className="text-lg font-semibold tracking-wide">
          {APP_NAME ?? "Consent Vault"}
        </span>
      </div>
    </div>

    <div className="relative z-10 space-y-6">
      <h1 className="max-w-sm text-3xl leading-tight font-semibold tracking-tight">
        Precision consent management for modern teams
      </h1>
      <p className="max-w-sm text-sm leading-relaxed text-brand-foreground/70">
        Verify, approve, and track consent with the clarity and confidence your
        organization deserves.
      </p>

      <div className="flex items-center gap-6 pt-2">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-full bg-success text-success-foreground">
            <svg viewBox="0 0 12 12" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 6l3 3 5-5" />
            </svg>
          </span>
          <span className="text-xs text-brand-foreground/80">Verified</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <svg viewBox="0 0 12 12" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="6" cy="6" r="4" />
            </svg>
          </span>
          <span className="text-xs text-brand-foreground/80">Tracked</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-full bg-destructive text-white">
            <svg viewBox="0 0 12 12" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3l6 6M9 3L3 9" />
            </svg>
          </span>
          <span className="text-xs text-brand-foreground/80">Revoked</span>
        </div>
      </div>
    </div>

    <p className="relative z-10 text-xs text-brand-foreground/50">
      &copy; {new Date().getFullYear()} {APP_NAME ?? "Consent Vault"}. All rights reserved.
    </p>
  </aside>
);

export default AuthBrandPanel;
