import z from "zod";

export const campaignSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string()).optional().default([]),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  image_url: z.string().optional(),
});
