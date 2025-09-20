import Link from "next/link";
import { ArrowLeft, Scale, FileText, Shield, Phone, Mail, Clock, CheckCircle, AlertTriangle, Users } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <Scale className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Legal terms and conditions for using Rinaura Fashion services and website.
            </p>
            <div className="flex items-center justify-center mt-6 text-indigo-200">
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
            className="inline-flex items-center text-indigo-600 hover:text-indigo-500 font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Company Contact Info Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Rinaura Fashion Private Limited</h2>
            <p className="text-gray-600">Governing terms for our services</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone Support</h3>
                  <p className="text-gray-600">Legal inquiries</p>
                </div>
              </div>
              <a href="tel:+919351774585" className="text-lg font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
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
                  <p className="text-gray-600">Terms clarification</p>
                </div>
              </div>
              <a href="mailto:rinauraindia@gmail.com" className="text-lg font-semibold text-purple-600 hover:text-purple-500 transition-colors">
                rinauraindia@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Acceptance of Terms */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mr-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600" />
                </div>
                Acceptance of Terms
              </h3>
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 mb-6">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-indigo-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Important Agreement</h4>
                </div>
                <p className="text-gray-700">
                  By accessing and using Rinaura Fashion Private Limited's website and services, you accept and agree to be bound by these terms of service. If you do not agree to these terms, please do not use our services.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">These terms constitute a legally binding agreement between you and Rinaura Fashion Private Limited</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">We reserve the right to change these terms at any time with prior notice</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Your continued use of our services signifies acceptance of any modifications</p>
                </div>
              </div>
            </div>

            {/* Use License */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                Use License
              </h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-green-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Permitted Use</h4>
                  <p className="text-gray-700">Permission is granted to temporarily access and use our website for personal, non-commercial purposes including browsing products, making purchases, and accessing account information.</p>
                </div>
                
                <div className="border-l-4 border-red-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Prohibited Activities</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Modifying or copying website materials without permission</li>
                    <li>• Using content for commercial purposes without authorization</li>
                    <li>• Attempting to reverse engineer any software on our website</li>
                    <li>• Removing copyright or proprietary notations</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-blue-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Termination</h4>
                  <p className="text-gray-700">This license will automatically terminate if you violate any of these restrictions and may be terminated by us at any time.</p>
                </div>
              </div>
            </div>

            {/* Account Terms */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                Account Terms
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Account Creation</h4>
                  <p className="text-gray-700 text-sm">You must provide accurate and complete information when creating an account. You are responsible for maintaining account security.</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Account Usage</h4>
                  <p className="text-gray-700 text-sm">One person may not maintain multiple accounts. Accounts are non-transferable and cannot be shared with others.</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Account Security</h4>
                  <p className="text-gray-700 text-sm">You are responsible for maintaining the confidentiality of your login credentials and all activities under your account.</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Account Termination</h4>
                  <p className="text-gray-700 text-sm">We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activities.</p>
                </div>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Payment Terms</h3>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Payment Processing</h4>
                  <p className="text-gray-700">All payments are processed securely through our authorized payment partners. We accept major credit cards, debit cards, UPI, and cash on delivery.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                    <p className="text-gray-700">Prices are listed in Indian Rupees (INR) and include applicable taxes</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                    <p className="text-gray-700">Payment is required in full before order processing</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                    <p className="text-gray-700">We reserve the right to cancel orders for pricing errors</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                    <p className="text-gray-700">Refunds will be processed according to our return policy</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Limitations */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mr-3">
                  <Shield className="w-5 h-5 text-yellow-600" />
                </div>
                Limitations of Liability
              </h3>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-6">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Disclaimer</h4>
                </div>
                <p className="text-gray-700">
                  The materials on our website are provided on an 'as is' basis. Rinaura Fashion Private Limited makes no warranties, expressed or implied, and disclaims all other warranties including warranties of merchantability and fitness for a particular purpose.
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed">
                In no event shall Rinaura Fashion Private Limited or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we have been notified orally or in writing of the possibility of such damage.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Help */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl p-6 text-white">
              <h3 className="font-semibold mb-4 flex items-center">
                <Scale className="w-5 h-5 mr-2" />
                Legal Questions?
              </h3>
              <p className="text-indigo-100 mb-4">
                Need clarification on our terms? Contact our legal team for assistance.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+91 93517 74585</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>rinauraindia@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Key Points */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Key Points</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Terms are legally binding</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Updated periodically</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Governed by Indian law</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-gray-700">Account security required</span>
                </div>
              </div>
            </div>

            {/* Related Policies */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Related Documents</h3>
              <div className="space-y-3">
                <Link href="/privacy-policy" className="block text-indigo-600 hover:text-indigo-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-use" className="block text-indigo-600 hover:text-indigo-500 transition-colors text-sm">
                  Terms of Use
                </Link>
                <Link href="/return-exchange-policy" className="block text-indigo-600 hover:text-indigo-500 transition-colors text-sm">
                  Return & Exchange Policy
                </Link>
                <Link href="/shipping-policy" className="block text-indigo-600 hover:text-indigo-500 transition-colors text-sm">
                  Shipping Policy
                </Link>
              </div>
            </div>

            {/* Last Updated */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 text-indigo-600 mr-2" />
                Updates
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                These terms were last updated on January 1, 2024. We may update them periodically to reflect changes in our practices or legal requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
