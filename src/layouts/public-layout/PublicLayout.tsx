import PublicFooter from "./PublicFooter";
import PublicHeader from "./PublicHeader";

interface PublicLayoutProps {
  children: React.ReactNode;
}
const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <>
      <PublicHeader />
      {children}
      <PublicFooter />
    </>
  );
};

export default PublicLayout;
