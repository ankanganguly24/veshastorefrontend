import StoreNavbar from "@/components/layout/store-navbar";
import Footer from "@/components/layout/footer";
import HeroCarousel from "@/components/common/hero-carousel";
import CategorySection from "@/components/common/category-section";
import ProductSections from "@/components/common/product-sections";
import CuratedCollections from "@/components/common/curated-collections";
import TestimonialsCarousel from "@/components/common/testimonials-carousel";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <StoreNavbar />
      <main className="flex-1">
        {/* Hero Carousel */}
        <HeroCarousel />
        
        {/* Category Section */}
        <CategorySection />
        
        {/* Product Collections */}
        <ProductSections />
        
        {/* Curated Collections */}
        <CuratedCollections />
        
        {/* Testimonials */}
        <TestimonialsCarousel />
      </main>
      <Footer />
    </div>
  );
}
