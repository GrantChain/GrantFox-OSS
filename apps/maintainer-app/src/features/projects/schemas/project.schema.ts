import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  github_handle: z.string().min(1, "GitHub handle is required"),
  short_description: z.string().min(1, "Short description is required"),
  description: z.string().min(1, "Description is required"),
  tech_stack: z.array(z.string()).min(1, "Tech stack is required"),
  category: z.string().min(1, "Category is required"),
});
