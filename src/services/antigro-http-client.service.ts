import { AxiosError } from 'axios';
import { ZodError } from 'zod';

//
import { HttpClient } from './http-client';

//schemas
import {
  type GetClientDesignRequest,
  GetClientDesignRequestSchema,
  type GetClientDesignResponse,
  GetClientDesignResponseSchema,
} from '../schemas/get-client-design.schema';
import {
  type CreateClientDesignRequest,
  CreateClientDesignRequestSchema, type CreateClientDesignResponse,
  CreateClientDesignResponseSchema,
} from '../schemas/create-client-design.schema';
import {
  type UpdateClientDesignRequest, UpdateClientDesignRequestSchema,
} from '../schemas/update-client-design.schema';

//exceptions
import { AntigroError } from '../exceptions/antigro.exception';

/**
 * @class
 */
export class AntigroHttpClientService extends HttpClient {

  constructor(api_secret_key: string, api_type: 'prod' | 'dev') {
    super(api_secret_key, api_type);
  }

  //endpoints
  private readonly GET_CLIENT_DESIGN_ENDPOINT = 'api/partner-backend/designs';
  private readonly CREATE_CLIENT_DESIGN_ENDPOINT = 'api/partner-backend/designs';
  private readonly UPDATE_CLIENT_DESIGN_ENDPOINT = 'api/partner-backend/designs';

  /**
   * getClientDesign
   * @remarks Function which is responsible to call getClientDesign endpoint in Antigro API, parse, and returns valid.
   * @param data
   * @returns Promise<GetClientDesignResponse>
   */
  public async getClientDesign(
    data: GetClientDesignRequest,
  ): Promise<GetClientDesignResponse> {
    try {
      //validate data before sending request.
      const safe_data = GetClientDesignRequestSchema.parse(data);

      //call endpoint
      const response = await this.sendRequest({
        endpoint: `${this.GET_CLIENT_DESIGN_ENDPOINT}/${safe_data}`,
        method: 'get',
      });

      //return parsed response payload
      return GetClientDesignResponseSchema.parse(response);
    } catch (error: unknown) {
      return this.handleError(error, 'getClientDesign');
    }
  }

  /**
   * createClientDesign
   * @remarks Function which is responsible to call createClientDesign endpoint in Antigro API, parse, and returns valid.
   * @param data
   * @returns Promise<CreateClientDesignResponse>
   */
  public async createClientDesign(
    data: CreateClientDesignRequest,
  ): Promise<CreateClientDesignResponse> {
    try {
      const { designId } = data;
      //validate data before sending request.
      const safe_data = CreateClientDesignRequestSchema.parse(designId);

      //call endpoint
      const response = await this.sendRequest({
        endpoint: `${this.CREATE_CLIENT_DESIGN_ENDPOINT}`,
        method: 'post',
        data: JSON.stringify(safe_data),
      });

      //return parsed response payload
      return CreateClientDesignResponseSchema.parse(response);
    } catch (error: unknown) {
      return this.handleError(error, 'createClientDesign');
    }
  }


  /**
   * updateClientDesign
   * @remarks Function which is responsible to call updateClientDesign endpoint in Antigro API, parse, and returns valid.
   * @param data
   * @returns Promise<UpdateClientDesignRequest>
   */
  public async updateClientDesign(
    data: UpdateClientDesignRequest,
  ): Promise<boolean> {
    try {
      //validate data before sending request.
      const safe_data = UpdateClientDesignRequestSchema.parse(data);

      //call endpoint
      await this.sendRequest({
        endpoint: `${this.UPDATE_CLIENT_DESIGN_ENDPOINT}/${safe_data.designId}`,
        method: 'patch',
        data: JSON.stringify(safe_data),
      });

      return true;
    } catch (error: unknown) {
      return this.handleError(error, 'updateClientDesign');
    }
  }

  /**
   * Internal error handling method
   * @param error - Unknown error to process
   * @param context - Context of the error (method name)
   * @throws AntigroApiError
   */
  private handleError(error: unknown, context: string): never {
    console.error(`[Antigro Error in ${context}]:`, error);

    if (error instanceof AxiosError) {
      throw new AntigroError(
        `Network error in ${context}: ${error.message}`,
        'NETWORK',
      );
    }

    if (error instanceof ZodError) {
      throw new AntigroError(
        `Validation error in ${context}: ${JSON.stringify(error.errors)}`,
        'VALIDATION',
      );
    }

    throw new AntigroError(
      `Unexpected error in ${context}: ${String(error)}`,
      'UNKNOWN',
    );
  }
}
