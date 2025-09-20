import ProductCard from "@/components/common/product-card";

export default function CategoryPage({ params }) {
  const { category } = params || {};
  
  // Handle category parameter - it could be an array or string
  const categoryName = Array.isArray(category) 
    ? category.join(' ').replace(/-/g, ' ') 
    : typeof category === 'string' 
    ? category.replace(/-/g, ' ') 
    : 'All Products';
  
  const categoryPath = Array.isArray(category) ? category.join('/') : category || '';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 capitalize bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {categoryName}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of premium fashion items
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100 sticky top-24">
              <h3 className="font-bold text-lg mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Filters
              </h3>
              
              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-800">Price Range</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-purple-300 text-purple-600 focus:ring-purple-500" />
                    <span className="text-sm text-gray-600">Under ₹1,000</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-purple-300 text-purple-600 focus:ring-purple-500" />
                    <span className="text-sm text-gray-600">₹1,000 - ₹2,500</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-purple-300 text-purple-600 focus:ring-purple-500" />
                    <span className="text-sm text-gray-600">₹2,500 - ₹5,000</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-purple-300 text-purple-600 focus:ring-purple-500" />
                    <span className="text-sm text-gray-600">Above ₹5,000</span>
                  </label>
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-800">Size</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      className="py-2 px-3 text-sm border border-purple-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-800">Colors</h4>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { name: 'Red', bg: 'bg-red-500' },
                    { name: 'Blue', bg: 'bg-blue-500' },
                    { name: 'Green', bg: 'bg-green-500' },
                    { name: 'Purple', bg: 'bg-purple-500' },
                    { name: 'Pink', bg: 'bg-pink-500' },
                    { name: 'Yellow', bg: 'bg-yellow-500' },
                    { name: 'Black', bg: 'bg-black' },
                    { name: 'White', bg: 'bg-white border' }
                  ].map((color) => (
                    <button
                      key={color.name}
                      className={`w-8 h-8 rounded-full ${color.bg} hover:scale-110 transition-transform shadow-md`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort and View Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-purple-100">
              <div className="text-sm text-gray-600 mb-2 sm:mb-0">
                Showing <span className="font-semibold">1-12</span> of <span className="font-semibold">48</span> products
              </div>
              <div className="flex items-center space-x-4">
                <select className="px-3 py-2 text-sm border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[
                { 
                  id: 1, 
                  slug: "nawabi-royal-kurta-set",
                  name: 'Nawabi Royal Kurta Set', 
                  price: 2299, 
                  originalPrice: 2799, 
                  discount: 18, 
                  category: 'NAWABI EXCLUSIVE', 
                  gradient: 'from-amber-400 to-orange-500',
                  rating: 4.8,
                  reviewCount: 156,
                  images: [
                    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=500&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop"
                  ]
                },
                { 
                  id: 2, 
                  slug: "designer-peplum-jacket",
                  name: 'Designer Peplum Jacket', 
                  price: 1899, 
                  originalPrice: 2299, 
                  discount: 17, 
                  category: 'OUTERWEAR', 
                  gradient: 'from-blue-400 to-indigo-500',
                  rating: 4.6,
                  reviewCount: 89,
                  images: [
                    "https://images.unsplash.com/photo-1544966503-7bb6d3967ff6?w=500&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=600&fit=crop"
                  ]
                },
                { 
                  id: 3, 
                  slug: "elegant-kaftan-dress",
                  name: 'Elegant Kaftan Dress', 
                  price: 1599, 
                  originalPrice: 1999, 
                  discount: 20, 
                  category: 'ETHNIC WEAR', 
                  gradient: 'from-emerald-400 to-teal-500',
                  rating: 4.7,
                  reviewCount: 124,
                  images: [
                    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&h=600&fit=crop"
                  ]
                },
                { 
                  id: 4, 
                  slug: "embroidered-shrug",
                  name: 'Embroidered Shrug', 
                  price: 1299, 
                  originalPrice: 1599, 
                  discount: 19, 
                  category: 'OUTERWEAR', 
                  gradient: 'from-pink-400 to-rose-500',
                  rating: 4.5,
                  reviewCount: 67,
                  images: [
                    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=500&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1566479179817-0a0ca2e18c72?w=500&h=600&fit=crop"
                  ]
                },
                { 
                  id: 5, 
                  slug: "festive-wear-set",
                  name: 'Festive Wear Set', 
                  price: 2499, 
                  originalPrice: 2999, 
                  discount: 17, 
                  category: 'ETHNIC WEAR', 
                  gradient: 'from-purple-400 to-indigo-500',
                  rating: 4.8,
                  reviewCount: 98,
                  images: [
                    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=600&fit=crop"
                  ]
                },
                { 
                  id: 6, 
                  slug: "stylish-coord-set",
                  name: 'Stylish Co-ord Set', 
                  price: 1799, 
                  originalPrice: 2199, 
                  discount: 18, 
                  category: 'WESTERN WEAR', 
                  gradient: 'from-violet-400 to-purple-500',
                  rating: 4.4,
                  reviewCount: 78,
                  images: [
                    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=600&fit=crop"
                  ]
                },
                { 
                  id: 7, 
                  slug: "traditional-koti",
                  name: 'Traditional Koti', 
                  price: 1399, 
                  originalPrice: 1699, 
                  discount: 18, 
                  category: 'OUTERWEAR', 
                  gradient: 'from-teal-400 to-cyan-500',
                  rating: 4.6,
                  reviewCount: 92,
                  images: [
                    "https://images.unsplash.com/photo-1506629905773-53c8329d2ea8?w=500&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=500&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&h=600&fit=crop"
                  ]
                },
                { 
                  id: 8, 
                  slug: "designer-shirt",
                  name: 'Designer Shirt', 
                  price: 999, 
                  originalPrice: 1299, 
                  discount: 23, 
                  category: 'WESTERN WEAR', 
                  gradient: 'from-green-400 to-emerald-500',
                  rating: 4.3,
                  reviewCount: 54,
                  images: [
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&h=600&fit=crop"
                  ]
                },
                { 
                  id: 9, 
                  slug: "casual-bottom-wear",
                  name: 'Casual Bottom Wear', 
                  price: 899, 
                  originalPrice: 1199, 
                  discount: 25, 
                  category: 'BOTTOM WEAR', 
                  gradient: 'from-orange-400 to-red-500',
                  rating: 4.2,
                  reviewCount: 43,
                  images: [
                    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop"
                  ]
                }
              ].map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-purple-100">
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-purple-600 transition-colors">
                  Previous
                </button>
                {[1, 2, 3, 4].map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      page === 1 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-purple-600 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
