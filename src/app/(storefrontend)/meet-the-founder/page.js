import Link from "next/link";
import { ArrowLeft, User, Heart, Lightbulb, Target, Phone, Mail, Clock, Star, Award, Users } from "lucide-react";

export default function MeetTheFounderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-900 via-pink-900 to-purple-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Meet The Founder
            </h1>
            <p className="text-xl text-rose-100 max-w-2xl mx-auto">
              The visionary behind Rinaura Fashion's journey to revolutionize fashion industry.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-rose-600 hover:text-rose-500 font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Company Contact Info Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Rinaura Fashion Private Limited</h2>
            <p className="text-gray-600">Empowering fashion dreams since inception</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone Support</h3>
                  <p className="text-gray-600">Connect directly</p>
                </div>
              </div>
              <a href="tel:+919351774585" className="text-lg font-semibold text-rose-600 hover:text-rose-500 transition-colors">
                +91 93517 74585
              </a>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Support</h3>
                  <p className="text-gray-600">Share your thoughts</p>
                </div>
              </div>
              <a href="mailto:rinauraindia@gmail.com" className="text-lg font-semibold text-pink-600 hover:text-pink-500 transition-colors">
                rinauraindia@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Founder Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* The Visionary */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center mr-3">
                  <Star className="w-5 h-5 text-rose-600" />
                </div>
                The Visionary
              </h3>
              
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-6 mb-6">
                <div className="flex items-center mb-3">
                  <Lightbulb className="w-5 h-5 text-rose-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">Inspiring Vision</h4>
                </div>
                <p className="text-gray-700">
                  Behind every great brand is a passionate individual with a dream. Our founder envisioned a world where fashion is not just about clothing, but about empowering people to express their unique personalities through what they wear.
                </p>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-rose-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Fashion Philosophy</h4>
                  <p className="text-gray-700">Fashion should be a celebration of individuality, confidence, and self-expression. Every person deserves to feel beautiful and empowered in their clothing choices.</p>
                </div>
                
                <div className="border-l-4 border-pink-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Industry Expertise</h4>
                  <p className="text-gray-700">With deep understanding of fashion trends and customer needs, our founder brings years of experience in creating designs that resonate with modern lifestyles.</p>
                </div>
                
                <div className="border-l-4 border-purple-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Innovation Drive</h4>
                  <p className="text-gray-700">Constantly pushing boundaries to bring fresh perspectives to traditional fashion, combining timeless elegance with contemporary trends.</p>
                </div>
              </div>
            </div>

            {/* The Journey */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center mr-3">
                  <Award className="w-5 h-5 text-pink-600" />
                </div>
                The Journey
              </h3>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Foundation Story</h4>
                  <p className="text-gray-700">With years of experience in the fashion industry and a deep understanding of customer needs, our founder established Rinaura Fashion Private Limited with the goal of creating a brand that combines style, quality, and affordability.</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Early Days</h4>
                    <p className="text-gray-700 text-sm">Started with a small team and big dreams, focusing on understanding what modern women truly want from their fashion choices.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Growth Phase</h4>
                    <p className="text-gray-700 text-sm">Expanded the vision to include diverse collections that cater to different occasions, styles, and preferences of our customers.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Innovation Era</h4>
                    <p className="text-gray-700 text-sm">Embraced technology and modern retail practices to create seamless shopping experiences for our valued customers.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Future Vision</h4>
                    <p className="text-gray-700 text-sm">Continuing to evolve and adapt to changing fashion landscapes while maintaining our core values of quality and accessibility.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Philosophy & Mission */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                  <Heart className="w-5 h-5 text-purple-600" />
                </div>
                Philosophy & Mission
              </h3>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <Target className="w-5 h-5 text-purple-600 mr-2" />
                    <h4 className="font-semibold text-gray-900">Core Philosophy</h4>
                  </div>
                  <blockquote className="text-gray-700 italic text-lg">
                    "Fashion should be inclusive, sustainable, and accessible to all. Every piece we create is designed with love, care, and attention to detail, ensuring that our customers feel confident and beautiful every day."
                  </blockquote>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Personal Mission</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <p className="text-gray-700 text-sm">Building a brand that provides exceptional fashion experiences</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <p className="text-gray-700 text-sm">Contributing positively to community and environment</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <p className="text-gray-700 text-sm">Empowering women through fashion choices</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Driving Values</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                        <p className="text-gray-700 text-sm">Commitment to quality and craftsmanship</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                        <p className="text-gray-700 text-sm">Sustainable and ethical business practices</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                        <p className="text-gray-700 text-sm">Customer-centric approach in every decision</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Connect Card */}
            <div className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-3xl p-6 text-white">
              <h3 className="font-semibold mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Connect With Our Founder
              </h3>
              <p className="text-rose-100 mb-4">
                Want to know more about our journey or share your thoughts? We'd love to hear from you.
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

            {/* Achievements */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 text-rose-600 mr-2" />
                Key Achievements
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Fashion Innovation</h4>
                    <p className="text-xs text-gray-600">Introduced unique collections that blend traditional and modern aesthetics</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Customer Satisfaction</h4>
                    <p className="text-xs text-gray-600">Built a loyal customer base through quality products and exceptional service</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Brand Building</h4>
                    <p className="text-xs text-gray-600">Established Rinaura Fashion as a trusted name in the industry</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Pages */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Learn More</h3>
              <div className="space-y-3">
                <Link href="/our-story" className="block text-rose-600 hover:text-rose-500 transition-colors text-sm">
                  Our Story
                </Link>
                <Link href="/faq" className="block text-rose-600 hover:text-rose-500 transition-colors text-sm">
                  Frequently Asked Questions
                </Link>
                <Link href="/privacy-policy" className="block text-rose-600 hover:text-rose-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="block text-rose-600 hover:text-rose-500 transition-colors text-sm">
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
