import StoreNavbar from "@/components/layout/store-navbar";
import Footer from "@/components/layout/footer";
import HeroCarousel from "@/components/common/hero-carousel";
import FeaturesSection from "@/components/common/features-section";
import CategorySection from "@/components/common/category-section";
import WhyChooseSection from "@/components/common/why-choose-section";
import ProductSections from "@/components/common/product-sections";
import SocialProofSection from "@/components/common/social-proof-section";
import TestimonialsCarousel from "@/components/common/testimonials-carousel";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <StoreNavbar />
      <main className="flex-1">
        {/* Hero Carousel */}
        <HeroCarousel />
        
        {/* Features - SSR, No API */}
        <FeaturesSection />
        
        {/* Category Section - Has API */}
        <CategorySection />
        
        {/* Why Choose Us - SSR, No API */}
        <WhyChooseSection />
        
        {/* Product Collections - Has API */}
        <ProductSections />
        
        {/* Social Proof (Instagram + Newsletter) - SSR, No API */}
        <SocialProofSection />
        
        {/* Testimonials - Has API */}
        <TestimonialsCarousel />
      </main>
      <Footer />
    </div>
  );
}