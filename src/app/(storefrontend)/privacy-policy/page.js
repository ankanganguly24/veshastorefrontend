import Link from "next/link";
import { ArrowLeft, Shield, Phone, Mail, MapPin, Clock, Lock, Eye, Database, Users, FileText, AlertCircle } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Your privacy matters to us. Learn how Rinaura Fashion protects your personal information.
            </p>
            <div className="flex items-center justify-center mt-6 text-purple-200">
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
            className="inline-flex items-center text-purple-600 hover:text-purple-500 font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Company Contact Info Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Rinaura Fashion Private Limited</h2>
            <p className="text-gray-600">Your trusted fashion partner</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone Support</h3>
                  <p className="text-gray-600">Call us anytime</p>
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
                  <p className="text-gray-600">24/7 assistance</p>
                </div>
              </div>
              <a href="mailto:rinauraindia@gmail.com" className="text-lg font-semibold text-purple-600 hover:text-purple-500 transition-colors">
                rinauraindia@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Privacy Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Introduction */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 text-green-600 mr-2" />
                  Important Notice
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  At Rinaura Fashion Private Limited, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
                </p>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                Information We Collect
              </h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Personal Information</h4>
                  <p className="text-gray-700">Name, email address, phone number, shipping address, and payment information when you make a purchase or create an account.</p>
                </div>
                
                <div className="border-l-4 border-purple-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Usage Information</h4>
                  <p className="text-gray-700">Information about how you use our website, including pages visited, time spent, and interactions with our content.</p>
                </div>
                
                <div className="border-l-4 border-green-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Device Information</h4>
                  <p className="text-gray-700">Technical information about your device, browser type, IP address, and operating system.</p>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
                How We Use Your Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Order Processing</h4>
                  <p className="text-gray-700">To process your orders, arrange shipping, and provide customer support.</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Communication</h4>
                  <p className="text-gray-700">To send order updates, promotional offers, and important account notifications.</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Improvement</h4>
                  <p className="text-gray-700">To analyze usage patterns and improve our website and services.</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Legal Compliance</h4>
                  <p className="text-gray-700">To comply with legal obligations and protect our rights and interests.</p>
                </div>
              </div>
            </div>

            {/* Data Protection */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                  <Lock className="w-5 h-5 text-green-600" />
                </div>
                Data Protection & Security
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. This includes:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">SSL encryption for all data transmission</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Secure payment processing through trusted providers</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Regular security audits and updates</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Limited access to personal data on a need-to-know basis</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 text-purple-600 mr-2" />
                Information
              </h3>
              <div className="space-y-3">
                <Link href="/shipping-policy" className="block text-purple-600 hover:text-purple-500 transition-colors">
                  Shipping Policy
                </Link>
                <Link href="/return-exchange-policy" className="block text-purple-600 hover:text-purple-500 transition-colors">
                  Return & Exchange Policy
                </Link>
                <Link href="/terms-of-service" className="block text-purple-600 hover:text-purple-500 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/terms-of-use" className="block text-purple-600 hover:text-purple-500 transition-colors">
                  Terms of Use
                </Link>
              </div>
            </div>

            {/* Discover */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 text-purple-600 mr-2" />
                Discover
              </h3>
              <div className="space-y-3">
                <Link href="/our-story" className="block text-purple-600 hover:text-purple-500 transition-colors">
                  Our Story
                </Link>
                <Link href="/meet-the-founder" className="block text-purple-600 hover:text-purple-500 transition-colors">
                  Meet The Founder
                </Link>
                <Link href="/faq" className="block text-purple-600 hover:text-purple-500 transition-colors">
                  Frequently Asked Questions
                </Link>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 text-white">
              <h3 className="font-semibold mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Need Help?
              </h3>
              <p className="text-purple-100 mb-4">
                Have questions about our privacy policy? Contact our support team.
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
          </div>
        </div>
      </div>
    </div>
  );
}
