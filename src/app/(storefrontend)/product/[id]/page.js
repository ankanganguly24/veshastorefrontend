import ImageCarousel from "@/components/common/image-carousel";
import ProductInfo from "@/components/common/product-info";
import TrustBadges from "@/components/common/trust-badges";
import ProductTabs from "@/components/common/product-tabs";
import RelatedProducts from "@/components/common/related-products";

export default function ProductPage({ params }) {
  const { id } = params;

  // Mock product database - in real app, fetch from API
  const products = {
    1: {
      id: 1,
      slug: "nawabi-royal-kurta-set",
      name: "Nawabi Royal Kurta Set",
      brand: "Vesha Fashion",
      price: 2299,
      originalPrice: 2799,
      discount: 18,
      category: "NAWABI EXCLUSIVE",
      inStock: true,
      stockCount: 25,
      rating: 4.8,
      reviewCount: 156,
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=500&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop",
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=600&fit=crop"
      ],
      description: "Crafted with premium fabrics and intricate embroidery, this Nawabi Royal Kurta Set embodies traditional elegance with a contemporary twist. Perfect for festive occasions and special celebrations.",
      washCare: "Dry clean only. Store in a cool, dry place. Avoid direct sunlight when drying.",
      offers: [
        "Extra 10% off on prepaid orders",
        "Free shipping on orders above ₹1999",
        "Easy 15-day return policy"
      ],
      features: [
        "Premium cotton fabric",
        "Intricate embroidery work",
        "Comfortable fit",
        "Machine washable"
      ]
    },
    2: {
      id: 2,
      slug: "designer-peplum-jacket",
      name: "Designer Peplum Jacket",
      brand: "Vesha Fashion",
      price: 1899,
      originalPrice: 2299,
      discount: 17,
      category: "OUTERWEAR",
      inStock: true,
      stockCount: 18,
      rating: 4.6,
      reviewCount: 89,
      images: [
        "https://images.unsplash.com/photo-1544966503-7bb6d3967ff6?w=500&h=600&fit=crop",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=600&fit=crop",
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=600&fit=crop"
      ],
      description: "Elevate your style with this contemporary designer peplum jacket. Perfect for layering over any outfit, this versatile piece combines modern aesthetics with timeless elegance.",
      washCare: "Machine wash cold. Hang dry in shade. Iron on medium heat.",
      offers: [
        "Extra 10% off on prepaid orders",
        "Free shipping on orders above ₹1999",
        "Easy 15-day return policy"
      ],
      features: [
        "Lightweight fabric",
        "Contemporary design",
        "Versatile styling",
        "Easy care"
      ]
    },
    3: {
      id: 3,
      slug: "elegant-kaftan-dress",
      name: "Elegant Kaftan Dress",
      brand: "Vesha Fashion",
      price: 1599,
      originalPrice: 1999,
      discount: 20,
      category: "ETHNIC WEAR",
      inStock: true,
      stockCount: 12,
      rating: 4.7,
      reviewCount: 124,
      images: [
        "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&h=600&fit=crop",
        "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&h=600&fit=crop"
      ],
      description: "Experience comfort and elegance with this flowing kaftan dress. Perfect for casual outings or relaxed gatherings, this piece offers both style and comfort.",
      washCare: "Hand wash gently. Air dry in shade. Steam iron if needed.",
      offers: [
        "Extra 10% off on prepaid orders",
        "Free shipping on orders above ₹1999",
        "Easy 15-day return policy"
      ],
      features: [
        "Flowing silhouette",
        "Comfortable fit",
        "Breathable fabric",
        "Elegant drape"
      ]
    },
    4: {
      id: 4,
      slug: "embroidered-shrug",
      name: "Embroidered Shrug",
      brand: "Vesha Fashion",
      price: 1299,
      originalPrice: 1599,
      discount: 19,
      category: "OUTERWEAR",
      inStock: true,
      stockCount: 22,
      rating: 4.5,
      reviewCount: 67,
      images: [
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop",
        "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=500&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566479179817-0a0ca2e18c72?w=500&h=600&fit=crop"
      ],
      description: "Add a touch of sophistication to any outfit with this beautifully embroidered shrug. The intricate details and quality craftsmanship make it a perfect addition to your wardrobe.",
      washCare: "Dry clean recommended. Store flat. Avoid direct sunlight.",
      offers: [
        "Extra 10% off on prepaid orders",
        "Free shipping on orders above ₹1999",
        "Easy 15-day return policy"
      ],
      features: [
        "Hand embroidered",
        "Premium quality",
        "Versatile styling",
        "Perfect finish"
      ]
    },
    5: {
      id: 5,
      slug: "festive-wear-set",
      name: "Festive Wear Set",
      brand: "Vesha Fashion",
      price: 2499,
      originalPrice: 2999,
      discount: 17,
      category: "ETHNIC WEAR",
      inStock: true,
      stockCount: 8,
      rating: 4.8,
      reviewCount: 98,
      images: [
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=600&fit=crop",
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=600&fit=crop"
      ],
      description: "Make a statement at special occasions with this stunning festive wear set. Combining traditional elements with contemporary style, this outfit is perfect for celebrations.",
      washCare: "Dry clean only. Store in garment bag. Handle with care.",
      offers: [
        "Extra 10% off on prepaid orders",
        "Free shipping on orders above ₹1999",
        "Easy 15-day return policy"
      ],
      features: [
        "Festival ready",
        "Traditional design",
        "Premium materials",
        "Special occasion wear"
      ]
    }
  };

  // Create a slug-to-product mapping for easy lookup
  const productsBySlug = Object.values(products).reduce((acc, product) => {
    acc[product.slug] = product;
    return acc;
  }, {});

  // Get product by slug first, then by ID, fallback to product 1
  const product = productsBySlug[id] || products[parseInt(id)] || products[1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Main Product Section - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Image Carousel */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <ImageCarousel images={product.images} productName={product.name} />
          </div>

          {/* Right Column - Product Info */}
          <div>
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mb-12">
          <TrustBadges />
        </div>

        {/* Product Details Tabs with Reviews */}
        <div className="mb-12">
          <ProductTabs 
            description={product.description}
            washCare={product.washCare}
            features={product.features}
            productId={product.id}
            productName={product.name}
          />
        </div>

        {/* Related Products */}
        <div>
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>
      </div>
    </div>
  );
}
