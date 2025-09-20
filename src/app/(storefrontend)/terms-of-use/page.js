import Link from "next/link";
import { ArrowLeft, Users, Shield, AlertTriangle, Phone, Mail, Clock, CheckCircle, XCircle, BookOpen } from "lucide-react";

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Terms of Use
            </h1>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Guidelines for using our website and services responsibly and safely.
            </p>
            <div className="flex items-center justify-center mt-6 text-teal-200">
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
            className="inline-flex items-center text-teal-600 hover:text-teal-500 font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Company Contact Info Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Rinaura Fashion Private Limited</h2>
            <p className="text-gray-600">Usage guidelines for our platform</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-6 border border-teal-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone Support</h3>
                  <p className="text-gray-600">Usage questions</p>
                </div>
              </div>
              <a href="tel:+919351774585" className="text-lg font-semibold text-teal-600 hover:text-teal-500 transition-colors">
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
                  <p className="text-gray-600">Policy guidance</p>
                </div>
              </div>
              <a href="mailto:rinauraindia@gmail.com" className="text-lg font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                rinauraindia@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Website Usage */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center mr-3">
                  <BookOpen className="w-5 h-5 text-teal-600" />
                </div>
                Website Usage
              </h3>
              
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-xl p-6 mb-6">
                <div className="flex items-center mb-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Platform Operation</h4>
                </div>
                <p className="text-gray-700">
                  This website is operated by Rinaura Fashion Private Limited. These terms govern your use of our website, services, and any related mobile applications or platforms.
                </p>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-teal-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Acceptable Use</h4>
                  <p className="text-gray-700">You may use our website to browse products, make purchases, create accounts, and access customer support services in accordance with these terms.</p>
                </div>
                
                <div className="border-l-4 border-blue-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Platform Availability</h4>
                  <p className="text-gray-700">We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service due to maintenance, updates, or technical issues.</p>
                </div>
                
                <div className="border-l-4 border-purple-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Content Accuracy</h4>
                  <p className="text-gray-700">While we work to ensure product information is accurate, we cannot guarantee all details are error-free and reserve the right to correct mistakes.</p>
                </div>
              </div>
            </div>

            {/* User Accounts */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                User Accounts
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Account Creation</h4>
                  <p className="text-gray-700 text-sm">When creating an account, you must provide accurate, complete, and current information. False information may result in account suspension.</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Account Security</h4>
                  <p className="text-gray-700 text-sm">You are responsible for maintaining the confidentiality of your password and all activities under your account.</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Account Updates</h4>
                  <p className="text-gray-700 text-sm">Keep your account information updated. We may suspend accounts with outdated or incorrect information.</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Account Termination</h4>
                  <p className="text-gray-700 text-sm">We reserve the right to terminate accounts that violate our terms or engage in suspicious activities.</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Account Responsibility</h4>
                </div>
                <p className="text-gray-700">
                  You are solely responsible for all activities conducted through your account. Report any unauthorized access immediately to our support team.
                </p>
              </div>
            </div>

            {/* Prohibited Uses */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-3">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                Prohibited Uses
              </h3>
              
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 mb-6">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Strictly Forbidden</h4>
                </div>
                <p className="text-gray-700">
                  The following activities are strictly prohibited and may result in immediate account termination and legal action.
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Legal Violations</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-gray-700 text-sm">Using the service for unlawful purposes</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-gray-700 text-sm">Violating international or local laws</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-gray-700 text-sm">Fraudulent activities or transactions</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Security Violations</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-gray-700 text-sm">Attempting to hack or breach security</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-gray-700 text-sm">Transmitting malware or viruses</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-gray-700 text-sm">Interfering with website operations</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Content Violations</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-gray-700 text-sm">Posting offensive or harmful content</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-gray-700 text-sm">Impersonating others or entities</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-gray-700 text-sm">Spam or unsolicited communications</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Commercial Misuse</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-gray-700 text-sm">Unauthorized commercial use</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-gray-700 text-sm">Reselling without permission</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span className="text-gray-700 text-sm">Data scraping or harvesting</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Conduct */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                User Conduct Guidelines
              </h3>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Expected Behavior</h4>
                  <p className="text-gray-700">We expect all users to conduct themselves professionally and respectfully when interacting with our platform, staff, and other customers.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                    <p className="text-gray-700">Treat customer service representatives and other users with respect</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                    <p className="text-gray-700">Provide honest and accurate information in reviews and feedback</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                    <p className="text-gray-700">Report any technical issues or security concerns promptly</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                    <p className="text-gray-700">Use the platform only for legitimate shopping and account management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Help */}
            <div className="bg-gradient-to-br from-teal-500 to-blue-500 rounded-3xl p-6 text-white">
              <h3 className="font-semibold mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Usage Questions?
              </h3>
              <p className="text-teal-100 mb-4">
                Not sure about our usage policies? Contact our support team for clarification.
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

            {/* Do's and Don'ts */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Guidelines</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Do&apos;s
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Keep account info updated</li>
                    <li>• Use strong passwords</li>
                    <li>• Report issues promptly</li>
                    <li>• Follow return policies</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    Don&apos;ts
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Share account credentials</li>
                    <li>• Make fraudulent purchases</li>
                    <li>• Abuse return policies</li>
                    <li>• Violate security measures</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Related Documents */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Related Policies</h3>
              <div className="space-y-3">
                <Link href="/terms-of-service" className="block text-teal-600 hover:text-teal-500 transition-colors text-sm">
                  Terms of Service
                </Link>
                <Link href="/privacy-policy" className="block text-teal-600 hover:text-teal-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link href="/return-exchange-policy" className="block text-teal-600 hover:text-teal-500 transition-colors text-sm">
                  Return & Exchange Policy
                </Link>
                <Link href="/shipping-policy" className="block text-teal-600 hover:text-teal-500 transition-colors text-sm">
                  Shipping Policy
                </Link>
              </div>
            </div>

            {/* Enforcement */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                Enforcement
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We actively monitor compliance with these terms. Violations may result in warnings, account suspension, or termination depending on severity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
