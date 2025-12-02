import Link from "next/link";
import { ArrowLeft, FileText, Scale, ShieldCheck, HelpCircle } from "lucide-react";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <div className="relative bg-black text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
            Terms & Conditions
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-300 max-w-2xl mx-auto">
            Please read these terms carefully before using our services. By accessing or using the Service, you agree to be bound by these Terms.
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
          <h2 className="text-3xl font-light mb-6">Welcome to VESHA</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Where tradition meets effortless elegance. At VESHA, we curate handpicked ethnic wear that beautifully blends cultural craftsmanship with modern grace. Every piece is chosen to make you feel confident, timeless, and uniquely you — no matter the occasion. Because VESHA is not just an attire, it’s The Art of Indian Attire.
          </p>
        </div>

        {/* Terms Content */}
        <div className="space-y-12">
          <section>
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 mr-3 text-gray-400" />
              <h3 className="text-2xl font-medium">1. General Conditions</h3>
            </div>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <Scale className="w-6 h-6 mr-3 text-gray-400" />
              <h3 className="text-2xl font-medium">2. Products and Services</h3>
            </div>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor&apos;s display of any color will be accurate. We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <ShieldCheck className="w-6 h-6 mr-3 text-gray-400" />
              <h3 className="text-2xl font-medium">3. Accuracy of Billing and Account Information</h3>
            </div>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. You agree to provide current, complete and accurate purchase and account information for all purchases made at our store.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <HelpCircle className="w-6 h-6 mr-3 text-gray-400" />
              <h3 className="text-2xl font-medium">4. Contact Information</h3>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
              <p className="text-gray-600 mb-4">
                Questions about the Terms of Service should be sent to us at:
              </p>
              <div className="space-y-2">
                <p className="font-medium text-black">VESHA</p>
                <p>H.I.G, Uttorayon</p>
                <p>Siliguri, West Bengal 734010</p>
                <p>Phone: +91 92390 00677</p>
                <p>Email: myvesha2025@gmail.com</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
