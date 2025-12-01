"use client";

import { memo } from "react";
import { Card } from "@/components/ui/card";

const ProductOffers = memo(({ offers }) => {
  if (!offers || offers.length === 0) return null;

  return (
    <Card className="p-4 bg-green-50 border border-green-200">
      <h3 className="font-semibold text-green-800 mb-2">Special Offers</h3>
      <ul className="space-y-1">
        {offers.map((offer, index) => (
          <li key={index} className="text-sm text-green-700 flex items-center">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
            {offer}
          </li>
        ))}
      </ul>
    </Card>
  );
});

ProductOffers.displayName = "ProductOffers";

export default ProductOffers;
