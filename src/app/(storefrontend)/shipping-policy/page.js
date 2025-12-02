import Link from "next/link";
import { ArrowLeft, Truck, Clock, MapPin, Package, Phone, Mail, Globe } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <div className="relative bg-black text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
            Shipping Policy
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-300 max-w-2xl mx-auto">
            Fast, reliable delivery across India. We partner with Shiprocket to ensure your VESHA attire reaches you safely.
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
          <h2 className="text-3xl font-light mb-6">Delivery Partners</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            At VESHA, we understand the excitement of receiving your order. That&apos;s why we have partnered with <strong>Shiprocket</strong>, India&apos;s leading logistics aggregator, to provide you with the fastest and most reliable shipping experience. We use top-tier courier partners like Delhivery, Bluedart, Xpressbees, and Shadowfax.
          </p>
        </div>

        {/* Shipping Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                <Clock className="w-6 h-6 text-gray-800" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Processing Time</h3>
                <p className="text-gray-600">
                  All orders are processed within 1-2 business days. Orders placed after 2 PM IST will be processed the next business day. You will receive a notification once your order is shipped.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                <Truck className="w-6 h-6 text-gray-800" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Delivery Time</h3>
                <p className="text-gray-600">
                  Standard delivery typically takes 5-7 business days depending on your location. Metro cities may receive orders sooner (2-4 days).
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                <MapPin className="w-6 h-6 text-gray-800" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Shipping Coverage</h3>
                <p className="text-gray-600">
                  We ship across all major pin codes in India. If your location is unserviceable by our standard partners, we will contact you to arrange an alternative.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                <Package className="w-6 h-6 text-gray-800" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Order Tracking</h3>
                <p className="text-gray-600">
                  Once shipped, you will receive a tracking link via SMS/Email. You can track your package in real-time through our Shiprocket tracking page.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Charges */}
        <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 mb-16">
          <h3 className="text-2xl font-medium mb-6 text-center">Shipping Charges</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 font-medium text-gray-900">Order Value</th>
                  <th className="py-3 px-4 font-medium text-gray-900">Shipping Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-600">Below ₹999</td>
                  <td className="py-3 px-4 text-gray-600">₹99</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-600">Above ₹999</td>
                  <td className="py-3 px-4 text-green-600 font-medium">FREE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center">
          <h3 className="text-2xl font-medium mb-6">Shipping Support</h3>
          <p className="text-gray-600 mb-4">
            If you have any questions about your order&apos;s delivery, please contact us:
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 text-gray-800">
            <div className="flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>+91 92390 00677</span>
            </div>
            <div className="flex items-center justify-center">
              <Mail className="w-5 h-5 mr-2" />
              <span>myvesha2025@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
