import Link from "next/link";
import { 
  ArrowLeft, 
  HelpCircle, 
  Phone, 
  Mail, 
  Instagram, 
  MessageCircle 
} from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      question: "Are your products handpicked and quality checked?",
      answer:
        "Yes. Every piece is personally selected and thoroughly inspected for fabric quality, stitching, finishing, and embroidery detailing.",
    },
    {
      question: "Do you offer Cash on Delivery (COD)?",
      answer:
        "No, we do not offer COD.",
    },
    {
      question: "Where can I check my order details?",
      answer:
        "After placing your order, you will receive a confirmation message via Email with your order ID and details. You can also check your order history and status anytime by logging into your account on our website.",
    },
    {
      question: "Can I change my address after placing the order?",
      answer:
        "Yes, address changes are possible only if the order has not been shipped yet. Please contact us as soon as possible via Instagram DM or WhatsApp with your Order ID, and we’ll do our best to update the address before dispatch.",
    },
    {
      question: "What are your shipping times?",
      answer:
        "Orders are shipped within 2–5 working days. Delivery usually takes 5–10 days depending on your location.",
    },
    {
      question: "Do you accept returns or exchanges?",
      answer:
        "We offer exchanges only in cases where the product is defective or if an incorrect item has been delivered. Due to hygiene considerations, we cannot accept items that have been used, tried on extensively, or altered in any way, and all original tags/packaging should be intact.",
    },
    {
      question: "Do you offer reverse pickup for returns?",
      answer:
        "No, at the moment, reverse pickup is not available. You may be requested to ship the product back to us. Once we receive and inspect the piece, we will issue store credit or exchange as per our return policy.",
    },
    {
      question: "How can I contact customer support?",
      answer: (
        <>
          You can reach us via:
          <br />
          <span className="block mt-2">
            <strong>Instagram DM:</strong> vesha_official_
          </span>
          <span className="block">
            <strong>WhatsApp Support:</strong> 9239000677
          </span>
          <span className="block">
            <strong>Email:</strong> myvesha2025@gmail.com
          </span>
          <span className="block mt-2 text-emerald-700 font-medium">We’re always here to help!</span>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-900 to-green-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">FAQ’s</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Find answers to your most common questions about VESHA — The Art of Indian Attire
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
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

        {/* FAQ Section */}
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-white/50 p-8 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Q. {faq.question}
              </h3>
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Contact Support Section */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-8 text-white mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
            <p className="text-emerald-100 mb-6">
              Our team is always available to guide you with your orders or queries.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a
                href="mailto:myvesha2025@gmail.com"
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors rounded-xl p-4 border border-white/30"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">Email Us</span>
                </div>
              </a>
              <a
                href="https://www.instagram.com/vesha_official_"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors rounded-xl p-4 border border-white/30"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Instagram className="w-5 h-5" />
                  <span className="font-medium">DM on Instagram</span>
                </div>
              </a>
              <a
                href="https://wa.me/919239000677"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors rounded-xl p-4 border border-white/30"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">WhatsApp</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
