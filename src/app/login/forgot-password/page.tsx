"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Lock, Mail, ArrowLeft, ShieldCheck, Stethoscope } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Reset email sent", {
        description: `Check ${email} for password reset instructions`,
        action: {
          label: "Dismiss",
          onClick: () => {},
        },
      });
      
      // Redirect to confirmation page or back to login
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      toast.error("Password reset failed", {
        description: "Please check your email and try again",
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
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Lock className="w-8 h-8 text-cyan-300" />
            </div>
            <h1 className="text-3xl font-bold text-white">Secure Access</h1>
          </div>
          
          <div className="max-w-md">
            <motion.h2 
              className="text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Regain Access to Your Account
            </motion.h2>
            
            <motion.p 
              className="text-cyan-100 text-lg mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              We'll send you a secure link to reset your password and regain access to our medical platform.
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

      {/* Right Panel - Reset Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-[#f7fbff] to-[#ebf5ff] dark:from-slate-900 dark:to-slate-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 shadow-xl rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-blue-100 dark:border-slate-700">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                className="text-blue-600 dark:text-blue-400 pl-0"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to login
              </Button>
            </div>
            
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
                Reset Your Password
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-slate-600 dark:text-slate-400"
              >
                Enter your email to receive a password reset link
              </motion.p>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Professional Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-slate-400" />
                  </div>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@hospital.com"
                    className="h-12 pl-10 pr-4 rounded-xl focus-visible:ring-blue-200 border-slate-300 dark:border-slate-700"
                    disabled={isLoading}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Button
                  onClick={handleReset}
                  className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl transition-all shadow-lg hover:shadow-blue-500/20"
                  disabled={isLoading || !email}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/80 rounded-full animate-spin border-t-transparent" />
                      Sending reset email...
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-center"
            >
              <p className="text-slate-600 dark:text-slate-400">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                >
                  Sign in
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
              <span className="text-blue-600 dark:text-blue-400 font-medium">Secure Reset Process</span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center gap-2 border border-blue-100 dark:border-slate-700">
              <Stethoscope className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-600 dark:text-blue-400 font-medium">HIPAA Compliant</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}