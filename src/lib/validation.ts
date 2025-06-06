import { z } from "zod";

export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const profileSchema = z.object({
  // ... existing profile schema
});

export const securitySchema = z.object({
  // ... existing security schema
});