"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  Send
} from "lucide-react";
import Link from "next/link";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Story", href: "/our-story" },
    { name: "Meet the Founder", href: "/meet-the-founder" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Blog", href: "/blog" }
  ],
  collections: [
    { name: "Nawabi Exclusive", href: "/category/nawabi-exclusive" },
    { name: "Festive Wear", href: "/category/festive-wear" },
    { name: "New Arrivals", href: "/category/new-arrivals" },
    { name: "Spark & Style", href: "/category/spark-style" },
    { name: "Retro Bellá", href: "/collection/retro-bella" },
    { name: "Moonlit Dream", href: "/collection/moonlit-dream" }
  ],
  customerCare: [
    { name: "Contact Us", href: "/contact" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "FAQ", href: "/faq" },
    { name: "Track Order", href: "/track-order" },
    { name: "Returns & Exchange", href: "/return-exchange-policy" },
    { name: "Care Instructions", href: "/care-instructions" }
  ],
  policies: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Terms of Use", href: "/terms-of-use" },
    { name: "Shipping Policy", href: "/shipping-policy" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Cookie Policy", href: "/cookie-policy" }
  ]
};

const socialLinks = [
  { 
    name: "Facebook", 
    icon: Facebook, 
    href: "https://facebook.com/vesha", 
    color: "hover:text-blue-600" 
  },
  { 
    name: "Instagram", 
    icon: Instagram, 
    href: "https://instagram.com/vesha", 
    color: "hover:text-pink-600" 
  },
  { 
    name: "Twitter", 
    icon: Twitter, 
    href: "https://twitter.com/vesha", 
    color: "hover:text-blue-400" 
  },
  { 
    name: "YouTube", 
    icon: Youtube, 
    href: "https://youtube.com/vesha", 
    color: "hover:text-red-600" 
  }
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Stay in Style with Vesha
            </h3>
            <p className="text-blue-100 mb-8 text-lg">
              Get exclusive access to new collections, special offers, and style inspiration
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                  required
                />
                <Button 
                  type="submit" 
                >
                  <Send className="w-4 h-4 mr-2" />
                  Subscribe
                </Button>
              </div>
              {isSubscribed && (
                <p className="text-green-300 text-sm mt-2">
                  ✓ Thank you for subscribing! Welcome to the Vesha family.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-4">Vesha</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Crafting timeless elegance through contemporary fashion. From traditional heritage wear to modern chic, Vesha brings you curated collections that celebrate every woman's unique style.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">hello@vesha.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-1" />
                <span className="text-gray-300">
                  123 Fashion Street,<br />
                  Mumbai, Maharashtra 400001
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full bg-gray-800 text-gray-400 transition-colors ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Collections</h4>
            <ul className="space-y-3">
              {footerLinks.collections.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Customer Care</h4>
            <ul className="space-y-3">
              {footerLinks.customerCare.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Policies</h4>
            <ul className="space-y-3">
              {footerLinks.policies.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2025 Vesha. All rights reserved.
              </p>
              <div className="hidden md:flex items-center space-x-1 text-gray-400 text-sm">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>in India</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" 
                  alt="Razorpay"
                  className="h-6 opacity-70"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" 
                  alt="Visa"
                  className="h-4 opacity-70"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                  alt="Mastercard"
                  className="h-6 opacity-70"
                />
                <span className="text-xs">Secure payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
