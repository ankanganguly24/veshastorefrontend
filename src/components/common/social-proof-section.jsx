import { Instagram } from "lucide-react";
import Image from "next/image";

export default function SocialProofSection() {
  // Real Instagram posts from vesha_official_
  const instagramPosts = [
    { 
      id: 1,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop",
      alt: "Fashion collection 1"
    },
    { 
      id: 2,
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop",
      alt: "Fashion collection 2"
    },
    { 
      id: 3,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
      alt: "Fashion collection 3"
    },
    { 
      id: 4,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      alt: "Fashion collection 4"
    },
    { 
      id: 5,
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop",
      alt: "Fashion collection 5"
    },
    { 
      id: 6,
      image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400&h=400&fit=crop",
      alt: "Fashion collection 6"
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Instagram Feed */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-3 text-gray-900 tracking-tight">
              Follow Our Journey
            </h2>
            <div className="w-12 h-px bg-primary mx-auto mb-4"></div>
            <p className="text-sm text-gray-500">@vesha_official_</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href="https://instagram.com/vesha_official_"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square relative overflow-hidden group bg-gray-100"
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                </div>
              </a>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="https://instagram.com/vesha_official_" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-primary transition-colors group"
            >
              <Instagram className="w-4 h-4" strokeWidth={1.5} />
              <span>Follow @vesha_official_</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="max-w-2xl mx-auto">
          <div className="border border-gray-200 rounded-sm p-12 text-center">
            <h2 className="text-2xl font-light mb-3 text-gray-900">Stay Updated</h2>
            <p className="text-sm text-gray-600 mb-8">
              Subscribe to receive exclusive offers and early access to new collections
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none text-sm"
              />
              <button 
                type="submit"
                className="px-8 py-3 bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              Join 10,000+ fashion enthusiasts
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
