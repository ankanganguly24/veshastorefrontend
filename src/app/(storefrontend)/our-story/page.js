"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Instagram, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2000&auto=format&fit=crop"
          alt="Vesha Story"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight">Our Story</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Back Navigation */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Story Content */}
        <div className="space-y-12 text-lg leading-relaxed font-light text-gray-800">
          <div className="border-l-2 border-primary pl-6 py-2">
            <p className="text-2xl font-light text-gray-900 italic">
              &quot;Vesha is not just an attire — it’s The Art of Indian Attire.&quot;
            </p>
          </div>

          <p>
            Hey there, this is <span className="font-medium text-black">Shristi</span>.
          </p>

          <p>
            Thank you for stopping by — I’m truly happy to welcome you to{" "}
            <span className="font-medium text-black">VESHA</span>.
          </p>

          <p>
            VESHA was born from a simple feeling — the joy of dressing up in something that feels
            like home. I have always believed that the beauty of Indian ethnic wear lies not just
            in how it looks, but in how it feels — warm, rooted, graceful, and expressive.
            Clothes are never just outfits; they are memories stitched together by tradition.
          </p>

          <div className="my-12 relative h-96 w-full rounded-sm overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2000&auto=format&fit=crop"
              alt="Fabric details"
              fill
              className="object-cover"
            />
          </div>

          <p>
            As we moved through cities, timelines, and busy lives, I realized that these beautiful
            pieces of culture were becoming harder to find — often replaced by fast fashion that
            lacked the soul of craftsmanship.
          </p>

          <p>
            So, VESHA began with a promise: to bring authentic, elegant Indian ethnic wear that
            blends timeless tradition with modern comfort. We carefully source every piece from
            talented artisans across India and bring it straight to your doorstep, wherever you
            call home.
          </p>

          <p>
            Every piece is thoughtfully chosen for its fabric quality, embroidery, and fall —
            ensuring you don’t just look beautiful, but feel beautiful.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-24 border-t border-gray-100 pt-16">
          <h3 className="text-2xl font-light mb-8 text-center">Connect with Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <a 
              href="https://www.instagram.com/vesha_official_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-6 rounded-sm border border-gray-100 hover:border-gray-900 transition-colors"
            >
              <Instagram className="w-6 h-6 mx-auto mb-4 text-gray-400 group-hover:text-black transition-colors" strokeWidth={1.5} />
              <span className="block text-sm font-medium">Instagram</span>
              <span className="text-xs text-gray-500 mt-1">@vesha_official_</span>
            </a>

            <a 
              href="https://wa.me/919239000677" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-6 rounded-sm border border-gray-100 hover:border-gray-900 transition-colors"
            >
              <MessageCircle className="w-6 h-6 mx-auto mb-4 text-gray-400 group-hover:text-black transition-colors" strokeWidth={1.5} />
              <span className="block text-sm font-medium">WhatsApp</span>
              <span className="text-xs text-gray-500 mt-1">+91 92390 00677</span>
            </a>

            <a 
              href="mailto:myvesha2025@gmail.com"
              className="group p-6 rounded-sm border border-gray-100 hover:border-gray-900 transition-colors"
            >
              <Mail className="w-6 h-6 mx-auto mb-4 text-gray-400 group-hover:text-black transition-colors" strokeWidth={1.5} />
              <span className="block text-sm font-medium">Email</span>
              <span className="text-xs text-gray-500 mt-1">myvesha2025@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
