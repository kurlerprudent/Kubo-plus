// pages/profile.tsx
"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminAppSidebar } from "@/components/app-sidebar-admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  specialization: z.string().min(2),
  qualifications: z.string().min(2),
  experience: z.string().min(1),
  bloodType: z.string().optional(),
  allergies: z.string().optional(),
  conditions: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { 
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@healthcare.org",
        phone: "+1 555 123 4567",
        address: "123 Medical Plaza, Suite 456, Health City, HC 12345",
        bio: "Board-certified cardiologist with 12 years of experience...",
        specialization: "Snr Radiologist",
        qualifications: "MD, PhD, FACC",
        experience: "12 years",
        bloodType: "O+",
        allergies: "Penicillin, Pollen",
        conditions: "Hypertension",
    }
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Profile updated:", data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <SidebarProvider>
      <AdminAppSidebar />
      <SidebarInset className="flex flex-col h-screen">
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          {/* Breadcrumb remains same */}
        </header>

        <main className="flex-1 p-4 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/doctor-avatar.png" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline" className="border-blue-200 bg-blue-50 text-blue-600">
                  Change Photo
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button 
                    onClick={handleSubmit(onSubmit)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleCancel}
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Personal Information Card */}
              <Card className="border-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-600">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    {isEditing ? (
                      <>
                        <Input
                          {...register("name")}
                          className="bg-blue-50 border-blue-100"
                        />
                        {errors.name && (
                          <p className="text-red-600 text-sm">{errors.name.message}</p>
                        )}
                      </>
                    ) : (
                      <Input value="Dr. Sarah Johnson" readOnly className="bg-blue-50 border-blue-100" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      {isEditing ? (
                        <>
                          <Input
                            {...register("email")}
                            className="bg-blue-50 border-blue-100"
                          />
                          {errors.email && (
                            <p className="text-red-600 text-sm">{errors.email.message}</p>
                          )}
                        </>
                      ) : (
                        <Input value="sarah.johnson@healthcare.org" readOnly className="bg-blue-50 border-blue-100" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      {isEditing ? (
                        <>
                          <Input
                            {...register("phone")}
                            className="bg-blue-50 border-blue-100"
                          />
                          {errors.phone && (
                            <p className="text-red-600 text-sm">{errors.phone.message}</p>
                          )}
                        </>
                      ) : (
                        <Input value="+1 555 123 4567" readOnly className="bg-blue-50 border-blue-100" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Address</Label>
                    {isEditing ? (
                      <>
                        <Input
                          {...register("address")}
                          className="bg-blue-50 border-blue-100"
                        />
                        {errors.address && (
                          <p className="text-red-600 text-sm">{errors.address.message}</p>
                        )}
                      </>
                    ) : (
                      <Input value="123 Medical Plaza..." readOnly className="bg-blue-50 border-blue-100" />
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Professional Details Card */}
              <Card className="border-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-600">Professional Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Specialization</Label>
                      {isEditing ? (
                        <>
                          <Input
                            {...register("specialization")}
                            className="bg-blue-50 border-blue-100"
                          />
                          {errors.specialization && (
                            <p className="text-red-600 text-sm">{errors.specialization.message}</p>
                          )}
                        </>
                      ) : (
                        <Input value="Cardiology" readOnly className="bg-blue-50 border-blue-100" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Years of Experience</Label>
                      {isEditing ? (
                        <>
                          <Input
                            {...register("experience")}
                            className="bg-blue-50 border-blue-100"
                          />
                          {errors.experience && (
                            <p className="text-red-600 text-sm">{errors.experience.message}</p>
                          )}
                        </>
                      ) : (
                        <Input value="12 years" readOnly className="bg-blue-50 border-blue-100" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Qualifications</Label>
                    {isEditing ? (
                      <>
                        <Input
                          {...register("qualifications")}
                          className="bg-blue-50 border-blue-100"
                        />
                        {errors.qualifications && (
                          <p className="text-red-600 text-sm">{errors.qualifications.message}</p>
                        )}
                      </>
                    ) : (
                      <Input value="MD, PhD, FACC" readOnly className="bg-blue-50 border-blue-100" />
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Bio Section */}
              <Card className="border-blue-50 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-blue-600">Professional Bio</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <>
                      <Textarea
                        {...register("bio")}
                        className="bg-blue-50 border-blue-100 min-h-[120px]"
                      />
                      {errors.bio && (
                        <p className="text-red-600 text-sm mt-2">{errors.bio.message}</p>
                      )}
                    </>
                  ) : (
                    <Textarea
                      value="Board-certified cardiologist..."
                      readOnly
                      className="bg-blue-50 border-blue-100 min-h-[120px]"
                    />
                  )}
                </CardContent>
              </Card>

              {/* Medical Information */}
              <Card className="border-blue-50 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-blue-600">Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Blood Type</Label>
                    {isEditing ? (
                      <Input
                        {...register("bloodType")}
                        className="bg-blue-50 border-blue-100"
                      />
                    ) : (
                      <Input value="O+" readOnly className="bg-blue-50 border-blue-100" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Allergies</Label>
                    {isEditing ? (
                      <Input
                        {...register("allergies")}
                        className="bg-blue-50 border-blue-100"
                      />
                    ) : (
                      <Input value="Penicillin, Pollen" readOnly className="bg-blue-50 border-blue-100" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Conditions</Label>
                    {isEditing ? (
                      <Input
                        {...register("conditions")}
                        className="bg-blue-50 border-blue-100"
                      />
                    ) : (
                      <Input value="Hypertension" readOnly className="bg-blue-50 border-blue-100" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}