// src/lib/validators/doctor.ts (update existing)
import * as z from "zod";

export const doctorSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }).optional().or(z.literal('')), // Allow empty or string
  lastName: z.string().min(1, { message: "Last name is required." }).optional().or(z.literal('')),
  email: z.string().email({ message: "Invalid email address." }),
  // Password should NOT be handled here. Use separate invite/reset flows.
  specialization: z.string().min(2, { message: "Specialization is required." }).optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')), // Optional phone
  address: z.string().optional().or(z.literal('')),
  qualifications: z.string().optional().or(z.literal('')),
  bio: z.string().optional().or(z.literal('')),
  yearsOfExperience: z.coerce.number().int().min(0).optional().or(z.literal(null).or(z.literal(undefined))), // Allow number or null/undefined
  profilePhotoUrl: z.string().url().optional().or(z.literal('')), // Validate as URL if provided
  // Do not include role, createdAt, updatedAt, id, password here - managed by backend/system
}).refine(data => data.firstName || data.lastName, { // Ensure at least one name part exists if needed
    message: "At least first or last name should be provided.",
    path: ["firstName"], // Report error on firstName field
});


export type DoctorFormData = z.infer<typeof doctorSchema>;