"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: ""
    }
  });

  const handleReset = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Reset email sent", {
        description: `Check ${data.email} for password reset instructions`,
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-100 p-4">
      <div className="absolute top-4 left-4">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} />
          Back
        </Button>
      </div>

      <Card className="w-full max-w-md shadow-xl rounded-2xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
          <p className="text-center text-blue-100 text-sm mt-1">
            Enter your email to reset your password
          </p>
        </CardHeader>
        <CardContent className="space-y-4 bg-white p-6">
          <form onSubmit={handleSubmit(handleReset)} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`bg-gray-50 pl-10 ${errors.email ? 'border-red-500' : 'focus:border-blue-500 focus:ring-2 focus:ring-blue-500'}`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    }
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all duration-300 hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending reset email...
                </span>
              ) : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="bg-gray-50 border-t border-gray-100 py-4">
          <div className="w-full text-center text-sm">
            <span className="text-gray-600">Remember your password? </span>
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}