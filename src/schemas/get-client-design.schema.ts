import { z } from 'zod';

export const GetClientDesignRequestSchema = z.string();

export type GetClientDesignRequest = z.infer<
  typeof GetClientDesignRequestSchema
>;

//
export const GetClientDesignResponseSchema = z.object({
  status: z.string(), // Cannot determine all Antigro status types, will be great to cast it to some ENUM. Leave as string for now
  printFileGenerationStatus: z.string(), //Statuses again
  printFiles: z.array(z.any()), // Leave any for now, don't know objects type returned there yet.
}).passthrough();

export type GetClientDesignResponse = z.infer<
  typeof GetClientDesignResponseSchema
>;
