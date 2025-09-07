import Link from "next/link";
import { ArrowLeft, Scale, Shield, Clock, Users } from "lucide-react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/login"
              className="flex items-center text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>Last updated: January 1, 2024</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms and Conditions</h1>
            <p className="text-gray-600">
              Please read these terms carefully before using Vesha services
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-bold">1</span>
                </div>
                Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using Vesha's website and services, you accept and agree to be bound by the terms and provision of this agreement. These Terms and Conditions constitute a legally binding agreement between you and Vesha.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you do not agree to abide by the above, please do not use this service. We reserve the right to change these terms at any time, and your continued use of the site will signify your acceptance of any adjustment to these terms.
              </p>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-bold">2</span>
                </div>
                Use License
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Permission is granted to temporarily access and use Vesha's services for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on our website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-bold">3</span>
                </div>
                Account Responsibilities
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm font-medium">
                  <strong>Important:</strong> You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-bold">4</span>
                </div>
                Privacy Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our services. By using our services, you agree to the collection and use of information in accordance with our{" "}
                <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500 font-medium underline">
                  Privacy Policy
                </Link>.
              </p>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-bold">5</span>
                </div>
                Prohibited Uses
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not use our services for any unlawful purpose or to solicit others to perform or participate in any unlawful acts. You may not violate any international, federal, provincial, or state regulations, rules, or laws.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Transmit any worms, viruses, or any code of a destructive nature</li>
                <li>Infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>Submit false or misleading information</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-bold">6</span>
                </div>
                Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall Vesha or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Vesha's website, even if Vesha or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Contact Us
              </h3>
              <p className="text-indigo-800 text-sm">
                If you have any questions about these Terms and Conditions, please contact us at:
                <br />
                <strong>Email:</strong> legal@vesha.com
                <br />
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-center mt-8 space-x-4">
          <Link
            href="/privacy"
            className="px-6 py-3 bg-white border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
