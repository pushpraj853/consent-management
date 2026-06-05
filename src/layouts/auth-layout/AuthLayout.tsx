import { AuthBrandPanel } from "@/components/shared/auth";
import ThemeToggle from "@/components/shared/ThemeToggle";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="flex min-h-svh bg-background">
    <AuthBrandPanel />

    <main className="relative flex flex-1 flex-col">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        {children}
      </div>
    </main>
  </div>
);

export default AuthLayout;
