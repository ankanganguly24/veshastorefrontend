"use client";

import { Home, Briefcase, MapPin, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * AddressList Component
 * Displays list of saved addresses with selection and actions
 */
export function AddressList({ 
  addresses, 
  selectedAddressId, 
  onSelectAddress, 
  onEditAddress, 
  onDeleteAddress 
}) {
  if (!addresses || addresses.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="w-12 h-12 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Addresses Found</h3>
        <p className="text-sm text-gray-600">
          Add a new address to continue with checkout
        </p>
      </div>
    );
  }

  const getAddressIcon = (type) => {
    switch (type) {
      case "HOME":
        return <Home className="w-4 h-4" />;
      case "WORK":
        return <Briefcase className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getAddressLabel = (address) => {
    if (address.address_type === "OTHER" && address.custom_label) {
      return address.custom_label;
    }
    return address.address_type;
  };

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {addresses.map((userAddress) => {
        const address = userAddress.address;
        const isSelected = selectedAddressId === userAddress.address_id;
        
        return (
          <div
            key={userAddress.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              isSelected
                ? "border-black bg-gray-50 shadow-sm"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onSelectAddress(userAddress.address_id)}
          >
            <div className="flex items-start gap-3">
              {/* Radio Button */}
              <div className="pt-1">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? "border-black bg-black"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>

              {/* Address Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  {getAddressIcon(address.address_type)}
                  <span className="font-medium text-sm">
                    {getAddressLabel(address)}
                  </span>
                  {userAddress.is_default && (
                    <Badge variant="secondary" className="text-xs">
                      Default
                    </Badge>
                  )}
                </div>

                <p className="font-medium text-gray-900 mb-1">
                  {userAddress.name}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  {address.address_line1}
                  {address.address_line2 && `, ${address.address_line2}`}
                </p>
                {address.landmark && (
                  <p className="text-sm text-gray-600 mb-1">
                    Landmark: {address.landmark}
                  </p>
                )}
                <p className="text-sm text-gray-600 mb-1">
                  {address.city}, {address.state} - {address.pincode}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  {address.country}
                </p>
                <p className="text-sm text-gray-900 font-medium">
                  Phone: {userAddress.phone}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-600 hover:text-gray-900"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditAddress(userAddress);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteAddress(userAddress.address_id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
