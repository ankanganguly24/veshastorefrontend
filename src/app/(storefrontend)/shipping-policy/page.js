import Link from "next/link";
import { ArrowLeft, Truck, Clock, MapPin, Package, Phone, Mail, Globe, CheckCircle } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <Truck className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Shipping Policy
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Fast, reliable delivery across India. Learn about our shipping options and delivery timeline.
            </p>
            <div className="flex items-center justify-center mt-6 text-blue-200">
              <Clock className="w-4 h-4 mr-2" />
              <span>Last updated: January 1, 2024</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-500 font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Company Contact Info Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Rinaura Fashion Private Limited</h2>
            <p className="text-gray-600">Delivering fashion across India</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone Support</h3>
                  <p className="text-gray-600">Shipping assistance</p>
                </div>
              </div>
              <a href="tel:+919351774585" className="text-lg font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                +91 93517 74585
              </a>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Support</h3>
                  <p className="text-gray-600">Track your orders</p>
                </div>
              </div>
              <a href="mailto:rinauraindia@gmail.com" className="text-lg font-semibold text-purple-600 hover:text-purple-500 transition-colors">
                rinauraindia@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Shipping Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Options */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                Delivery Options
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Standard Delivery</h4>
                  <p className="text-gray-700 text-sm mb-3">5-7 business days</p>
                  <p className="text-gray-600 text-sm">FREE for orders above ₹999</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Express Delivery</h4>
                  <p className="text-gray-700 text-sm mb-3">2-3 business days</p>
                  <p className="text-gray-600 text-sm">₹149 additional charge</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Same Day</h4>
                  <p className="text-gray-700 text-sm mb-3">Within 12 hours</p>
                  <p className="text-gray-600 text-sm">Select cities only</p>
                </div>
              </div>
            </div>

            {/* Processing Time */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                Processing Time
              </h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Order Processing</h4>
                  <p className="text-gray-700">All orders are processed within 1-2 business days. Orders placed after 2 PM IST will be processed the next business day.</p>
                </div>
                
                <div className="border-l-4 border-purple-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Quality Check</h4>
                  <p className="text-gray-700">Each item goes through our quality assurance process before packaging to ensure you receive the best products.</p>
                </div>
                
                <div className="border-l-4 border-green-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Packaging</h4>
                  <p className="text-gray-700">Items are carefully packaged with eco-friendly materials to ensure safe delivery while protecting the environment.</p>
                </div>
              </div>
            </div>

            {/* Shipping Coverage */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                  <Globe className="w-5 h-5 text-green-600" />
                </div>
                Shipping Coverage
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                We deliver across India to ensure everyone can enjoy Rinaura Fashion's premium clothing collection.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Metro Cities</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Delhi NCR, Mumbai, Bangalore</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Chennai, Kolkata, Hyderabad</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Pune, Ahmedabad, Jaipur</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Other Areas</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">All Tier 2 & Tier 3 cities</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Rural areas (PIN serviceable)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">Cash on Delivery available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Charges */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Shipping Charges</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Order Value</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Standard Delivery</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Express Delivery</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700">Below ₹999</td>
                      <td className="py-3 px-4 text-gray-700">₹99</td>
                      <td className="py-3 px-4 text-gray-700">₹249</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700">₹999 - ₹1999</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">FREE</td>
                      <td className="py-3 px-4 text-gray-700">₹149</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-700">Above ₹1999</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">FREE</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">FREE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Track Order */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-6 text-white">
              <h3 className="font-semibold mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Track Your Order
              </h3>
              <p className="text-blue-100 mb-4">
                Get real-time updates on your order status and delivery timeline.
              </p>
              <button className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/30 transition-colors">
                Track Now
              </button>
            </div>

            {/* Contact Support */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Phone className="w-5 h-5 text-blue-600 mr-2" />
                Shipping Support
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Need help with your delivery? Our support team is here to assist you.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+91 93517 74585</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>rinauraindia@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Policy Links */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Related Policies</h3>
              <div className="space-y-3">
                <Link href="/return-exchange-policy" className="block text-blue-600 hover:text-blue-500 transition-colors text-sm">
                  Return & Exchange Policy
                </Link>
                <Link href="/privacy-policy" className="block text-blue-600 hover:text-blue-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="block text-blue-600 hover:text-blue-500 transition-colors text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
