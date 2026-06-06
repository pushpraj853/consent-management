import { Link } from "react-router-dom";
import appIcon from "@/assets/icons/app-icon.webp";
import { APP_NAME } from "@/configs/envoirmentVars";
import { cn } from "@/lib/utils";

type HeaderBrandProps = {
  homePath: string;
  className?: string;
};

const HeaderBrand = ({ homePath, className }: HeaderBrandProps) => (
  <Link
    to={homePath}
    className={cn(
      "flex min-w-0 items-center gap-2.5 rounded-md outline-none",
      "focus-visible:ring-2 focus-visible:ring-ring",
      className,
    )}
  >
    <img
      src={appIcon}
      alt={`${APP_NAME ?? "Consent"} icon`}
      className="size-8 shrink-0 rounded-lg shadow-sm ring-1 ring-border"
    />
    <span className="truncate text-sm font-semibold tracking-wide">
      {APP_NAME ?? "Consent Vault"}
    </span>
  </Link>
);

export default HeaderBrand;
