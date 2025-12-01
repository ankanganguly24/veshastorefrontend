"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog-data";

export default function StyleEditSection() {
  // Use the first 3 blog posts for the home page
  const featuredEditorials = blogPosts.slice(0, 3);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-widest mb-2 block">Curated Collections</span>
            <h2 className="text-4xl font-light text-gray-900 tracking-tight">The Vesha Editorial</h2>
          </div>
          <Link href="/blogs" className="hidden md:flex items-center text-sm font-medium hover:underline underline-offset-4">
            View All Stories <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredEditorials.map((item, index) => (
            <Link 
              key={item.id}
              href={`/blogs/${item.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-6">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium uppercase tracking-wider">
                  {item.tags[0]}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-xs text-gray-500 gap-2">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </div>
                <h3 className="text-xl font-medium text-gray-900 leading-tight group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 font-light">
                  {item.excerpt}
                </p>
                <div className="inline-flex items-center text-sm font-medium text-black underline decoration-1 underline-offset-4 group-hover:decoration-2 mt-2">
                  Read Story
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Button asChild variant="outline">
            <Link href="/blogs">View All Stories</Link>
          </Button>
        </div>

        {/* Brand Philosophy Banner */}
        <div className="mt-24 relative rounded-sm overflow-hidden bg-gray-900 py-20 px-6 text-center">
          <div className="absolute inset-0 opacity-30">
            <Image
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2000&auto=format&fit=crop"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 leading-tight">
              "Fashion is not just about what you wear, but how you feel."
            </h2>
            <p className="text-gray-200 text-lg font-light mb-8">
              At Vesha, we believe in sustainable luxury that empowers your individuality.
            </p>
            <Button asChild className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg rounded-full border-none">
              <Link href="/about">Discover Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
