import { Truck, Shield, RotateCcw, Award } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    { 
      icon: Truck, 
      title: "Free Shipping", 
      description: "On orders above ₹499"
    },
    { 
      icon: Shield, 
      title: "Secure Payment", 
      description: "100% protected checkout"
    },
    { 
      icon: RotateCcw, 
      title: "Easy Returns", 
      description: "7-day return policy"
    },
    { 
      icon: Award, 
      title: "Premium Quality", 
      description: "Certified authentic"
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold mb-1 text-gray-900 tracking-wide uppercase">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
