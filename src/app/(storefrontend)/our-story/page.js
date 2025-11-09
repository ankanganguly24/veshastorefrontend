import Link from "next/link";
import { ArrowLeft, BookOpen, Phone, Mail, MessageCircle, Instagram } from "lucide-react";

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Our Story</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            The heartfelt journey of VESHA — The Art of Indian Attire
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-500 font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Story Content */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-10">
          <div className="space-y-6 text-gray-800 leading-relaxed text-lg">
            <p className="text-gray-700">
              Hey there, this is <span className="font-semibold text-emerald-700">Shristi</span>.
            </p>
            <p>
              Thank you for stopping by — I’m truly happy to welcome you to{" "}
              <span className="font-semibold text-emerald-700">VESHA</span>.
            </p>
            <p>
              VESHA was born from a simple feeling — the joy of dressing up in something that feels
              like home. I have always believed that the beauty of Indian ethnic wear lies not just
              in how it looks, but in how it feels — warm, rooted, graceful, and expressive.
              Clothes are never just outfits; they are memories stitched together by tradition.
            </p>
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
            <p className="text-emerald-700 font-semibold italic">
              VESHA is not just an attire — it’s{" "}
              <span className="underline">The Art of Indian Attire.</span>
            </p>
          </div>
        </div>

        {/* Contact Card */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl p-8 mt-12 text-white">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Connect with Us
          </h3>
          <p className="text-emerald-100 mb-4">
            You can reach us anytime — we’re always here to help!
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <Instagram className="w-4 h-4 mr-2" />
              <span>
                Instagram DM:{" "}
                <a
                  href="https://www.instagram.com/vesha_official_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-emerald-200"
                >
                  @vesha_official_
                </a>
              </span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              <span>
                WhatsApp Support:{" "}
                <a
                  href="https://wa.me/919239000677"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-emerald-200"
                >
                  +91 92390 00677
                </a>
              </span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <span>
                Email:{" "}
                <a
                  href="mailto:myvesha2025@gmail.com"
                  className="underline hover:text-emerald-200"
                >
                  myvesha2025@gmail.com
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
