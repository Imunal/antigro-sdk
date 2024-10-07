import { z } from 'zod';

const CreateClientDesignRequestSchema = z.object({
  sellerId: z.string(),
  brandId: z.string().optional(),
  productCode: z.string(),
  templateBindingType: z.string().optional(),
  templateId: z.string().optional(),
  productParameters: z.object({}).optional(),
  returnUrl: z.string().url(),
  volume: z.number().positive().optional(),
  orderId: z.string().optional(),
  externalData: z.object({}).optional(),
});

export type CreateClientDesignRequest = z.infer<
  typeof CreateClientDesignRequestSchema
>;

//

const CreateClientDesignResponseSchema = z.object({
  id: z.string(),
  thumb_url: z.string().url(),
});

export type CreateClientDesignResponse = z.infer<
  typeof CreateClientDesignResponseSchema
>;
