import { z } from 'zod';

export const CreateClientDesignRequestSchema = z.object({
  sellerId: z.string(),
  brandId: z.string().optional(),
  productCode: z.string(),
  templateBindingType: z.string().optional(),
  templateId: z.string().optional(),
  productParameters: z.record(z.any()).optional(), //Record any cuz its defined by the end API user.
  returnUrl: z.string().url(),
  volume: z.number().positive().optional(),
  orderId: z.string().optional(),
  externalData: z.record(z.any()).optional(), //Record any cuz its defined by the end API user.
}).passthrough();

export type CreateClientDesignRequest = z.infer<
  typeof CreateClientDesignRequestSchema
>;

//

export const CreateClientDesignResponseSchema = z.object({
  id: z.string(),
  thumbUrl: z.string().url(),
});

export type CreateClientDesignResponse = z.infer<
  typeof CreateClientDesignResponseSchema
>;
