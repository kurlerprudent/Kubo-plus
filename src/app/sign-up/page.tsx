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
import { DoctorRegistrationForm } from "@/components/DoctorRegistrationForm";

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
  const [selectedRole, setSelectedRole] = useState<FormUserRole>("patient");
  const [showRoleSelection, setShowRoleSelection] = useState(true);

  // Show doctor registration form if doctor role is selected
  if (selectedRole === "doctor" && !showRoleSelection) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-100 p-4">
        {/* Back button */}
        <div className="absolute top-4 left-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={() => setShowRoleSelection(true)}
          >
            <ArrowLeft size={16} />
            Back to Role Selection
          </Button>
        </div>

        <DoctorRegistrationForm
          onSuccess={() => router.push("/login")}
          onCancel={() => setShowRoleSelection(true)}
        />
        <Toaster />
      </div>
    );
  }

  // Show role selection if that's the current state
  if (showRoleSelection) {
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

        {/* Role Selection card */}
        <Card className="w-full max-w-md shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-blue-400 text-white">
            <CardTitle className="text-2xl text-center">Join Kubo+</CardTitle>
            <p className="text-center text-primary-hover text-sm mt-1">
              Choose your account type
            </p>
          </CardHeader>

          <CardContent className="space-y-4 bg-white p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-3 text-text-primary">
                  I want to join as a:
                </label>
                <div className="space-y-3">
                  <button
                    type="button"
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all hover:bg-blue-50 ${
                      selectedRole === "patient" 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedRole("patient")}
                  >
                    <div className="font-medium text-gray-900">Patient</div>
                    <div className="text-sm text-gray-600">
                      Book appointments and access medical services
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all hover:bg-green-50 ${
                      selectedRole === "doctor" 
                        ? "border-green-500 bg-green-50" 
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedRole("doctor")}
                  >
                    <div className="font-medium text-gray-900">Doctor</div>
                    <div className="text-sm text-gray-600">
                      Provide medical services and manage patients
                    </div>
                  </button>
                </div>
              </div>

              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600"
                onClick={() => setShowRoleSelection(false)}
                disabled={!selectedRole}
              >
                Continue as {selectedRole === "patient" ? "Patient" : "Doctor"}
              </Button>
            </div>
          </CardContent>

          <CardFooter className="bg-gray-50 text-center">
            <p className="text-sm text-gray-600 w-full">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
        <Toaster />
      </div>
    );
  }

  // Patient registration form
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
          onClick={() => setShowRoleSelection(true)}
        >
          <ArrowLeft size={16} />
          Back to Role Selection
        </Button>
      </div>

      {/* Patient Registration card */}
      <Card className="w-full max-w-md shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-blue-400 text-white">
          <CardTitle className="text-2xl text-center">Patient Registration</CardTitle>
          <p className="text-center text-primary-hover text-sm mt-1">
            Create your patient account
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
              {isLoading ? "Creating account..." : "Create Patient Account"}
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