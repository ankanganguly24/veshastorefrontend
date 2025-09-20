import { Card } from "@/components/ui/card";
import { Shield, Truck, RotateCcw, CreditCard, Award, Phone } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "100% Secure",
      description: "SSL encrypted checkout",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-200"
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders above ₹1999",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "15 days return policy",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200"
    },
    {
      icon: CreditCard,
      title: "Safe Payments",
      description: "Multiple payment options",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      borderColor: "border-orange-200"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Verified authentic products",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      borderColor: "border-yellow-200"
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Customer care helpline",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
      borderColor: "border-indigo-200"
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100">
      <h2 className="text-xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Why Shop With Us?
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {badges.map((badge, index) => {
          const IconComponent = badge.icon;
          return (
            <Card 
              key={index} 
              className={`p-4 text-center ${badge.bgColor} ${badge.borderColor} border hover:shadow-md transition-all duration-300 hover:scale-105`}
            >
              <IconComponent className={`w-8 h-8 ${badge.iconColor} mx-auto mb-2`} />
              <h3 className="font-semibold text-sm text-gray-900 mb-1">
                {badge.title}
              </h3>
              <p className="text-xs text-gray-600 leading-tight">
                {badge.description}
              </p>
            </Card>
          );
        })}
      </div>
      
      {/* Additional Trust Indicators */}
      <div className="mt-6 pt-6 border-t border-purple-100">
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Shield className="w-3 h-3 text-white" />
            </div>
            <span>Trusted by 50,000+ customers</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Award className="w-3 h-3 text-white" />
            </div>
            <span>4.8★ rating on Google Reviews</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
              <CreditCard className="w-3 h-3 text-white" />
            </div>
            <span>PCI DSS compliant payments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
