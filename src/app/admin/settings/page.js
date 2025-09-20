"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Store, 
  Mail, 
  Shield, 
  CreditCard, 
  User,
  Save,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const settingsTabs = [
  { id: "general", label: "General", icon: Store },
  { id: "security", label: "Security", icon: Shield },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "email", label: "Email", icon: Mail },
];

const generalSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  storeDescription: z.string().min(10, "Description must be at least 10 characters"),
  storeEmail: z.string().email("Please enter a valid email"),
  storePhone: z.string().min(10, "Phone number must be at least 10 digits"),
  storeAddress: z.string().min(1, "Address is required"),
  currency: z.string().min(1, "Currency is required"),
  timezone: z.string().min(1, "Timezone is required"),
});

const securitySchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don&apos;t match",
  path: ["confirmPassword"],
});

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const generalForm = useForm({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      storeName: "Vesha Store",
      storeDescription: "Your premium ecommerce destination",
      storeEmail: "store@vesha.com",
      storePhone: "+91 98765 43210",
      storeAddress: "123 Commerce St, Business City, Mumbai 400001",
      currency: "INR",
      timezone: "Asia/Kolkata",
    },
  });

  const securityForm = useForm({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onGeneralSubmit = async (data) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("General settings:", data);
      setIsLoading(false);
    }, 1000);
  };

  const onSecuritySubmit = async (data) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("Security settings:", data);
      setIsLoading(false);
    }, 1000);
  };

  const renderGeneralSettings = () => (
    <Form {...generalForm}>
      <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={generalForm.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={generalForm.control}
            name="storeEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={generalForm.control}
            name="storePhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={generalForm.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <select
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...field}
                  >
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={generalForm.control}
          name="storeDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Description</FormLabel>
              <FormControl>
                <textarea
                  className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={generalForm.control}
          name="storeAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );

  const renderSecuritySettings = () => (
    <Form {...securityForm}>
      <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Change Password</h3>
          <div className="space-y-4 max-w-md">
            <FormField
              control={securityForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPasswords.current ? "text" : "password"}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                        onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                      >
                        {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={securityForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPasswords.new ? "text" : "password"}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                        onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                      >
                        {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={securityForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPasswords.confirm ? "text" : "password"}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                        onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                      >
                        {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
          <div className="flex items-center space-x-3">
            <Checkbox id="two-factor" />
            <label htmlFor="two-factor" className="text-sm font-medium">
              Enable two-factor authentication
            </label>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Add an extra layer of security to your account
          </p>
        </div>

        <Button type="submit" disabled={isLoading}>
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Updating..." : "Update Security Settings"}
        </Button>
      </form>
    </Form>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "security":
        return renderSecuritySettings();
      case "payment":
        return <div className="text-muted-foreground">Payment settings coming soon...</div>;
      case "email":
        return <div className="text-muted-foreground">Email settings coming soon...</div>;
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your store settings and preferences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar Navigation */}
        <Card className="lg:col-span-1 p-2">
          <CardContent className="p-4">
            <nav className="space-y-2">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {settingsTabs.find(tab => tab.id === activeTab)?.icon && (
                React.createElement(settingsTabs.find(tab => tab.id === activeTab).icon, { className: "h-5 w-5" })
              )}
              <span>{settingsTabs.find(tab => tab.id === activeTab)?.label} Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderTabContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
