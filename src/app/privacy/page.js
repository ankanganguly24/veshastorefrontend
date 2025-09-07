import Link from "next/link";
import { ArrowLeft, Shield, Eye, Database, Lock, Users, Clock } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/register"
              className="flex items-center text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Register
            </Link>
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>Last updated: January 1, 2024</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600">
              Your privacy is important to us. Learn how we protect your data.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
              <p className="text-gray-800 leading-relaxed">
                At Vesha, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <Database className="w-4 h-4 text-green-600" />
                </div>
                Information We Collect
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This may include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address</li>
                <li><strong>Payment Information:</strong> Credit card details, billing address (processed securely)</li>
                <li><strong>Account Information:</strong> Username, password, order history, preferences</li>
                <li><strong>Communication Data:</strong> Your communications with us, including customer service interactions</li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> We automatically collect certain information when you visit our website, including your IP address, browser type, and pages visited.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <Eye className="w-4 h-4 text-green-600" />
                </div>
                How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Service Provision</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Process and fulfill orders</li>
                    <li>• Manage your account</li>
                    <li>• Provide customer support</li>
                    <li>• Send order confirmations</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Improvement & Marketing</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Improve our services</li>
                    <li>• Send promotional emails</li>
                    <li>• Personalize your experience</li>
                    <li>• Analyze usage patterns</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                Information Sharing
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Service Providers:</strong> Trusted third parties who assist us in operating our website and conducting business</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly agree to share your information</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <Lock className="w-4 h-4 text-green-600" />
                </div>
                Data Security
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center bg-gradient-to-b from-green-50 to-green-100 rounded-lg p-4">
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-6 h-6 text-green-700" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Encryption</h4>
                  <p className="text-sm text-gray-700">SSL encryption for all data transmission</p>
                </div>
                <div className="text-center bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg p-4">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-blue-700" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Secure Servers</h4>
                  <p className="text-sm text-gray-700">Industry-standard security protocols</p>
                </div>
                <div className="text-center bg-gradient-to-b from-purple-50 to-purple-100 rounded-lg p-4">
                  <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Eye className="w-6 h-6 text-purple-700" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Access Control</h4>
                  <p className="text-sm text-gray-700">Limited access to authorized personnel</p>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold text-sm">YOU</span>
                </div>
                Your Rights
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have certain rights regarding your personal data:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Access & Control</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Access your personal data</li>
                      <li>• Correct inaccurate data</li>
                      <li>• Delete your account</li>
                      <li>• Export your data</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Communication</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Opt-out of marketing emails</li>
                      <li>• Update preferences</li>
                      <li>• Restrict processing</li>
                      <li>• File complaints</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-amber-800 text-sm">
                  <strong>Cookie Notice:</strong> By continuing to use our site, you consent to our use of cookies as described in this policy.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Contact Us About Privacy
              </h3>
              <p className="text-gray-800 text-sm mb-3">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className="text-gray-900">Email:</strong> privacy@vesha.com<br />
                  <strong className="text-gray-900">Phone:</strong> +1 (555) 123-4567
                </div>
                <div>
                  <strong className="text-gray-900">Address:</strong><br />
                  123 Privacy Lane<br />
                  Security City, SC 12345
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-center mt-8 space-x-4">
          <Link
            href="/terms"
            className="px-6 py-3 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white hover:from-green-700 hover:to-blue-700 transition-all duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
