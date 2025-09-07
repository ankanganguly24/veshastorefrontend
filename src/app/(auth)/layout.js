import { Inter } from "next/font/google";
import "../globals.css";

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
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-background dark:to-muted">
      {/* Left Content Section */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-gradient-to-br from-primary to-purple-700 dark:from-primary dark:to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-primary-foreground">
          <div className="mb-8">
            <h1 className="text-4xl xl:text-5xl font-bold mb-4">
              Welcome to{" "}
              <span className="text-yellow-300 dark:text-yellow-400">Vesha</span>
            </h1>
            <p className="text-xl xl:text-2xl text-primary-foreground/80 leading-relaxed">
              Your ultimate destination for premium shopping experience
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 dark:bg-yellow-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-primary dark:text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary-foreground">
                  Secure Shopping
                </h3>
                <p className="text-primary-foreground/80">
                  Your data and transactions are protected with enterprise-grade
                  security
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 dark:bg-yellow-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-primary dark:text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary-foreground">
                  Premium Quality
                </h3>
                <p className="text-primary-foreground/80">
                  Curated collection of high-quality products from trusted brands
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 dark:bg-yellow-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-primary dark:text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary-foreground">
                  Fast Delivery
                </h3>
                <p className="text-primary-foreground/80">
                  Quick and reliable delivery to your doorstep
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-300/20 dark:bg-yellow-400/20 rounded-full"></div>
        <div className="absolute bottom-20 right-32 w-20 h-20 bg-white/10 dark:bg-white/5 rounded-full"></div>
        <div className="absolute top-1/2 right-8 w-16 h-16 bg-purple-400/30 dark:bg-purple-500/30 rounded-full"></div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8 lg:ml-0">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-xl border border-border p-8 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-700 rounded-2xl flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Get Started
              </h2>
              <p className="text-muted-foreground text-sm">
                Continue your journey with us
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
