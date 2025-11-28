import { Heart, Award, Clock, Package } from "lucide-react";

export default function WhyChooseSection() {
  const reasons = [
    {
      title: "Handpicked Collections",
      description: "Every piece is carefully curated by our fashion experts to ensure you get only the best designs.",
      icon: Heart
    },
    {
      title: "Quality Assurance",
      description: "We guarantee premium quality fabrics and craftsmanship in every product we sell.",
      icon: Award
    },
    {
      title: "Fast Delivery",
      description: "Get your orders delivered within 3-5 business days across India with real-time tracking.",
      icon: Clock
    },
    {
      title: "Customer First",
      description: "Our dedicated support team is available 24/7 to assist you with any queries or concerns.",
      icon: Package
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-3 text-gray-900 tracking-tight">
            Why Choose Vesha
          </h2>
          <div className="w-12 h-px bg-primary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-5xl mx-auto">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex gap-6 group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
