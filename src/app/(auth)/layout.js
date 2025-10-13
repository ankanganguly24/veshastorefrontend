import { Inter } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/layout/footer";
import { ChevronLeft } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Auth - Vesha",
  description: "Login and Register for Ecommerce",
};

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <ChevronLeft className="h-10 w-10 text-primary" />
            </Link>
            <Link href="/">
              <Image
                src="/veshalogo.png"
                alt="Vesha"
                width={120}
                height={40}
                className="h-24 w-auto object-contain"
              />
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-grow bg-gradient-to-br from-primary/5 to-primary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              {children}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
