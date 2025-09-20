import Link from "next/link";
import { ArrowLeft, BookOpen, Heart, Target, Star, Users, Award, Lightbulb, Phone, Mail, Clock, TrendingUp, Shield, Zap } from "lucide-react";

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Our Story
            </h1>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              The journey of Rinaura Fashion - where passion meets fashion innovation
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-500 font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Company Contact Info Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Rinaura Fashion Private Limited</h2>
            <p className="text-gray-600">Crafting fashion stories since our inception</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone Support</h3>
                  <p className="text-gray-600">Connect with us</p>
                </div>
              </div>
              <a href="tel:+919351774585" className="text-lg font-semibold text-emerald-600 hover:text-emerald-500 transition-colors">
                +91 93517 74585
              </a>
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Support</h3>
                  <p className="text-gray-600">Share our journey</p>
                </div>
              </div>
              <a href="mailto:rinauraindia@gmail.com" className="text-lg font-semibold text-teal-600 hover:text-teal-500 transition-colors">
                rinauraindia@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Story Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* The Beginning */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mr-3">
                  <Star className="w-5 h-5 text-emerald-600" />
                </div>
                The Beginning
              </h3>
              
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 mb-6">
                <div className="flex items-center mb-3">
                  <Lightbulb className="w-5 h-5 text-emerald-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">The Vision</h4>
                </div>
                <p className="text-gray-700">
                  Rinaura Fashion Private Limited was born from a simple yet powerful vision: to make high-quality, stylish fashion accessible to everyone. Our journey began with a passion for creating clothing that not only looks good but also feels good to wear.
                </p>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-emerald-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Foundation Principles</h4>
                  <p className="text-gray-700">We started with the belief that fashion should be inclusive, accessible, and sustainable. Every decision was made with our customers' needs and desires at the forefront.</p>
                </div>
                
                <div className="border-l-4 border-teal-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Early Challenges</h4>
                  <p className="text-gray-700">Like every startup, we faced challenges in understanding market needs, building supplier relationships, and establishing our brand identity in a competitive industry.</p>
                </div>
                
                <div className="border-l-4 border-cyan-400 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">First Breakthrough</h4>
                  <p className="text-gray-700">Our breakthrough came when we realized that our customers valued not just style, but also comfort, quality, and affordability - becoming our core pillars.</p>
                </div>
              </div>
            </div>

            {/* Our Mission */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center mr-3">
                  <Target className="w-5 h-5 text-teal-600" />
                </div>
                Our Mission
              </h3>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Core Mission Statement</h4>
                  <p className="text-gray-700">We believe that fashion is a form of self-expression, and everyone deserves to feel confident and beautiful in what they wear. Our mission is to provide trendy, comfortable, and affordable fashion that celebrates individuality and style.</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <Heart className="w-5 h-5 text-emerald-600 mr-2" />
                      <h4 className="font-semibold text-gray-900">Customer First</h4>
                    </div>
                    <p className="text-gray-700 text-sm">Every design decision is made with our customers' comfort, style preferences, and lifestyle needs in mind.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <Shield className="w-5 h-5 text-teal-600 mr-2" />
                      <h4 className="font-semibold text-gray-900">Quality Promise</h4>
                    </div>
                    <p className="text-gray-700 text-sm">We maintain strict quality standards to ensure every piece meets our high expectations and yours.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <TrendingUp className="w-5 h-5 text-cyan-600 mr-2" />
                      <h4 className="font-semibold text-gray-900">Innovation Drive</h4>
                    </div>
                    <p className="text-gray-700 text-sm">Continuously evolving our designs and processes to stay ahead of fashion trends and customer expectations.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <Users className="w-5 h-5 text-blue-600 mr-2" />
                      <h4 className="font-semibold text-gray-900">Community Building</h4>
                    </div>
                    <p className="text-gray-700 text-sm">Creating a fashion community where everyone feels welcome, valued, and beautifully represented.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Values */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center mr-3">
                  <Award className="w-5 h-5 text-cyan-600" />
                </div>
                Our Values
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border-l-4 border-emerald-400">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Award className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Quality Craftsmanship</h4>
                      <p className="text-gray-600 text-sm">Every piece is crafted with attention to detail and superior materials</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 border-l-4 border-teal-400">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Sustainable Fashion</h4>
                      <p className="text-gray-600 text-sm">Committed to ethical practices and environmental responsibility</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border-l-4 border-cyan-400">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Inclusive Sizing</h4>
                      <p className="text-gray-600 text-sm">Fashion for every body type with diverse representation</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-l-4 border-blue-400">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Heart className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Exceptional Service</h4>
                      <p className="text-gray-600 text-sm">Customer satisfaction is our highest priority</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border-l-4 border-indigo-400">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Continuous Innovation</h4>
                      <p className="text-gray-600 text-sm">Embracing new technologies and design methodologies</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Looking Forward */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mr-3">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                Looking Forward
              </h3>
              
              <div className="space-y-6">
                <p className="text-emerald-100 text-lg">
                  As we continue to grow, our commitment to our customers and our values remains unwavering. We're excited to be part of your fashion journey and to continue bringing you the latest trends and timeless classics.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <h4 className="font-semibold text-white mb-2">Expansion Plans</h4>
                    <p className="text-emerald-100 text-sm">Growing our collection range and exploring new fashion categories to serve you better.</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <h4 className="font-semibold text-white mb-2">Technology Integration</h4>
                    <p className="text-emerald-100 text-sm">Implementing cutting-edge technology to enhance your shopping experience.</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <h4 className="font-semibold text-white mb-2">Sustainability Goals</h4>
                    <p className="text-emerald-100 text-sm">Furthering our commitment to sustainable and ethical fashion practices.</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <h4 className="font-semibold text-white mb-2">Community Growth</h4>
                    <p className="text-emerald-100 text-sm">Building a stronger fashion community that celebrates diversity and creativity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Connect Card */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl p-6 text-white">
              <h3 className="font-semibold mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Share Our Journey
              </h3>
              <p className="text-emerald-100 mb-4">
                We'd love to hear from you and share more about our story. Connect with us today!
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

            {/* Milestones */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 text-emerald-600 mr-2" />
                Key Milestones
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Company Foundation</h4>
                    <p className="text-xs text-gray-600">Established Rinaura Fashion with a vision for accessible fashion</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Market Expansion</h4>
                    <p className="text-xs text-gray-600">Expanded our reach across India with diverse collections</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Quality Recognition</h4>
                    <p className="text-xs text-gray-600">Earned customer trust through consistent quality and service</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Pages */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Discover More</h3>
              <div className="space-y-3">
                <Link href="/meet-the-founder" className="block text-emerald-600 hover:text-emerald-500 transition-colors text-sm">
                  Meet The Founder
                </Link>
                <Link href="/faq" className="block text-emerald-600 hover:text-emerald-500 transition-colors text-sm">
                  Frequently Asked Questions
                </Link>
                <Link href="/privacy-policy" className="block text-emerald-600 hover:text-emerald-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="block text-emerald-600 hover:text-emerald-500 transition-colors text-sm">
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
