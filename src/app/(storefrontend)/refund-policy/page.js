import Link from "next/link";
import { ArrowLeft, RefreshCw, CreditCard, CheckCircle, AlertCircle } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <div className="relative bg-black text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
            Refund Policy
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-300 max-w-2xl mx-auto">
            Transparent and hassle-free refunds. We process payments securely via Razorpay.
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

        {/* Introduction */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-light mb-6">Our Refund Promise</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            At VESHA, we strive to ensure you are completely satisfied with your purchase. If you need to return an item, we are here to help. Our refund process is seamless and secure, powered by our payment partner <strong>Razorpay</strong>.
          </p>
        </div>

        {/* Refund Content */}
        <div className="space-y-12">
          <section>
            <div className="flex items-center mb-4">
              <RefreshCw className="w-6 h-6 mr-3 text-gray-400" />
              <h3 className="text-2xl font-medium">1. Eligibility for Refunds</h3>
            </div>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                To be eligible for a refund, your item must be unused and in the same condition that you received it. It must also be in the original packaging with all tags attached.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Returns must be initiated within 7 days of delivery.</li>
                <li>Proof of purchase (Order ID) is required.</li>
                <li>Sale items are non-refundable unless defective.</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <CreditCard className="w-6 h-6 mr-3 text-gray-400" />
              <h3 className="text-2xl font-medium">2. Refund Process (Razorpay)</h3>
            </div>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
              </p>
              <p className="mt-4">
                If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment via <strong>Razorpay</strong>.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4 border border-gray-100">
                <h4 className="font-medium mb-2 text-black">Refund Timelines:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    UPI / Wallets: 2-4 business days
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Credit / Debit Cards: 5-7 business days
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Net Banking: 5-7 business days
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 mr-3 text-gray-400" />
              <h3 className="text-2xl font-medium">3. Late or Missing Refunds</h3>
            </div>
            <div className="prose prose-gray max-w-none text-gray-600">
              <p>
                If you haven’t received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. Next, contact your bank. There is often some processing time before a refund is posted.
              </p>
              <p className="mt-2">
                If you’ve done all of this and you still have not received your refund yet, please contact us at myvesha2025@gmail.com.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
