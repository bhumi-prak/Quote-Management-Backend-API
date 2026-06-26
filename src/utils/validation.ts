import { z } from "zod";

export const createQuoteSchema = z.object({
  customer: z
    .string()
    .trim()
    .min(1, "Customer is required"),

  project: z
    .string()
    .trim()
    .min(1, "Project is required"),

  estimated_value: z
    .number()
    .min(0, "Estimated value cannot be negative"),
});

export const updateStatusSchema = z.object({
  status: z.enum([
    "New",
    "In Review",
    "Needs Info",
    "Completed",
  ]),
});