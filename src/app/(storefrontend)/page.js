import Link from "next/link";

export default function StoreFrontendHome() {
  const collections = [
    {
      title: "NAWABI EXCLUSIVE",
      description: "Royal heritage collection with traditional elegance",
      bgGradient: "from-primary to-primary/80",
      textColor: "text-white",
      href: "/category/nawabi-exclusive"
    },
    {
      title: "ETHNIC WEAR", 
      description: "Beautiful kurtas, kaftans and festive wear",
      bgGradient: "from-primary/80 to-primary/60",
      textColor: "text-white",
      href: "/category/ethnic-wear"
    },
    {
      title: "WESTERN WEAR",
      description: "Modern dresses, shirts and co-ord sets",
      bgGradient: "from-primary/60 to-primary/40",
      textColor: "text-white",
      href: "/category/western-wear"
    }
  ];

  const featuredProducts = [
    { name: "Nawabi Royal Kurta", category: "NAWABI EXCLUSIVE", price: 2299, gradient: "from-primary to-primary/80" },
    { name: "Designer Peplum Jacket", category: "OUTERWEAR", price: 1899, gradient: "from-primary/80 to-primary/60" },
    { name: "Elegant Kaftan Dress", category: "ETHNIC WEAR", price: 1599, gradient: "from-primary/60 to-primary/40" },
    { name: "Stylish Co-ord Set", category: "WESTERN WEAR", price: 1799, gradient: "from-primary/40 to-primary/20" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Welcome to Vesha
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Your premium fashion destination where style meets elegance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/category/nawabi-exclusive" className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg">
                Shop Nawabi Exclusive
              </Link>
              <Link href="/category/ethnic-wear" className="bg-primary/30 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/40 transition-all transform hover:scale-105 border border-white/20">
                Explore Ethnic Wear
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Collections Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-primary">
              Shop by Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully curated collections designed for every style and occasion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <a key={index} href={collection.href} className="group block">
                <div className={`bg-gradient-to-br ${collection.bgGradient} rounded-2xl p-8 h-80 relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                  <div className={`relative z-10 h-full flex flex-col justify-between ${collection.textColor}`}>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{collection.title}</h3>
                      <p className="text-white/90 mb-6">{collection.description}</p>
                    </div>
                    <div className="flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform">
                      <span>Explore Collection</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/10 rounded-full"></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-primary">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked favorites that showcase the best of our collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className={`h-64 bg-gradient-to-br ${product.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
                    {product.category}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="w-8 h-8 bg-white/20 rounded-full mb-2"></div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-2 text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">Premium quality • Latest design</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ₹{product.price}
                    </span>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 hover:shadow-lg transition-all transform hover:scale-105">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Stay in Style</h2>
            <p className="text-xl mb-8 text-white/90">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-white/80 mt-4">
              Join 10,000+ fashion lovers who never miss our updates
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-2 text-primary">10K+</h3>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-primary/80 rounded-full mx-auto mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-2 text-primary">500+</h3>
              <p className="text-muted-foreground">Products</p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-primary/60 rounded-full mx-auto mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-2 text-primary">24/7</h3>
              <p className="text-muted-foreground">Support</p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-primary/40 rounded-full mx-auto mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-2 text-primary">100%</h3>
              <p className="text-muted-foreground">Quality</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
