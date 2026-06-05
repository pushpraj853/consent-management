import PublicFooter from "../public-layout/PublicFooter";

interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      {children}
      <PublicFooter />
    </>
  );
};

export default AuthLayout;
