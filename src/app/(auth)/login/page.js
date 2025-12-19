"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import { useLogin } from "@/hooks/auth/use-auth";

/* ---------------- Existing Password Schema (UNCHANGED) ---------------- */

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

/* ---------------- OTP Schemas (NEW) ---------------- */

const otpEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const otpVerifySchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export default function Login() {
  /* ---------------- Existing State (UNCHANGED) ---------------- */

  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  /* ---------------- OTP State (NEW) ---------------- */

  const [otpSent, setOtpSent] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  /* ---------------- Existing Password Form (UNCHANGED) ---------------- */

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    console.log("Login attempt with:", data.email);

    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  /* ---------------- OTP Forms (NEW) ---------------- */

  const otpEmailForm = useForm({
    resolver: zodResolver(otpEmailSchema),
    defaultValues: { email: "" },
  });

  const otpVerifyForm = useForm({
    resolver: zodResolver(otpVerifySchema),
    defaultValues: { otp: "" },
  });

  const handleSendOtp = async (data) => {
    setOtpEmail(data.email);
    setOtpSent(true);
    setResendTimer(30);

    // 👉 Call send OTP API here
    // await sendOtp(data.email)
  };

  const handleVerifyOtp = async (data) => {
    console.log("Verify OTP:", otpEmail, data.otp);

    // 👉 Call verify OTP API here
    // await verifyOtp({ email: otpEmail, otp: data.otp })
  };

  /* ---------------- OTP Resend Timer ---------------- */

  useEffect(() => {
    if (resendTimer === 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  return (
    <div className="space-y-6">
      {/* Error Alert (UNCHANGED) */}
      {loginMutation.isError && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          <p className="font-medium">Login Failed</p>
          <p className="text-sm mt-1">
            {loginMutation.error?.response?.data?.message ||
              loginMutation.error?.message ||
              "Invalid email or password. Please try again."}
          </p>
        </div>
      )}

      {/* ---------------- Tabs (NEW) ---------------- */}
      <Tabs defaultValue="password" className="space-y-6">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="otp">OTP</TabsTrigger>
        </TabsList>

        {/* ================= PASSWORD LOGIN (UNCHANGED JSX) ================= */}
        <TabsContent value="password">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input {...field} className="pl-10 h-12" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-12 h-12"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value || false}
                        onCheckedChange={field.onChange}
                      />
                      <span className="text-sm">Remember me</span>
                    </div>
                  )}
                />
                <Link
                  href="/forgetpassword"
                  className="text-sm text-primary"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full h-12"
              >
                {loginMutation.isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </TabsContent>

        {/* ================= OTP LOGIN (NEW) ================= */}
        <TabsContent value="otp">
          {!otpSent ? (
            <Form {...otpEmailForm}>
              <form
                onSubmit={otpEmailForm.handleSubmit(handleSendOtp)}
                className="space-y-5"
              >
                <FormField
                  control={otpEmailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-12">
                  Send OTP
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...otpVerifyForm}>
              <form
                onSubmit={otpVerifyForm.handleSubmit(handleVerifyOtp)}
                className="space-y-5"
              >
                <p className="text-sm text-muted-foreground">
                  OTP sent to <strong>{otpEmail}</strong>
                </p>

                <FormField
                  control={otpVerifyForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter OTP</FormLabel>
                      <FormControl>
                        <Input {...field} maxLength={6} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-12">
                  Verify & Sign In
                </Button>

                <Button
                  type="button"
                  variant="link"
                  disabled={resendTimer > 0}
                  onClick={() => setResendTimer(30)}
                  className="w-full"
                >
                  {resendTimer > 0
                    ? `Resend OTP in ${resendTimer}s`
                    : "Resend OTP"}
                </Button>
              </form>
            </Form>
          )}
        </TabsContent>
      </Tabs>

      {/* Register */}
      <Button variant="outline" className="w-full h-12" asChild>
        <Link href="/register">Create New Account</Link>
      </Button>
    </div>
  );
}
