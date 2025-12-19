"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import apiClient from "@/lib/api-client";
import { useLogin } from "@/hooks/auth/use-auth";

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

/* ---------------- Schemas ---------------- */

const passwordSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  rememberMe: z.boolean().optional(),
});

const otpEmailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

const otpVerifySchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

/* ---------------- Constants ---------------- */

const OTP_RESEND_TIME = 300; // 5 minutes

/* ---------------- Spinner ---------------- */

function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

/* ---------------- Component ---------------- */

export default function LoginPage() {
  const loginMutation = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  /* ---------- Forms ---------- */

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const otpEmailForm = useForm({
    resolver: zodResolver(otpEmailSchema),
    defaultValues: { email: "" },
  });

  const otpVerifyForm = useForm({
    resolver: zodResolver(otpVerifySchema),
    defaultValues: { otp: "" },
  });

  /* ---------- Password Login ---------- */

  const handlePasswordLogin = (data) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
      is_remember: data.rememberMe || false,
      method: "PASSWORD",
      type: "LOGIN",
      channel: "EMAIL",
    });
  };

  /* ---------- Send OTP ---------- */

  const handleSendOtp = async (data) => {
    try {
      setSendingOtp(true);

      await apiClient.post("/auth/send-otp", {
        email: data.email,
        type: "LOGIN",
        channel: "EMAIL",
      });

      setOtpEmail(data.email);
      setOtpSent(true);
      setResendTimer(OTP_RESEND_TIME);
    } catch (err) {
      console.error("Send OTP failed", err);
    } finally {
      setSendingOtp(false);
    }
  };

  /* ---------- Verify OTP ---------- */

  const handleVerifyOtp = (data) => {
    setVerifyingOtp(true);

    loginMutation.mutate(
      {
        email: otpEmail,
        otp: data.otp,
        method: "OTP",
        type: "LOGIN",
        channel: "EMAIL",
      },
      {
        onSettled: () => setVerifyingOtp(false),
      }
    );
  };

  /* ---------- Resend Timer ---------- */

  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">

      {/* Error */}
      {loginMutation.isError && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          <p className="font-medium">Login failed</p>
          <p className="text-sm mt-1">
            {loginMutation.error?.message || "Something went wrong"}
          </p>
        </div>
      )}

      <Tabs defaultValue="password" className="space-y-6">

        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="otp">OTP</TabsTrigger>
        </TabsList>

        {/* ================= PASSWORD ================= */}

        <TabsContent value="password">
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(handlePasswordLogin)}
              className="space-y-5"
            >

              <FormField
                control={passwordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
                control={passwordForm.control}
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
                  control={passwordForm.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <span className="text-sm">Remember me</span>
                    </div>
                  )}
                />
                <Link href="/forgetpassword" className="text-sm text-primary">
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

        {/* ================= OTP ================= */}

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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full h-12 flex items-center justify-center gap-2"
                  disabled={sendingOtp}
                >
                  {sendingOtp && <Spinner />}
                  {sendingOtp ? "Sending OTP..." : "Send OTP"}
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
                      <FormLabel>OTP</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          maxLength={6}
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          className="h-12 text-center tracking-widest"
                          disabled={verifyingOtp}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full h-12 flex items-center justify-center gap-2"
                  disabled={verifyingOtp || loginMutation.isPending}
                >
                  {(verifyingOtp || loginMutation.isPending) && <Spinner />}
                  {verifyingOtp || loginMutation.isPending
                    ? "Verifying..."
                    : "Verify & Sign In"}
                </Button>

                <Button
                  type="button"
                  variant="link"
                  disabled={resendTimer > 0}
                  onClick={() => handleSendOtp({ email: otpEmail })}
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

      <Button variant="outline" className="w-full h-12" asChild>
        <Link href="/register">Create New Account</Link>
      </Button>
    </div>
  );
}
