"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const curatedCollections = [
  {
    id: 1,
    name: "Retro Bellá",
    description: "Vintage-inspired pieces that celebrate timeless elegance",
    theme: "Nostalgic Romance",
    colorScheme: "Warm earth tones & muted pastels",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop",
    overlayImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop",
    products: [
      {
        id: 17,
        name: "Vintage Silk Blouse",
        price: 1899,
        originalPrice: 2399,
        image: "https://images.unsplash.com/photo-1544966503-7bb6d3967ff6?w=200&h=250&fit=crop"
      },
      {
        id: 18,
        name: "Retro A-Line Skirt",
        price: 1499,
        originalPrice: 1899,
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200&h=250&fit=crop"
      },
      {
        id: 19,
        name: "Classic Midi Dress",
        price: 2299,
        originalPrice: 2899,
        image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=200&h=250&fit=crop"
      }
    ],
    bgGradient: "from-rose-100 via-pink-50 to-orange-100",
    accentColor: "text-rose-700"
  },
  {
    id: 2,
    name: "Moonlit Dream",
    description: "Ethereal designs inspired by celestial beauty",
    theme: "Celestial Elegance",
    colorScheme: "Deep blues & shimmering silvers",
    image: "https://images.unsplash.com/photo-1566479179817-0a0ca2e18c72?w=800&h=600&fit=crop",
    overlayImage: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
    products: [
      {
        id: 20,
        name: "Starlight Evening Gown",
        price: 3999,
        originalPrice: 4999,
        image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=200&h=250&fit=crop"
      },
      {
        id: 21,
        name: "Moonbeam Cocktail Dress",
        price: 2799,
        originalPrice: 3499,
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=200&h=250&fit=crop"
      },
      {
        id: 22,
        name: "Cosmic Shimmer Top",
        price: 1599,
        originalPrice: 1999,
        image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=200&h=250&fit=crop"
      }
    ],
    bgGradient: "from-slate-100 via-blue-50 to-indigo-100",
    accentColor: "text-indigo-700"
  }
];

function CollectionCard({ collection }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${collection.bgGradient} p-8 lg:p-12`}>
      {/* Background Images */}
      <div className="absolute inset-0">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center min-h-[500px]">
        {/* Text Content */}
        <div className="space-y-6">
          <div>
            <h3 className={`text-4xl md:text-5xl font-bold ${collection.accentColor} mb-3`}>
              {collection.name}
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {collection.description}
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div>
                <span className="font-semibold">Theme:</span> {collection.theme}
              </div>
              <div>
                <span className="font-semibold">Palette:</span> {collection.colorScheme}
              </div>
            </div>
          </div>

          {/* Product Preview */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Featured Pieces</h4>
            <div className="grid grid-cols-3 gap-3">
              {collection.products.map((product) => (
                <div key={product.id} className="group">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden bg-white shadow-sm">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-2 text-xs">
                    <p className="font-medium text-gray-900 truncate">{product.name}</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-900 font-semibold">₹{product.price}</span>
                      <span className="text-gray-500 line-through text-xs">₹{product.originalPrice}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href={`/collection/${collection.name.toLowerCase().replace(' ', '-')}`}>
            <Button size="lg" className={`group ${collection.accentColor.replace('text-', 'bg-')} hover:opacity-90 text-white`}>
              Explore Collection
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Feature Image */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={collection.overlayImage}
                alt={`${collection.name} featured`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-xs text-gray-600">
                  <div className="font-bold">4.9</div>
                  <div>Collection</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CuratedCollections() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Curated Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our carefully crafted collections, each telling a unique story through fashion. 
            From vintage romance to celestial elegance, find pieces that resonate with your style narrative.
          </p>
        </div>

        <div className="space-y-16">
          {curatedCollections.map((collection, index) => (
            <div key={collection.id}>
              <CollectionCard collection={collection} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
