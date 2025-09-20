import Link from "next/link";
import { ArrowLeft, HelpCircle, Phone, Mail, Clock, MessageCircle, Shield, Truck, RotateCcw, CreditCard, Ruler, MapPin, Search, ChevronDown } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      category: "Returns & Exchanges",
      icon: <RotateCcw className="w-5 h-5" />,
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for unused items in their original condition and packaging. Please contact our support team for return authorization."
        },
        {
          question: "Can I exchange an item for a different size or color?",
          answer: "Yes, exchanges are available within 30 days of purchase, subject to availability. Please contact our support team to initiate an exchange."
        }
      ]
    },
    {
      category: "Shipping & Delivery",
      icon: <Truck className="w-5 h-5" />,
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard delivery takes 5-7 business days, while express delivery takes 2-3 business days. Same-day delivery is available in select cities."
        },
        {
          question: "Do you offer international shipping?",
          answer: "Currently, we only ship within India. We're working on expanding our shipping options to serve international customers in the future."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order is shipped, you&apos;ll receive a tracking number via email and SMS. You can use this number to track your package on our website or the courier&apos;s website."
        }
      ]
    },
    {
      category: "Payments",
      icon: <CreditCard className="w-5 h-5" />,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, debit cards, UPI, net banking, and cash on delivery (COD) for orders within India."
        }
      ]
    },
    {
      category: "Product & Sizing",
      icon: <Ruler className="w-5 h-5" />,
      questions: [
        {
          question: "How do I know what size to order?",
          answer: "Each product page includes a detailed size chart. We recommend measuring yourself and comparing with our size guide for the best fit."
        },
        {
          question: "How do I care for my Rinaura Fashion clothing?",
          answer: "Care instructions are provided on each product page and on the garment labels. Most items can be machine washed in cold water, but we recommend checking the specific care instructions for each item."
        }
      ]
    },
    {
      category: "Support & Store",
      icon: <MessageCircle className="w-5 h-5" />,
      questions: [
        {
          question: "How can I contact customer support?",
          answer: "You can reach us via email at rinauraindia@gmail.com or call us at +91 93517 74585. Our support team is available Monday to Saturday, 9 AM to 6 PM."
        },
        {
          question: "Do you have a physical store?",
          answer: "Currently, Rinaura Fashion operates as an online-only store. This allows us to offer better prices and a wider selection of products."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Find answers to the most common questions about Rinaura Fashion
            </p>
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
            <p className="text-gray-600">We&apos;re here to help with all your questions</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone Support</h3>
                  <p className="text-gray-600">Call us directly</p>
                </div>
              </div>
              <a href="tel:+919351774585" className="text-lg font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                +91 93517 74585
              </a>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Support</h3>
                  <p className="text-gray-600">Send us a message</p>
                </div>
              </div>
              <a href="mailto:rinauraindia@gmail.com" className="text-lg font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                rinauraindia@gmail.com
              </a>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Support Hours</h3>
                  <p className="text-gray-600">Our availability</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 font-medium">
                Monday to Saturday<br />
                9 AM to 6 PM IST
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main FAQ Content */}
          <div className="lg:col-span-2 space-y-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mr-4">
                    <div className="text-blue-600">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">{category.category}</h3>
                </div>
                
                <div className="space-y-6">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-l-4 border-blue-400 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-r-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        {faq.question}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Additional Help Section */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl p-8 text-white">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  If you can&apos;t find the answer you&apos;re looking for, our customer support team is here to help you with personalized assistance.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <a 
                    href="mailto:rinauraindia@gmail.com" 
                    className="bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors rounded-xl p-4 border border-white/30"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="w-5 h-5" />
                      <span className="font-medium">Email Us</span>
                    </div>
                  </a>
                  <a 
                    href="tel:+919351774585" 
                    className="bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors rounded-xl p-4 border border-white/30"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Phone className="w-5 h-5" />
                      <span className="font-medium">Call Us</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Help */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Search className="w-5 h-5 text-blue-600 mr-2" />
                Quick Help
              </h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Order Tracking</h4>
                  <p className="text-xs text-gray-600">Check your order status anytime with your tracking number</p>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Size Guide</h4>
                  <p className="text-xs text-gray-600">Find the perfect fit with our detailed size charts</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Return Process</h4>
                  <p className="text-xs text-gray-600">Easy returns within 30 days of purchase</p>
                </div>
              </div>
            </div>

            {/* Popular Questions */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <HelpCircle className="w-5 h-5 text-blue-600 mr-2" />
                Popular Questions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left text-sm text-blue-600 hover:text-blue-500 transition-colors">
                  How to track my order?
                </button>
                <button className="w-full text-left text-sm text-blue-600 hover:text-blue-500 transition-colors">
                  What&apos;s your return policy?
                </button>
                <button className="w-full text-left text-sm text-blue-600 hover:text-blue-500 transition-colors">
                  Size guide information
                </button>
                <button className="w-full text-left text-sm text-blue-600 hover:text-blue-500 transition-colors">
                  Payment methods accepted
                </button>
                <button className="w-full text-left text-sm text-blue-600 hover:text-blue-500 transition-colors">
                  Shipping timeframes
                </button>
              </div>
            </div>

            {/* Related Pages */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Related Information</h3>
              <div className="space-y-3">
                <Link href="/shipping-policy" className="flex items-center justify-between text-blue-600 hover:text-blue-500 transition-colors text-sm">
                  <span>Shipping Policy</span>
                  <Truck className="w-4 h-4" />
                </Link>
                <Link href="/return-exchange-policy" className="flex items-center justify-between text-blue-600 hover:text-blue-500 transition-colors text-sm">
                  <span>Return & Exchange</span>
                  <RotateCcw className="w-4 h-4" />
                </Link>
                <Link href="/privacy-policy" className="flex items-center justify-between text-blue-600 hover:text-blue-500 transition-colors text-sm">
                  <span>Privacy Policy</span>
                  <Shield className="w-4 h-4" />
                </Link>
                <Link href="/terms-of-service" className="flex items-center justify-between text-blue-600 hover:text-blue-500 transition-colors text-sm">
                  <span>Terms of Service</span>
                  <ChevronDown className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl p-6 text-white">
              <h3 className="font-semibold mb-4">Need Personal Help?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Our support team is ready to assist you with any questions or concerns.
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
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Mon-Sat, 9 AM-6 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
