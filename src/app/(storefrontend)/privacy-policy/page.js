import Link from "next/link";
import { ArrowLeft, Lock, Eye, Database, Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <div className="relative bg-black text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-300 max-w-2xl mx-auto">
            Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Back Navigation */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-black transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Introduction */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-light mb-6">At VESHA</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We are committed to maintaining the trust and confidence of our visitors to our web site. In this Privacy Policy, we’ve provided detailed information on when and why we collect your personal information, how we use it, the limited conditions under which we may disclose it to others and how we keep it secure.
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-12">
          <section>
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 mr-3 text-gray-400" />
              <h3 className="text-2xl font-medium">1. Information We Collect</h3>
            </div>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                When you visit our Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 mr-3 text-gray-400" />
              <h3 className="text-2xl font-medium">2. How We Use Your Information</h3>
            </div>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Communicate with you;</li>
                <li>Screen our orders for potential risk or fraud; and</li>
                <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 mr-3 text-gray-400" />
              <h3 className="text-2xl font-medium">3. Data Retention</h3>
            </div>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 mr-3 text-gray-400" />
              <h3 className="text-2xl font-medium">4. Contact Us</h3>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
              <p className="text-gray-600 mb-4">
                For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at myvesha2025@gmail.com or by mail using the details provided below:
              </p>
              <div className="space-y-2">
                <p className="font-medium text-black">VESHA</p>
                <p>H.I.G, Uttorayon</p>
                <p>Siliguri, West Bengal 734010</p>
                <p>Phone: +91 92390 00677</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
