"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { UserRole } from "@/types/User";

// Extend form values to include UserRole
type FormValues = {
  role: UserRole | "";
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { role: "", email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    // No credential check for now, just redirect based on role
    toast.success("Login successful! Redirecting…", { duration: 1500 });
    setTimeout(() => {
      switch (data.role) {
        case "patient":
          router.push("/dashboard");
          break;
        case "doctor":
          router.push("/doctor-dashboard");
          break;
        case "admin":
          router.push("/admin-dashboard");
          break;
        case "super-admin":
          router.push("/superadmin-dashboard");
          break;
        default:
          router.push("/");
      }
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-100 p-4">
      {/* Back button */}
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

      {/* Login card */}
      <Card className="w-full max-w-md shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-blue-400 text-white">
          <CardTitle className="text-2xl text-center">Welcome</CardTitle>
          <p className="text-center text-primary-hover text-sm mt-1">
            Sign in to your account
          </p>
        </CardHeader>

        <CardContent className="space-y-4 bg-white p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium mb-1 text-text-primary"
              >
                Select Role
              </label>
              <Controller
                name="role"
                control={control}
                rules={{ required: "Please select a role" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      id="role"
                      className={`w-full ${
                        errors.role
                          ? "border-error"
                          : "focus:ring-2 focus:ring-primary"
                      } bg-gray-50`}
                    >
                      <SelectValue placeholder="Choose role..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-primary/30 rounded-lg shadow-md">
                      {( ["patient", "doctor", "admin", "super-admin"] as UserRole[] ).map((r) => (
                        <SelectItem key={r} value={r}>
                          {r.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <p className="text-error text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1 text-text-primary"
              >
                Email Address
              </label>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`bg-gray-50 ${
                      errors.email
                        ? "border-error"
                        : "focus:ring-2 focus:ring-primary"
                    }`}
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1 text-text-primary"
              >
                Password
              </label>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <Input
                    id="password"
                    type="password"
                    placeholder="password"
                    className={`bg-gray-50 ${
                      errors.password
                        ? "border-error"
                        : "focus:ring-2 focus:ring-primary"
                    }`}
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Link
                href="/login/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-400 hover:bg-blue-400 transition-colors duration-200 px-2 py-1 rounded-lg text-white font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="bg-bg-2 border-t border-primary/20 py-4">
          <div className="w-full text-center text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link
              href="/sign-up"
              className="font-medium text-primary hover:underline"
            >
              Sign up now
            </Link>
          </div>
        </CardFooter>
      </Card>

      {/* Sonner Toaster */}
      <Toaster />
    </div>
  );
}
