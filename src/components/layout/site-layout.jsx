import StoreNavbar from '@/components/layout/store-navbar';
import Footer from '@/components/layout/footer';

export default function SiteLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <StoreNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
