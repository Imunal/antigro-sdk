import { z } from 'zod';

//
const priceSchema = z.object({
  net: z.number(),
  tax: z.number(),
  currency: z.string(),
});

const projectPriceSchema = z.object({
  net: z.number(),
  gross: z.number(),
  tax: z.number(),
  taxAmount: z.number(),
  currency: z.string(),
});

export const UpdateClientDesignRequestSchema = z.object({
  designId: z.string(),
  status: z.string().optional(), //Same story as in GetClientDesignSchema,
  price: priceSchema.optional(),
  projectPrices: z.record(projectPriceSchema).optional(), // Use record there cuz key's are dynamic.
  orderId: z.string().optional(),
});

export type UpdateClientDesignRequest = z.infer<
  typeof UpdateClientDesignRequestSchema
>;
