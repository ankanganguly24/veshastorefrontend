"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Facebook, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from "lucide-react";

const footerLinks = {
  company: [
    { name: "Our Story", href: "/our-story" },
    { name: "FAQ", href: "/faq" },
  ],
  policies: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Terms of Use", href: "/terms-of-use" },
    { name: "Shipping Policy", href: "/shipping-policy" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ],
};

const socialLinks = [
  { 
    name: "Facebook", 
    icon: Facebook, 
    href: "https://facebook.com/vesha", 
  },
  { 
    name: "Instagram", 
    icon: Instagram, 
    href: "https://www.instagram.com/vesha_official_?igsh=czhnZDB5NnB0OXV0", 
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Link href="/" className="flex items-center mb-4">
                <Image
                  src="/veshalogo.png"
                  alt="VESHA"
                  width={200}
                  height={80}
                  className="h-16 w-auto object-contain filter brightness-0 invert"
                  priority
                />
              </Link>
              <p className="text-white/80 leading-relaxed mb-6">
                Where tradition meets effortless elegance. At{" "}
                <span className="font-semibold text-white">VESHA</span>, we curate handpicked ethnic wear that beautifully blends cultural craftsmanship with modern grace. 
                Every piece is chosen to make you feel confident, timeless, and uniquely you — no matter the occasion. Because VESHA is not just an attire, it’s{" "}
                <span className="italic">The Art of Indian Attire.</span>
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-white/70" />
                <span className="text-white/80">+91 92390 00677</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-white/70" />
                <span className="text-white/80">myvesha2025@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-white/70 mt-1" />
                <span className="text-white/80">
                  H.I.G, Uttorayon<br />
                  Siliguri, West Bengal 734010
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
                    className="p-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
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
                    className="text-white/70 hover:text-white transition-colors"
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
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Searches & Collections */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6">From the Blog</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/blogs/art-of-indian-attire" className="group block">
                  <span className="text-white/90 font-medium group-hover:text-white transition-colors block mb-1">
                    The Art of Indian Attire
                  </span>
                  <span className="text-xs text-white/60 block">
                    Dec 1, 2025
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blogs/choosing-right-fabric" className="group block">
                  <span className="text-white/90 font-medium group-hover:text-white transition-colors block mb-1">
                    Choosing the Right Fabric
                  </span>
                  <span className="text-xs text-white/60 block">
                    Nov 28, 2025
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-white/60 text-sm">
                © {new Date().getFullYear()} VESHA. All rights reserved.
              </p>
              <div className="hidden md:flex items-center space-x-1 text-white/60 text-sm">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>in India</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-white/60">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" 
                  alt="Razorpay"
                  className="h-6 brightness-0 invert opacity-70"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" 
                  alt="Visa"
                  className="h-4 brightness-0 invert opacity-70"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                  alt="Mastercard"
                  className="h-6 brightness-0 invert opacity-70"
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
