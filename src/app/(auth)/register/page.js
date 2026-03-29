"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, User, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import apiClient from "@/lib/api-client";
import { useRegister } from "@/hooks/auth/use-auth";

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
import { Label } from "@/components/ui/label";
import Toast from "@/components/ui/Toast";

/* ---------------- Schema ---------------- */

const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  acceptTerms: z.boolean().refine((v) => v === true, "You must accept terms"),
});

/* ---------------- Constants ---------------- */

const OTP_RESEND_TIME = 300; // 5 minutes

/* ---------------- Spinner ---------------- */

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
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

export default function Register() {
  const registerMutation = useRegister();
  const [toast, setToast] = useState(null);

  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [formData, setFormData] = useState(null);
  const [otp, setOtp] = useState("");

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      acceptTerms: false,
    },
  });

  /* ---------------- Send OTP ---------------- */

  const handleSendOtp = async (data) => {
    try {
      setSendingOtp(true);

      await apiClient.post("/auth/send-otp", {
        email: data.email,
        type: "REGISTER",
        channel: "EMAIL",
      });

      setFormData(data);
      setOtpSent(true);
      setResendTimer(OTP_RESEND_TIME);
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to send OTP.";
      setToast({ type: "error", message });
    } finally {
      setSendingOtp(false);
    }
  };

  /* ---------------- Register ---------------- */

  const handleRegister = () => {
    if (otp.length !== 6) return;

    setRegistering(true);

    registerMutation.mutate(
      {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        otp,
        type: "REGISTER",
        channel: "EMAIL",
      },
      {
        onSuccess: () => {
          // optional success toast
          setToast({
            type: "success",
            message: "Account created successfully!",
          });
        },

        onError: (err) => {
          let message = "Registration failed.";

          const data = err?.response?.data;

          if (Array.isArray(data?.details)) {
            const field = data.details[0]?.path?.[0];
            if (field === "email") message = "Email already exists.";
            if (field === "phone") message = "Phone number already exists.";
          } else if (data?.message) {
            message = data.message;
          }

          setToast({ type: "error", message });
        },

        onSettled: () => {
          setRegistering(false);
        },
      }
    );
  };

  /* ---------------- Resend Timer ---------------- */

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
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      {!otpSent ? (
        /* ================= FORM ================= */
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSendOtp)}
            className="space-y-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
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
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input {...field} className="pl-10 h-12" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-start gap-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="underline">
                        Terms
                      </Link>{" "}
                      &{" "}
                      <Link href="/privacy" className="underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
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
        /* ================= OTP ================= */
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground">
            OTP sent to <strong>{formData.email}</strong>
          </p>

          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="Enter OTP"
            className="h-12 text-center tracking-widest"
          />

          <Button
            onClick={handleRegister}
            className="w-full h-12 flex items-center justify-center gap-2"
            disabled={registering || otp.length !== 6}
          >
            {registering && <Spinner />}
            {registering ? "Creating account..." : "Verify & Register"}
          </Button>

          <Button
            variant="link"
            disabled={resendTimer > 0}
            onClick={() => handleSendOtp(formData)}
            className="w-full"
          >
            {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
          </Button>
        </div>
      )}

      <Button variant="outline" className="w-full h-12" asChild>
        <Link href="/login">Already have an account? Sign in</Link>
      </Button>
    </div>
  );
}
