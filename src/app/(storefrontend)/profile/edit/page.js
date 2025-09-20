"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Camera, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    dateOfBirth: "1990-05-15",
    gender: "male",
    address: "123 Fashion Street",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    country: "India"
  });

  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Show success message or redirect
      alert("Profile updated successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/profile" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Edit Profile
          </h1>
          <p className="text-gray-600">Update your account information and preferences</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Picture Section */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Profile Picture</h3>
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                      {avatar ? (
                        <Image src={avatar} alt="Profile" width={128} height={128} className="w-full h-full object-cover" />
                      ) : (
                        (formData.firstName[0] + formData.lastName[0]).toUpperCase()
                      )}
                    </div>
                    <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
                      <Camera className="w-5 h-5 text-gray-600" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload a new profile picture. JPG, PNG files are allowed.
                  </p>
                  {avatar && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setAvatar(null)}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remove Photo
                    </Button>
                  )}
                </div>
              </Card>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                <h3 className="text-lg font-semibold mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </Card>

              {/* Address Information */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                <h3 className="text-lg font-semibold mb-6">Address Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <Input
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
                    <Input
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <Input
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Link href="/profile">
                  <Button variant="outline" className="w-full sm:w-auto border-gray-300 hover:bg-gray-50">
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
