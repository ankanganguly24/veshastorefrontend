import Link from "next/link";
import { ArrowLeft, RotateCcw, RefreshCw, Package, Phone, Mail, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default function ReturnExchangePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <RotateCcw className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Return & Exchange Policy
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Shop with confidence. Easy returns and exchanges within 30 days of purchase.
            </p>
            <div className="flex items-center justify-center mt-6 text-green-200">
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
            className="inline-flex items-center text-green-600 hover:text-green-500 font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Company Contact Info Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Rinaura Fashion Private Limited</h2>
            <p className="text-gray-600">Your satisfaction is our priority</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone Support</h3>
                  <p className="text-gray-600">Return assistance</p>
                </div>
              </div>
              <a href="tel:+919351774585" className="text-lg font-semibold text-green-600 hover:text-green-500 transition-colors">
                +91 93517 74585
              </a>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Support</h3>
                  <p className="text-gray-600">Quick resolution</p>
                </div>
              </div>
              <a href="mailto:rinauraindia@gmail.com" className="text-lg font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                rinauraindia@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Return & Exchange Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Return Options */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                  <RotateCcw className="w-5 h-5 text-green-600" />
                </div>
                Return Policy
              </h3>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 mb-6">
                <div className="flex items-center mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">30-Day Return Window</h4>
                </div>
                <p className="text-gray-700">
                  We offer a hassle-free 30-day return policy. You can return items for a full refund if they are unused, in original condition, and with all tags attached.
                </p>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-green-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Eligible for Return</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Items in original condition with tags</li>
                    <li>• Unworn and unwashed garments</li>
                    <li>• Items in original packaging</li>
                    <li>• Defective or damaged products</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-red-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Not Eligible for Return</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Intimate apparel and lingerie</li>
                    <li>• Custom or personalized items</li>
                    <li>• Items without original tags</li>
                    <li>• Sale items (unless defective)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Exchange Policy */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                  <RefreshCw className="w-5 h-5 text-blue-600" />
                </div>
                Exchange Policy
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Size Exchange</h4>
                  <p className="text-gray-700 text-sm">Wrong size? No problem! Exchange for the right size within 30 days, subject to availability.</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Color Exchange</h4>
                  <p className="text-gray-700 text-sm">Changed your mind about color? Exchange for a different color of the same item within 30 days.</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Exchange Terms</h4>
                </div>
                <p className="text-gray-700">
                  Exchanges are subject to product availability. If the desired size or color is not available, we&apos;ll process a full refund instead.
                </p>
              </div>
            </div>

            {/* Return Process */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                How to Return/Exchange
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Contact Support</h4>
                    <p className="text-gray-700">Call us at +91 93517 74585 or email rinauraindia@gmail.com with your order details.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Receive Authorization</h4>
                    <p className="text-gray-700">Our team will provide you with a return authorization number and shipping instructions.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Package & Ship</h4>
                    <p className="text-gray-700">Pack items securely with the return form and ship using our prepaid return label.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-pink-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Processing</h4>
                    <p className="text-gray-700">Once we receive your return, we&apos;ll process your refund or exchange within 5-7 business days.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Refund Information */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Refund Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Refund Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700 text-sm">Credit/Debit Card: 5-7 business days</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700 text-sm">UPI/Digital Wallet: 2-3 business days</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700 text-sm">Cash on Delivery: Bank transfer in 7-10 days</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Refund Amount</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700 text-sm">Full product price refunded</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700 text-sm">Shipping charges included (if applicable)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-gray-700 text-sm">Return shipping deducted (₹99)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Return */}
            <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-3xl p-6 text-white">
              <h3 className="font-semibold mb-4 flex items-center">
                <RotateCcw className="w-5 h-5 mr-2" />
                Quick Return
              </h3>
              <p className="text-green-100 mb-4">
                Start your return process now. Our team will guide you through each step.
              </p>
              <button className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/30 transition-colors">
                Initiate Return
              </button>
            </div>

            {/* Contact Support */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Phone className="w-5 h-5 text-green-600 mr-2" />
                Return Support
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Need help with your return? Our dedicated support team is ready to assist you.
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

            {/* FAQ */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Common Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Can I return sale items?</h4>
                  <p className="text-xs text-gray-600">Sale items can only be returned if they are defective or damaged.</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">How long do refunds take?</h4>
                  <p className="text-xs text-gray-600">Refunds are processed within 5-7 business days after we receive your return.</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Who pays for return shipping?</h4>
                  <p className="text-xs text-gray-600">We provide prepaid return labels. A ₹99 fee may be deducted from your refund.</p>
                </div>
              </div>
            </div>

            {/* Policy Links */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Related Policies</h3>
              <div className="space-y-3">
                <Link href="/shipping-policy" className="block text-green-600 hover:text-green-500 transition-colors text-sm">
                  Shipping Policy
                </Link>
                <Link href="/privacy-policy" className="block text-green-600 hover:text-green-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="block text-green-600 hover:text-green-500 transition-colors text-sm">
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
