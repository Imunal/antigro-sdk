import { z } from 'zod';

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

export const UpdateClientDesignResponse = z.object({
  status: z.string(), //Same story as in GetClientDesignSchema,
  price: priceSchema,
  projectPrices: z.record(projectPriceSchema), // Use record there cuz key's are dynamic.
  orderId: z.string(),
});

export type UpdateClientDesignResponse = z.infer<
  typeof UpdateClientDesignResponse
>;
