"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { SignUpFormValues, UserRole, FormUserRole } from "@/types/User";
import { registerPatient, handleApiError } from "@/lib/api";
import { PatientRegistrationRequest } from "@/types/api";

const signUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10,15}$/, "Invalid phone number"),
  role: z.enum(["patient", "doctor", "admin", "super-admin"]),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "patient" as FormUserRole, 
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);

    try {
      // Only patients can register through this form (as per API documentation)
      if (data.role !== "patient") {
        toast.error("Only patients can register through this form");
        return;
      }

      // Extract first and last name from full name
      const nameParts = data.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      if (!firstName || !lastName) {
        toast.error("Please enter both first and last name");
        return;
      }

      // Prepare registration data for backend
      const registrationData: PatientRegistrationRequest = {
        firstName,
        lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        // gender is optional in the API
      };

      // Call backend API
      const response = await registerPatient(registrationData);

      if (response.success) {
        toast.success("Account created successfully! Awaiting approval.");
        setTimeout(() => router.push("/login"), 2000);
      }

    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-100 p-4">
      {/* Back button */}
      <div className="absolute top-4 left-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={() => router.push("/")}
        >
          <ArrowLeft size={16} />
          Home
        </Button>
      </div>

      {/* Sign Up card */}
      <Card className="w-full max-w-md shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-blue-400 text-white">
          <CardTitle className="text-2xl text-center">Create Account</CardTitle>
          <p className="text-center text-primary-hover text-sm mt-1">
            Join us today
          </p>
        </CardHeader>

        <CardContent className="space-y-4 bg-white p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1 text-text-primary">
                Full Name
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="John Doe"
                    className={`bg-gray-50 ${
                      errors.name
                        ? "border-error"
                        : "focus:ring-2 focus:ring-primary"
                    }`}
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <p className="text-error text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1 text-text-primary">
                Email Address
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
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

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1 text-text-primary">
                Phone Number
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="0234567890"
                    className={`bg-gray-50 ${
                      errors.phone
                        ? "border-error"
                        : "focus:ring-2 focus:ring-primary"
                    }`}
                    {...field}
                  />
                )}
              />
              {errors.phone && (
                <p className="text-error text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-1 text-text-primary">
                Select Role
              </label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={`w-full ${
                        errors.role
                          ? "border-error"
                          : "focus:ring-2 focus:ring-primary"
                      } bg-gray-50`}
                    >
                      <SelectValue placeholder="Choose role..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-primary/30 rounded-lg shadow-md">
                      <SelectItem value="patient">Patient</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="super-admin">Super Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <p className="text-error text-sm mt-1">{errors.role.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1 text-text-primary">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    type="password"
                    placeholder="••••••"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-1 text-text-primary">
                Confirm Password
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    type="password"
                    placeholder="••••••"
                    className={`bg-gray-50 ${
                      errors.confirmPassword
                        ? "border-error"
                        : "focus:ring-2 focus:ring-primary"
                    }`}
                    {...field}
                  />
                )}
              />
              {errors.confirmPassword && (
                <p className="text-error text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-400 hover:bg-blue-500 transition-colors duration-200 px-2 py-1 rounded-lg text-white font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="bg-bg-2 border-t border-primary/20 py-4">
          <div className="w-full text-center text-sm text-text-secondary">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>

      <Toaster position="top-center" />
    </div>
  );
}