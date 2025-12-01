"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Validation schema
const addressSchema = z.object({
  address_type: z.enum(["HOME", "WORK", "OTHER"], {
    required_error: "Please select an address type",
  }),
  custom_label: z.string().optional().nullable(),
  country: z.string().min(2, "Country is required"),
  state: z.string().min(2, "State is required"),
  city: z.string().min(2, "City is required"),
  pincode: z.string().min(4, "Valid pincode is required").max(10, "Pincode is too long"),
  address_line1: z.string().min(5, "Address line 1 is required"),
  address_line2: z.string().optional().nullable(),
  landmark: z.string().optional().nullable(),
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required").max(15, "Phone number is too long"),
  is_default: z.boolean().default(false),
});

/**
 * AddressForm Component
 * Reusable form for adding or editing addresses
 */
export function AddressForm({ onSubmit, onCancel, initialData, isSubmitting }) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData || {
      address_type: "HOME",
      custom_label: null,
      country: "India",
      state: "",
      city: "",
      pincode: "",
      address_line1: "",
      address_line2: null,
      landmark: null,
      name: "",
      phone: "",
      is_default: false,
    },
    mode: "onChange",
  });

  const addressType = watch("address_type");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Address Type and Custom Label */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="address_type" className="text-sm font-medium mb-2 block">
            Address Type *
          </Label>
          <Controller
            name="address_type"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HOME">Home</SelectItem>
                  <SelectItem value="WORK">Work</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.address_type && (
            <p className="text-red-500 text-xs mt-1">{errors.address_type.message}</p>
          )}
        </div>

        {addressType === "OTHER" && (
          <div>
            <Label htmlFor="custom_label" className="text-sm font-medium mb-2 block">
              Custom Label
            </Label>
            <Controller
              name="custom_label"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="e.g., Gym, Friend's House"
                />
              )}
            />
          </div>
        )}
      </div>

      {/* Name and Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium mb-2 block">
            Full Name *
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter full name" />
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
            Phone Number *
          </Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter phone number" type="tel" />
            )}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Address Line 1 */}
      <div>
        <Label htmlFor="address_line1" className="text-sm font-medium mb-2 block">
          Address Line 1 *
        </Label>
        <Controller
          name="address_line1"
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder="House/Flat No., Building Name" />
          )}
        />
        {errors.address_line1 && (
          <p className="text-red-500 text-xs mt-1">{errors.address_line1.message}</p>
        )}
      </div>

      {/* Address Line 2 */}
      <div>
        <Label htmlFor="address_line2" className="text-sm font-medium mb-2 block">
          Address Line 2
        </Label>
        <Controller
          name="address_line2"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              value={field.value || ""}
              placeholder="Street, Area (Optional)"
            />
          )}
        />
      </div>

      {/* Landmark */}
      <div>
        <Label htmlFor="landmark" className="text-sm font-medium mb-2 block">
          Landmark
        </Label>
        <Controller
          name="landmark"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              value={field.value || ""}
              placeholder="Nearby landmark (Optional)"
            />
          )}
        />
      </div>

      {/* City, State, Pincode */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city" className="text-sm font-medium mb-2 block">
            City *
          </Label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter city" />
            )}
          />
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="state" className="text-sm font-medium mb-2 block">
            State *
          </Label>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter state" />
            )}
          />
          {errors.state && (
            <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="pincode" className="text-sm font-medium mb-2 block">
            Pincode *
          </Label>
          <Controller
            name="pincode"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter pincode" />
            )}
          />
          {errors.pincode && (
            <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>
          )}
        </div>
      </div>

      {/* Country */}
      <div>
        <Label htmlFor="country" className="text-sm font-medium mb-2 block">
          Country *
        </Label>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder="Enter country" />
          )}
        />
        {errors.country && (
          <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
        )}
      </div>

      {/* Default Address Checkbox */}
      <div className="flex items-center space-x-2">
        <Controller
          name="is_default"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="is_default"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label
          htmlFor="is_default"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Set as default address
        </Label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="flex-1 bg-black text-white hover:bg-gray-800"
        >
          {isSubmitting ? "Saving..." : "Save Address"}
        </Button>
      </div>
    </form>
  );
}
