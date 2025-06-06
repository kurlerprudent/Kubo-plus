"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const loginSchema = z.object({
  role: z.enum(["PATIENT", "DOCTOR", "ADMIN", "SUPER_ADMIN"], {
    required_error: "Role is required",
  }),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: "PATIENT", email: "", password: "" },
  });

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Login successful", {
        description: `Welcome back, ${values.role}`,
        action: {
          label: "Dismiss",
          onClick: () => {},
        },
      });

      // Role-based routing
      switch (values.role) {
        case "PATIENT":
          router.push("/dashboard");
          break;
        case "DOCTOR":
          router.push("/doctor-dashboard");
          break;
        case "ADMIN":
          router.push("/admin-dashboard");
          break;
        case "SUPER_ADMIN":
          router.push("/superadmin-dashboard");
          break;
        default:
          router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Authentication Failed", {
        description: "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Visual Section */}
      <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-blue-900 to-cyan-800 p-12 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <div className="flex items-center gap-3 mb-16">
            <HeartPulse className="w-10 h-10 text-cyan-300" />
            <h1 className="text-3xl font-bold text-white">HTECH 4 AFRICA</h1>
          </div>

          <div className="max-w-md">
            <motion.h2
              className="text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Precision Diagnostics for Modern Healthcare
            </motion.h2>

            <motion.p
              className="text-cyan-100 text-lg mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Secure access to AI-powered medical imaging analysis and diagnostic
              tools
            </motion.p>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full flex justify-between">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.8 }}
              className="w-24 h-24 bg-cyan-500/10 rounded-t-full"
            />
          ))}
        </div>

        {/* Animated Circles */}
        <motion.div
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-cyan-400/20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 -left-16 w-48 h-48 rounded-full bg-blue-500/20"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-[#f7fbff] to-[#ebf5ff] dark:from-slate-900 dark:to-slate-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 shadow-xl rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-blue-100 dark:border-slate-700">
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6 flex justify-center"
              >
                <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                  <Lock className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2"
              >
                Medical Portal Login
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-slate-600 dark:text-slate-400"
              >
                Enter your credentials to access the platform
              </motion.p>
            </div>

            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Select Role
                </label>
               <Controller
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full h-12 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 focus-visible:ring-blue-200 px-3">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PATIENT">Patient</SelectItem>
                        <SelectItem value="DOCTOR">Doctor</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {form.formState.errors.role && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <span>•</span> {form.formState.errors.role.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Professional Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                  <Input
                    {...form.register("email")}
                    placeholder="name@hospital.com"
                    className="h-12 pl-10 pr-4 rounded-xl focus-visible:ring-blue-200 border-slate-300 dark:border-slate-700"
                    disabled={isLoading}
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <span>•</span> {form.formState.errors.email.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <Link
                    href="/login/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-400" />
                  </div>
                  <Input
                    {...form.register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 pl-10 pr-11 rounded-xl focus-visible:ring-blue-200 border-slate-300 dark:border-slate-700"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <span>•</span> {form.formState.errors.password.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  type="submit"
                  className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl transition-all shadow-lg hover:shadow-blue-500/20"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/80 rounded-full animate-spin border-t-transparent" />
                      Authenticating...
                    </div>
                  ) : (
                    "Access Medical Portal"
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-center"
            >
              <p className="text-slate-600 dark:text-slate-400">
                New to the platform?{" "}
                <Link
                  href="/request-access"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                >
                  Request clinical access
                </Link>
              </p>
            </motion.div>
          </Card>

          {/* Security Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 grid grid-cols-2 gap-4 text-center text-sm"
          >
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center gap-2 border border-blue-100 dark:border-slate-700">
              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                HIPAA Compliant
              </span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center gap-2 border border-blue-100 dark:border-slate-700">
              <Stethoscope className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                Medical-Grade Security
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
