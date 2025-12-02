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
        "Yes. Every piece at VESHA is personally selected and thoroughly inspected for fabric quality, stitching, finishing, and embroidery detailing. We believe in 'The Art of Indian Attire' and ensure every garment reflects that.",
    },
    {
      question: "Do you offer Cash on Delivery (COD)?",
      answer:
        "No, we do not offer COD at this moment. We accept secure online payments via Razorpay (UPI, Cards, Net Banking).",
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
        "Orders are shipped within 2–5 working days via our partners (Shiprocket). Delivery usually takes 5–10 days depending on your location.",
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
            <strong>WhatsApp Support:</strong> +91 92390 00677
          </span>
          <span className="block">
            <strong>Email:</strong> myvesha2025@gmail.com
          </span>
          <span className="block mt-2 text-black font-medium">We’re always here to help!</span>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <div className="relative bg-black text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-300 max-w-2xl mx-auto">
            Find answers to your most common questions about VESHA — The Art of Indian Attire.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Back Navigation */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-black transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6 mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg border border-gray-100 p-8 hover:shadow-sm transition-shadow"
            >
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                {faq.question}
              </h3>
              <div className="text-gray-600 leading-relaxed">{faq.answer}</div>
            </div>
          ))}
        </div>

        {/* Contact Support Section */}
        <div className="bg-black text-white rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-light mb-4">Still need help?</h3>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto">
            Our team is always available to guide you with your orders or queries.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              href="mailto:myvesha2025@gmail.com"
              className="bg-white text-black hover:bg-gray-100 transition-colors rounded-full px-8 py-3 font-medium flex items-center justify-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Us
            </a>
            <a
              href="https://www.instagram.com/vesha_official_"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border border-white text-white hover:bg-white/10 transition-colors rounded-full px-8 py-3 font-medium flex items-center justify-center"
            >
              <Instagram className="w-4 h-4 mr-2" />
              Instagram
            </a>
            <a
              href="https://wa.me/919239000677"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border border-white text-white hover:bg-white/10 transition-colors rounded-full px-8 py-3 font-medium flex items-center justify-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
