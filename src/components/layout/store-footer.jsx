"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StoreFooter() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white mt-auto">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Get in Touch Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Get in Touch
              </h3>
              <div className="space-y-3">
                <div className="text-sm text-gray-300">
                  <p className="font-medium text-white mb-1">Legal Name</p>
                  <p>Rinaura Fashion Private Limited</p>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Phone className="h-4 w-4 flex-shrink-0 text-blue-400" />
                  <div>
                    <p className="font-medium text-white">Phone Support</p>
                    <a href="tel:+919351774585" className="hover:text-blue-400 transition-colors">
                      +91 93517 74585
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Mail className="h-4 w-4 flex-shrink-0 text-green-400" />
                  <div>
                    <p className="font-medium text-white">Email Support</p>
                    <a href="mailto:rinauraindia@gmail.com" className="hover:text-green-400 transition-colors">
                      rinauraindia@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Information
              </h3>
              <nav className="space-y-2">
                <Link href="/privacy-policy" className="block text-sm text-gray-300 hover:text-blue-400 transition-colors hover:translate-x-1 transform duration-200">
                  Privacy Policy
                </Link>
                <Link href="/shipping-policy" className="block text-sm text-gray-300 hover:text-blue-400 transition-colors hover:translate-x-1 transform duration-200">
                  Shipping Policy
                </Link>
                <Link href="/return-exchange-policy" className="block text-sm text-gray-300 hover:text-blue-400 transition-colors hover:translate-x-1 transform duration-200">
                  Return & Exchange Policy
                </Link>
                <Link href="/terms-of-service" className="block text-sm text-gray-300 hover:text-blue-400 transition-colors hover:translate-x-1 transform duration-200">
                  Terms of Service
                </Link>
                <Link href="/terms-of-use" className="block text-sm text-gray-300 hover:text-blue-400 transition-colors hover:translate-x-1 transform duration-200">
                  Terms of Use
                </Link>
              </nav>
            </div>

            {/* Discover Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Discover
              </h3>
              <nav className="space-y-2">
                <Link href="/our-story" className="block text-sm text-gray-300 hover:text-green-400 transition-colors hover:translate-x-1 transform duration-200">
                  Our Story
                </Link>
                <Link href="/meet-the-founder" className="block text-sm text-gray-300 hover:text-green-400 transition-colors hover:translate-x-1 transform duration-200">
                  Meet The Founder
                </Link>
                <Link href="/faq" className="block text-sm text-gray-300 hover:text-green-400 transition-colors hover:translate-x-1 transform duration-200">
                  Frequently Asked Questions
                </Link>
              </nav>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Sign Up and Save
              </h3>
              <p className="text-sm text-gray-300">
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Your e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white focus:ring-white/20"
                />
                <Button type="submit" className="w-full bg-white text-primary hover:bg-white/90 font-semibold transform hover:scale-105 transition-all duration-200">
                  Subscribe
                </Button>
              </form>
              
              {/* Social Media Links */}
              <div className="pt-4">
                <p className="text-sm font-medium text-white mb-3">Follow us</p>
                <p className="text-xs text-gray-300 mb-3">
                  Stay connected with us on social media for the latest updates, offers, and more!
                </p>
                <div className="flex space-x-3">
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white hover:text-white/90 transition-all duration-200 hover:scale-110" asChild>
                    <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                      <Facebook className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white hover:text-white/90 transition-all duration-200 hover:scale-110" asChild>
                    <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-blue-400/20 hover:bg-blue-400/40 text-blue-300 hover:text-blue-200 transition-all duration-200 hover:scale-110" asChild>
                    <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-red-600/20 hover:bg-red-600/40 text-red-400 hover:text-red-300 transition-all duration-200 hover:scale-110" asChild>
                    <a href="#" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                      <Youtube className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-300">
              © {new Date().getFullYear()} Rinaura Fashion Private Limited. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-sm text-gray-300 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-300 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-sm text-gray-300 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
