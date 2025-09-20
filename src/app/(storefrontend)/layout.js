import StoreNavbar from "@/components/layout/store-navbar";
import StoreFooter from "@/components/layout/store-footer";

export default function StoreFrontendLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <StoreNavbar />
      <main className="flex-1">{children}</main>
      <StoreFooter />
    </div>
  );
}
